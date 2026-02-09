'use client';

import {useTranslations} from 'next-intl';
import React from 'react';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';
import {FormField} from '@repo/ui/form/scenes/form-field';
import {FormSelectField} from '@repo/ui/form/scenes/form-select';
import {FormTextAreaField} from '@repo/ui/form/scenes/form-area';
import {Input} from '@repo/ui/inputs/scenes/input';
import {Buttons} from '@repo/ui/buttons/scenes/index';
import {IFormProps} from '@repo/ui/form/models/form.interface';

export const FormQuestion = ({initialValues, validationSchema, onSubmit}: IFormProps<any>) => {
  const intl = useTranslations('ControlAcademico.questions');
  const intlOptions = useTranslations('ControlAcademico.options');
  const intlActions = useTranslations('ControlAcademico.actions');
  type QuestionInputs = z.infer<typeof validationSchema>;

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: {errors, isSubmitting},
  } = useForm<QuestionInputs>({
    resolver: zodResolver(validationSchema),
    defaultValues: initialValues,
  });

  const selectedType = watch('question_type');
  const correctAnswerValue = watch('correct_answer');

  const shouldShowOptions = selectedType !== 'open';

  const normalizeOptions = (value: unknown) => {
    if (typeof value !== 'string') return '';
    return value.trim();
  };

  type OptionItem = {id: string; value: string};

  const parseOptionsToItems = React.useCallback((value: unknown): OptionItem[] => {
    const normalized = normalizeOptions(value);
    if (!normalized.length) return [];

    return normalized
      .split(/\r?\n/)
      .map(line => line.trim())
      .filter(Boolean)
      .map((line, index) => ({id: `opt-${index}-${line.length}`, value: line}));
  }, []);

  const [optionItems, setOptionItems] = React.useState<OptionItem[]>(() => parseOptionsToItems(initialValues?.options));

  React.useEffect(() => {
    setOptionItems(parseOptionsToItems(getValues('options')));
  }, [getValues, parseOptionsToItems]);

  const syncOptionsToForm = React.useCallback(
    (nextItems: OptionItem[]) => {
      const payload = nextItems
        .map(item => item.value.trim())
        .filter(Boolean)
        .join('\n');

      setValue('options', payload as any, {shouldDirty: true});
    },
    [setValue]
  );

  const addOption = React.useCallback(() => {
    setOptionItems(prev => {
      const next = [...prev, {id: `opt-${Date.now()}`, value: ''}];
      syncOptionsToForm(next);
      return next;
    });
  }, [syncOptionsToForm]);

  const updateOption = React.useCallback(
    (id: string, value: string) => {
      setOptionItems(prev => {
        const next = prev.map(item => (item.id === id ? {...item, value} : item));
        syncOptionsToForm(next);
        return next;
      });
    },
    [syncOptionsToForm]
  );

  const removeOption = React.useCallback(
    (id: string) => {
      setOptionItems(prev => {
        const next = prev.filter(item => item.id !== id);
        syncOptionsToForm(next);
        return next;
      });
    },
    [syncOptionsToForm]
  );

  React.useEffect(() => {
    if (selectedType !== 'true_false') return;
    const currentOptions = normalizeOptions(getValues('options'));
    if (currentOptions.length) return;
    setValue('options', 'Verdadero\nFalso' as any, {shouldDirty: true});
  }, [getValues, selectedType, setValue]);

  React.useEffect(() => {
    if (!shouldShowOptions) return;
    setOptionItems(parseOptionsToItems(getValues('options')));
  }, [getValues, parseOptionsToItems, selectedType, shouldShowOptions]);

  const questionTypes = [
    {id: 'multiple_choice', value: 'multiple_choice', label: intlOptions('question_type.multiple_choice')},
    {id: 'true_false', value: 'true_false', label: intlOptions('question_type.true_false')},
    {id: 'open', value: 'open', label: intlOptions('question_type.open')},
  ];

  const difficultyOptions = [
    {id: 'intro', value: 'intro', label: intlOptions('difficulty.intro')},
    {id: 'basic', value: 'basic', label: intlOptions('difficulty.basic')},
    {id: 'intermediate', value: 'intermediate', label: intlOptions('difficulty.intermediate')},
    {id: 'advanced', value: 'advanced', label: intlOptions('difficulty.advanced')},
  ];

  const fields = [
    {
      key: 'section_main',
      render: () => (
        <div className='col-span-12 rounded-2xl border border-border/60 bg-muted/10 px-4 py-3'>
          <p className='text-sm font-semibold text-foreground'>{intl('title')}</p>
          <p className='text-xs text-muted-foreground'>{intl('description')}</p>
        </div>
      ),
    },
    {
      key: 'question_text',
      render: () => (
        <FormTextAreaField
          id='question_text'
          label={intl('fields.question_text')}
          className='col-span-12'
          error={errors.question_text?.message}
          {...register('question_text')}
        />
      ),
    },
    {
      key: 'question_type',
      render: () => (
        <FormSelectField
          id='question_type'
          label={intl('fields.question_type')}
          className='col-span-12 md:col-span-6'
          data={questionTypes}
          error={errors.question_type?.message}
          {...register('question_type')}
        />
      ),
    },
    {
      key: 'difficulty',
      render: () => (
        <FormSelectField
          id='difficulty'
          label={intl('fields.difficulty')}
          className='col-span-12 md:col-span-6'
          data={difficultyOptions}
          error={errors.difficulty?.message}
          {...register('difficulty')}
        />
      ),
    },
    {
      key: 'max_score',
      render: () => (
        <FormField
          id='max_score'
          label={intl('fields.max_score')}
          className='col-span-12 md:col-span-6'
          error={errors.max_score?.message}
          {...register('max_score')}
        />
      ),
    },
    {
      key: 'theme_id',
      render: () => (
        <FormField
          id='theme_id'
          label={intl('fields.theme_id')}
          className='col-span-12 md:col-span-6'
          error={errors.theme_id?.message}
          {...register('theme_id')}
        />
      ),
    },
    {
      key: 'section_answer',
      render: () => (
        <div className='col-span-12 rounded-2xl border border-border/60 bg-muted/10 px-4 py-3'>
          <p className='text-sm font-semibold text-foreground'>Respuesta</p>
          <p className='text-xs text-muted-foreground'>Define opciones y/o respuesta esperada según el tipo de pregunta.</p>
        </div>
      ),
    },
    {
      key: 'options',
      showWhen: () => shouldShowOptions,
      render: () => (
        <div className='col-span-12 space-y-3'>
          <div className='flex items-end justify-between gap-3'>
            <div className='min-w-0'>
              <p className='text-sm font-semibold text-foreground'>{intl('fields.options')}</p>
              <p className='text-xs text-muted-foreground'>Agrega y ordena opciones. Una opción por fila.</p>
            </div>
            <Buttons type='button' size='sm' onClick={addOption}>
              Añadir opción
            </Buttons>
          </div>

          <div className='space-y-2'>
            {optionItems.length ? (
              optionItems.map((opt, index) => (
                <div key={opt.id} className='flex flex-col gap-2 rounded-2xl border border-border/60 bg-background px-4 py-3'>
                  <div className='flex items-center justify-between gap-3'>
                    <p className='text-xs font-semibold uppercase tracking-wide text-muted-foreground'>
                      Opción {index + 1}
                    </p>
                    <Buttons type='button' size='sm' variant='ghost' onClick={() => removeOption(opt.id)}>
                      Quitar
                    </Buttons>
                  </div>

                  <Input
                    value={opt.value}
                    onChange={(e) => updateOption(opt.id, e.target.value)}
                    placeholder='Escribe la opción...'
                  />

                  {selectedType !== 'open' ? (
                    <label className='flex items-center gap-2 text-xs text-muted-foreground'>
                      <input
                        type='radio'
                        name='correct_answer_radio'
                        checked={Boolean(opt.value.trim()) && correctAnswerValue === opt.value}
                        disabled={!opt.value.trim()}
                        onChange={() => setValue('correct_answer', opt.value as any, {shouldDirty: true})}
                      />
                      Marcar como correcta
                    </label>
                  ) : null}
                </div>
              ))
            ) : (
              <div className='rounded-2xl border border-dashed border-border/70 px-4 py-8 text-center text-sm text-muted-foreground'>
                Aún no has agregado opciones.
              </div>
            )}
          </div>

          <input type='hidden' {...register('options')} />
        </div>
      ),
    },
    {
      key: 'correct_answer',
      showWhen: () => selectedType !== 'open',
      render: () => (
        <FormField
          id='correct_answer'
          label={intl('fields.correct_answer')}
          className='col-span-12'
          error={errors.correct_answer?.message}
          {...register('correct_answer')}
        />
      ),
    },
  ] as const;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
      <div className='grid grid-cols-12 gap-4'>
        {fields
          .filter((field) => (field as any).showWhen?.() ?? true)
          .map((field) => (
            <div key={field.key} className='contents'>
              {field.render()}
            </div>
          ))}
      </div>
      <Buttons type='submit' loading={isSubmitting} className='w-full'>
        {intlActions('saveQuestion')}
      </Buttons>
    </form>
  );
};
