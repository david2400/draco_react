"use client";

import {SubmitHandler} from 'react-hook-form';
import {IFormProps} from '@repo/ui/form/models/form.interface';
import {FormStudent} from '../scenes/formStudent';
import {validationStudent} from '../schemas/student.schema';
import {IStudentCreateRequest} from '../models/student.interface';

const FormBase = ({initialValues, onSubmit, validationSchema}: IFormProps<any>) => {
  return (
    <FormStudent initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema} />
  );
};

export const RegisterStudent = (props?: {onCreated?: (studentId: string) => void | Promise<void>}) => {
  const initialValues: IStudentCreateRequest = {
    first_name: '',
    second_name: '',
    first_last_name: '',
    second_last_name: '',
    document_type: '',
    document_number: '',
    blood_type: '',
    eps: '',
    birth_date: '',
    gender: '',
    grade: '',
    email: '',
    phone: '',
    address: '',
    neighborhood: '',
    notes: '',
  };

  const onSubmit: SubmitHandler<IStudentCreateRequest> = async values => {
    console.log('student payload', values);
    const studentId = `student-${Date.now()}`;
    if (props?.onCreated) {
      await props.onCreated(studentId);
    }
  };

  return <FormBase initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationStudent()} />;
};
