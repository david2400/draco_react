/** @format */

"use client";

import React, { useCallback, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { ColumnDef } from "@tanstack/react-table";
import { Buttons } from "@repo/ui/buttons/scenes";
import { Input } from "@repo/ui/inputs/scenes/input";
import { DataTable } from "@repo/ui/table/scenes";
import {
  HiOutlineListBullet,
  HiOutlineQuestionMarkCircle,
  HiOutlineSparkles,
  HiOutlinePlusCircle,
  HiOutlineAdjustmentsHorizontal,
} from "react-icons/hi2";
import { FormQuestion } from "../scenes/formQuestion";
import { validationQuestion } from "../schemas/question.schema";
import { ICreateQuestion } from "@/shared/domain/dto/control_academico/question.dto";
import { CreateQuestion, UpdateQuestion } from "./form";
import { Modal } from "@repo/ui/modals/scenes/dialog/modal";

type QuestionDifficulty = "intro" | "basic" | "intermediate" | "advanced";
type QuestionType = "multiple_choice_single" | "true_false" | "open";

interface QuestionManagerRecord extends ICreateQuestion {
  id: number;
  updated_at: string;
  usage_count: number;
  difficulty: QuestionDifficulty;
  tags?: string[];
}

const MOCK_QUESTIONS: QuestionManagerRecord[] = [
  {
    id: 1,
    question_text: "¿Cuál es el resultado de 12 × 8?",
    question_type: "multiple_choice_single",
    options: "84\n92\n96\n108",
    correct_answer: "96",
    max_score: "2",
    theme_id: "matematicas_aritmetica",
    difficulty: "basic",
    usage_count: 14,
    updated_at: "2026-02-01",
    tags: ["aritmética", "producto"],
  },
  {
    id: 2,
    question_text: "Describe con tus palabras qué es una metáfora",
    question_type: "open_short",
    options: "",
    correct_answer: "",
    max_score: "3",
    theme_id: "lenguaje_recursos",
    difficulty: "intermediate",
    usage_count: 9,
    updated_at: "2026-01-18",
    tags: ["literatura", "figuras"],
  },
  {
    id: 3,
    question_text: "Verdadero o falso: La fotosíntesis ocurre en las hojas",
    question_type: "true_false",
    options: "Verdadero\nFalso",
    correct_answer: "Verdadero",
    max_score: "1",
    theme_id: "ciencias_biologia",
    difficulty: "intro",
    usage_count: 22,
    updated_at: "2026-02-10",
    tags: ["biología", "plantas"],
  },
  {
    id: 4,
    question_text:
      "Ordena los planetas del sistema solar según su distancia al Sol",
    question_type: "multiple_choice_single",
    options: "Mercurio-Venus-Tierra-Marte\nMarte-Tierra-Venus-Mercurio",
    correct_answer: "Mercurio-Venus-Tierra-Marte",
    max_score: "4",
    theme_id: "ciencias_astronomia",
    difficulty: "advanced",
    usage_count: 5,
    updated_at: "2026-01-27",
    tags: ["astronomía", "ordenamiento"],
  },
];

export const QuestionManager = () => {
  const t = useTranslations("ControlAcademico.questions");
  const tActions = useTranslations("ControlAcademico.actions");
  const tOptions = useTranslations("ControlAcademico.options");

  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState<"all" | QuestionType>("all");
  const [difficultyFilter, setDifficultyFilter] = useState<
    "all" | QuestionDifficulty
  >("all");
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [editingQuestion, setEditingQuestion] =
    useState<QuestionManagerRecord | null>(null);

  const filteredData = useMemo(() => {
    const normalized = searchTerm.trim().toLowerCase();

    return MOCK_QUESTIONS.filter((question) => {
      const matchesSearch = normalized.length
        ? `${question.question_text} ${question.theme_id} ${question.tags?.join(" ") ?? ""}`
            .toLowerCase()
            .includes(normalized)
        : true;
      const matchesType =
        typeFilter === "all" ? true : question.question_type === typeFilter;
      const matchesDifficulty =
        difficultyFilter === "all"
          ? true
          : question.difficulty === difficultyFilter;

      return matchesSearch && matchesType && matchesDifficulty;
    });
  }, [difficultyFilter, searchTerm, typeFilter]);

  const metrics = useMemo(() => {
    const totalQuestions = MOCK_QUESTIONS.length;
    const multipleChoice = MOCK_QUESTIONS.filter(
      (item) => item.question_type === "multiple_choice_single",
    ).length;
    const avgScore =
      MOCK_QUESTIONS.reduce(
        (acc, item) => acc + Number(item.max_score || 0),
        0,
      ) / Math.max(totalQuestions, 1);

    return {
      totalQuestions,
      multipleChoice,
      avgScore: Math.round(avgScore * 10) / 10,
    };
  }, []);

  const handleEdit = useCallback((row: QuestionManagerRecord) => {
    setEditingQuestion(row);
    setOpenEditModal(true);
  }, []);

  const handleCreateModalChange = useCallback((open: boolean) => {
    setOpenCreateModal(open);
  }, []);

  const handleEditModalChange = useCallback((open: boolean) => {
    if (!open) {
      setEditingQuestion(null);
    }
    setOpenEditModal(open);
  }, []);

  const handleCreateSubmit = useCallback(async (values: ICreateQuestion) => {
    console.log("Creating question", values);
    setOpenCreateModal(false);
  }, []);

  const handleUpdateSubmit = useCallback(async (values: ICreateQuestion) => {
    console.log("Updating question", values);
    setOpenEditModal(false);
    setEditingQuestion(null);
  }, []);

  const columns: ColumnDef<QuestionManagerRecord>[] = useMemo(
    () => [
      {
        accessorKey: "question_text",
        header: t("fields.question_text"),
        cell: (info) => (
          <div className='flex flex-col gap-1'>
            <span className='font-semibold text-foreground'>
              {info.row.original.question_text}
            </span>
            <span className='text-xs text-muted-foreground'>
              {info.row.original.theme_id.replace(/_/g, " ")}
            </span>
          </div>
        ),
      },
      {
        accessorKey: "question_type",
        header: t("fields.question_type"),
        cell: (info) => (
          <span className='inline-flex items-center rounded-full border border-border px-2 py-0.5 text-xs font-semibold capitalize'>
            {info.getValue<QuestionType>().replace("_", " ")}
          </span>
        ),
      },
      {
        accessorKey: "difficulty",
        header: t("fields.difficulty"),
        cell: (info) => (
          <span className='inline-flex items-center rounded-full bg-purple-100 px-2 py-0.5 text-xs font-semibold text-purple-700'>
            {tOptions(`difficulty.${info.getValue<QuestionDifficulty>()}`)}
          </span>
        ),
      },
      {
        accessorKey: "max_score",
        header: t("fields.max_score"),
        cell: (info) => (
          <span className='font-semibold text-primary'>
            {info.getValue<string>()}
          </span>
        ),
      },
      {
        accessorKey: "usage_count",
        header: "Uso",
        cell: (info) => (
          <span className='text-sm text-muted-foreground'>
            {info.getValue<number>()}x
          </span>
        ),
      },
      {
        accessorKey: "updated_at",
        header: t("fields.updated_at", { defaultMessage: "Actualizada" }),
        cell: (info) => (
          <span className='text-xs text-muted-foreground'>
            {info.getValue<string>()}
          </span>
        ),
      },
      {
        id: "actions",
        header: "Actions",
        enableSorting: false,
        cell: ({ row }) => (
          <div className='flex gap-2'>
            <Buttons
              size='sm'
              variant='outline'
              onClick={() => handleEdit(row.original)}>
              Editar
            </Buttons>
            <Buttons size='sm' variant='ghost'>
              Duplicar
            </Buttons>
          </div>
        ),
      },
    ],
    [handleEdit, t, tOptions],
  );

  const headerTable = useCallback(() => {
    return (
      <div className='flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between'>
        <div className='flex flex-wrap items-center gap-2'>
          {(
            ["all", "multiple_choice_single", "true_false", "open"] as const
          ).map((option) => (
            <button
              key={option}
              type='button'
              onClick={() => setTypeFilter(option)}
              className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                typeFilter === option
                  ? "bg-primary text-primary-foreground"
                  : "border border-border text-muted-foreground hover:text-primary"
              }`}>
              {option === "all"
                ? "Todas"
                : t(`fields.question_type_${option}`, {
                    defaultMessage: option.replace("_", " "),
                  })}
            </button>
          ))}
        </div>

        <div className='flex flex-wrap items-center gap-2'>
          {(["all", "intro", "basic", "intermediate", "advanced"] as const).map(
            (difficulty) => (
              <button
                key={difficulty}
                type='button'
                onClick={() => setDifficultyFilter(difficulty)}
                className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                  difficultyFilter === difficulty
                    ? "bg-secondary text-secondary-foreground"
                    : "border border-border text-muted-foreground hover:text-primary"
                }`}>
                {difficulty === "all"
                  ? "Todas"
                  : tOptions(`difficulty.${difficulty}`)}
              </button>
            ),
          )}
        </div>
      </div>
    );
  }, [difficultyFilter, t, tOptions, typeFilter]);

  const defaultInitialValues: ICreateQuestion = {
    question_text: "",
    question_type: "multiple_choice_single",
    options: "",
    correct_answer: "",
    max_score: "1",
    theme_id: "",
    difficulty: "intro",
  };

  const summaryCards = [
    {
      icon: HiOutlineQuestionMarkCircle,
      label: "Preguntas registradas",
      value: metrics.totalQuestions,
      accent: "from-indigo-500/40 to-sky-500/40 text-indigo-900",
    },
    {
      icon: HiOutlineAdjustmentsHorizontal,
      label: "Ítems opción múltiple",
      value: metrics.multipleChoice,
      accent: "from-emerald-500/40 to-lime-500/40 text-emerald-900",
    },
    {
      icon: HiOutlineSparkles,
      label: "Puntaje promedio",
      value: `${metrics.avgScore} pts`,
      accent: "from-amber-500/40 to-orange-500/40 text-amber-900",
    },
  ];

  return (
    <section className='mx-auto flex w-full flex-col gap-6 px-6'>
      <article className='rounded-3xl border border-border/40 bg-gradient-to-br from-sky-600 via-indigo-500 to-purple-500 px-8 py-10 text-white shadow-2xl'>
        <header className='space-y-4'>
          <span className='inline-flex w-fit items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-white/75'>
            {t("title")}
          </span>
          <div className='space-y-2'>
            <h1 className='text-4xl font-semibold leading-tight'>
              {t("description")}
            </h1>
            <p className='text-white/80'>
              Orquesta el banco institucional de preguntas con filtros, métricas
              y formularios vivos.
            </p>
          </div>
          <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
            <Buttons color='primary' onClick={() => setOpenCreateModal(true)}>
              <HiOutlinePlusCircle className='h-4 w-4' />
              {tActions("saveQuestion")}
            </Buttons>
            
          </div>
        </header>
      </article>

      <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
        {summaryCards.map((card) => (
          <div
            key={card.label}
            className={`rounded-2xl border border-border/40 bg-gradient-to-br ${card.accent} px-5 py-4 shadow-sm backdrop-blur`}>
            <div className='flex items-center justify-between text-sm font-semibold text-white/80'>
              <span>{card.label}</span>
              <card.icon className='h-5 w-5 text-white/70' />
            </div>
            <p className='mt-2 text-2xl font-semibold text-white'>
              {card.value}
            </p>
          </div>
        ))}
      </div>

      <DataTable
        data={filteredData}
        columns={columns}
        headerTable={headerTable}
        className='py-2'
      />

      <Modal
        size='full'
        title={"Crear pregunta"}
        open={openCreateModal}
        onOpenChange={handleCreateModalChange}>
        <CreateQuestion />
      </Modal>

      <Modal
        size='full'
        title={"Editar pregunta"}
        open={openEditModal}
        onOpenChange={handleEditModalChange}>
        <UpdateQuestion id={editingQuestion?.id ?? 0} />
      </Modal>
    </section>
  );
};

export default QuestionManager;
