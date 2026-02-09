/**
 * TrueFalseRenderer - Renderiza preguntas de verdadero/falso
 */

'use client';

import { memo } from 'react';
import type { TrueFalseQuestion } from '../../types';
import type { QuestionRendererProps } from '../../config';
import { cn } from '@/lib/utils';

type Props = QuestionRendererProps<TrueFalseQuestion>;

function TrueFalseRendererBase({
  question,
  value,
  onChange,
  disabled,
  showFeedback,
}: Props) {
  const selectedValue = value as boolean | undefined;

  const handleSelect = (answer: boolean) => {
    if (disabled) return;
    onChange?.(answer);
  };

  const options = [
    { value: true, label: 'Verdadero' },
    { value: false, label: 'Falso' },
  ];

  return (
    <div className="space-y-4">
      <p className="text-base font-medium text-foreground">
        {question.questionText}
      </p>

      <div
        role="radiogroup"
        aria-label={question.questionText}
        className="flex gap-3"
      >
        {options.map((option) => {
          const isSelected = selectedValue === option.value;
          const isCorrect = option.value === question.correctAnswer;
          const showAsCorrect = showFeedback && isSelected && isCorrect;
          const showAsIncorrect = showFeedback && isSelected && !isCorrect;

          return (
            <button
              key={String(option.value)}
              type="button"
              role="radio"
              aria-checked={isSelected}
              disabled={disabled}
              onClick={() => handleSelect(option.value)}
              className={cn(
                'flex-1 rounded-lg border p-4 text-center font-medium transition-colors',
                'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
                isSelected && !showFeedback && 'border-primary bg-primary/5',
                !isSelected && !disabled && 'hover:border-primary/50 hover:bg-muted/50',
                disabled && 'cursor-not-allowed opacity-60',
                showAsCorrect && 'border-green-500 bg-green-50 text-green-700',
                showAsIncorrect && 'border-red-500 bg-red-50 text-red-700'
              )}
            >
              {option.label}
            </button>
          );
        })}
      </div>

      {showFeedback && selectedValue !== undefined && (
        <p
          role="alert"
          className={cn(
            'text-sm font-medium',
            selectedValue === question.correctAnswer
              ? 'text-green-600'
              : 'text-red-600'
          )}
        >
          {selectedValue === question.correctAnswer
            ? '✓ Correcto'
            : `✗ Incorrecto. La respuesta correcta era: ${
                question.correctAnswer ? 'Verdadero' : 'Falso'
              }`}
        </p>
      )}
    </div>
  );
}

export default memo(TrueFalseRendererBase);
