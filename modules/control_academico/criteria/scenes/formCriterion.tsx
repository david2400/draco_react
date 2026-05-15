'use client';

import {useTranslations} from 'next-intl';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';
import {FormField} from '@repo/ui/form/scenes/form-field';
import {FormTextAreaField} from '@repo/ui/form/scenes/form-area';
import {Buttons} from '@repo/ui/buttons/scenes/index';
import {IFormProps} from '@repo/ui/form/models/form.interface';

export const FormCriterion = ({initialValues, validationSchema, onSubmit}: IFormProps<any>) => {
  const intl = useTranslations('ControlAcademico.criteria');
  const intlActions = useTranslations('ControlAcademico.actions');
  type CriterionInputs = z.infer<typeof validationSchema>;

  const {
    register,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm<CriterionInputs>({
    resolver: zodResolver(validationSchema),
    defaultValues: initialValues,
  });

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
          id='weight'
          label={intl('fields.weight')}
          className='col-span-12 md:col-span-6'
          error={errors.weight?.message}
          {...register('weight')}
        />
        <FormTextAreaField
          id='description'
          label={intl('fields.description')}
          className='col-span-12'
          error={errors.description?.message}
          {...register('description')}
        />
        <FormTextAreaField
          id='notes_template'
          label={intl('fields.notes_template')}
          className='col-span-12'
          error={errors.notes_template?.message}
          {...register('notes_template')}
        />
      </div>
      <Buttons type='submit' loading={isSubmitting} className='w-full'>
        {intlActions('saveCriterion')}
      </Buttons>
    </form>
  );
};
