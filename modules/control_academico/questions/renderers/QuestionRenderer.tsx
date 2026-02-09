/**
 * QuestionRenderer - Componente genérico para renderizar preguntas
 * Usa el registro dinámico para cargar el renderer específico por tipo
 */

'use client';

import { Suspense, useMemo } from 'react';
import dynamic from 'next/dynamic';
import type { Question } from '../types';
import { getQuestionConfig, QuestionRendererProps } from '../config';

interface Props extends Omit<QuestionRendererProps, 'question'> {
  question: Question;
}

function QuestionSkeleton() {
  return (
    <div className="animate-pulse space-y-3">
      <div className="h-4 bg-muted rounded w-3/4" />
      <div className="h-10 bg-muted rounded" />
      <div className="h-10 bg-muted rounded" />
    </div>
  );
}

function UnsupportedQuestion({ type }: { type: string }) {
  return (
    <div
      role="alert"
      className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-destructive"
    >
      <p className="text-sm font-medium">Tipo de pregunta no soportado</p>
      <p className="text-xs mt-1">Tipo: {type}</p>
    </div>
  );
}

export function QuestionRenderer({ question, ...props }: Props) {
  const config = getQuestionConfig(question.questionType);

  const RendererComponent = useMemo(() => {
    if (!config) return null;

    return dynamic(
      () => config.renderer().then((mod) => mod.default),
      {
        loading: () => <QuestionSkeleton />,
        ssr: false,
      }
    );
  }, [config]);

  if (!RendererComponent) {
    return <UnsupportedQuestion type={question.questionType} />;
  }

  return (
    <Suspense fallback={<QuestionSkeleton />}>
      <RendererComponent question={question} {...props} />
    </Suspense>
  );
}

export default QuestionRenderer;
