"use client";

import {SubmitHandler} from 'react-hook-form';
import {IFormProps} from '@repo/ui/form/models/form.interface';
import {FormGroup} from '../scenes/formGroup';
import {validationGroup} from '../schemas/group.schema';
import {IGroupCreateRequest} from '../models/group.interface';

const FormBase = ({initialValues, onSubmit, validationSchema}: IFormProps<any>) => {
  return <FormGroup initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema} />;
};

interface RegisterGroupProps {
  initialValues?: Partial<IGroupCreateRequest>;
  onSubmit?: SubmitHandler<IGroupCreateRequest>;
}

export const RegisterGroup = ({initialValues, onSubmit}: RegisterGroupProps = {}) => {
  const defaultValues: IGroupCreateRequest = {
    name: '',
    grade_id: '',
    tutor: '',
    shift: '',
    classroom: '',
    max_students: '',
    start_date: '',
    notes: '',
  };

  const mergedValues: IGroupCreateRequest = {
    ...defaultValues,
    ...initialValues,
  };

  const handleSubmit: SubmitHandler<IGroupCreateRequest> = async values => {
    if (onSubmit) {
      await onSubmit(values);
      return;
    }

    console.log('group payload', values);
  };

  return (
    <FormBase
      initialValues={mergedValues}
      onSubmit={handleSubmit}
      validationSchema={validationGroup()}
    />
  );
};
