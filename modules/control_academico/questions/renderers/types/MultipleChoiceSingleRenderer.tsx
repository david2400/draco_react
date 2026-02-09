/**
 * MultipleChoiceSingleRenderer - Renderiza preguntas de opción múltiple (única)
 */

'use client';

import { memo } from 'react';
import type { MultipleChoiceSingleQuestion } from '../../types';
import type { QuestionRendererProps } from '../../config';
import { cn } from '@/lib/utils';

type Props = QuestionRendererProps<MultipleChoiceSingleQuestion>;

function MultipleChoiceSingleRendererBase({
  question,
  value,
  onChange,
  disabled,
  showFeedback,
  showCorrectAnswer,
}: Props) {
  const selectedId = value as string | undefined;

  const handleSelect = (optionId: string) => {
    if (disabled) return;
    onChange?.(optionId);
  };

  return (
    <div className="space-y-4">
      <p className="text-base font-medium text-foreground">
        {question.questionText}
      </p>

      <div
        role="radiogroup"
        aria-label={question.questionText}
        className="space-y-2"
      >
        {question.options.map((option) => {
          const isSelected = selectedId === option.id;
          const isCorrect = option.id === question.correctOptionId;
          const showAsCorrect = showCorrectAnswer && isCorrect;
          const showAsIncorrect = showFeedback && isSelected && !isCorrect;

          return (
            <button
              key={option.id}
              type="button"
              role="radio"
              aria-checked={isSelected}
              disabled={disabled}
              onClick={() => handleSelect(option.id)}
              className={cn(
                'flex w-full items-center gap-3 rounded-lg border p-3 text-left transition-colors',
                'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
                isSelected && !showFeedback && 'border-primary bg-primary/5',
                !isSelected && !disabled && 'hover:border-primary/50 hover:bg-muted/50',
                disabled && 'cursor-not-allowed opacity-60',
                showAsCorrect && 'border-green-500 bg-green-50',
                showAsIncorrect && 'border-red-500 bg-red-50'
              )}
            >
              <span
                className={cn(
                  'flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2',
                  isSelected ? 'border-primary' : 'border-muted-foreground/30',
                  showAsCorrect && 'border-green-500',
                  showAsIncorrect && 'border-red-500'
                )}
              >
                {isSelected && (
                  <span
                    className={cn(
                      'h-2.5 w-2.5 rounded-full',
                      showAsCorrect ? 'bg-green-500' : showAsIncorrect ? 'bg-red-500' : 'bg-primary'
                    )}
                  />
                )}
              </span>
              <span className="text-sm">{option.text}</span>
            </button>
          );
        })}
      </div>

      {showFeedback && selectedId && (
        <p
          role="alert"
          className={cn(
            'text-sm font-medium',
            selectedId === question.correctOptionId
              ? 'text-green-600'
              : 'text-red-600'
          )}
        >
          {selectedId === question.correctOptionId
            ? '✓ Correcto'
            : `✗ Incorrecto. La respuesta correcta era: ${
                question.options.find((o) => o.id === question.correctOptionId)?.text
              }`}
        </p>
      )}
    </div>
  );
}

export default memo(MultipleChoiceSingleRendererBase);
