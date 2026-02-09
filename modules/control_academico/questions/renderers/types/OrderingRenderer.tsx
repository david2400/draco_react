/**
 * OrderingRenderer - Renderiza preguntas de ordenamiento
 */

'use client';

import { memo, useState, useCallback } from 'react';
import type { OrderingQuestion } from '../../types';
import type { QuestionRendererProps } from '../../config';
import { cn } from '@/lib/utils';

type Props = QuestionRendererProps<OrderingQuestion>;

function OrderingRendererBase({
  question,
  value,
  onChange,
  disabled,
  showFeedback,
}: Props) {
  const currentOrder = (value as string[] | undefined) ?? question.items.map((i) => i.id);
  const [draggedId, setDraggedId] = useState<string | null>(null);

  const handleDragStart = useCallback((id: string) => {
    if (disabled) return;
    setDraggedId(id);
  }, [disabled]);

  const handleDragOver = useCallback((e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    if (disabled || !draggedId || draggedId === targetId) return;

    const newOrder = [...currentOrder];
    const draggedIndex = newOrder.indexOf(draggedId);
    const targetIndex = newOrder.indexOf(targetId);

    newOrder.splice(draggedIndex, 1);
    newOrder.splice(targetIndex, 0, draggedId);

    onChange?.(newOrder);
  }, [disabled, draggedId, currentOrder, onChange]);

  const handleDragEnd = useCallback(() => {
    setDraggedId(null);
  }, []);

  const moveItem = useCallback((id: string, direction: 'up' | 'down') => {
    if (disabled) return;

    const newOrder = [...currentOrder];
    const index = newOrder.indexOf(id);
    const newIndex = direction === 'up' ? index - 1 : index + 1;

    if (newIndex < 0 || newIndex >= newOrder.length) return;

    const temp = newOrder[index]!;
    newOrder[index] = newOrder[newIndex]!;
    newOrder[newIndex] = temp;
    onChange?.(newOrder);
  }, [disabled, currentOrder, onChange]);

  const getItemById = (id: string) => question.items.find((i) => i.id === id);

  return (
    <div className="space-y-4">
      <div>
        <p className="text-base font-medium text-foreground">
          {question.questionText}
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Arrastra los elementos para ordenarlos
        </p>
      </div>

      <div className="space-y-2">
        {currentOrder.map((id, index) => {
          const item = getItemById(id);
          if (!item) return null;

          const isCorrectPosition = showFeedback && question.correctOrder[index] === id;

          return (
            <div
              key={id}
              draggable={!disabled}
              onDragStart={() => handleDragStart(id)}
              onDragOver={(e) => handleDragOver(e, id)}
              onDragEnd={handleDragEnd}
              className={cn(
                'flex items-center gap-3 rounded-lg border p-3 transition-colors',
                'cursor-grab active:cursor-grabbing',
                draggedId === id && 'opacity-50',
                disabled && 'cursor-not-allowed opacity-60',
                showFeedback && isCorrectPosition && 'border-green-500 bg-green-50',
                showFeedback && !isCorrectPosition && 'border-red-500 bg-red-50'
              )}
            >
              <span className="flex h-6 w-6 items-center justify-center rounded bg-muted text-xs font-medium">
                {index + 1}
              </span>
              <span className="flex-1 text-sm">{item.text}</span>
              {!disabled && (
                <div className="flex gap-1">
                  <button
                    type="button"
                    onClick={() => moveItem(id, 'up')}
                    disabled={index === 0}
                    className="p-1 text-muted-foreground hover:text-foreground disabled:opacity-30"
                    aria-label="Mover arriba"
                  >
                    ↑
                  </button>
                  <button
                    type="button"
                    onClick={() => moveItem(id, 'down')}
                    disabled={index === currentOrder.length - 1}
                    className="p-1 text-muted-foreground hover:text-foreground disabled:opacity-30"
                    aria-label="Mover abajo"
                  >
                    ↓
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {showFeedback && (
        <p role="alert" className="text-sm font-medium text-muted-foreground">
          {currentOrder.filter((id, i) => question.correctOrder[i] === id).length} de{' '}
          {question.correctOrder.length} en posición correcta
        </p>
      )}
    </div>
  );
}

export default memo(OrderingRendererBase);
