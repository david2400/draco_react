/** @format */

"use client";

import { SubmitHandler } from "react-hook-form";
import { IFormProps } from "@repo/ui/form/models/form.interface";
import { FormClassroom } from "../scenes/formClassroom";
import { validationClassroom } from "../schemas/classroom.schema";
import { IClassroomCreateRequest } from "../models/classroom.interface";

const FormBase = ({
  initialValues,
  onSubmit,
  validationSchema,
}: IFormProps<any>) => {
  return (
    <FormClassroom
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    />
  );
};

interface ClassroomFormProps {
  initialValues?: Partial<IClassroomCreateRequest>;
  onSubmit?: SubmitHandler<IClassroomCreateRequest>;
}

const defaultValues: IClassroomCreateRequest = {
  name: "",
  code: "",
  building: "",
  floor: "",
  capacity: "",
  resources: "",
  description: "",
};

export const RegisterClassroom = ({ initialValues, onSubmit }: ClassroomFormProps = {}) => {
  const mergedValues: IClassroomCreateRequest = {
    ...defaultValues,
    ...initialValues,
  };

  const handleSubmit: SubmitHandler<IClassroomCreateRequest> = async (values) => {
    if (onSubmit) {
      await onSubmit(values);
      return;
    }

    console.log("classroom payload", values);
  };

  return (
    <FormBase
      initialValues={mergedValues}
      onSubmit={handleSubmit}
      validationSchema={validationClassroom()}
    />
  );
};

export const CreateClassroom = () => {
  return <RegisterClassroom />;
};

export const UpdateClassroom = (props?: ClassroomFormProps) => {
  return <RegisterClassroom {...props} />;
};
