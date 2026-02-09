/** @format */

"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { ColumnDef } from "@tanstack/react-table";
import { Modal } from "@repo/ui/modals/scenes/dialog/modal";
import { Buttons } from "@repo/ui/buttons/scenes";
import { Input } from "@repo/ui/inputs/scenes/input";
import {
  HiOutlineLink,
  HiOutlinePlusCircle,
  HiOutlineUserGroup,
} from "react-icons/hi2";

import { RegisterGuardian } from "./form";
import { RegisterFamilyLink } from "@modules/gestion_alumnos/relationship/components/form";
import { TableGuardianStudent } from "../scenes/tableGuardianStudent";

type GuardianRow = {
  id: string;
  name: string;
  document: string;
  phone?: string;
  students: { id: string; name: string }[];
};

type StudentOption = { id: string; name: string };

const MOCK_STUDENTS: StudentOption[] = [
  { id: "student-1", name: "Sofía Ramírez" },
  { id: "student-2", name: "Juan David Pérez" },
  { id: "student-3", name: "Valentina Torres" },
];

const MOCK_GUARDIANS: GuardianRow[] = [
  {
    id: "guardian-1",
    name: "María Ramírez",
    document: "CC 1000001",
    phone: "3000000000",
    students: [{ id: "student-1", name: "Sofía Ramírez" }],
  },
  {
    id: "guardian-2",
    name: "Carlos Ramírez",
    document: "CC 1000002",
    phone: "3010000000",
    students: [
      { id: "student-1", name: "Sofía Ramírez" },
      { id: "student-3", name: "Valentina Torres" },
    ],
  },
];

export const GuardianStudentManager = ({
  variant = "full",
  initialStudentId,
}: {
  variant?: "full" | "compact";
  initialStudentId?: string;
}) => {
  const t = useTranslations("GestionAlumnos");

  const [query, setQuery] = useState("");
  const [openGuardianModal, setOpenGuardianModal] = useState(false);
  const [openLinkModal, setOpenLinkModal] = useState(false);
  const [selectedGuardianId, setSelectedGuardianId] = useState<
    string | undefined
  >(undefined);
  const [pendingStudentId, setPendingStudentId] = useState<string | undefined>(
    initialStudentId,
  );

  const [data, setData] = useState<GuardianRow[]>(MOCK_GUARDIANS);

  const filteredData = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return data;
    return data.filter((item) => {
      return (
        item.name.toLowerCase().includes(q) ||
        item.document.toLowerCase().includes(q) ||
        (item.phone ?? "").toLowerCase().includes(q) ||
        item.students.some((s) => s.name.toLowerCase().includes(q))
      );
    });
  }, [data, query]);

  const metrics = useMemo(() => {
    const totalGuardians = data.length;
    const totalLinks = data.reduce((acc, g) => acc + g.students.length, 0);
    const uniqueStudents = new Set(
      data.flatMap((g) => g.students.map((s) => s.id)),
    ).size;
    return { totalGuardians, totalLinks, uniqueStudents };
  }, [data]);

  const columns: ColumnDef<GuardianRow>[] = useMemo(
    () => [
      {
        accessorKey: "name",
        header: t("guardians"),
        cell: (info) => (
          <div className='flex flex-col'>
            <span className='font-semibold text-foreground'>
              {info.row.original.name}
            </span>
            <span className='text-xs text-muted-foreground'>
              {info.row.original.document}
            </span>
          </div>
        ),
      },
      {
        id: "students",
        header: t("students"),
        cell: (info) => {
          const students = info.row.original.students;
          return (
            <div className='flex flex-col'>
              <span className='font-semibold text-foreground'>
                {students.length}
              </span>
              <span className='text-xs text-muted-foreground'>
                {students
                  .slice(0, 2)
                  .map((s) => s.name)
                  .join(", ")}
                {students.length > 2 ? "…" : ""}
              </span>
            </div>
          );
        },
      },
      {
        id: "actions",
        header: t("actions.actions"),
        cell: (info) => (
          <Buttons
            type='button'
            color='secondary'
            onClick={() => {
              setSelectedGuardianId(info.row.original.id);
              setOpenLinkModal(true);
            }}
            className='inline-flex items-center gap-2'>
            <HiOutlineLink className='h-4 w-4' />
            {t("actions.saveRelationship")}
          </Buttons>
        ),
      },
    ],
    [t],
  );

  const headerTable = useCallback(() => {
    return (
      <div className='flex flex-col gap-3 flex-row items-center justify-end'>
        <Buttons
          onClick={() => setOpenGuardianModal(true)}
          className='inline-flex items-center gap-2'>
          <HiOutlinePlusCircle className='h-4 w-4' />
          {t("actions.saveGuardian")}
        </Buttons>
      </div>
    );
  }, [query, t]);

  useEffect(() => {
    if (initialStudentId) {
      setPendingStudentId(initialStudentId);
      setOpenGuardianModal(true);
    }
  }, [initialStudentId]);

  const handleCreatedGuardian = useCallback(async (guardianId: string) => {
    setOpenGuardianModal(false);
    setSelectedGuardianId(guardianId);
    setOpenLinkModal(true);

    setData((prev) => [
      {
        id: guardianId,
        name: guardianId,
        document: guardianId,
        phone: "",
        students: [],
      },
      ...prev,
    ]);
  }, []);

  const handleCreateRelationship = useCallback(
    async (payload: any) => {
      if (!selectedGuardianId) return;

      const studentId = payload.student_id;
      const studentName = payload.student_id;

      setData((prev) =>
        prev.map((g) => {
          if (g.id !== selectedGuardianId) return g;
          const already = g.students.some((s) => s.id === studentId);
          if (already) return g;
          return {
            ...g,
            students: [{ id: studentId, name: studentName }, ...g.students],
          };
        }),
      );

      setOpenLinkModal(false);
    },
    [selectedGuardianId],
  );

  const content = (
    <>
    
      <TableGuardianStudent
        columns={columns}
        data={filteredData}
        headerTable={headerTable}
      />

      <Modal
        size='lg'
        title={t("guardianCardTitle")}
        open={openGuardianModal}
        onOpenChange={setOpenGuardianModal}>
        <RegisterGuardian onCreated={handleCreatedGuardian} />
      </Modal>

      <Modal
        size='lg'
        title={t("relationshipCardTitle")}
        open={openLinkModal}
        onOpenChange={setOpenLinkModal}>
        <RegisterFamilyLink
          defaultStudentId={pendingStudentId}
          defaultGuardianId={selectedGuardianId}
          studentOptions={MOCK_STUDENTS.map((s) => ({
            id: s.id,
            value: s.id,
            label: s.name,
          }))}
          onSubmitOverride={handleCreateRelationship}
        />
      </Modal>
    </>
  );

  if (variant === "compact") {
    return <div className='space-y-6'>{content}</div>;
  }

  const summaryCards = [
    {
      icon: HiOutlineUserGroup,
      label: t("guardians"),
      value: metrics.totalGuardians,
      accent: "from-indigo-500/40 to-violet-500/40 text-indigo-700",
    },
    {
      icon: HiOutlineLink,
      label: t("relationships"),
      value: metrics.totalLinks,
      accent: "from-emerald-500/40 to-teal-500/40 text-emerald-700",
    },
    {
      icon: HiOutlineUserGroup,
      label: t("students"),
      value: metrics.uniqueStudents,
      accent: "from-amber-500/40 to-orange-500/40 text-amber-700",
    },
  ];

  return (
    <section className='mx-auto flex w-full flex-col gap-6 px-6'>
      <article className='rounded-3xl border border-border/40 bg-gradient-to-br from-indigo-600 via-violet-500 to-purple-500 px-8 py-10 text-white shadow-2xl'>
        <header className='space-y-4'>
          <span className='inline-flex w-fit items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-white/75'>
            {t("guardians")}
          </span>
          <div className='space-y-2'>
            <h1 className='text-4xl font-semibold leading-tight'>
              {t("guardianCardTitle")}
            </h1>
            <p className='text-white/80'>{t("guardianCardDescription")}</p>
          </div>
          <Buttons
            color='success'
            className='inline-flex items-center gap-2 rounded-full bg-white/90 px-5 py-3 text-sm font-semibold text-primary transition hover:-translate-y-0.5 hover:bg-white'
            onClick={() => setOpenGuardianModal(true)}>
            <HiOutlinePlusCircle className='h-4 w-4' />
            {t("actions.saveGuardian")}
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

      {content}
    </section>
  );
};
