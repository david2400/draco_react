/** @format */

"use client";

import { SubmitHandler } from "react-hook-form";
import {
  IFormAddProps,
  IFormProps,
  IFormUpdateProps,
} from "@repo/ui/form/models/form.interface";
import { FormTheme } from "../scenes/formTheme";
import { validationTheme } from "../schemas/theme.schema";
import {
  ICreateTheme,
  IUpdateTheme,
} from "@/shared/domain/dto/control_academico/theme.dto";
import { useState } from "react";

const FormBase = ({
  initialValues,
  onSubmit,
  validationSchema,
}: IFormProps<any>) => {
  return (
    <FormTheme
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    />
  );
};

export const CreateTheme = ({ refresh, handleClose }: IFormAddProps = {}) => {
  const initialValues: ICreateTheme = {
    name: "",
    subject: "",
    difficulty: "basic",
    description: "",
    tags: "",
  };

  const onSubmit: SubmitHandler<ICreateTheme> = async (
    theme: ICreateTheme,
    event,
  ) => {
    console.log(theme);
    console.log(event);
    console.log(event?.target);
    try {
      console.log(event?.target.reset());
    } catch (e) {}

    // console.log(event?.target.onreset());
  };

  return (
    <FormBase
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationTheme()}
    />
  );
};

export const UpdateTheme = ({ id, refresh, handleClose }: IFormUpdateProps) => {
  const [initialValues, setInitialValues] = useState<IUpdateTheme>({
    id: id,
    name: "",
    subject: "",
    difficulty: "basic",
    description: "",
    tags: "",
  });

  const onSubmit: SubmitHandler<IUpdateTheme> = async (
    theme: IUpdateTheme,
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
      validationSchema={validationTheme()}
    />
  );
};
