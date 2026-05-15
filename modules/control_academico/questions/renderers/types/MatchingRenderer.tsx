/**
 * MatchingRenderer - Renderiza preguntas de emparejamiento
 */

'use client';

import { memo, useState, useCallback } from 'react';
import type { MatchingQuestion, MatchPair } from '../../types';
import type { QuestionRendererProps } from '../../config';
import { cn } from '@/lib/utils';

type Props = QuestionRendererProps<MatchingQuestion>;

function MatchingRendererBase({
  question,
  value,
  onChange,
  disabled,
  showFeedback,
}: Props) {
  const pairs = (value as MatchPair[] | undefined) ?? [];
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);

  const getPairForLeft = (leftId: string) => pairs.find((p) => p.leftId === leftId);
  const getPairForRight = (rightId: string) => pairs.find((p) => p.rightId === rightId);

  const handleLeftClick = useCallback((leftId: string) => {
    if (disabled) return;
    setSelectedLeft(selectedLeft === leftId ? null : leftId);
  }, [disabled, selectedLeft]);

  const handleRightClick = useCallback((rightId: string) => {
    if (disabled || !selectedLeft) return;

    const newPairs = pairs.filter(
      (p) => p.leftId !== selectedLeft && p.rightId !== rightId
    );
    newPairs.push({ leftId: selectedLeft, rightId });

    onChange?.(newPairs);
    setSelectedLeft(null);
  }, [disabled, selectedLeft, pairs, onChange]);

  const isCorrectPair = (leftId: string, rightId: string) => {
    return question.correctPairs.some(
      (p) => p.leftId === leftId && p.rightId === rightId
    );
  };

  return (
    <div className="space-y-4">
      <div>
        <p className="text-base font-medium text-foreground">
          {question.questionText}
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Selecciona un elemento de la izquierda y luego su pareja de la derecha
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Columna izquierda */}
        <div className="space-y-2">
          {question.leftItems.map((item) => {
            const pair = getPairForLeft(item.id);
            const isSelected = selectedLeft === item.id;
            const isPaired = !!pair;
            const isCorrect = showFeedback && pair && isCorrectPair(item.id, pair.rightId);

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleLeftClick(item.id)}
                disabled={disabled}
                className={cn(
                  'w-full rounded-lg border p-3 text-left text-sm transition-colors',
                  'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
                  isSelected && 'border-primary bg-primary/10',
                  isPaired && !isSelected && 'border-muted bg-muted/50',
                  !isPaired && !isSelected && !disabled && 'hover:border-primary/50',
                  disabled && 'cursor-not-allowed opacity-60',
                  showFeedback && isCorrect && 'border-green-500 bg-green-50',
                  showFeedback && isPaired && !isCorrect && 'border-red-500 bg-red-50'
                )}
              >
                {item.text}
              </button>
            );
          })}
        </div>

        {/* Columna derecha */}
        <div className="space-y-2">
          {question.rightItems.map((item) => {
            const pair = getPairForRight(item.id);
            const isPaired = !!pair;
            const isCorrect = showFeedback && pair && isCorrectPair(pair.leftId, item.id);

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleRightClick(item.id)}
                disabled={disabled || !selectedLeft}
                className={cn(
                  'w-full rounded-lg border p-3 text-left text-sm transition-colors',
                  'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
                  isPaired && 'border-muted bg-muted/50',
                  !isPaired && selectedLeft && !disabled && 'hover:border-primary/50',
                  (disabled || !selectedLeft) && 'cursor-not-allowed opacity-60',
                  showFeedback && isCorrect && 'border-green-500 bg-green-50',
                  showFeedback && isPaired && !isCorrect && 'border-red-500 bg-red-50'
                )}
              >
                {item.text}
              </button>
            );
          })}
        </div>
      </div>

      {showFeedback && (
        <p role="alert" className="text-sm font-medium text-muted-foreground">
          {pairs.filter((p) => isCorrectPair(p.leftId, p.rightId)).length} de{' '}
          {question.correctPairs.length} pares correctos
        </p>
      )}
    </div>
  );
}

export default memo(MatchingRendererBase);
