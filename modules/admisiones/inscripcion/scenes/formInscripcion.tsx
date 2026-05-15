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

export const FormInscripcion = ({initialValues, validationSchema, onSubmit}: IFormProps<any>) => {
  const intl = useTranslations('Admisiones.inscripcion');
  const intlOptions = useTranslations('Admisiones.options');
  const intlActions = useTranslations('Admisiones.actions');
  type InscripcionInputs = z.infer<typeof validationSchema>;

  const {
    register,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm<InscripcionInputs>({
    resolver: zodResolver(validationSchema),
    defaultValues: initialValues,
  });

  const statusOptions = [
    {id: 'pending', value: 'pending', label: intlOptions('application_status.pending')},
    {id: 'in_review', value: 'in_review', label: intlOptions('application_status.in_review')},
    {id: 'approved', value: 'approved', label: intlOptions('application_status.approved')},
    {id: 'rejected', value: 'rejected', label: intlOptions('application_status.rejected')},
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
      <div className='grid grid-cols-12 gap-4'>
        <FormField
          id='applicant_id'
          label={intl('fields.applicant_id')}
          className='col-span-12 md:col-span-6'
          error={errors.applicant_id?.message}
          {...register('applicant_id')}
        />
        <FormField
          id='previous_school'
          label={intl('fields.previous_school')}
          className='col-span-12 md:col-span-6'
          error={errors.previous_school?.message}
          {...register('previous_school')}
        />
        <FormField
          id='academic_average'
          label={intl('fields.academic_average')}
          className='col-span-12 md:col-span-6'
          error={errors.academic_average?.message}
          {...register('academic_average')}
        />
        <FormField
          id='payment_receipt'
          label={intl('fields.payment_receipt')}
          className='col-span-12 md:col-span-6'
          error={errors.payment_receipt?.message}
          {...register('payment_receipt')}
        />
        <FormSelectField
          id='application_status'
          label={intl('fields.application_status')}
          className='col-span-12 md:col-span-6'
          data={statusOptions}
          error={errors.application_status?.message}
          {...register('application_status')}
        />
        <FormTextAreaField
          id='observations'
          label={intl('fields.observations')}
          className='col-span-12'
          error={errors.observations?.message}
          {...register('observations')}
        />
      </div>
      <Buttons type='submit' className='w-full' loading={isSubmitting}>
        {intlActions('saveInscripcion')}
      </Buttons>
    </form>
  );
};
