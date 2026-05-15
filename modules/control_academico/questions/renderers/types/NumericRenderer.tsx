/**
 * NumericRenderer - Renderiza preguntas numéricas
 */

'use client';

import { memo } from 'react';
import type { NumericQuestion } from '../../types';
import type { QuestionRendererProps } from '../../config';
import { Input } from '@repo/ui/inputs/scenes/input';
import { cn } from '@/lib/utils';

type Props = QuestionRendererProps<NumericQuestion>;

function NumericRendererBase({
  question,
  value,
  onChange,
  disabled,
  showFeedback,
}: Props) {
  const numericValue = value as number | undefined;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === '') {
      onChange?.(undefined);
    } else {
      const num = parseFloat(val);
      if (!isNaN(num)) {
        onChange?.(num);
      }
    }
  };

  const isCorrect = numericValue !== undefined && 
    Math.abs(numericValue - question.correctValue) <= (question.tolerance ?? 0);

  return (
    <div className="space-y-4">
      <p className="text-base font-medium text-foreground">
        {question.questionText}
      </p>

      <div className="flex items-center gap-2">
        <Input
          type="number"
          value={numericValue ?? ''}
          onChange={handleChange}
          disabled={disabled}
          placeholder="Ingresa un número..."
          aria-label={question.questionText}
          className="max-w-[200px]"
          step="any"
        />
        {question.unit && (
          <span className="text-sm text-muted-foreground">{question.unit}</span>
        )}
      </div>

      {question.tolerance !== undefined && question.tolerance > 0 && (
        <p className="text-xs text-muted-foreground">
          Tolerancia: ±{question.tolerance}
        </p>
      )}

      {showFeedback && numericValue !== undefined && (
        <p
          role="alert"
          className={cn(
            'text-sm font-medium',
            isCorrect ? 'text-green-600' : 'text-red-600'
          )}
        >
          {isCorrect
            ? '✓ Correcto'
            : `✗ Incorrecto. La respuesta correcta era: ${question.correctValue}${
                question.unit ? ` ${question.unit}` : ''
              }`}
        </p>
      )}
    </div>
  );
}

export default memo(NumericRendererBase);
