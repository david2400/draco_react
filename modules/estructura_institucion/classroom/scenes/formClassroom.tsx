'use client';

import {useMemo} from 'react';
import {useTranslations} from 'next-intl';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';
import {FormField} from '@repo/ui/form/scenes/form-field';
import {FormTextAreaField} from '@repo/ui/form/scenes/form-area';
import {Buttons} from '@repo/ui/buttons/scenes/index';
import {IFormProps} from '@repo/ui/form/models/form.interface';

export const FormClassroom = ({initialValues, validationSchema, onSubmit}: IFormProps<any>) => {
  const intl = useTranslations('EstructuraInstitucion.classroom');
  const intlActions = useTranslations('EstructuraInstitucion.actions');
  type ClassroomInputs = z.infer<typeof validationSchema>;

  const {
    register,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm<ClassroomInputs>({
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
          id='code'
          label={intl('fields.code')}
          className='col-span-12 md:col-span-6'
          error={errors.code?.message}
          {...register('code')}
        />
        <FormField
          id='building'
          label={intl('fields.building')}
          className='col-span-12 md:col-span-6'
          error={errors.building?.message}
          {...register('building')}
        />
        <FormField
          id='floor'
          label={intl('fields.floor')}
          className='col-span-12 md:col-span-6'
          error={errors.floor?.message}
          {...register('floor')}
        />
        <FormField
          id='capacity'
          label={intl('fields.capacity')}
          className='col-span-12 md:col-span-6'
          error={errors.capacity?.message}
          {...register('capacity')}
        />
        <FormField
          id='resources'
          label={intl('fields.resources')}
          className='col-span-12 md:col-span-6'
          error={errors.resources?.message}
          {...register('resources')}
        />
        <FormTextAreaField
          id='description'
          label={intl('fields.description')}
          className='col-span-12'
          error={errors.description?.message}
          {...register('description')}
        />
      </div>

      <Buttons type='submit' loading={isSubmitting} className='w-full'>
        {intlActions('saveClassroom')}
      </Buttons>
    </form>
  );
};
