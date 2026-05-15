/** @format */

"use client";

import React, { useCallback, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { ColumnDef } from "@tanstack/react-table";
import { SubmitHandler } from "react-hook-form";
import { Buttons } from "@repo/ui/buttons/scenes";
import { TableExam } from "../scenes/tableExam";
import {
  HiOutlineClipboardDocumentCheck,
  HiOutlineClock,
  HiOutlineBeaker,
  HiOutlinePlusCircle,
} from "react-icons/hi2";
import { IExams } from "@/shared/domain/models/control_academico/exams.model";
import { ICreateExams } from "@/shared/domain/dto/control_academico/exams.dto";
import { Link } from "@repo/ui/shared/i18n/routing";
const MOCK_EXAMS: IExams[] = [
  {
    id: 1,
    nombre: "Diagnóstico Matemáticas",
    code: "MAT-D01",
    subject: "Matemáticas",
    grade_level: "6º",
    scheduled_date: "2026-02-15",
    duration: "60",
    instructions: "Resolver sin calculadora. Mostrar procedimiento.",
    question_ids: ["q-001", "q-002"],
    criteria_ids: ["c-001"],
  },
  {
    id: 2,
    nombre: "Lectura Crítica B",
    code: "LEX-B02",
    subject: "Lenguaje",
    grade_level: "9º",
    scheduled_date: "2026-02-20",
    duration: "55",
    instructions: "Se permite resaltador, no se permite diccionario.",
    question_ids: ["q-004"],
    criteria_ids: ["c-002", "c-003"],
  },
  {
    id: 3,
    nombre: "Ciencias Naturales C",
    code: "SCI-C03",
    subject: "Ciencias",
    grade_level: "8º",
    scheduled_date: "2026-01-30",
    duration: "70",
    instructions: "Incluye sección de laboratorio virtual.",
    question_ids: ["q-003"],
    criteria_ids: [],
  },
];

export const ExamManager = () => {
  const t = useTranslations("ControlAcademico.exams");
  const tActions = useTranslations("ControlAcademico.actions");

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | IExams>("all");
  const [openModal, setOpenModal] = useState(false);
  const [editingExam, setEditingExam] = useState<IExams | null>(null);

  const filteredData = useMemo(() => {
    const normalized = searchTerm.trim().toLowerCase();

    return MOCK_EXAMS;
  }, [searchTerm, statusFilter]);

  const metrics = useMemo(() => {
    const total = MOCK_EXAMS.length;
    const scheduled = MOCK_EXAMS;
    const totalMinutes = MOCK_EXAMS.reduce(
      (acc, exam) => acc + Number(exam.duration || 0),
      0,
    );

    return {
      total,
      scheduled,
      avgDuration: total ? Math.round(totalMinutes / total) : 0,
    };
  }, []);

  const handleEdit = useCallback((row: IExams) => {
    setEditingExam(row);
    setOpenModal(true);
  }, []);

  const handleModalChange = useCallback((open: boolean) => {
    if (!open) {
      setEditingExam(null);
    }
    setOpenModal(open);
  }, []);

  const handleSubmit: SubmitHandler<ICreateExams> = async (values) => {
    console.log("Saving exam entity", values);
    handleModalChange(false);
  };

  const columns: ColumnDef<IExams>[] = useMemo(
    () => [
      {
        accessorKey: "name",
        header: t("fields.name"),
        cell: (info) => (
          <div className='flex flex-col'>
            <span className='font-semibold text-foreground'>
              {info.row.original.nombre}
            </span>
            <span className='text-xs text-muted-foreground'>
              {info.row.original.code}
            </span>
          </div>
        ),
      },
      {
        accessorKey: "subject",
        header: t("fields.subject"),
      },
      {
        accessorKey: "grade_level",
        header: t("fields.grade_level"),
      },
      {
        accessorKey: "scheduled_date",
        header: t("fields.scheduled_date"),
      },
      {
        accessorKey: "duration",
        header: t("fields.duration"),
        cell: (info) => `${info.getValue()} min`,
      },
      {
        accessorKey: "status",
        header: "Estado",
        cell: (info) => (
          <span className='text-xs font-semibold uppercase tracking-wide text-muted-foreground'>
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
            <Link
              href={`/control-academico/exams/${row.id}`}
              className='inline-flex items-center gap-2 rounded-full bg-white/90 px-5 py-3 text-sm font-semibold text-primary transition hover:-translate-y-0.5 hover:bg-white'>
              <HiOutlinePlusCircle className='h-4 w-4' />
              {tActions("saveExam")}
            </Link>
          </div>
        ),
      },
    ],
    [t, handleEdit],
  );

  const headerTable = useCallback(() => {
    return (
      <div className='flex flex-col gap-4 flex-row items-center justify-between'>
        <div className='flex flex-wrap items-center gap-2'>
          {(["all", "scheduled", "in_progress", "completed"] as const).map(
            (option) => (
              <button
                key={option}
                type='button'
                // onClick={() => setStatusFilter(option)}
                className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                  statusFilter === option
                    ? "bg-primary text-primary-foreground"
                    : "border border-border text-muted-foreground hover:text-primary"
                }`}>
                {option === "all" ? "Todas" : option.replace("_", " ")}
              </button>
            ),
          )}
        </div>
      </div>
    );
  }, [searchTerm, statusFilter, t, tActions]);

  const summaryCards = [
    {
      icon: HiOutlineClipboardDocumentCheck,
      label: "Evaluaciones registradas",
      value: metrics.total,
      accent: "from-violet-500/40 to-indigo-500/40 text-violet-700",
    },
    {
      icon: HiOutlineClock,
      label: "Promedio de duración",
      value: `${metrics.avgDuration} min`,
      accent: "from-amber-500/40 to-orange-500/40 text-amber-700",
    },
    {
      icon: HiOutlineBeaker,
      label: "Pendientes por aplicar",
      value: metrics.scheduled,
      accent: "from-emerald-500/40 to-teal-500/40 text-emerald-700",
    },
  ];

  return (
    <section className='mx-auto flex w-full flex-col gap-6 px-6'>
      <article className='rounded-3xl border border-border/40 bg-gradient-to-br from-blue-600 via-indigo-500 to-purple-500 px-8 py-10 text-white shadow-2xl'>
        <header className='space-y-4'>
          <span className='inline-flex w-fit items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-white/75'>
            {t("title")}
          </span>
          <div className='space-y-2'>
            <h1 className='text-4xl font-semibold leading-tight'>
              {t("description")}
            </h1>
            <p className='text-white/80'>
              Programación centralizada de exámenes diagnósticos y rubricados.
            </p>
          </div>
          <Link
            href='/control_academico/exams/create'
            className='inline-flex items-center gap-2 rounded-full bg-red/90 px-5 py-3 text-sm font-semibold text-primary transition hover:-translate-y-0.5 hover:bg-white'>
            <HiOutlinePlusCircle className='h-4 w-4' />
            {tActions("saveExam")}
          </Link>
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
              {/* {card.value} */}
            </p>
          </div>
        ))}
      </div>

      <TableExam
        columns={columns}
        data={filteredData}
        headerTable={headerTable}
      />
    </section>
  );
};
