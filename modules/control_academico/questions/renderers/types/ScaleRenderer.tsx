/**
 * ScaleRenderer - Renderiza preguntas de escala (Likert)
 */

'use client';

import { memo, useMemo } from 'react';
import type { ScaleQuestion } from '../../types';
import type { QuestionRendererProps } from '../../config';
import { cn } from '@/lib/utils';

type Props = QuestionRendererProps<ScaleQuestion>;

function ScaleRendererBase({
  question,
  value,
  onChange,
  disabled,
}: Props) {
  const selectedValue = value as number | undefined;

  const steps = useMemo(() => {
    const result: number[] = [];
    for (let i = question.minValue; i <= question.maxValue; i += question.step) {
      result.push(i);
    }
    return result;
  }, [question.minValue, question.maxValue, question.step]);

  const getLabel = (stepValue: number): string | undefined => {
    return question.labels?.find((l) => l.value === stepValue)?.text;
  };

  return (
    <div className="space-y-4">
      <p className="text-base font-medium text-foreground">
        {question.questionText}
      </p>

      <div
        role="radiogroup"
        aria-label={question.questionText}
        className="flex justify-between gap-2"
      >
        {steps.map((step) => {
          const isSelected = selectedValue === step;
          const label = getLabel(step);

          return (
            <button
              key={step}
              type="button"
              role="radio"
              aria-checked={isSelected}
              disabled={disabled}
              onClick={() => onChange?.(step)}
              className={cn(
                'flex flex-col items-center gap-1 p-3 rounded-lg border transition-colors min-w-[60px]',
                'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
                isSelected && 'border-primary bg-primary/10',
                !isSelected && !disabled && 'hover:border-primary/50 hover:bg-muted/50',
                disabled && 'cursor-not-allowed opacity-60'
              )}
            >
              <span className="text-lg font-semibold">{step}</span>
              {label && (
                <span className="text-xs text-muted-foreground text-center">
                  {label}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {question.labels && question.labels.length > 0 && (
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{getLabel(question.minValue) || question.minValue}</span>
          <span>{getLabel(question.maxValue) || question.maxValue}</span>
        </div>
      )}
    </div>
  );
}

export default memo(ScaleRendererBase);
