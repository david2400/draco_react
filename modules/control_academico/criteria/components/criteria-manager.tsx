/** @format */

"use client";

import React, { useCallback, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { ColumnDef } from "@tanstack/react-table";
import { Buttons } from "@repo/ui/buttons/scenes";
import { Modal } from "@repo/ui/modals/scenes/dialog/modal";
import { Input } from "@repo/ui/inputs/scenes/input";
import { DataTable } from "@repo/ui/table/scenes";
import { CreateCriterion, UpdateCriterion } from "./form";
import {
  HiOutlineClipboardDocumentList,
  HiOutlineSparkles,
  HiOutlinePlusCircle,
} from "react-icons/hi2";
import { ICriterion } from "@/shared/domain/models/control_academico/criteria.model";
import { ICreateCriterion } from "@/shared/domain/dto/control_academico/criteria.dto";

const MOCK_CRITERIA: ICriterion[] = [
  {
    id: 1,
    name: "Exactitud",
    description: "Valora la corrección del procedimiento y el resultado final.",
    weight: "40",
    notes_template: "Se evaluó la precisión de la respuesta entregada.",
    impact: "core",
  },
  {
    id: 2,
    name: "Argumentación",
    description: "Evalúa la claridad y consistencia de la justificación.",
    weight: "35",
    notes_template: "Se revisó la coherencia del razonamiento y evidencias.",
    impact: "core",
  },
  {
    id: 3,
    name: "Presentación",
    description: "Orden, legibilidad y uso adecuado del lenguaje técnico.",
    weight: "25",
    notes_template:
      "Se tuvo en cuenta la estructura y redacción del estudiante.",
    impact: "support",
  },
  {
    id: 4,
    name: "Creatividad",
    description: "Propone soluciones originales o ejemplos propios.",
    weight: "20",
    notes_template: "Se destacó la originalidad del enfoque presentado.",
    impact: "support",
  },
];

export const CriteriaManager = () => {
  const t = useTranslations("ControlAcademico.criteria");
  const tActions = useTranslations("ControlAcademico.actions");

  const [searchTerm, setSearchTerm] = useState("");
  const [impactFilter, setImpactFilter] = useState<"all" | "core" | "support">(
    "all",
  );
  const [openModal, setOpenModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [editingCriterion, setEditingCriterion] = useState<ICriterion | null>(
    null,
  );

  const filteredData = useMemo(() => {
    const normalized = searchTerm.trim().toLowerCase();

    return MOCK_CRITERIA.filter((criterion) => {
      const matchesSearch = normalized.length
        ? `${criterion.name} ${criterion.description} ${criterion.notes_template ?? ""}`
            .toLowerCase()
            .includes(normalized)
        : true;
      const matchesImpact =
        impactFilter === "all" ? true : criterion.impact === impactFilter;

      return matchesSearch && matchesImpact;
    });
  }, [impactFilter, searchTerm]);

  const metrics = useMemo(() => {
    const totalCriteria = MOCK_CRITERIA.length;
    const withTemplates = MOCK_CRITERIA.filter(
      (criterion) => criterion.notes_template,
    ).length;
    const averageWeight =
      MOCK_CRITERIA.reduce(
        (acc, criterion) => acc + Number(criterion.weight || 0),
        0,
      ) / Math.max(totalCriteria, 1);

    return {
      totalCriteria,
      withTemplates,
      averageWeight: Math.round(averageWeight),
    };
  }, []);

  const handleEdit = useCallback((row: ICriterion) => {
    setEditingCriterion(row);
    setOpenModal(true);
  }, []);

  const handleModalChange = useCallback((open: boolean) => {
    if (!open) {
      setEditingCriterion(null);
    }
    setOpenModal(open);
  }, []);

  const handleUpdateModalChange = useCallback((open: boolean) => {
    setOpenUpdateModal(open);
  }, []);

  const handleSubmit = useCallback(
    async (values: ICreateCriterion) => {
      console.log("Saving criterion", values);
      handleModalChange(false);
    },
    [handleModalChange],
  );

  const columns: ColumnDef<ICriterion>[] = useMemo(
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
              {info.row.original.description}
            </span>
          </div>
        ),
      },
      {
        accessorKey: "weight",
        header: t("fields.weight"),
        cell: (info) => (
          <span className='inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary'>
            {info.getValue<string>()}%
          </span>
        ),
      },
      {
        accessorKey: "notes_template",
        header: t("fields.notes_template"),
        cell: (info) => (
          <p className='line-clamp-2 text-xs text-muted-foreground'>
            {info.getValue<string>() || "-"}
          </p>
        ),
      },
      {
        accessorKey: "impact",
        header: "Impacto",
        cell: (info) => (
          <span
            className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold ${
              info.getValue<string>() === "core"
                ? "bg-emerald-100 text-emerald-700"
                : "bg-slate-100 text-slate-700"
            }`}>
            {info.getValue<string>() === "core" ? "Clave" : "Complemento"}
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
    [handleEdit, t],
  );

  const headerTable = useCallback(() => {
    return (
      <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
        <div className='flex flex-wrap items-center gap-2'>
          {(["all", "core", "support"] as const).map((option) => (
            <button
              key={option}
              type='button'
              onClick={() => setImpactFilter(option)}
              className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                impactFilter === option
                  ? "bg-primary text-primary-foreground"
                  : "border border-border text-muted-foreground hover:text-primary"
              }`}>
              {option === "all"
                ? "Todos"
                : option === "core"
                  ? "Claves"
                  : "Complementarios"}
            </button>
          ))}
        </div>
      </div>
    );
  }, [impactFilter, searchTerm, t, tActions]);

  const summaryCards = [
    {
      icon: HiOutlineClipboardDocumentList,
      label: "Criterios activos",
      value: metrics.totalCriteria,
      accent: "from-indigo-500/40 to-blue-500/40 text-indigo-800",
    },
    {
      icon: HiOutlineSparkles,
      label: "Plantillas personalizadas",
      value: metrics.withTemplates,
      accent: "from-emerald-500/40 to-teal-500/40 text-emerald-800",
    },
    {
      icon: HiOutlineSparkles,
      label: "Peso promedio",
      value: `${metrics.averageWeight}%`,
      accent: "from-amber-500/40 to-orange-500/40 text-amber-800",
    },
  ];

  return (
    <section className='mx-auto flex w-full flex-col gap-6 px-6'>
      <article className='rounded-3xl border border-border/40 bg-gradient-to-br from-purple-600 via-fuchsia-500 to-rose-500 px-8 py-10 text-white shadow-2xl'>
        <header className='space-y-4'>
          <span className='inline-flex w-fit items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-white/75'>
            {t("title")}
          </span>
          <div className='space-y-2'>
            <h1 className='text-4xl font-semibold leading-tight'>
              {t("description")}
            </h1>
            <p className='text-white/80'>
              Define rúbricas claras, pesos y notas prediseñadas para
              retroalimentar.
            </p>
          </div>
          <Buttons color='primary' onClick={() => setOpenModal(true)}>
            <HiOutlinePlusCircle className='h-4 w-4' />
            {tActions("saveCriterion")}
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
        title={"Crear criterio"}
        open={openModal}
        onOpenChange={handleModalChange}>
        <CreateCriterion />
      </Modal>

      <Modal
        size='lg'
        title={"Editar criterio"}
        open={openUpdateModal}
        onOpenChange={handleUpdateModalChange}>
        <UpdateCriterion id={editingCriterion?.id ?? 0} />
      </Modal>
    </section>
  );
};
