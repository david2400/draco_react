/** @format */

"use client";

import React from "react";
import { useLocale, useTranslations } from "next-intl";
import {
  HiOutlineClock,
  HiOutlineUserGroup,
  HiOutlineLink,
  HiOutlineBookOpen,
} from "react-icons/hi2";
import {
  IAttendanceRecord,
  IClassSession,
  IStudentAttendanceSummary,
} from "../models/class.model";

interface ClassDetailPanelProps {
  session: IClassSession;
  students: IStudentAttendanceSummary[];
  attendanceRecord?: IAttendanceRecord;
}

export const ClassDetailPanel: React.FC<ClassDetailPanelProps> = ({
  session,
  students,
  attendanceRecord,
}) => {
  const locale = useLocale();
  const t = useTranslations("ControlAcademico.classes.detail");

  const formatter = new Intl.DateTimeFormat(locale, {
    weekday: "long",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const totalAttendance = students.reduce((acc, student) => acc + student.attendanceCount, 0);
  const totalSessions = students.reduce((acc, student) => acc + student.totalSessions, 0);

  return (
    <div className='space-y-6'>
      <header className='rounded-3xl border border-border/60 bg-gradient-to-br from-indigo-600 via-indigo-500 to-purple-600 p-6 text-white'>
        <p className='text-xs uppercase tracking-[0.35em] text-white/70'>{t("headerLabel")}</p>
        <h2 className='mt-2 text-3xl font-semibold'>{session.subject}</h2>
        <p className='text-white/80'>
          {t("groupLabel", { group: session.groupName })} · {t("teacherLabel", { teacher: session.teacherName })}
        </p>
        <div className='mt-4 flex flex-wrap gap-3 text-xs font-semibold'>
          <span className='inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1'>
            <HiOutlineClock className='h-4 w-4' /> {formatter.format(new Date(session.start))}
          </span>
          <span className='inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1'>
            {session.modality === "remote" ? t("modality.remote") : t("modality.onsite")}
          </span>
          {session.room && (
            <span className='inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1'>
              {t("roomLabel", { room: session.room })}
            </span>
          )}
        </div>
        {session.meetingLink && (
          <a
            href={session.meetingLink}
            target='_blank'
            rel='noopener noreferrer'
            className='mt-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-indigo-700'
          >
            <HiOutlineLink className='h-4 w-4' /> {t("meetingCta")}
          </a>
        )}
      </header>

      <section className='grid gap-4 lg:grid-cols-2'>
        <div className='rounded-2xl border border-border/60 bg-white p-4 shadow-sm'>
          <p className='text-xs uppercase tracking-[0.3em] text-muted-foreground'>{t("attendance.title")}</p>
          <div className='mt-3 flex flex-wrap gap-4 text-sm text-foreground'>
            <div className='flex flex-col'>
              <span className='text-xs text-muted-foreground'>{t("attendance.totalPresent")}</span>
              <span className='text-2xl font-semibold'>
                {attendanceRecord?.present ?? "--"}/{attendanceRecord?.totalStudents ?? "--"}
              </span>
            </div>
            <div className='flex flex-col'>
              <span className='text-xs text-muted-foreground'>{t("attendance.groupAccum")}</span>
              <span className='text-2xl font-semibold'>{totalAttendance}</span>
            </div>
            <div className='flex flex-col'>
              <span className='text-xs text-muted-foreground'>{t("attendance.totalSessions")}</span>
              <span className='text-2xl font-semibold'>{totalSessions}</span>
            </div>
          </div>
        </div>

        <div className='rounded-2xl border border-border/60 bg-white p-4 shadow-sm'>
          <p className='text-xs uppercase tracking-[0.3em] text-muted-foreground'>{t("content.title")}</p>
          <div className='mt-3 space-y-3 text-sm text-foreground'>
            <div className='rounded-xl border border-border/60 px-3 py-2'>
              <span className='inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground'>
                <HiOutlineBookOpen className='h-4 w-4' /> {t("content.planned")}
              </span>
              <p className='mt-1 text-sm'>{session.contentPlan || t("content.emptyPlan")}</p>
            </div>
            <div className='rounded-xl border border-border/60 px-3 py-2'>
              <span className='inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground'>
                <HiOutlineBookOpen className='h-4 w-4' /> {t("content.delivered")}
              </span>
              <p className='mt-1 text-sm'>{session.contentDelivered || t("content.emptyDelivered")}</p>
            </div>
          </div>
        </div>
      </section>

      <section className='rounded-2xl border border-border/60 bg-white p-4 shadow-sm'>
        <header className='flex items-center justify-between'>
          <div>
            <p className='text-xs uppercase tracking-[0.3em] text-muted-foreground'>{t("students.title")}</p>
            <h3 className='text-lg font-semibold text-foreground'>{t("students.subtitle")}</h3>
          </div>
          <span className='inline-flex items-center gap-2 rounded-full bg-muted/40 px-3 py-1 text-xs font-semibold text-muted-foreground'>
            <HiOutlineUserGroup className='h-4 w-4' /> {t("students.badge", { count: students.length })}
          </span>
        </header>

        <div className='mt-4 space-y-2'>
          {students.length ? (
            students.map((student) => (
              <article
                key={student.id}
                className='flex items-center justify-between rounded-xl border border-border/60 px-3 py-2 text-sm'
              >
                <div>
                  <p className='font-semibold text-foreground'>{student.name}</p>
                  <p className='text-xs text-muted-foreground'>
                    {t("students.ratio", {
                      attended: student.attendanceCount,
                      total: student.totalSessions,
                    })}
                  </p>
                </div>
                <div className='text-xs font-semibold text-foreground'>
                  {Math.round((student.attendanceCount / Math.max(student.totalSessions, 1)) * 100)}%
                </div>
              </article>
            ))
          ) : (
            <p className='rounded-xl border border-dashed border-border/60 px-3 py-2 text-sm text-muted-foreground'>
              {t("students.empty")}
            </p>
          )}
        </div>
      </section>
    </div>
  );
};
