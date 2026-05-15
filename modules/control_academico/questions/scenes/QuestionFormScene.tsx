/**
 * QuestionFormScene - Escena principal para crear/editar preguntas
 */

'use client';

import { useState } from 'react';
import { FormProvider } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import type { Question, QuestionType } from '../types';
import { useQuestionForm } from '../hooks';
import { QuestionEditor } from '../editors';
import { QuestionRenderer } from '../renderers';
import { getAllQuestionTypes, initializeQuestionTypes } from '../config';
import { Buttons } from '@repo/ui/buttons/scenes/index';
import { Card } from '@repo/ui/card/scenes/card';

// Inicializar tipos de pregunta
initializeQuestionTypes();

interface QuestionFormSceneProps {
  initialQuestion?: Partial<Question>;
  onSubmit?: (question: Question) => Promise<void> | void;
  onCancel?: () => void;
}

export function QuestionFormScene({
  initialQuestion,
  onSubmit,
  onCancel,
}: QuestionFormSceneProps) {
  const router = useRouter();
  
  const [questionType, setQuestionType] = useState<QuestionType>(
    initialQuestion?.questionType ?? 'multiple_choice_single'
  );
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');

  const { form, isLoading, isSchemaLoading, handleSubmit, handleTypeChange, currentType } =
    useQuestionForm({
      initialQuestion,
      questionType,
      onSubmit: async (question) => {
        if (onSubmit) {
          await onSubmit(question);
        } else {
          console.log('Saving question:', question);
          router.back();
        }
      },
    });

  const questionTypes = getAllQuestionTypes().map((config) => ({
    id: config.type,
    value: config.type,
    label: config.label,
  }));

  const handleTypeSelect = (e: { target: { value: string } }) => {
    const newType = e.target.value as QuestionType;
    setQuestionType(newType);
    handleTypeChange(newType);
  };

  const currentQuestion = form.watch() as Question;

  if (isSchemaLoading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-10 bg-muted rounded" />
        <div className="h-40 bg-muted rounded" />
      </div>
    );
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Selector de tipo */}
        <Card className="p-4">
          <div className="space-y-2">
            <label htmlFor="questionType" className="text-sm font-medium">
              Tipo de pregunta
            </label>
            <select
              id="questionType"
              value={currentType}
              onChange={(e) => handleTypeSelect(e)}
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
            >
              {questionTypes.map((type) => (
                <option key={type.id} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>
        </Card>

        {/* Tabs */}
        <div className="flex gap-2 border-b">
          <button
            type="button"
            onClick={() => setActiveTab('edit')}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === 'edit'
                ? 'border-b-2 border-primary text-primary'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Editar
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('preview')}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === 'preview'
                ? 'border-b-2 border-primary text-primary'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Vista previa
          </button>
        </div>

        {/* Content */}
        {activeTab === 'edit' ? (
          <Card className="p-6">
            <QuestionEditor questionType={currentType} />
          </Card>
        ) : (
          <Card className="p-6">
            <QuestionRenderer question={currentQuestion} disabled />
          </Card>
        )}

        {/* Actions */}
        <div className="flex gap-3">
          {onCancel && (
            <Buttons type="button" variant="outline" onClick={onCancel}>
              Cancelar
            </Buttons>
          )}
          <Buttons type="submit" loading={isLoading} className="flex-1">
            Guardar pregunta
          </Buttons>
        </div>
      </form>
    </FormProvider>
  );
}

export default QuestionFormScene;
