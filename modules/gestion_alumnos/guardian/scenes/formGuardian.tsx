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

export const FormGuardian = ({initialValues, validationSchema, onSubmit}: IFormProps<any>) => {
  const intl = useTranslations('GestionAlumnos');
  type GuardianInputs = z.infer<typeof validationSchema>;

  const {
    register,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm<GuardianInputs>({
    resolver: zodResolver(validationSchema),
    defaultValues: initialValues,
  });

  const documentTypeOptions = [
    {id: 'cc', value: 'cc', label: intl('options.document.cc')},
    {id: 'ti', value: 'ti', label: intl('options.document.ti')},
    {id: 'ce', value: 'ce', label: intl('options.document.ce')},
  ];

  const relationshipOptions = [
    {id: 'mother', value: 'mother', label: intl('options.relationship.mother')},
    {id: 'father', value: 'father', label: intl('options.relationship.father')},
    {id: 'grandparent', value: 'grandparent', label: intl('options.relationship.grandparent')},
    {id: 'tutor', value: 'tutor', label: intl('options.relationship.tutor')},
    {id: 'other', value: 'other', label: intl('options.relationship.other')},
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
      <div className='grid grid-cols-12 gap-4'>
        <FormField
          id='first_name'
          label={intl('guardianFields.first_name')}
          className='col-span-12 lg:col-span-6'
          error={errors.first_name?.message}
          {...register('first_name')}
        />
        <FormField
          id='second_name'
          label={intl('guardianFields.second_name')}
          className='col-span-12 lg:col-span-6'
          error={errors.second_name?.message}
          {...register('second_name')}
        />
        <FormField
          id='last_name'
          label={intl('guardianFields.last_name')}
          className='col-span-12'
          error={errors.last_name?.message}
          {...register('last_name')}
        />
        <FormSelectField
          id='document_type'
          label={intl('guardianFields.document_type')}
          className='col-span-12 lg:col-span-4'
          data={documentTypeOptions}
          error={errors.document_type?.message}
          {...register('document_type')}
        />
        <FormField
          id='document_number'
          label={intl('guardianFields.document_number')}
          className='col-span-12 lg:col-span-4'
          error={errors.document_number?.message}
          {...register('document_number')}
        />
        <FormField
          id='email'
          type='email'
          label={intl('guardianFields.email')}
          className='col-span-12 lg:col-span-4'
          error={errors.email?.message}
          {...register('email')}
        />
        <FormField
          id='phone'
          label={intl('guardianFields.phone')}
          className='col-span-12 lg:col-span-6'
          error={errors.phone?.message}
          {...register('phone')}
        />
        <FormField
          id='phone_alt'
          label={intl('guardianFields.phone_alt')}
          className='col-span-12 lg:col-span-6'
          error={errors.phone_alt?.message}
          {...register('phone_alt')}
        />
        <FormField
          id='address'
          label={intl('guardianFields.address')}
          className='col-span-12 lg:col-span-6'
          error={errors.address?.message}
          {...register('address')}
        />
        <FormField
          id='occupation'
          label={intl('guardianFields.occupation')}
          className='col-span-12 lg:col-span-6'
          error={errors.occupation?.message}
          {...register('occupation')}
        />
        <FormField
          id='company'
          label={intl('guardianFields.company')}
          className='col-span-12 lg:col-span-6'
          error={errors.company?.message}
          {...register('company')}
        />
        <FormSelectField
          id='relationship_type'
          label={intl('guardianFields.relationship_type')}
          className='col-span-12 lg:col-span-6'
          data={relationshipOptions}
          error={errors.relationship_type?.message}
          {...register('relationship_type')}
        />
        <FormTextAreaField
          id='notes'
          label={intl('guardianFields.notes')}
          className='col-span-12'
          error={errors.notes?.message}
          {...register('notes')}
        />
      </div>
      <Buttons type='submit' className='w-full' loading={isSubmitting}>
        {intl('actions.saveGuardian')}
      </Buttons>
    </form>
  );
};
