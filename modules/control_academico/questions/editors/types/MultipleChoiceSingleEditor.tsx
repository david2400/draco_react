/**
 * MultipleChoiceSingleEditor - Editor para preguntas de opción múltiple (única)
 */

'use client';

import { memo, useCallback } from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';
import type { MultipleChoiceSingleQuestion } from '../../types';
import { generateOptionId } from '../../types';
import type { QuestionEditorProps } from '../../config';
import { FormField } from '@repo/ui/form/scenes/form-field';
import { FormTextAreaField } from '@repo/ui/form/scenes/form-area';
import { FormSelectField } from '@repo/ui/form/scenes/form-select';
import { Input } from '@repo/ui/inputs/scenes/input';
import { Buttons } from '@repo/ui/buttons/scenes/index';
import { getDifficultyOptions } from '../../config';
import { cn } from '@/lib/utils';

type Props = QuestionEditorProps<MultipleChoiceSingleQuestion>;

function MultipleChoiceSingleEditorBase({ errors }: Props) {
  const { register, control, watch, setValue, formState } = useFormContext<MultipleChoiceSingleQuestion>();
  
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'options',
  });

  const correctOptionId = watch('correctOptionId');
  const difficultyOptions = getDifficultyOptions();

  const handleAddOption = useCallback(() => {
    append({ id: generateOptionId(), text: '' });
  }, [append]);

  const handleSetCorrect = useCallback((optionId: string) => {
    setValue('correctOptionId', optionId, { shouldDirty: true });
  }, [setValue]);

  return (
    <div className="space-y-6">
      {/* Texto de la pregunta */}
      <FormTextAreaField
        id="questionText"
        label="Texto de la pregunta"
        error={formState.errors.questionText?.message}
        {...register('questionText')}
      />

      {/* Configuración */}
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

      {/* Opciones */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium">Opciones de respuesta</label>
          <Buttons type="button" size="sm" onClick={handleAddOption}>
            Añadir opción
          </Buttons>
        </div>

        {fields.length === 0 ? (
          <div className="rounded-lg border border-dashed p-6 text-center text-muted-foreground">
            No hay opciones. Añade al menos 2.
          </div>
        ) : (
          <div className="space-y-2">
            {fields.map((field, index) => (
              <div 
                key={field.id} 
                className={cn(
                  'flex items-center gap-3 rounded-lg border p-3',
                  correctOptionId === field.id && 'border-green-500 bg-green-50'
                )}
              >
                <input
                  type="radio"
                  name="correctOption"
                  checked={correctOptionId === field.id}
                  onChange={() => handleSetCorrect(field.id)}
                  aria-label={`Marcar opción ${index + 1} como correcta`}
                  className="h-4 w-4"
                />
                <Input
                  {...register(`options.${index}.text`)}
                  placeholder={`Opción ${index + 1}`}
                  className="flex-1"
                />
                <Buttons
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => remove(index)}
                  aria-label={`Eliminar opción ${index + 1}`}
                >
                  Quitar
                </Buttons>
              </div>
            ))}
          </div>
        )}

        {formState.errors.options && (
          <p className="text-sm text-destructive" role="alert">
            {formState.errors.options.message || 'Error en las opciones'}
          </p>
        )}
        {formState.errors.correctOptionId && (
          <p className="text-sm text-destructive" role="alert">
            {formState.errors.correctOptionId.message}
          </p>
        )}
      </div>
    </div>
  );
}

export default memo(MultipleChoiceSingleEditorBase);
