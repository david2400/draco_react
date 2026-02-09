/**
 * NumericEditor - Editor para preguntas numéricas
 */

'use client';

import { memo } from 'react';
import { useFormContext } from 'react-hook-form';
import type { NumericQuestion } from '../../types';
import type { QuestionEditorProps } from '../../config';
import { FormField } from '@repo/ui/form/scenes/form-field';
import { FormTextAreaField } from '@repo/ui/form/scenes/form-area';
import { FormSelectField } from '@repo/ui/form/scenes/form-select';
import { getDifficultyOptions } from '../../config';

type Props = QuestionEditorProps<NumericQuestion>;

function NumericEditorBase({ errors }: Props) {
  const { register, formState } = useFormContext<NumericQuestion>();
  const difficultyOptions = getDifficultyOptions();

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
          id="correctValue"
          label="Valor correcto"
          type="number"
          step="any"
          error={formState.errors.correctValue?.message}
          {...register('correctValue', { valueAsNumber: true })}
        />
        <FormField
          id="tolerance"
          label="Tolerancia (±)"
          type="number"
          step="any"
          error={formState.errors.tolerance?.message}
          {...register('tolerance', { valueAsNumber: true })}
        />
        <FormField
          id="unit"
          label="Unidad"
          placeholder="ej: kg, m, °C"
          error={formState.errors.unit?.message}
          {...register('unit')}
        />
      </div>
    </div>
  );
}

export default memo(NumericEditorBase);
