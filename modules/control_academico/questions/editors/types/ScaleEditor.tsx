/**
 * ScaleEditor - Editor para preguntas de escala
 */

'use client';

import { memo } from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';
import type { ScaleQuestion } from '../../types';
import type { QuestionEditorProps } from '../../config';
import { FormField } from '@repo/ui/form/scenes/form-field';
import { FormTextAreaField } from '@repo/ui/form/scenes/form-area';
import { FormSelectField } from '@repo/ui/form/scenes/form-select';
import { Input } from '@repo/ui/inputs/scenes/input';
import { Buttons } from '@repo/ui/buttons/scenes/index';
import { getDifficultyOptions } from '../../config';

type Props = QuestionEditorProps<ScaleQuestion>;

function ScaleEditorBase({ errors }: Props) {
  const { register, control, formState } = useFormContext<ScaleQuestion>();
  const difficultyOptions = getDifficultyOptions();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'labels',
  });

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

      <div className="grid grid-cols-3 gap-4">
        <FormField
          id="minValue"
          label="Valor mínimo"
          type="number"
          error={formState.errors.minValue?.message}
          {...register('minValue', { valueAsNumber: true })}
        />
        <FormField
          id="maxValue"
          label="Valor máximo"
          type="number"
          error={formState.errors.maxValue?.message}
          {...register('maxValue', { valueAsNumber: true })}
        />
        <FormField
          id="step"
          label="Paso"
          type="number"
          error={formState.errors.step?.message}
          {...register('step', { valueAsNumber: true })}
        />
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium">Etiquetas (opcional)</label>
          <Buttons
            type="button"
            size="sm"
            onClick={() => append({ value: 0, text: '' })}
          >
            Añadir etiqueta
          </Buttons>
        </div>

        {fields.length > 0 && (
          <div className="space-y-2">
            {fields.map((field, index) => (
              <div key={field.id} className="flex items-center gap-3">
                <Input
                  type="number"
                  {...register(`labels.${index}.value`, { valueAsNumber: true })}
                  placeholder="Valor"
                  className="w-24"
                />
                <Input
                  {...register(`labels.${index}.text`)}
                  placeholder="Etiqueta"
                  className="flex-1"
                />
                <Buttons
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => remove(index)}
                >
                  Quitar
                </Buttons>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default memo(ScaleEditorBase);
