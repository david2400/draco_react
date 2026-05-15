/** @format */

"use client";

import React, { useCallback, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { ColumnDef } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { Buttons } from "@repo/ui/buttons/scenes";
import { Input } from "@repo/ui/inputs/scenes/input";
import {
  HiOutlinePlusCircle,
  HiOutlinePencilSquare,
  HiOutlineLink,
} from "react-icons/hi2";

import { TableStudent } from "../scenes/tableStudent";

type StudentRow = {
  id: string;
  name: string;
  document: string;
  grade: string;
};

const MOCK_STUDENTS: StudentRow[] = [
  {
    id: "student-1",
    name: "Sofía Ramírez",
    document: "TI 1000001",
    grade: "1",
  },
  {
    id: "student-2",
    name: "Juan David Pérez",
    document: "CC 1000002",
    grade: "3",
  },
  {
    id: "student-3",
    name: "Valentina Torres",
    document: "TI 1000003",
    grade: "2",
  },
];

export const StudentManager = () => {
  const t = useTranslations("GestionAlumnos");
  const router = useRouter();

  const [query, setQuery] = useState("");

  const data = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return MOCK_STUDENTS;
    return MOCK_STUDENTS.filter((item) => {
      return (
        item.name.toLowerCase().includes(q) ||
        item.document.toLowerCase().includes(q) ||
        item.grade.toLowerCase().includes(q)
      );
    });
  }, [query]);

  const columns: ColumnDef<StudentRow>[] = useMemo(
    () => [
      {
        accessorKey: "name",
        header: t("students"),
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
        accessorKey: "grade",
        header: t("fields.grade"),
      },
      {
        id: "actions",
        header: t("actions.actions"),
        cell: (info) => (
          <div className='flex flex-wrap gap-2'>
            <Buttons
              type='button'
              onClick={() =>
                router.push(
                  `/gestion_alumnos/student/${info.row.original.id}/edit`,
                )
              }
              className='inline-flex items-center gap-2'>
              <HiOutlinePencilSquare className='h-4 w-4' />
              {t("actions.edit")}
            </Buttons>
            <Buttons
              type='button'
              color='secondary'
              onClick={() =>
                router.push(
                  `/gestion_alumnos/student/${info.row.original.id}/relationships`,
                )
              }
              className='inline-flex items-center gap-2'>
              <HiOutlineLink className='h-4 w-4' />
              {t("relationships")}
            </Buttons>
          </div>
        ),
      },
    ],
    [router, t],
  );

  const headerTable = useCallback(() => {
    return (
      <div className='flex gap-3 flex-row items-center justify-end'>
        <Buttons
          onClick={() => router.push("/gestion_alumnos/student/create")}
          className='inline-flex items-center gap-2'>
          <HiOutlinePlusCircle className='h-4 w-4' />
          {t("actions.saveStudent")}
        </Buttons>
      </div>
    );
  }, [query, router, t]);

  return (
    <TableStudent columns={columns} data={data} headerTable={headerTable} />
  );
};
