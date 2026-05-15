/**
 * OrderingEditor - Editor para preguntas de ordenamiento
 */

'use client';

import { memo, useCallback, useEffect } from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';
import type { OrderingQuestion } from '../../types';
import { generateOptionId } from '../../types';
import type { QuestionEditorProps } from '../../config';
import { FormField } from '@repo/ui/form/scenes/form-field';
import { FormTextAreaField } from '@repo/ui/form/scenes/form-area';
import { FormSelectField } from '@repo/ui/form/scenes/form-select';
import { Input } from '@repo/ui/inputs/scenes/input';
import { Buttons } from '@repo/ui/buttons/scenes/index';
import { getDifficultyOptions } from '../../config';

type Props = QuestionEditorProps<OrderingQuestion>;

function OrderingEditorBase({ errors }: Props) {
  const { register, control, watch, setValue, formState } = useFormContext<OrderingQuestion>();
  const difficultyOptions = getDifficultyOptions();

  const { fields, append, remove, move } = useFieldArray({
    control,
    name: 'items',
  });

  const items = watch('items');

  // Sincronizar correctOrder con el orden actual de items
  useEffect(() => {
    if (items && items.length > 0) {
      setValue('correctOrder', items.map((item) => item.id), { shouldDirty: true });
    }
  }, [items, setValue]);

  const handleAddItem = useCallback(() => {
    append({ id: generateOptionId(), text: '' });
  }, [append]);

  const handleMoveUp = useCallback((index: number) => {
    if (index > 0) {
      move(index, index - 1);
    }
  }, [move]);

  const handleMoveDown = useCallback((index: number) => {
    if (index < fields.length - 1) {
      move(index, index + 1);
    }
  }, [move, fields.length]);

  return (
    <div className="space-y-6">
      <FormTextAreaField
        id="questionText"
        label="Texto de la pregunta"
        error={formState.errors.questionText?.message}
        {...register('questionText')}
      />

      <div className="grid grid-cols-2 gap-4">
        <FormSelectField
          id="difficulty"
          label="Dificultad"
          data={difficultyOptions}
          error={formState.errors.difficulty?.message}
          {...register('difficulty')}
        />
        <FormField
          id="maxScore"
          label="Puntaje máximo"
          type="number"
          error={formState.errors.maxScore?.message}
          {...register('maxScore', { valueAsNumber: true })}
        />
      </div>

      <FormField
        id="themeId"
        label="Tema"
        error={formState.errors.themeId?.message}
        {...register('themeId')}
      />

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <label className="text-sm font-medium">Items a ordenar</label>
            <p className="text-xs text-muted-foreground">
              El orden actual es el orden correcto
            </p>
          </div>
          <Buttons type="button" size="sm" onClick={handleAddItem}>
            Añadir item
          </Buttons>
        </div>

        {fields.length === 0 ? (
          <div className="rounded-lg border border-dashed p-6 text-center text-muted-foreground">
            No hay items. Añade al menos 2.
          </div>
        ) : (
          <div className="space-y-2">
            {fields.map((field, index) => (
              <div key={field.id} className="flex items-center gap-3 rounded-lg border p-3">
                <span className="flex h-6 w-6 items-center justify-center rounded bg-muted text-xs font-medium">
                  {index + 1}
                </span>
                <Input
                  {...register(`items.${index}.text`)}
                  placeholder={`Item ${index + 1}`}
                  className="flex-1"
                />
                <div className="flex gap-1">
                  <Buttons
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => handleMoveUp(index)}
                    disabled={index === 0}
                  >
                    ↑
                  </Buttons>
                  <Buttons
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => handleMoveDown(index)}
                    disabled={index === fields.length - 1}
                  >
                    ↓
                  </Buttons>
                  <Buttons
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => remove(index)}
                  >
                    Quitar
                  </Buttons>
                </div>
              </div>
            ))}
          </div>
        )}

        {formState.errors.items && (
          <p className="text-sm text-destructive" role="alert">
            {formState.errors.items.message || 'Error en los items'}
          </p>
        )}
      </div>
    </div>
  );
}

export default memo(OrderingEditorBase);
