/**
 * TrueFalseEditor - Editor para preguntas de verdadero/falso
 */

'use client';

import { memo } from 'react';
import { useFormContext } from 'react-hook-form';
import type { TrueFalseQuestion } from '../../types';
import type { QuestionEditorProps } from '../../config';
import { FormField } from '@repo/ui/form/scenes/form-field';
import { FormTextAreaField } from '@repo/ui/form/scenes/form-area';
import { FormSelectField } from '@repo/ui/form/scenes/form-select';
import { getDifficultyOptions } from '../../config';
import { cn } from '@/lib/utils';

type Props = QuestionEditorProps<TrueFalseQuestion>;

function TrueFalseEditorBase({ errors }: Props) {
  const { register, watch, setValue, formState } = useFormContext<TrueFalseQuestion>();
  
  const correctAnswer = watch('correctAnswer');
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

      <div className="space-y-3">
        <label className="text-sm font-medium">Respuesta correcta</label>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => setValue('correctAnswer', true, { shouldDirty: true })}
            className={cn(
              'flex-1 rounded-lg border p-4 text-center font-medium transition-colors',
              correctAnswer === true
                ? 'border-green-500 bg-green-50 text-green-700'
                : 'hover:border-primary/50'
            )}
          >
            Verdadero
          </button>
          <button
            type="button"
            onClick={() => setValue('correctAnswer', false, { shouldDirty: true })}
            className={cn(
              'flex-1 rounded-lg border p-4 text-center font-medium transition-colors',
              correctAnswer === false
                ? 'border-green-500 bg-green-50 text-green-700'
                : 'hover:border-primary/50'
            )}
          >
            Falso
          </button>
        </div>
        {formState.errors.correctAnswer && (
          <p className="text-sm text-destructive" role="alert">
            {formState.errors.correctAnswer.message}
          </p>
        )}
      </div>
    </div>
  );
}

export default memo(TrueFalseEditorBase);
