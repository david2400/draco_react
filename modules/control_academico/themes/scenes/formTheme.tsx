'use client';

import {useTranslations} from 'next-intl';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';
import {FormField} from '@repo/ui/form/scenes/form-field';
import {FormSelectField} from '@repo/ui/form/scenes/form-select';
import {FormTextAreaField} from '@repo/ui/form/scenes/form-area';
import {Buttons} from '@repo/ui/buttons/scenes';
import {IFormProps} from '@repo/ui/form/models/form.interface';

export const FormTheme = ({initialValues, validationSchema, onSubmit}: IFormProps<any>) => {
  const intl = useTranslations('ControlAcademico.themes');
  const intlOptions = useTranslations('ControlAcademico.options');
  const intlActions = useTranslations('ControlAcademico.actions');
  type ThemeInputs = z.infer<typeof validationSchema>;

  const {
    register,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm<ThemeInputs>({
    resolver: zodResolver(validationSchema),
    defaultValues: initialValues,
  });

  const difficultyOptions = [
    {id: 'intro', value: 'intro', label: intlOptions('difficulty.intro')},
    {id: 'basic', value: 'basic', label: intlOptions('difficulty.basic')},
    {id: 'intermediate', value: 'intermediate', label: intlOptions('difficulty.intermediate')},
    {id: 'advanced', value: 'advanced', label: intlOptions('difficulty.advanced')},
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
      <div className='grid grid-cols-12 gap-4'>
        <FormField
          id='name'
          label={intl('fields.name')}
          className='col-span-12 md:col-span-6'
          error={errors.name?.message}
          {...register('name')}
        />
        <FormField
          id='subject'
          label={intl('fields.subject')}
          className='col-span-12 md:col-span-6'
          error={errors.subject?.message}
          {...register('subject')}
        />
        <FormSelectField
          id='difficulty'
          label={intl('fields.difficulty')}
          className='col-span-12 md:col-span-6'
          data={difficultyOptions}
          error={errors.difficulty?.message}
          {...register('difficulty')}
        />
        <div className='col-span-12 md:col-span-6 space-y-1'>
          <FormField
            id='tags'
            label={intl('fields.tags')}
            className='col-span-12'
            error={errors.tags?.message}
            {...register('tags')}
          />
          <p className='text-xs text-muted-foreground'>Ingresa etiquetas separadas por comas.</p>
        </div>
        <FormTextAreaField
          id='description'
          label={intl('fields.description')}
          className='col-span-12'
          error={errors.description?.message}
          {...register('description')}
        />
      </div>
      <Buttons type='submit' loading={isSubmitting} className='w-full'>
        {intlActions('saveTheme')}
      </Buttons>
    </form>
  );
};
