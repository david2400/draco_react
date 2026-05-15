/** @format */

"use client";

import React, { useCallback, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { ColumnDef } from "@tanstack/react-table";
import { Modal } from "@repo/ui/modals/scenes/dialog/modal";
import { Buttons } from "@repo/ui/buttons/scenes";
import { Input } from "@repo/ui/inputs/scenes/input";
import {
  HiOutlineUserGroup,
  HiOutlineAcademicCap,
  HiOutlinePlusCircle,
} from "react-icons/hi2";

import { BulkAssignGroupStudents } from "./bulk-assign-group-students";
import { TableGroupStudent } from "../scenes/tableGroupStudent";
import { IGroupStudentRequest } from "../models/group-student.interface";

interface GroupStudentRow extends IGroupStudentRequest {
  id: string;
  group_name: string;
  student_name: string;
}

const MOCK_GROUP_STUDENTS: GroupStudentRow[] = [
  {
    id: "gs-1",
    group_id: "group-1",
    group_name: "Primero A - Mañana",
    student_id: "student-1",
    student_name: "Sofía Ramírez",
    enrollment_date: "2025-02-03",
    status: "active",
    notes: "Inscripción regular.",
  },
  {
    id: "gs-2",
    group_id: "group-2",
    group_name: "Quinto B - Tarde",
    student_id: "student-2",
    student_name: "Juan David Pérez",
    enrollment_date: "2025-02-05",
    status: "active",
    notes: "Traslado desde otro campus.",
  },
  {
    id: "gs-3",
    group_id: "group-3",
    group_name: "Octavo Único - Nocturno",
    student_id: "student-3",
    student_name: "Valentina Torres",
    enrollment_date: "2025-02-10",
    status: "suspended",
    notes: "Pausa por documentación pendiente.",
  },
];

const MOCK_GROUPS = [
  { id: "group-1", label: "Primero A - Mañana" },
  { id: "group-2", label: "Quinto B - Tarde" },
  { id: "group-3", label: "Octavo Único - Nocturno" },
];

const MOCK_STUDENTS = [
  { id: "student-1", label: "Sofía Ramírez" },
  { id: "student-2", label: "Juan David Pérez" },
  { id: "student-3", label: "Valentina Torres" },
  { id: "student-4", label: "Camila Gómez" },
  { id: "student-5", label: "Sebastián Muñoz" },
];

export const GroupStudentManager = ({ groupId }: { groupId?: string }) => {
  const t = useTranslations("EstructuraInstitucion.groupStudent");
  const tOptions = useTranslations("EstructuraInstitucion.options");
  const tActions = useTranslations("EstructuraInstitucion.actions");

  const [statusFilter, setStatusFilter] = useState<
    "all" | "active" | "suspended" | "graduated"
  >("all");
  const [openModal, setOpenModal] = useState(false);

  const handleBulkAssign = useCallback(
    async (payload: {
      group_id: string;
      enrollment_date: string;
      status: "active" | "suspended" | "graduated";
      notes?: string;
      student_ids: string[];
    }) => {
      console.log("bulk assign group students payload", payload);
      setOpenModal(false);
    },
    [],
  );

  const baseData = useMemo(() => {
    if (!groupId) {
      return MOCK_GROUP_STUDENTS;
    }
    return MOCK_GROUP_STUDENTS.filter((item) => item.group_id === groupId);
  }, [groupId]);

  const filteredData = useMemo(() => {
    return baseData.filter((item) => {
      const matchesStatus =
        statusFilter === "all" ? true : item.status === statusFilter;
      return matchesStatus;
    });
  }, [baseData, statusFilter]);

  const metrics = useMemo(() => {
    const totalAssignments = baseData.length;
    const activeAssignments = baseData.filter(
      (item) => item.status === "active",
    ).length;
    const uniqueGroups = new Set(baseData.map((item) => item.group_id)).size;

    return { totalAssignments, activeAssignments, uniqueGroups };
  }, [baseData]);

  const columns: ColumnDef<GroupStudentRow>[] = useMemo(
    () => [
      {
        accessorKey: "student_name",
        header: t("fields.student_id"),
        cell: (info) => (
          <div className='flex flex-col'>
            <span className='font-semibold text-foreground'>
              {info.row.original.student_name}
            </span>
            <span className='text-xs text-muted-foreground'>
              {info.row.original.student_id}
            </span>
          </div>
        ),
      },
      {
        accessorKey: "group_name",
        header: t("fields.group_id"),
        cell: (info) => (
          <div className='flex flex-col'>
            <span className='font-semibold text-foreground'>
              {info.row.original.group_name}
            </span>
            <span className='text-xs text-muted-foreground'>
              {info.row.original.group_id}
            </span>
          </div>
        ),
      },
      {
        accessorKey: "enrollment_date",
        header: t("fields.enrollment_date"),
      },
      {
        accessorKey: "status",
        header: t("fields.status"),
        cell: (info) => (
          <span className='text-xs font-semibold uppercase tracking-wide text-muted-foreground'>
            {tOptions(`status.${info.getValue<string>()}`)}
          </span>
        ),
      },
    ],
    [t, tOptions],
  );

  const headerTable = useCallback(() => {
    return (
      <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
        <div className='flex flex-wrap items-center gap-2'>
          {(["all", "active", "suspended", "graduated"] as const).map(
            (option) => (
              <button
                key={option}
                type='button'
                onClick={() => setStatusFilter(option)}
                className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                  statusFilter === option
                    ? "bg-primary text-primary-foreground"
                    : "border border-border text-muted-foreground hover:text-primary"
                }`}>
                {option === "all" ? "Todos" : tOptions(`status.${option}`)}
              </button>
            ),
          )}
          <Buttons
            onClick={() => setOpenModal(true)}
            className='inline-flex items-center gap-2'>
            <HiOutlinePlusCircle className='h-4 w-4' />
            {tActions("saveGroupStudent")}
          </Buttons>
        </div>
      </div>
    );
  }, [statusFilter, tActions, tOptions]);

  const summaryCards = [
    {
      icon: HiOutlineAcademicCap,
      label: "Asignaciones totales",
      value: metrics.totalAssignments,
      accent: "from-indigo-500/40 to-violet-500/40 text-indigo-700",
    },
    {
      icon: HiOutlineUserGroup,
      label: "Asignaciones activas",
      value: metrics.activeAssignments,
      accent: "from-emerald-500/40 to-teal-500/40 text-emerald-700",
    },
    {
      icon: HiOutlineUserGroup,
      label: "Grupos vinculados",
      value: metrics.uniqueGroups,
      accent: "from-amber-500/40 to-orange-500/40 text-amber-700",
    },
  ];

  return (
    <section className='mx-auto flex w-full flex-col gap-6 px-6'>
      <article className='rounded-3xl border border-border/40 bg-gradient-to-br from-indigo-600 via-violet-500 to-purple-500 px-8 py-10 text-white shadow-2xl'>
        <header className='space-y-4'>
          <span className='inline-flex w-fit items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-white/75'>
            {t("title")}
          </span>
          <div className='space-y-2'>
            <h1 className='text-4xl font-semibold leading-tight'>
              {t("description")}
            </h1>
            <p className='text-white/80'>
              Controla la asignación de estudiantes a los grupos académicos.
            </p>
          </div>
          <Buttons
            color='success'
            className='inline-flex items-center gap-2 rounded-full bg-white/90 px-5 py-3 text-sm font-semibold text-primary transition hover:-translate-y-0.5 hover:bg-white'
            onClick={() => setOpenModal(true)}>
            <HiOutlinePlusCircle className='h-4 w-4' />
            {tActions("saveGroupStudent")}
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

      <TableGroupStudent
        columns={columns}
        data={filteredData}
        headerTable={headerTable}
      />

      <Modal
        size='full'
        title='Asignación masiva de estudiantes'
        open={openModal}
        onOpenChange={setOpenModal}>
        <BulkAssignGroupStudents
          groups={MOCK_GROUPS}
          students={MOCK_STUDENTS}
          onSubmit={handleBulkAssign}
          initialGroupId={groupId}
          lockGroup={Boolean(groupId)}
        />
      </Modal>
    </section>
  );
};
