/**
 * OpenLongEditor - Editor para preguntas de respuesta larga
 */

'use client';

import { memo } from 'react';
import { useFormContext } from 'react-hook-form';
import type { OpenLongQuestion } from '../../types';
import type { QuestionEditorProps } from '../../config';
import { FormField } from '@repo/ui/form/scenes/form-field';
import { FormTextAreaField } from '@repo/ui/form/scenes/form-area';
import { FormSelectField } from '@repo/ui/form/scenes/form-select';
import { getDifficultyOptions } from '../../config';

type Props = QuestionEditorProps<OpenLongQuestion>;

function OpenLongEditorBase({ errors }: Props) {
  const { register, formState } = useFormContext<OpenLongQuestion>();
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

      <div className="grid grid-cols-2 gap-4">
        <FormField
          id="minLength"
          label="Longitud mínima (caracteres)"
          type="number"
          error={formState.errors.minLength?.message}
          {...register('minLength', { valueAsNumber: true })}
        />
        <FormField
          id="maxLength"
          label="Longitud máxima (caracteres)"
          type="number"
          error={formState.errors.maxLength?.message}
          {...register('maxLength', { valueAsNumber: true })}
        />
      </div>
    </div>
  );
}

export default memo(OpenLongEditorBase);
