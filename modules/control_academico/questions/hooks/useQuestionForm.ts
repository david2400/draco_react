/**
 * useQuestionForm - Hook principal para formularios de preguntas
 */

'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { z } from 'zod';
import type { Question, QuestionType } from '../types';
import { getQuestionConfig, getSchemaForType } from '../config';

interface UseQuestionFormOptions {
  initialQuestion?: Partial<Question>;
  questionType: QuestionType;
  onSubmit: (question: Question) => Promise<void> | void;
}

interface UseQuestionFormReturn {
  form: UseFormReturn<Question>;
  isLoading: boolean;
  isSchemaLoading: boolean;
  handleSubmit: () => void;
  handleTypeChange: (newType: QuestionType) => void;
  currentType: QuestionType;
}

export function useQuestionForm({
  initialQuestion,
  questionType,
  onSubmit,
}: UseQuestionFormOptions): UseQuestionFormReturn {
  const [currentType, setCurrentType] = useState<QuestionType>(questionType);
  const [schema, setSchema] = useState<z.ZodSchema | null>(null);
  const [isSchemaLoading, setIsSchemaLoading] = useState(true);

  const config = getQuestionConfig(currentType);

  // Cargar schema dinámicamente
  useEffect(() => {
    let cancelled = false;
    setIsSchemaLoading(true);

    getSchemaForType(currentType).then((loadedSchema) => {
      if (!cancelled && loadedSchema) {
        setSchema(loadedSchema);
        setIsSchemaLoading(false);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [currentType]);

  // Valores por defecto
  const defaultValues = useMemo(() => {
    const defaults = config?.defaultValue() ?? {};
    return {
      ...defaults,
      ...initialQuestion,
      questionType: currentType,
    } as Question;
  }, [config, initialQuestion, currentType]);

  // Configurar formulario
  const form = useForm<Question>({
    resolver: schema ? zodResolver(schema) : undefined,
    defaultValues,
    mode: 'onChange',
  });

  // Reset form cuando cambia el schema
  useEffect(() => {
    if (schema) {
      form.reset(defaultValues);
    }
  }, [schema, defaultValues, form]);

  // Cambiar tipo de pregunta
  const handleTypeChange = useCallback(
    (newType: QuestionType) => {
      if (newType === currentType) return;

      const newConfig = getQuestionConfig(newType);
      if (newConfig) {
        const currentValues = form.getValues();
        const newDefaults = newConfig.defaultValue();

        // Preservar campos comunes
        const mergedValues = {
          ...newDefaults,
          questionText: currentValues.questionText,
          difficulty: currentValues.difficulty,
          maxScore: currentValues.maxScore,
          themeId: currentValues.themeId,
          questionType: newType,
        };

        setCurrentType(newType);
        form.reset(mergedValues as Question);
      }
    },
    [currentType, form]
  );

  // Submit handler
  const handleSubmit = form.handleSubmit(async (data) => {
    await onSubmit(data);
  });

  return {
    form,
    isLoading: form.formState.isSubmitting,
    isSchemaLoading,
    handleSubmit,
    handleTypeChange,
    currentType,
  };
}
