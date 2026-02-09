"use client";

import {SubmitHandler} from 'react-hook-form';
import {IFormProps} from '@repo/ui/form/models/form.interface';
import {FormGuardian} from '../scenes/formGuardian';
import {validationGuardian} from '../schemas/guardian.schema';
import {IGuardianCreateRequest} from '../models/guardian.interface';

const FormBase = ({initialValues, onSubmit, validationSchema}: IFormProps<any>) => {
  return (
    <FormGuardian initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema} />
  );
};

export const RegisterGuardian = (props?: {onCreated?: (guardianId: string) => void | Promise<void>}) => {
  const initialValues: IGuardianCreateRequest = {
    first_name: '',
    second_name: '',
    last_name: '',
    document_type: '',
    document_number: '',
    email: '',
    phone: '',
    phone_alt: '',
    address: '',
    occupation: '',
    company: '',
    relationship_type: '',
    notes: '',
  };

  const onSubmit: SubmitHandler<IGuardianCreateRequest> = async values => {
    console.log('guardian payload', values);
    const guardianId = `guardian-${Date.now()}`;
    if (props?.onCreated) {
      await props.onCreated(guardianId);
    }
  };

  return <FormBase initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationGuardian()} />;
};
