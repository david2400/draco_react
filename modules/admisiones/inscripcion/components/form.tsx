'use client';

import {SubmitHandler} from 'react-hook-form';
import {IFormProps} from '@repo/ui/form/models/form.interface';
import {FormInscripcion} from '../scenes/formInscripcion';
import {validationInscripcion} from '../schemas/inscripcion.schema';
import {IInscripcionCreateRequest} from '../models/inscripcion.interface';

const FormBase = ({initialValues, onSubmit, validationSchema}: IFormProps<any>) => (
  <FormInscripcion initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema} />
);

export const RegisterInscripcion = () => {
  const initialValues: IInscripcionCreateRequest = {
    applicant_id: '',
    previous_school: '',
    academic_average: '',
    payment_receipt: '',
    application_status: '',
    observations: '',
  };

  const onSubmit: SubmitHandler<IInscripcionCreateRequest> = async values => {
    console.log('inscripcion payload', values);
  };

  return <FormBase initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationInscripcion()} />;
};
