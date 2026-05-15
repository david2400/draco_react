"use client";

import {SubmitHandler} from 'react-hook-form';
import {IFormProps} from '@repo/ui/form/models/form.interface';
import {FormGroupStudent} from '../scenes/formGroupStudent';
import {validationGroupStudent} from '../schemas/group-student.schema';
import {IGroupStudentRequest} from '../models/group-student.interface';

const FormBase = ({initialValues, onSubmit, validationSchema}: IFormProps<any>) => {
  return <FormGroupStudent initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema} />;
};

export const RegisterGroupStudent = () => {
  const initialValues: IGroupStudentRequest = {
    group_id: '',
    student_id: '',
    enrollment_date: '',
    status: 'active',
    notes: '',
  };

  const onSubmit: SubmitHandler<IGroupStudentRequest> = async values => {
    console.log('group student payload', values);
  };

  return <FormBase initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationGroupStudent()} />;
};
