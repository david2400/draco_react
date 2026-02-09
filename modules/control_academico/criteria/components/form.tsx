/** @format */

"use client";

import { SubmitHandler } from "react-hook-form";
import {
  IFormAddProps,
  IFormProps,
  IFormUpdateProps,
} from "@repo/ui/form/models/form.interface";
import { FormCriterion } from "../scenes/formCriterion";
import { validationCriterion } from "../schemas/criterion.schema";

import { useState } from "react";
import { ICreateCriterion, IUpdateCriterion } from "@/shared/domain/dto/control_academico/criteria.dto";

const FormBase = ({
  initialValues,
  onSubmit,
  validationSchema,
}: IFormProps<any>) => {
  return (
    <FormCriterion
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    />
  );
};

export const CreateCriterion = ({}: IFormAddProps = {}) => {
  const defaultValues: ICreateCriterion = {
    name: "",
    description: "",
    weight: "",
    notes_template: "",
  };

  const onSubmit: SubmitHandler<IUpdateCriterion> = async (
    theme: IUpdateCriterion,
    event,
  ) => {
    console.log(theme);
    console.log(event);
    console.log(event?.target);

    console.log(event?.target.reset());
    // console.log(event?.target.onreset());
  };

  return (
    <FormBase
      initialValues={defaultValues}
      onSubmit={onSubmit}
      validationSchema={validationCriterion()}
    />
  );
};

export const UpdateCriterion = ({
  id,
  refresh,
  handleClose,
}: IFormUpdateProps) => {
  const [initialValues, setInitialValues] = useState<IUpdateCriterion>({
    id: id,
    name: "",
    description: "",
    weight: "",
    notes_template: "",
  });

  const onSubmit: SubmitHandler<IUpdateCriterion> = async (
    theme: IUpdateCriterion,
    event,
  ) => {
    console.log(theme);
    console.log(event);
    console.log(event?.target);

    console.log(event?.target.reset());
    // console.log(event?.target.onreset());
  };

  return (
    <FormBase
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationCriterion()}
    />
  );
};
