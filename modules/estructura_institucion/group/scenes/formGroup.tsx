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

export const FormGroup = ({initialValues, validationSchema, onSubmit}: IFormProps<any>) => {
  const intl = useTranslations('EstructuraInstitucion.group');
  const intlOptions = useTranslations('EstructuraInstitucion.options');
  const intlActions = useTranslations('EstructuraInstitucion.actions');
  type GroupInputs = z.infer<typeof validationSchema>;

  const {
    register,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm<GroupInputs>({
    resolver: zodResolver(validationSchema),
    defaultValues: initialValues,
  });

  const shiftOptions = [
    {id: 'morning', value: 'morning', label: intlOptions('shift.morning')},
    {id: 'afternoon', value: 'afternoon', label: intlOptions('shift.afternoon')},
    {id: 'evening', value: 'evening', label: intlOptions('shift.evening')},
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
          id='grade_id'
          label={intl('fields.grade_id')}
          className='col-span-12 md:col-span-6'
          error={errors.grade_id?.message}
          {...register('grade_id')}
        />
        <FormField
          id='tutor'
          label={intl('fields.tutor')}
          className='col-span-12 md:col-span-6'
          error={errors.tutor?.message}
          {...register('tutor')}
        />
        <FormSelectField
          id='shift'
          label={intl('fields.shift')}
          className='col-span-12 md:col-span-6'
          data={shiftOptions}
          error={errors.shift?.message}
          {...register('shift')}
        />
        <FormField
          id='classroom'
          label={intl('fields.classroom')}
          className='col-span-12 md:col-span-6'
          error={errors.classroom?.message}
          {...register('classroom')}
        />
        <FormField
          id='max_students'
          label={intl('fields.max_students')}
          className='col-span-12 md:col-span-6'
          error={errors.max_students?.message}
          {...register('max_students')}
        />
        <FormField
          id='start_date'
          type='date'
          label={intl('fields.start_date')}
          className='col-span-12 md:col-span-6'
          error={errors.start_date?.message}
          {...register('start_date')}
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
        {intlActions('saveGroup')}
      </Buttons>
    </form>
  );
};
