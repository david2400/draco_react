/** @format */

"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { useParams, useRouter } from "next/navigation";
import { Buttons } from "@repo/ui/buttons/scenes";

import { ClassDetailPanel } from "../scenes/class-detail-panel";
import { IClassSession } from "../models/class.model";
import { MOCK_ATTENDANCE, MOCK_CLASSES, MOCK_GROUP_STATS } from "../mocks/data";
import { useClassFilters } from "..";

const formatRange = (start: string, end: string) => {
  const formatter = new Intl.DateTimeFormat("es-CO", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  return `${formatter.format(new Date(start))} - ${formatter.format(new Date(end))}`;
};


export const ClassAttendanceWorkspace: React.FC = () => {
  const t = useTranslations("ControlAcademico.classes.attendanceView");
  const router = useRouter();

  const params = useParams<{
    locale?: string;
    grupoId?: string;
    classId?: string;
  }>();

  const session = useMemo<IClassSession | undefined>(() => {
    const classId = params?.classId;
    if (!classId) return MOCK_CLASSES[0];
    return (
      MOCK_CLASSES.find((cls) => String(cls.id) === classId) ?? MOCK_CLASSES[0]
    );
  }, [params?.classId]);

  const students = useMemo(() => {
    if (!session) return [];
    return (
      MOCK_GROUP_STATS.find((group) => group.groupId === session.groupId)
        ?.students ?? []
    );
  }, [session]);

  const attendanceRecord = useMemo(() => {
    if (!session) return undefined;
    return MOCK_ATTENDANCE.find((record) => record.classId === session.id);
  }, [session]);

  const [attendanceMap, setAttendanceMap] = useState<
    Record<string, "present" | "absent">
  >({});

  useEffect(() => {
    const defaultState = students.reduce<Record<string, "present" | "absent">>(
      (acc, student) => {
        acc[student.id] = "present";
        return acc;
      },
      {},
    );
    setAttendanceMap(defaultState);
  }, [students]);

  const handleMarkAll = useCallback(
    (status: "present" | "absent") => {
      setAttendanceMap((prev) => {
        const next = { ...prev };
        students.forEach((student) => {
          next[student.id] = status;
        });
        return next;
      });
    },
    [students],
  );

  const handleToggle = useCallback(
    (studentId: string, status: "present" | "absent") => {
      setAttendanceMap((prev) => ({ ...prev, [studentId]: status }));
    },
    [],
  );

  const handleSave = useCallback(() => {
    if (!session) return;
    console.log("save attendance", session.id, attendanceMap);
  }, [attendanceMap, session]);

  const handleBackToSchedule = useCallback(() => {
    const locale = params?.locale ?? "es";
    const groupId = params?.grupoId ?? session?.groupId ?? "";
    router.push(`/${locale}/control_academico/clases/${groupId}`);
  }, [params?.grupoId, params?.locale, router, session?.groupId]);

  if (!session) {
    return null;
  }

  const updatedAtLabel = attendanceRecord?.updatedAt
    ? new Intl.DateTimeFormat("es-CO", {
        dateStyle: "medium",
        timeStyle: "short",
      }).format(new Date(attendanceRecord.updatedAt))
    : null;

  return (
    <section className='mx-auto flex w-full flex-col gap-6 px-6 py-8'>
      <div className='flex items-center justify-between gap-3'>
        <div>
          <p className='text-xs uppercase tracking-[0.35em] text-muted-foreground'>
            {t("subtitle")}
          </p>
          <h1 className='text-3xl font-semibold text-foreground'>
            {t("title")}
          </h1>
          <p className='text-sm text-muted-foreground'>
            {formatRange(session.start, session.end)}
          </p>
        </div>
        <Buttons variant='outline' onClick={handleBackToSchedule}>
          {t("backToSchedule")}
        </Buttons>
      </div>

      <div className='grid gap-6 lg:grid-cols-[1.15fr_0.85fr]'>
        <div className='space-y-4'>
          <ClassDetailPanel
            session={session}
            students={students}
            attendanceRecord={attendanceRecord}
          />
        </div>

        <div className='rounded-3xl border border-border/60 bg-white p-6 shadow-lg'>
          <header className='flex flex-col gap-2'>
            <p className='text-xs uppercase tracking-[0.35em] text-muted-foreground'>
              {t("panelLabel")}
            </p>
            <h2 className='text-lg font-semibold text-foreground'>
              {session.subject}
            </h2>
            {updatedAtLabel && (
              <span className='text-xs text-muted-foreground'>
                {t("updatedAt", { date: updatedAtLabel })}
              </span>
            )}
          </header>

          <div className='mt-4 flex flex-wrap gap-2'>
            <Buttons
              size='sm'
              variant='outline'
              onClick={() => handleMarkAll("present")}>
              {t("markAllPresent")}
            </Buttons>
            <Buttons
              size='sm'
              variant='outline'
              onClick={() => handleMarkAll("absent")}>
              {t("markAllAbsent")}
            </Buttons>
            <Buttons size='sm' color='primary' onClick={handleSave}>
              {t("save")}
            </Buttons>
          </div>

          <section className='mt-6 space-y-3'>
            <header className='flex items-center justify-between'>
              <p className='text-sm font-semibold text-foreground'>
                {t("studentsList")}
              </p>
              <span className='text-xs text-muted-foreground'>
                {students.length} alumnos
              </span>
            </header>

            {students.length ? (
              <ul className='space-y-3'>
                {students.map((student) => (
                  <li
                    key={student.id}
                    className='flex items-center justify-between rounded-2xl border border-border/60 px-4 py-3 shadow-sm'>
                    <div>
                      <p className='font-semibold text-foreground'>
                        {student.name}
                      </p>
                      <p className='text-xs text-muted-foreground'>
                        {student.attendanceCount}/{student.totalSessions}{" "}
                        sesiones
                      </p>
                    </div>
                    <div className='flex items-center gap-2'>
                      <button
                        type='button'
                        onClick={() => handleToggle(student.id, "present")}
                        className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                          attendanceMap[student.id] === "present"
                            ? "bg-emerald-100 text-emerald-900"
                            : "border border-border/60 text-muted-foreground"
                        }`}>
                        {t("present")}
                      </button>
                      <button
                        type='button'
                        onClick={() => handleToggle(student.id, "absent")}
                        className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                          attendanceMap[student.id] === "absent"
                            ? "bg-rose-100 text-rose-900"
                            : "border border-border/60 text-muted-foreground"
                        }`}>
                        {t("absent")}
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className='rounded-2xl border border-dashed border-border/60 px-4 py-3 text-sm text-muted-foreground'>
                {t("noStudents")}
              </p>
            )}
          </section>
        </div>
      </div>
    </section>
  );
};

export default ClassAttendanceWorkspace;
