"use client";

import {SubmitHandler} from 'react-hook-form';
import {IFormProps} from '@repo/ui/form/models/form.interface';
import {FormRelationship} from '../scenes/formRelationship';
import {validationRelationship} from '../schemas/relationship.schema';
import {IStudentGuardianLinkRequest} from '../models/relationship.interface';
import {ISelectOption} from '@repo/ui/form/models';

const FormBase = ({initialValues, onSubmit, validationSchema, studentOptions, guardianOptions}: IFormProps<any> & {
  studentOptions?: ISelectOption[];
  guardianOptions?: ISelectOption[];
}) => {
  return (
    <FormRelationship
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      studentOptions={studentOptions}
      guardianOptions={guardianOptions}
    />
  );
};

export const RegisterFamilyLink = (props?: {
  defaultStudentId?: string;
  defaultGuardianId?: string;
  onSubmitOverride?: SubmitHandler<IStudentGuardianLinkRequest>;
  studentOptions?: ISelectOption[];
  guardianOptions?: ISelectOption[];
}) => {
  const initialValues: IStudentGuardianLinkRequest = {
    student_id: props?.defaultStudentId ?? '',
    guardian_id: props?.defaultGuardianId ?? '',
    relationship_type: '',
    priority: '',
    custody_level: '',
    start_date: '',
    notes: '',
  };

  const onSubmit: SubmitHandler<IStudentGuardianLinkRequest> = async values => {
    if (props?.onSubmitOverride) {
      return props.onSubmitOverride(values);
    }
    console.log('relationship payload', values);
  };

  return (
    <FormBase
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationRelationship()}
      studentOptions={props?.studentOptions}
      guardianOptions={props?.guardianOptions}
    />
  );
};
