"use client";

import {SubmitHandler} from 'react-hook-form';
import {IFormProps} from '@repo/ui/form/models/form.interface';
import {FormGrade} from '../scenes/formGrade';
import {validationGrade} from '../schemas/grade.schema';
import {IGradeCreateRequest} from '../models/grade.interface';

const FormBase = ({initialValues, onSubmit, validationSchema}: IFormProps<any>) => {
  return <FormGrade initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema} />;
};

interface RegisterGradeProps {
  initialValues?: Partial<IGradeCreateRequest>;
  onSubmit?: SubmitHandler<IGradeCreateRequest>;
}

export const RegisterGrade = ({initialValues, onSubmit}: RegisterGradeProps = {}) => {
  const defaultValues: IGradeCreateRequest = {
    name: '',
    code: '',
    education_level: '',
    coordinator: '',
    modality: '',
    capacity: '',
    description: '',
  };

  const mergedValues: IGradeCreateRequest = {
    ...defaultValues,
    ...initialValues,
  };

  const handleSubmit: SubmitHandler<IGradeCreateRequest> = async values => {
    if (onSubmit) {
      await onSubmit(values);
      return;
    }

    console.log('grade payload', values);
  };

  return (
    <FormBase
      initialValues={mergedValues}
      onSubmit={handleSubmit}
      validationSchema={validationGrade()}
    />
  );
};
