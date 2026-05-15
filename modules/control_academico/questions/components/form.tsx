"use client";

import { SubmitHandler } from "react-hook-form";
import { useMemo, useState } from "react";
import {
  IFormAddProps,
  IFormProps,
  IFormUpdateProps,
} from "@repo/ui/form/models/form.interface";
import { FormQuestion } from "../scenes/formQuestion";
import { validationQuestion } from "../schemas/question.schema";
import {
  ICreateQuestion,
  IUpdateQuestion,
} from "@/shared/domain/dto/control_academico/question.dto";

const FormBase = ({
  initialValues,
  onSubmit,
  validationSchema,
}: IFormProps<any>) => (
  <FormQuestion
    initialValues={initialValues}
    onSubmit={onSubmit}
    validationSchema={validationSchema}
  />
);

export const CreateQuestion = ({ refresh, handleClose }: IFormAddProps) => {
  const initialValues: ICreateQuestion = {
    question_text: "",
    question_type: "multiple_choice_single",
    options: "",
    correct_answer: "",
    max_score: "1",
    theme_id: "",
    difficulty: "intro",
  };

  const onSubmit: SubmitHandler<ICreateQuestion> = async (values, event) => {
    console.log(values);
    console.log(event);
  };

  return (
    <FormBase
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationQuestion()}
    />
  );
};

export const UpdateQuestion = ({ id }: IFormUpdateProps) => {
  const [initialValues, setInitialValues] = useState<IUpdateQuestion>({
    id: id,
    question_text: "",
    question_type: "multiple_choice_single",
    max_score: "",
    theme_id: "",
    difficulty: "",
  });

  const onSubmit: SubmitHandler<IUpdateQuestion> = async (
    formValues,
    event,
  ) => {
    console.log(formValues);
    console.log(event);
  };

  return (
    <FormBase
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationQuestion()}
    />
  );
};
