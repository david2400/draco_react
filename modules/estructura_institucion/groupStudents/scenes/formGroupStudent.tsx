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

export const FormGroupStudent = ({initialValues, validationSchema, onSubmit}: IFormProps<any>) => {
  const intl = useTranslations('EstructuraInstitucion.groupStudent');
  const intlOptions = useTranslations('EstructuraInstitucion.options');
  const intlActions = useTranslations('EstructuraInstitucion.actions');
  type GroupStudentInputs = z.infer<typeof validationSchema>;

  const {
    register,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm<GroupStudentInputs>({
    resolver: zodResolver(validationSchema),
    defaultValues: initialValues,
  });

  const statusOptions = [
    {id: 'active', value: 'active', label: intlOptions('status.active')},
    {id: 'suspended', value: 'suspended', label: intlOptions('status.suspended')},
    {id: 'graduated', value: 'graduated', label: intlOptions('status.graduated')},
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
      <div className='grid grid-cols-12 gap-4'>
        <FormField
          id='group_id'
          label={intl('fields.group_id')}
          className='col-span-12 md:col-span-6'
          error={errors.group_id?.message}
          {...register('group_id')}
        />
        <FormField
          id='student_id'
          label={intl('fields.student_id')}
          className='col-span-12 md:col-span-6'
          error={errors.student_id?.message}
          {...register('student_id')}
        />
        <FormField
          id='enrollment_date'
          type='date'
          label={intl('fields.enrollment_date')}
          className='col-span-12 md:col-span-6'
          error={errors.enrollment_date?.message}
          {...register('enrollment_date')}
        />
        <FormSelectField
          id='status'
          label={intl('fields.status')}
          className='col-span-12 md:col-span-6'
          data={statusOptions}
          error={errors.status?.message}
          {...register('status')}
        />
        <FormTextAreaField
          id='notes'
          label={intl('fields.notes')}
          className='col-span-12'
          error={errors.notes?.message}
          {...register('notes')}
        />
      </div>
      <Buttons type='submit' loading={isSubmitting} className='w-full'>
        {intlActions('saveGroupStudent')}
      </Buttons>
    </form>
  );
};
