/**
 * OpenLongRenderer - Renderiza preguntas de respuesta larga
 */

'use client';

import { memo } from 'react';
import type { OpenLongQuestion } from '../../types';
import type { QuestionRendererProps } from '../../config';

type Props = QuestionRendererProps<OpenLongQuestion>;

function OpenLongRendererBase({
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

      <textarea
        value={textValue}
        onChange={(e) => onChange?.(e.target.value)}
        disabled={disabled}
        placeholder="Escribe tu respuesta..."
        minLength={question.minLength}
        maxLength={question.maxLength}
        aria-label={question.questionText}
        rows={6}
        className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-y"
      />

      <div className="flex justify-between text-xs text-muted-foreground">
        {question.minLength && (
          <span>Mínimo: {question.minLength} caracteres</span>
        )}
        {question.maxLength && (
          <span>
            {textValue.length} / {question.maxLength} caracteres
          </span>
        )}
      </div>
    </div>
  );
}

export default memo(OpenLongRendererBase);
