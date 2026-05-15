'use client';

import {useTranslations} from 'next-intl';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';
import {FormField} from '@repo/ui/form/scenes/form-field';
import {Buttons} from '@repo/ui/buttons/scenes/index';
import {IFormProps} from '@repo/ui/form/models/form.interface';
import {FormSelectField} from '@repo/ui/form/scenes/form-select';
import {FormTextAreaField} from '@repo/ui/form/scenes/form-area';

export const FormPreinscripcion = ({initialValues, validationSchema, onSubmit}: IFormProps<any>) => {
  const intl = useTranslations('Admisiones.preinscripcion');
  const intlOptions = useTranslations('Admisiones.options');
  const intlActions = useTranslations('Admisiones.actions');
  type PreinscripcionInputs = z.infer<typeof validationSchema>;

  const {
    register,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm<PreinscripcionInputs>({
    resolver: zodResolver(validationSchema),
    defaultValues: initialValues,
  });

  const sourceOptions = [
    {id: 'web', value: 'web', label: intlOptions('source.web')},
    {id: 'referral', value: 'referral', label: intlOptions('source.referral')},
    {id: 'event', value: 'event', label: intlOptions('source.event')},
    {id: 'other', value: 'other', label: intlOptions('source.other')},
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
      <div className='grid grid-cols-12 gap-4'>
        <FormField
          id='lead_name'
          label={intl('fields.lead_name')}
          className='col-span-12 md:col-span-6'
          error={errors.lead_name?.message}
          {...register('lead_name')}
        />
        <FormField
          id='student_name'
          label={intl('fields.student_name')}
          className='col-span-12 md:col-span-6'
          error={errors.student_name?.message}
          {...register('student_name')}
        />
        <FormField
          id='contact_email'
          type='email'
          label={intl('fields.contact_email')}
          className='col-span-12 md:col-span-6'
          error={errors.contact_email?.message}
          {...register('contact_email')}
        />
        <FormField
          id='contact_phone'
          label={intl('fields.contact_phone')}
          className='col-span-12 md:col-span-6'
          error={errors.contact_phone?.message}
          {...register('contact_phone')}
        />
        <FormField
          id='prospective_grade'
          label={intl('fields.prospective_grade')}
          className='col-span-12 md:col-span-6'
          error={errors.prospective_grade?.message}
          {...register('prospective_grade')}
        />
        <FormSelectField
          id='source'
          label={intl('fields.source')}
          className='col-span-12 md:col-span-6'
          data={sourceOptions}
          error={errors.source?.message}
          {...register('source')}
        />
        <FormTextAreaField
          id='comments'
          label={intl('fields.comments')}
          className='col-span-12'
          error={errors.comments?.message}
          {...register('comments')}
        />
      </div>
      <Buttons type='submit' className='w-full' loading={isSubmitting}>
        {intlActions('savePreinscripcion')}
      </Buttons>
    </form>
  );
};
