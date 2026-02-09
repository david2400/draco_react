'use client';

import {useTranslations} from 'next-intl';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';
import {FormField} from '@repo/ui/form/scenes/form-field';
import {FormTextAreaField} from '@repo/ui/form/scenes/form-area';
import {FormSelectField} from '@repo/ui/form/scenes/form-select';
import {Buttons} from '@repo/ui/buttons/scenes/index';
import {IFormProps} from '@repo/ui/form/models/form.interface';

export const FormStudent = ({initialValues, validationSchema, onSubmit}: IFormProps<any>) => {
  const intl = useTranslations('GestionAlumnos');
  type StudentInputs = z.infer<typeof validationSchema>;

  const {
    register,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm<StudentInputs>({
    resolver: zodResolver(validationSchema),
    defaultValues: initialValues,
  });

  const documentTypeOptions = [
    {id: 'cc', value: 'cc', label: intl('options.document.cc')},
    {id: 'ti', value: 'ti', label: intl('options.document.ti')},
    {id: 'ce', value: 'ce', label: intl('options.document.ce')},
  ];

  const genderOptions = [
    {id: 'female', value: 'female', label: intl('options.gender.female')},
    {id: 'male', value: 'male', label: intl('options.gender.male')},
    {id: 'nonBinary', value: 'nonBinary', label: intl('options.gender.nonBinary')},
  ];

  const gradeOptions = [
    {id: 'k', value: 'k', label: intl('options.grade.kinder')},
    {id: '1', value: '1', label: intl('options.grade.first')},
    {id: '2', value: '2', label: intl('options.grade.second')},
    {id: '3', value: '3', label: intl('options.grade.third')},
  ];

  const bloodTypeOptions = [
    {id: 'a+', value: 'A+', label: 'A+'},
    {id: 'a-', value: 'A-', label: 'A-'},
    {id: 'b+', value: 'B+', label: 'B+'},
    {id: 'o+', value: 'O+', label: 'O+'},
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
      <div className='grid grid-cols-12 gap-4'>
        <FormField
          id='first_name'
          label={intl('fields.first_name')}
          className='col-span-12 lg:col-span-6'
          error={errors.first_name?.message}
          {...register('first_name')}
        />
        <FormField
          id='second_name'
          label={intl('fields.second_name')}
          className='col-span-12 lg:col-span-6'
          error={errors.second_name?.message}
          {...register('second_name')}
        />
        <FormField
          id='first_last_name'
          label={intl('fields.first_last_name')}
          className='col-span-12 lg:col-span-6'
          error={errors.first_last_name?.message}
          {...register('first_last_name')}
        />
        <FormField
          id='second_last_name'
          label={intl('fields.second_last_name')}
          className='col-span-12 lg:col-span-6'
          error={errors.second_last_name?.message}
          {...register('second_last_name')}
        />
        <FormSelectField
          id='document_type'
          label={intl('fields.document_type')}
          className='col-span-12 lg:col-span-4'
          data={documentTypeOptions}
          error={errors.document_type?.message}
          {...register('document_type')}
        />
        <FormField
          id='document_number'
          label={intl('fields.document_number')}
          className='col-span-12 lg:col-span-4'
          error={errors.document_number?.message}
          {...register('document_number')}
        />
        <FormField
          id='birth_date'
          type='date'
          label={intl('fields.birth_date')}
          className='col-span-12 lg:col-span-4'
          error={errors.birth_date?.message}
          {...register('birth_date')}
        />
        <FormSelectField
          id='gender'
          label={intl('fields.gender')}
          className='col-span-12 lg:col-span-4'
          data={genderOptions}
          error={errors.gender?.message}
          {...register('gender')}
        />
        <FormSelectField
          id='grade'
          label={intl('fields.grade')}
          className='col-span-12 lg:col-span-4'
          data={gradeOptions}
          error={errors.grade?.message}
          {...register('grade')}
        />
        <FormSelectField
          id='blood_type'
          label={intl('fields.blood_type')}
          className='col-span-12 lg:col-span-4'
          data={bloodTypeOptions}
          error={errors.blood_type?.message}
          {...register('blood_type')}
        />
        <FormField
          id='eps'
          label={intl('fields.eps')}
          className='col-span-12 lg:col-span-6'
          error={errors.eps?.message}
          {...register('eps')}
        />
        <FormField
          id='email'
          type='email'
          label={intl('fields.email')}
          className='col-span-12 lg:col-span-6'
          error={errors.email?.message}
          {...register('email')}
        />
        <FormField
          id='phone'
          label={intl('fields.phone')}
          className='col-span-12 lg:col-span-6'
          error={errors.phone?.message}
          {...register('phone')}
        />
        <FormField
          id='address'
          label={intl('fields.address')}
          className='col-span-12 lg:col-span-6'
          error={errors.address?.message}
          {...register('address')}
        />
        <FormField
          id='neighborhood'
          label={intl('fields.neighborhood')}
          className='col-span-12 lg:col-span-6'
          error={errors.neighborhood?.message}
          {...register('neighborhood')}
        />
        <FormTextAreaField
          id='notes'
          label={intl('fields.notes')}
          className='col-span-12'
          error={errors.notes?.message}
          {...register('notes')}
        />
      </div>
      <Buttons type='submit' className='w-full' loading={isSubmitting}>
        {intl('actions.saveStudent')}
      </Buttons>
    </form>
  );
};
