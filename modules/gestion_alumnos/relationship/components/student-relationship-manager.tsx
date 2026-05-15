/** @format */

"use client";

import React, { useCallback, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { ColumnDef } from "@tanstack/react-table";
import { Modal } from "@repo/ui/modals/scenes/dialog/modal";
import { Buttons } from "@repo/ui/buttons/scenes";
import {
  HiOutlineLink,
  HiOutlinePlusCircle,
  HiOutlineTrash,
} from "react-icons/hi2";

import { TableStudentRelationship } from "../scenes/tableStudentRelationship";
import { RegisterFamilyLink } from "./form";
import { BiUserPlus } from "react-icons/bi";
import { Link } from "@/shared/i18n/routing";

type RelationshipRow = {
  id: string;
  student_id: string;
  guardian_id: string;
  guardian_name: string;
  relationship_type: string;
  priority: string;
  custody_level: string;
  start_date: string;
};

type GuardianOption = { id: string; name: string };

const MOCK_GUARDIANS: GuardianOption[] = [
  { id: "guardian-1", name: "María Ramírez" },
  { id: "guardian-2", name: "Carlos Ramírez" },
  { id: "guardian-3", name: "Ana Torres" },
];

const MOCK_RELATIONSHIPS: RelationshipRow[] = [
  {
    id: "rel-1",
    student_id: "student-1",
    guardian_id: "guardian-1",
    guardian_name: "María Ramírez",
    relationship_type: "mother",
    priority: "primary",
    custody_level: "shared",
    start_date: "2025-02-01",
  },
  {
    id: "rel-2",
    student_id: "student-1",
    guardian_id: "guardian-2",
    guardian_name: "Carlos Ramírez",
    relationship_type: "father",
    priority: "secondary",
    custody_level: "shared",
    start_date: "2025-02-01",
  },
];

export const StudentRelationshipManager = ({
  studentId,
  initialGuardianId,
  variant = "full",
}: {
  studentId: string;
  initialGuardianId?: string;
  variant?: "full" | "compact";
}) => {
  const t = useTranslations("GestionAlumnos");

  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState<RelationshipRow[]>(() =>
    MOCK_RELATIONSHIPS.filter((r) => r.student_id === studentId),
  );

  const handleDelete = useCallback((id: string) => {
    setData((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const columns: ColumnDef<RelationshipRow>[] = useMemo(
    () => [
      {
        accessorKey: "guardian_name",
        header: t("guardians"),
        cell: (info) => (
          <div className='flex flex-col'>
            <span className='font-semibold text-foreground'>
              {info.row.original.guardian_name}
            </span>
            <span className='text-xs text-muted-foreground'>
              {info.row.original.guardian_id}
            </span>
          </div>
        ),
      },
      {
        accessorKey: "relationship_type",
        header: t("relationshipFields.relationship_type"),
      },
      { accessorKey: "priority", header: t("relationshipFields.priority") },
      {
        accessorKey: "custody_level",
        header: t("relationshipFields.custody_level"),
      },
      { accessorKey: "start_date", header: t("relationshipFields.start_date") },
      {
        id: "actions",
        header: t("actions.actions"),
        cell: (info) => (
          <Buttons
            type='button'
            color='danger'
            onClick={() => handleDelete(info.row.original.id)}
            className='inline-flex items-center gap-2'>
            <HiOutlineTrash className='h-4 w-4' />
            {t("actions.delete")}
          </Buttons>
        ),
      },
    ],
    [handleDelete, t],
  );

  const headerTable = useCallback(() => {
    return (
      <div className='flex flex-col gap-3 md:flex-row md:items-center md:justify-end'>
        <div className='flex items-center gap-2 text-sm font-semibold text-muted-foreground'>
          <HiOutlineLink className='h-4 w-4' />
          {t("relationships")}
        </div>
        <Link
          href='/gestion_alumnos/guardian'
          className='inline-flex items-center gap-2'>
          <BiUserPlus className='h-4 w-4' />
          Add Guardian
        </Link>
        <Buttons
          onClick={() => setOpenModal(true)}
          className='inline-flex items-center gap-2'>
          <HiOutlinePlusCircle className='h-4 w-4' />
          {t("actions.saveRelationship")}
        </Buttons>
      </div>
    );
  }, [t]);

  const handleCreateRelationship = useCallback(
    async (payload: any) => {
      const newRow: RelationshipRow = {
        id: `rel-${Date.now()}`,
        student_id: studentId,
        guardian_id: payload.guardian_id,
        guardian_name: payload.guardian_id,
        relationship_type: payload.relationship_type,
        priority: payload.priority,
        custody_level: payload.custody_level,
        start_date: payload.start_date,
      };
      setData((prev) => [newRow, ...prev]);
      setOpenModal(false);
    },
    [studentId],
  );

  const managerContent = (
    <>
      <TableStudentRelationship
        columns={columns}
        data={data}
        headerTable={headerTable}
      />

      <Modal
        size='lg'
        title={t("relationshipCardTitle")}
        open={openModal}
        onOpenChange={setOpenModal}>
        <RegisterFamilyLink
          defaultStudentId={studentId}
          defaultGuardianId={initialGuardianId}
          guardianOptions={MOCK_GUARDIANS.map((g) => ({
            id: g.id,
            value: g.id,
            label: g.name,
          }))}
          onSubmitOverride={handleCreateRelationship}
        />
      </Modal>
    </>
  );

  if (variant === "compact") {
    return <div className='space-y-6'>{managerContent}</div>;
  }

  return (
    <section className='mx-auto flex w-full flex-col gap-6 px-6'>
      <article className='rounded-3xl border border-border/40 bg-gradient-to-br from-indigo-600 via-violet-500 to-purple-500 px-8 py-10 text-white shadow-2xl'>
        <header className='space-y-4'>
          <span className='inline-flex w-fit items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-white/75'>
            {t("relationships")}
          </span>
          <div className='space-y-2'>
            <h1 className='text-4xl font-semibold leading-tight'>
              {t("relationshipCardTitle")}
            </h1>
            <p className='text-white/80'>{t("relationshipCardDescription")}</p>
          </div>
          <Buttons
            color='success'
            className='inline-flex items-center gap-2 rounded-full bg-white/90 px-5 py-3 text-sm font-semibold text-primary transition hover:-translate-y-0.5 hover:bg-white'
            onClick={() => setOpenModal(true)}>
            <HiOutlinePlusCircle className='h-4 w-4' />
            {t("actions.saveRelationship")}
          </Buttons>
        </header>
      </article>

      {managerContent}
    </section>
  );
};
