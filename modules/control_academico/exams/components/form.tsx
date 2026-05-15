/** @format */

"use client";

import { SubmitHandler } from "react-hook-form";
import {
  IFormProps,
  IFormUpdateProps,
} from "@repo/ui/form/models/form.interface";
import { FormExam } from "../scenes/formExam";
import { validationExam } from "../schemas/exam.schema";
import {
  ICreateExams,
  IUpdateExams,
} from "@/shared/domain/dto/control_academico/exams.dto";
import { examsService } from "@/shared/services/exams.service";
import Swal from "sweetalert2";

const FormBase = ({
  initialValues,
  onSubmit,
  validationSchema,
}: IFormProps<any>) => {
  return (
    <FormExam
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    />
  );
};

interface RegisterExamProps {
  initialValues?: Partial<ICreateExams>;
  onSubmit?: SubmitHandler<ICreateExams>;
}

export const RegisterExamForm = ({
  initialValues,
  onSubmit,
}: RegisterExamProps = {}) => {
  const defaultValues: ICreateExams = {
    nombre: "",
    code: "",
    subject: "",
    grade_level: "",
    scheduled_date: "",
    duration: "",
    instructions: "",
    question_ids: [],
    criteria_ids: [],
  };

  const mergedValues: ICreateExams = {
    ...defaultValues,
    ...initialValues,
  };

  const handleSubmit: SubmitHandler<ICreateExams> = async (values) => {
    if (onSubmit) {
      await onSubmit(values);
      return;
    }

    try {
      await examsService.createExam(values);
      await Swal.fire({
        title: "Éxito",
        text: "Examen creado correctamente.",
        icon: "success",
        confirmButtonColor: "#3085d6",
      });
    } catch (error: any) {
      await Swal.fire({
        title: "Error",
        text: error?.message ?? "No se pudo crear el examen.",
        icon: "error",
        confirmButtonColor: "#3085d6",
      });
    }
  };

  return (
    <FormBase
      initialValues={mergedValues}
      onSubmit={handleSubmit}
      validationSchema={validationExam()}
    />
  );
};

export const UpdateExamForm = ({
  id,
  refresh,
  handleClose,
}: IFormUpdateProps) => {
  const defaultValues: IUpdateExams = {
    id,
    nombre: "",
    code: "",
    subject: "",
    grade_level: "",
    scheduled_date: "",
    duration: "",
    instructions: "",
    question_ids: [],
    criteria_ids: [],
  };

  const mergedValues: IUpdateExams = {
    ...defaultValues,
    // ...initialValues,
  };

  const handleSubmit: SubmitHandler<IUpdateExams> = async (values) => {
    try {
      await examsService.updateExam({ ...values, id });
      if (refresh) refresh();
      if (handleClose) handleClose({} as any);

      await Swal.fire({
        title: "Éxito",
        text: "Examen actualizado correctamente.",
        icon: "success",
        confirmButtonColor: "#3085d6",
      });
    } catch (error: any) {
      await Swal.fire({
        title: "Error",
        text: error?.message ?? "No se pudo actualizar el examen.",
        icon: "error",
        confirmButtonColor: "#3085d6",
      });
    }
  };

  return (
    <FormBase
      initialValues={mergedValues}
      onSubmit={handleSubmit}
      validationSchema={validationExam()}
    />
  );
};
