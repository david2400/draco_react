'use client';

import {useTranslations} from 'next-intl';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';
import {FormField} from '@repo/ui/form/scenes/form-field';
import {FormSelectField} from '@repo/ui/form/scenes/form-select';
import {FormTextAreaField} from '@repo/ui/form/scenes/form-area';
import {Buttons} from '@repo/ui/buttons/scenes/index';
import {IFormProps} from '@repo/ui/form/models/form.interface';

export const FormGrade = ({initialValues, validationSchema, onSubmit}: IFormProps<any>) => {
  const intl = useTranslations('EstructuraInstitucion.grade');
  const intlOptions = useTranslations('EstructuraInstitucion.options');
  const intlActions = useTranslations('EstructuraInstitucion.actions');
  type GradeInputs = z.infer<typeof validationSchema>;

  const {
    register,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm<GradeInputs>({
    resolver: zodResolver(validationSchema),
    defaultValues: initialValues,
  });

  const educationLevels = [
    {id: 'preschool', value: 'preschool', label: intlOptions('education_level.preschool')},
    {id: 'elementary', value: 'elementary', label: intlOptions('education_level.elementary')},
    {id: 'middle', value: 'middle', label: intlOptions('education_level.middle')},
    {id: 'high', value: 'high', label: intlOptions('education_level.high')},
  ];

  const modalities = [
    {id: 'onsite', value: 'onsite', label: intlOptions('modality.onsite')},
    {id: 'virtual', value: 'virtual', label: intlOptions('modality.virtual')},
    {id: 'hybrid', value: 'hybrid', label: intlOptions('modality.hybrid')},
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
          id='code'
          label={intl('fields.code')}
          className='col-span-12 md:col-span-6'
          error={errors.code?.message}
          {...register('code')}
        />
        <FormSelectField
          id='education_level'
          label={intl('fields.education_level')}
          className='col-span-12 md:col-span-6'
          data={educationLevels}
          error={errors.education_level?.message}
          {...register('education_level')}
        />
        <FormField
          id='coordinator'
          label={intl('fields.coordinator')}
          className='col-span-12 md:col-span-6'
          error={errors.coordinator?.message}
          {...register('coordinator')}
        />
        <FormSelectField
          id='modality'
          label={intl('fields.modality')}
          className='col-span-12 md:col-span-6'
          data={modalities}
          error={errors.modality?.message}
          {...register('modality')}
        />
        <FormField
          id='capacity'
          label={intl('fields.capacity')}
          className='col-span-12 md:col-span-6'
          error={errors.capacity?.message}
          {...register('capacity')}
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
        {intlActions('saveGrade')}
      </Buttons>
    </form>
  );
};
