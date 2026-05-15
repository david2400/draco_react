/**
 * OpenShortRenderer - Renderiza preguntas de respuesta corta
 */

'use client';

import { memo } from 'react';
import type { OpenShortQuestion } from '../../types';
import type { QuestionRendererProps } from '../../config';
import { Input } from '@repo/ui/inputs/scenes/input';

type Props = QuestionRendererProps<OpenShortQuestion>;

function OpenShortRendererBase({
  question,
  value,
  onChange,
  disabled,
}: Props) {
  const textValue = (value as string) ?? '';

  return (
    <div className="space-y-4">
      <p className="text-base font-medium text-foreground">
        {question.questionText}
      </p>

      <Input
        value={textValue}
        onChange={(e) => onChange?.(e.target.value)}
        disabled={disabled}
        placeholder="Escribe tu respuesta..."
        maxLength={question.maxLength}
        aria-label={question.questionText}
      />

      {question.maxLength && (
        <p className="text-xs text-muted-foreground text-right">
          {textValue.length} / {question.maxLength} caracteres
        </p>
      )}
    </div>
  );
}

export default memo(OpenShortRendererBase);
