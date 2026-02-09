/**
 * MatchingEditor - Editor para preguntas de emparejamiento
 */

'use client';

import { memo, useCallback } from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';
import type { MatchingQuestion } from '../../types';
import { generateOptionId } from '../../types';
import type { QuestionEditorProps } from '../../config';
import { FormField } from '@repo/ui/form/scenes/form-field';
import { FormTextAreaField } from '@repo/ui/form/scenes/form-area';
import { FormSelectField } from '@repo/ui/form/scenes/form-select';
import { Input } from '@repo/ui/inputs/scenes/input';
import { Buttons } from '@repo/ui/buttons/scenes/index';
import { getDifficultyOptions } from '../../config';

type Props = QuestionEditorProps<MatchingQuestion>;

function MatchingEditorBase({ errors }: Props) {
  const { register, control, watch, setValue, formState } = useFormContext<MatchingQuestion>();
  const difficultyOptions = getDifficultyOptions();

  const leftArray = useFieldArray({ control, name: 'leftItems' });
  const rightArray = useFieldArray({ control, name: 'rightItems' });

  const leftItems = watch('leftItems') ?? [];
  const rightItems = watch('rightItems') ?? [];
  const correctPairs = watch('correctPairs') ?? [];

  const handleAddPair = useCallback(() => {
    const leftId = generateOptionId();
    const rightId = generateOptionId();
    leftArray.append({ id: leftId, text: '' });
    rightArray.append({ id: rightId, text: '' });
    setValue('correctPairs', [...correctPairs, { leftId, rightId }], { shouldDirty: true });
  }, [leftArray, rightArray, correctPairs, setValue]);

  const handleRemovePair = useCallback((index: number) => {
    const leftId = leftItems[index]?.id;
    const rightId = rightItems[index]?.id;
    
    leftArray.remove(index);
    rightArray.remove(index);
    
    const newPairs = correctPairs.filter(
      (p) => p.leftId !== leftId && p.rightId !== rightId
    );
    setValue('correctPairs', newPairs, { shouldDirty: true });
  }, [leftArray, rightArray, leftItems, rightItems, correctPairs, setValue]);

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
            <label className="text-sm font-medium">Pares de emparejamiento</label>
            <p className="text-xs text-muted-foreground">
              Cada fila representa un par correcto
            </p>
          </div>
          <Buttons type="button" size="sm" onClick={handleAddPair}>
            Añadir par
          </Buttons>
        </div>

        {leftArray.fields.length === 0 ? (
          <div className="rounded-lg border border-dashed p-6 text-center text-muted-foreground">
            No hay pares. Añade al menos 2.
          </div>
        ) : (
          <div className="space-y-2">
            <div className="grid grid-cols-[1fr_auto_1fr_auto] gap-2 text-xs font-medium text-muted-foreground">
              <span>Columna izquierda</span>
              <span></span>
              <span>Columna derecha</span>
              <span></span>
            </div>
            {leftArray.fields.map((field, index) => (
              <div key={field.id} className="grid grid-cols-[1fr_auto_1fr_auto] gap-2 items-center">
                <Input
                  {...register(`leftItems.${index}.text`)}
                  placeholder={`Item izquierdo ${index + 1}`}
                />
                <span className="text-muted-foreground">↔</span>
                <Input
                  {...register(`rightItems.${index}.text`)}
                  placeholder={`Item derecho ${index + 1}`}
                />
                <Buttons
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemovePair(index)}
                >
                  Quitar
                </Buttons>
              </div>
            ))}
          </div>
        )}

        {formState.errors.correctPairs && (
          <p className="text-sm text-destructive" role="alert">
            {formState.errors.correctPairs.message}
          </p>
        )}
      </div>
    </div>
  );
}

export default memo(MatchingEditorBase);
