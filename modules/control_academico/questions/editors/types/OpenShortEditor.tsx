/**
 * OpenShortEditor - Editor para preguntas de respuesta corta
 */

'use client';

import { memo } from 'react';
import { useFormContext } from 'react-hook-form';
import type { OpenShortQuestion } from '../../types';
import type { QuestionEditorProps } from '../../config';
import { FormField } from '@repo/ui/form/scenes/form-field';
import { FormTextAreaField } from '@repo/ui/form/scenes/form-area';
import { FormSelectField } from '@repo/ui/form/scenes/form-select';
import { getDifficultyOptions } from '../../config';

type Props = QuestionEditorProps<OpenShortQuestion>;

function OpenShortEditorBase({ errors }: Props) {
  const { register, formState } = useFormContext<OpenShortQuestion>();
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

      <FormField
        id="maxLength"
        label="Longitud máxima (caracteres)"
        type="number"
        error={formState.errors.maxLength?.message}
        {...register('maxLength', { valueAsNumber: true })}
      />

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="caseSensitive"
          {...register('caseSensitive')}
          className="h-4 w-4"
        />
        <label htmlFor="caseSensitive" className="text-sm">
          Distinguir mayúsculas/minúsculas
        </label>
      </div>
    </div>
  );
}

export default memo(OpenShortEditorBase);
