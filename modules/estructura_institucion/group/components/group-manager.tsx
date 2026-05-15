/** @format */

"use client";

import React, { useCallback, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { ColumnDef } from "@tanstack/react-table";
import { SubmitHandler } from "react-hook-form";
import { Buttons } from "@repo/ui/buttons/scenes";
import { RegisterGroup } from "./form";
import { IGroupCreateRequest } from "../models/group.interface";
import {
  HiOutlineUserGroup,
  HiOutlineClock,
  HiOutlineBuildingOffice2,
  HiOutlinePlusCircle,
} from "react-icons/hi2";
import { DataTable } from "@repo/ui/table/scenes";
import { MOCK_GROUPS, type IGroupRow as GroupRow } from "../data/mock-groups";
import { Modal } from "@/components/modals/scenes/dialog/modal";

export const GroupManager = () => {
  const t = useTranslations("EstructuraInstitucion.group");
  const tOptions = useTranslations("EstructuraInstitucion.options");
  const tActions = useTranslations("EstructuraInstitucion.actions");

  const [searchTerm, setSearchTerm] = useState("");
  const [shiftFilter, setShiftFilter] = useState<
    "all" | "morning" | "afternoon" | "evening"
  >("all");
  const [openModal, setOpenModal] = useState(false);
  const [editingGroup, setEditingGroup] = useState<GroupRow | null>(null);

  const filteredData = useMemo(() => {
    const normalized = searchTerm.trim().toLowerCase();

    return MOCK_GROUPS.filter((item) => {
      const matchesSearch = normalized.length
        ? `${item.name} ${item.grade_id} ${item.tutor}`
            .toLowerCase()
            .includes(normalized)
        : true;
      const matchesShift =
        shiftFilter === "all" ? true : item.shift === shiftFilter;
      return matchesSearch && matchesShift;
    });
  }, [searchTerm, shiftFilter]);

  const metrics = useMemo(() => {
    const totalGroups = MOCK_GROUPS.length;
    const activeGroups = MOCK_GROUPS.filter(
      (group) => group.status === "active",
    ).length;
    const totalStudents = MOCK_GROUPS.reduce(
      (acc, group) => acc + group.students_assigned,
      0,
    );

    return { totalGroups, activeGroups, totalStudents };
  }, []);

  const handleEdit = useCallback((row: GroupRow) => {
    setEditingGroup(row);
    setOpenModal(true);
  }, []);

  const handleModalClose = useCallback((open: boolean) => {
    if (!open) {
      setEditingGroup(null);
    }
    setOpenModal(open);
  }, []);

  const handleSubmit: SubmitHandler<IGroupCreateRequest> = async (values) => {
    console.log("Saving group entity", values);
    handleModalClose(false);
  };

  const columns: ColumnDef<GroupRow>[] = useMemo(
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
              {info.row.original.grade_id}
            </span>
          </div>
        ),
      },
      {
        accessorKey: "tutor",
        header: t("fields.tutor"),
      },
      {
        accessorKey: "shift",
        header: t("fields.shift"),
        cell: (info) => tOptions(`shift.${info.getValue<string>()}`),
      },
      {
        accessorKey: "classroom",
        header: t("fields.classroom"),
      },
      {
        accessorKey: "max_students",
        header: t("fields.max_students"),
        cell: (info) => (
          <span>
            {info.row.original.students_assigned}/{info.getValue<string>()}
          </span>
        ),
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
            <Buttons
              size='sm'
              variant='outline'
              onClick={() => handleEdit(row.original)}>
              Editar
            </Buttons>
            <Buttons size='sm' variant='ghost'>
              Seguimiento
            </Buttons>
          </div>
        ),
      },
    ],
    [t, tOptions, handleEdit],
  );

  const headerTable = useCallback(() => {
    return (
      <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
        <div className='flex flex-wrap items-center gap-2'>
          {(["all", "morning", "afternoon", "evening"] as const).map(
            (option) => (
              <button
                key={option}
                type='button'
                onClick={() => setShiftFilter(option)}
                className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                  shiftFilter === option
                    ? "bg-primary text-primary-foreground"
                    : "border border-border text-muted-foreground hover:text-primary"
                }`}>
                {option === "all"
                  ? "Todos los turnos"
                  : tOptions(`shift.${option}`)}
              </button>
            ),
          )}
        </div>
      </div>
    );
  }, [searchTerm, shiftFilter, t, tOptions, tActions]);

  const summaryCards = [
    {
      icon: HiOutlineUserGroup,
      label: "Grupos activos",
      value: metrics.activeGroups,
      accent: "from-sky-500/40 to-indigo-500/40 text-sky-700",
    },
    {
      icon: HiOutlineClock,
      label: "Turnos coordinados",
      value: 3,
      accent: "from-rose-500/40 to-orange-500/40 text-rose-700",
    },
    {
      icon: HiOutlineBuildingOffice2,
      label: "Estudiantes asignados",
      value: metrics.totalStudents,
      accent: "from-emerald-500/40 to-teal-500/40 text-emerald-700",
    },
  ];

  return (
    <section className='mx-auto flex w-full flex-col gap-6 px-6'>
      <article className='rounded-3xl border border-border/40 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 px-8 py-10 text-white shadow-2xl'>
        <header className='space-y-4'>
          <span className='inline-flex w-fit items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-white/75'>
            {t("title")}
          </span>
          <div className='space-y-2'>
            <h1 className='text-4xl font-semibold leading-tight'>
              {t("description")}
            </h1>
            <p className='text-white/80'>
              Supervisa cupos por turno, tutor, aula y estado académico.
            </p>
          </div>
          <Buttons
            color='success'
            className='inline-flex items-center gap-2 rounded-full bg-white/90 px-5 py-3 text-sm font-semibold text-primary transition hover:-translate-y-0.5 hover:bg-white'
            onClick={() => setOpenModal(true)}>
            <HiOutlinePlusCircle className='h-4 w-4' />
            {tActions("saveGroup")}
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
        size='full'
        title={editingGroup ? "Editar grupo" : "Crear grupo"}
        open={openModal}
        onOpenChange={handleModalClose}>
        <RegisterGroup
          initialValues={editingGroup ?? undefined}
          onSubmit={handleSubmit}
        />
      </Modal>
    </section>
  );
};
