/**
 * QuestionEditor - Componente genérico para editar preguntas
 * Usa el registro dinámico para cargar el editor específico por tipo
 */

'use client';

import { Suspense, useMemo } from 'react';
import dynamic from 'next/dynamic';
import type { QuestionType } from '../types';
import { getQuestionConfig, QuestionEditorProps } from '../config';

interface Props extends QuestionEditorProps {
  questionType: QuestionType;
}

function EditorSkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-10 bg-muted rounded" />
      <div className="h-10 bg-muted rounded" />
      <div className="h-20 bg-muted rounded" />
    </div>
  );
}

function UnsupportedEditor({ type }: { type: string }) {
  return (
    <div
      role="alert"
      className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-destructive"
    >
      <p className="text-sm font-medium">Editor no disponible</p>
      <p className="text-xs mt-1">Tipo: {type}</p>
    </div>
  );
}

export function QuestionEditor({ questionType, ...props }: Props) {
  const config = getQuestionConfig(questionType);

  const EditorComponent = useMemo(() => {
    if (!config) return null;

    return dynamic(
      () => config.editor().then((mod) => mod.default),
      {
        loading: () => <EditorSkeleton />,
        ssr: false,
      }
    );
  }, [config]);

  if (!EditorComponent) {
    return <UnsupportedEditor type={questionType} />;
  }

  return (
    <Suspense fallback={<EditorSkeleton />}>
      <EditorComponent {...props} />
    </Suspense>
  );
}

export default QuestionEditor;
