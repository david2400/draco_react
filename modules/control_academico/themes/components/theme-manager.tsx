/** @format */

"use client";

import React, { useCallback, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { ColumnDef } from "@tanstack/react-table";
import { Modal } from "@repo/ui/modals/scenes/dialog/modal";
import { Buttons } from "@repo/ui/buttons/scenes";
import { CreateTheme, UpdateTheme } from "./form";
import {
  HiOutlineSparkles,
  HiOutlineTag,
  HiOutlinePlusCircle,
} from "react-icons/hi2";
import { ITheme } from "@/shared/domain/models/control_academico/theme.model";
import { DataTable } from "@repo/ui/table/scenes";

const MOCK_THEMES: ITheme[] = [
  {
    id: 1,
    name: "Fracciones equivalentes",
    subject: "Matemáticas",
    difficulty: "basic",
    description: "Operaciones con fracciones equivalentes para grado 5º.",
    tags: "fracciones,matematicas,quinto",
    questions_count: 12,
  },
  {
    id: 2,
    name: "Estructura de la célula",
    subject: "Ciencias Naturales",
    difficulty: "intermediate",
    description: "Componentes de la célula y funciones.",
    tags: "biologia,celula,organelos",
    questions_count: 18,
  },
  {
    id: 3,
    name: "Interpretación de texto narrativo",
    subject: "Lenguaje",
    difficulty: "advanced",
    description: "Comprensión lectora para pruebas estandarizadas.",
    tags: "lectura,inferencia,PISA",
    questions_count: 25,
  },
];

export const ThemeManager = () => {
  const t = useTranslations("ControlAcademico.themes");
  const tActions = useTranslations("ControlAcademico.actions");
  const tOptions = useTranslations("ControlAcademico.options");

  const [searchTerm, setSearchTerm] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState<
    "all" | "intro" | "basic" | "intermediate" | "advanced"
  >("all");
  const [openModal, setOpenModal] = useState(false);
  const [editingTheme, setEditingTheme] = useState<ITheme | null>(null);

  const filteredData = useMemo(() => {
    const normalized = searchTerm.trim().toLowerCase();
    return MOCK_THEMES.filter((item) => {
      const matchesSearch = normalized.length
        ? `${item.name} ${item.subject} ${item.tags}`
            .toLowerCase()
            .includes(normalized)
        : true;
      const matchesDifficulty =
        difficultyFilter === "all"
          ? true
          : item.difficulty === difficultyFilter;
      return matchesSearch && matchesDifficulty;
    });
  }, [searchTerm, difficultyFilter]);

  const metrics = useMemo(() => {
    const totalThemes = MOCK_THEMES.length;
    const totalQuestions = MOCK_THEMES.reduce(
      (acc, theme) => acc + theme.questions_count,
      0,
    );
    const advancedThemes = MOCK_THEMES.filter(
      (theme) => theme.difficulty === "advanced",
    ).length;
    return { totalThemes, totalQuestions, advancedThemes };
  }, []);

  const handleEdit = useCallback((row: ITheme) => {
    setEditingTheme(row);
    setOpenModal(true);
  }, []);

  const handleModalChange = useCallback((open: boolean) => {
    if (!open) {
      setEditingTheme(null);
    }
    setOpenModal(open);
  }, []);

  const columns: ColumnDef<ITheme>[] = useMemo(
    () => [
      {
        accessorKey: "name",
        header: t("fields.name"),
        cell: (info) => (
          <div className='flex flex-col'>
            <span className='font-semibold text-foreground'>
              {info.row.original.name}
            </span>
            <span className='text-xs text-muted-foreground'>
              {info.row.original.subject}
            </span>
          </div>
        ),
      },
      {
        accessorKey: "difficulty",
        header: t("fields.difficulty"),
        cell: (info) => {
          const value = info.getValue<string | undefined>();
          return value ? tOptions(`difficulty.${value}`) : "-";
        },
      },
      {
        accessorKey: "tags",
        header: t("fields.tags"),
        cell: (info) => (
          <span className='text-xs text-muted-foreground'>
            {info.getValue<string>()}
          </span>
        ),
      },
      {
        accessorKey: "questions_count",
        header: "Preguntas",
      },
      {
        accessorKey: "description",
        header: t("fields.description"),
        cell: (info) => (
          <p className='line-clamp-2 text-sm text-muted-foreground'>
            {info.getValue<string>()}
          </p>
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
              Clonar
            </Buttons>
          </div>
        ),
      },
    ],
    [t, tOptions, handleEdit],
  );

  const headerTable = useCallback(() => {
    return (
      <div className='flex gap-4 py-2 flex-row items-center justify-between'>
        <div className='flex flex-wrap items-center gap-2'>
          {(["all", "intro", "basic", "intermediate", "advanced"] as const).map(
            (option) => (
              <button
                key={option}
                type='button'
                onClick={() => setDifficultyFilter(option)}
                className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                  difficultyFilter === option
                    ? "bg-primary text-primary-foreground"
                    : "border border-border text-muted-foreground hover:text-primary"
                }`}>
                {option === "all" ? "Todas" : tOptions(`difficulty.${option}`)}
              </button>
            ),
          )}
        </div>
      </div>
    );
  }, [searchTerm, difficultyFilter, t, tOptions, tActions]);

  const summaryCards = [
    {
      icon: HiOutlineSparkles,
      label: "Temáticas registradas",
      value: metrics.totalThemes,
      accent: "from-emerald-500/40 to-teal-500/40 text-emerald-700",
    },
    {
      icon: HiOutlineTag,
      label: "Preguntas asociadas",
      value: metrics.totalQuestions,
      accent: "from-sky-500/40 to-indigo-500/40 text-sky-700",
    },
    {
      icon: HiOutlineSparkles,
      label: "Temáticas avanzadas",
      value: metrics.advancedThemes,
      accent: "from-amber-500/40 to-orange-500/40 text-amber-700",
    },
  ];

  return (
    <section className='mx-auto flex w-full flex-col gap-6 px-6'>
      <article className='rounded-3xl border border-border/40 bg-gradient-to-br from-emerald-600 via-teal-500 to-cyan-500 px-8 py-10 text-white shadow-2xl'>
        <header className='space-y-4'>
          <span className='inline-flex w-fit items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-white/75'>
            {t("title")}
          </span>
          <div className='space-y-2'>
            <h1 className='text-4xl font-semibold leading-tight'>
              {t("description")}
            </h1>
            <p className='text-white/80'>
              Clasifica preguntas por temática, asignatura y nivel de
              dificultad.
            </p>
          </div>
          <Buttons
            color='success'
            className='inline-flex items-center gap-2 rounded-full bg-white/90 px-5 py-3 text-sm font-semibold text-primary transition hover:-translate-y-0.5 hover:bg-white'
            onClick={() => setOpenModal(true)}>
            <HiOutlinePlusCircle className='h-4 w-4' />
            {tActions("saveTheme")}
          </Buttons>
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
        size='lg'
        title={"Crear temática"}
        open={openModal}
        onOpenChange={handleModalChange}>
        <CreateTheme refresh={() => {}} />
      </Modal>
      <Modal
        size='lg'
        title={"Editar temática"}
        open={openModal}
        onOpenChange={handleModalChange}>
        <UpdateTheme id={editingTheme?.id ?? 0} refresh={() => {}} />
      </Modal>
    </section>
  );
};
