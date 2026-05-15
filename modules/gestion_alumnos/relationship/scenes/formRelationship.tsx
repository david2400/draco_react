'use client';

import {useTranslations} from 'next-intl';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';
import {FormSelectField} from '@repo/ui/form/scenes/form-select';
import {FormTextAreaField} from '@repo/ui/form/scenes/form-area';
import {Buttons} from '@repo/ui/buttons/scenes/index';
import {IFormProps} from '@repo/ui/form/models/form.interface';
import {FormField} from '@repo/ui/form/scenes/form-field';
import {ISelectOption} from '@repo/ui/form/models';

export const FormRelationship = ({
  initialValues,
  validationSchema,
  onSubmit,
  studentOptions,
  guardianOptions,
}: IFormProps<any> & {studentOptions?: ISelectOption[]; guardianOptions?: ISelectOption[]}) => {
  const intl = useTranslations('GestionAlumnos');
  type RelationshipInputs = z.infer<typeof validationSchema>;

  const {
    register,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm<RelationshipInputs>({
    resolver: zodResolver(validationSchema),
    defaultValues: initialValues,
  });

  const relationshipOptions = [
    {id: 'mother', value: 'mother', label: intl('options.relationship.mother')},
    {id: 'father', value: 'father', label: intl('options.relationship.father')},
    {id: 'grandparent', value: 'grandparent', label: intl('options.relationship.grandparent')},
    {id: 'tutor', value: 'tutor', label: intl('options.relationship.tutor')},
    {id: 'other', value: 'other', label: intl('options.relationship.other')},
  ];

  const priorityOptions = [
    {id: 'primary', value: 'primary', label: intl('options.priority.primary')},
    {id: 'secondary', value: 'secondary', label: intl('options.priority.secondary')},
    {id: 'occasional', value: 'occasional', label: intl('options.priority.occasional')},
  ];

  const custodyOptions = [
    {id: 'shared', value: 'shared', label: intl('options.custody.shared')},
    {id: 'exclusive', value: 'exclusive', label: intl('options.custody.exclusive')},
    {id: 'temporary', value: 'temporary', label: intl('options.custody.temporary')},
  ];

  const hasStudentOptions = Boolean(studentOptions && studentOptions.length > 0);
  const hasGuardianOptions = Boolean(guardianOptions && guardianOptions.length > 0);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
      <div className='grid grid-cols-12 gap-4'>
        {hasStudentOptions ? (
          <FormSelectField
            id='student_id'
            label={intl('relationshipFields.student_id')}
            className='col-span-12 lg:col-span-6'
            data={studentOptions!}
            error={errors.student_id?.message}
            {...register('student_id')}
          />
        ) : (
          <FormField
            id='student_id'
            label={intl('relationshipFields.student_id')}
            className='col-span-12 lg:col-span-6'
            error={errors.student_id?.message}
            {...register('student_id')}
          />
        )}

        {hasGuardianOptions ? (
          <FormSelectField
            id='guardian_id'
            label={intl('relationshipFields.guardian_id')}
            className='col-span-12 lg:col-span-6'
            data={guardianOptions!}
            error={errors.guardian_id?.message}
            {...register('guardian_id')}
          />
        ) : (
          <FormField
            id='guardian_id'
            label={intl('relationshipFields.guardian_id')}
            className='col-span-12 lg:col-span-6'
            error={errors.guardian_id?.message}
            {...register('guardian_id')}
          />
        )}
        <FormSelectField
          id='relationship_type'
          label={intl('relationshipFields.relationship_type')}
          className='col-span-12 lg:col-span-4'
          data={relationshipOptions}
          error={errors.relationship_type?.message}
          {...register('relationship_type')}
        />
        <FormSelectField
          id='priority'
          label={intl('relationshipFields.priority')}
          className='col-span-12 lg:col-span-4'
          data={priorityOptions}
          error={errors.priority?.message}
          {...register('priority')}
        />
        <FormSelectField
          id='custody_level'
          label={intl('relationshipFields.custody_level')}
          className='col-span-12 lg:col-span-4'
          data={custodyOptions}
          error={errors.custody_level?.message}
          {...register('custody_level')}
        />
        <FormField
          id='start_date'
          type='date'
          label={intl('relationshipFields.start_date')}
          className='col-span-12 lg:col-span-4'
          error={errors.start_date?.message}
          {...register('start_date')}
        />
        <FormTextAreaField
          id='notes'
          label={intl('relationshipFields.notes')}
          className='col-span-12'
          error={errors.notes?.message}
          {...register('notes')}
        />
      </div>
      <Buttons type='submit' className='w-full' loading={isSubmitting}>
        {intl('actions.saveRelationship')}
      </Buttons>
    </form>
  );
};
