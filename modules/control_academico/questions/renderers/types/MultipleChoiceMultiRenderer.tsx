/**
 * MultipleChoiceMultiRenderer - Renderiza preguntas de opción múltiple (varias)
 */

'use client';

import { memo, useCallback } from 'react';
import type { MultipleChoiceMultiQuestion } from '../../types';
import type { QuestionRendererProps } from '../../config';
import { cn } from '@/lib/utils';

type Props = QuestionRendererProps<MultipleChoiceMultiQuestion>;

function MultipleChoiceMultiRendererBase({
  question,
  value,
  onChange,
  disabled,
  showFeedback,
  showCorrectAnswer,
}: Props) {
  const selectedIds = (value as string[] | undefined) ?? [];
  const correctIds = new Set(question.correctOptionIds);

  const handleToggle = useCallback(
    (optionId: string) => {
      if (disabled) return;

      const newSelection = selectedIds.includes(optionId)
        ? selectedIds.filter((id) => id !== optionId)
        : [...selectedIds, optionId];

      onChange?.(newSelection);
    },
    [disabled, selectedIds, onChange]
  );

  return (
    <div className="space-y-4">
      <div>
        <p className="text-base font-medium text-foreground">
          {question.questionText}
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Selecciona todas las respuestas correctas
        </p>
      </div>

      <div role="group" aria-label={question.questionText} className="space-y-2">
        {question.options.map((option) => {
          const isSelected = selectedIds.includes(option.id);
          const isCorrect = correctIds.has(option.id);
          const showAsCorrect = showCorrectAnswer && isCorrect;
          const showAsIncorrect = showFeedback && isSelected && !isCorrect;
          const showAsMissed = showFeedback && !isSelected && isCorrect;

          return (
            <button
              key={option.id}
              type="button"
              role="checkbox"
              aria-checked={isSelected}
              disabled={disabled}
              onClick={() => handleToggle(option.id)}
              className={cn(
                'flex w-full items-center gap-3 rounded-lg border p-3 text-left transition-colors',
                'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
                isSelected && !showFeedback && 'border-primary bg-primary/5',
                !isSelected && !disabled && 'hover:border-primary/50 hover:bg-muted/50',
                disabled && 'cursor-not-allowed opacity-60',
                showAsCorrect && 'border-green-500 bg-green-50',
                showAsIncorrect && 'border-red-500 bg-red-50',
                showAsMissed && 'border-yellow-500 bg-yellow-50'
              )}
            >
              <span
                className={cn(
                  'flex h-5 w-5 shrink-0 items-center justify-center rounded border-2',
                  isSelected ? 'border-primary bg-primary' : 'border-muted-foreground/30',
                  showAsCorrect && 'border-green-500 bg-green-500',
                  showAsIncorrect && 'border-red-500 bg-red-500'
                )}
              >
                {isSelected && (
                  <svg
                    className="h-3 w-3 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </span>
              <span className="text-sm">{option.text}</span>
            </button>
          );
        })}
      </div>

      {showFeedback && (
        <p role="alert" className="text-sm font-medium text-muted-foreground">
          {selectedIds.filter((id) => correctIds.has(id)).length} de{' '}
          {question.correctOptionIds.length} correctas
        </p>
      )}
    </div>
  );
}

export default memo(MultipleChoiceMultiRendererBase);
