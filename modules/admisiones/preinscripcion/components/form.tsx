'use client';

import {SubmitHandler} from 'react-hook-form';
import {IFormProps} from '@repo/ui/form/models/form.interface';
import {FormPreinscripcion} from '../scenes/formPreinscripcion';
import {validationPreinscripcion} from '../schemas/preinscripcion.schema';
import {IPreinscripcionCreateRequest} from '../models/preinscripcion.interface';

const FormBase = ({initialValues, onSubmit, validationSchema}: IFormProps<any>) => (
  <FormPreinscripcion initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema} />
);

export const RegisterPreinscripcion = () => {
  const initialValues: IPreinscripcionCreateRequest = {
    lead_name: '',
    student_name: '',
    contact_email: '',
    contact_phone: '',
    prospective_grade: '',
    source: '',
    comments: '',
  };

  const onSubmit: SubmitHandler<IPreinscripcionCreateRequest> = async values => {
    console.log('preinscripcion payload', values);
  };

  return <FormBase initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationPreinscripcion()} />;
};
