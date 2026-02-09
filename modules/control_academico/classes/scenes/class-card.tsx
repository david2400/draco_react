/** @format */

"use client";

import React from "react";
import {
  HiOutlineClock,
  HiOutlineCheckCircle,
  HiOutlineArrowPath,
  HiOutlineEye,
  HiOutlineClipboardDocumentCheck,
} from "react-icons/hi2";
import { IClassSession, ClassStatus } from "../models/class.model";

const statusConfig: Record<
  ClassStatus,
  { label: string; chip: string; icon: React.ComponentType<{ className?: string }> }
> = {
  scheduled: {
    label: "Programada",
    chip: "bg-blue-50 text-blue-700 border-blue-200",
    icon: HiOutlineClock,
  },
  delivered: {
    label: "Dictada",
    chip: "bg-emerald-50 text-emerald-700 border-emerald-200",
    icon: HiOutlineCheckCircle,
  },
  postponed: {
    label: "Aplazada",
    chip: "bg-amber-50 text-amber-700 border-amber-200",
    icon: HiOutlineArrowPath,
  },
};

interface ClassCardProps {
  session: IClassSession;
  onOpenAttendance: (session: IClassSession) => void;
  onEditContent: (session: IClassSession) => void;
  onInspect?: (session: IClassSession) => void;
}

export const ClassCard: React.FC<ClassCardProps> = ({
  session,
  onOpenAttendance,
  onEditContent,
  onInspect,
}) => {
  const StatusIcon = statusConfig[session.status].icon;
  const formatter = new Intl.DateTimeFormat("es-CO", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <article className='group relative flex flex-col gap-4 rounded-2xl border border-border/60 bg-gradient-to-b from-background via-background to-muted/40 p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg'>
      {session.hasHolidayImpact && (
        <span className='absolute right-4 top-4 text-xs font-semibold text-amber-600'>Festivo</span>
      )}
      <header className='flex items-start justify-between gap-4'>
        <div>
          <p className='text-xs font-semibold uppercase tracking-wide text-muted-foreground'>
            {session.groupName}
          </p>
          <h3 className='text-lg font-semibold text-foreground'>{session.subject}</h3>
          <p className='text-sm text-muted-foreground'>Prof. {session.teacherName}</p>
        </div>
        <span
          className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold ${statusConfig[session.status].chip}`}
        >
          <StatusIcon className='h-3.5 w-3.5' />
          {statusConfig[session.status].label}
        </span>
      </header>

      <div className='flex flex-wrap items-center gap-4 text-sm text-muted-foreground'>
        <span className='inline-flex items-center gap-2'>
          <HiOutlineClock className='h-4 w-4' />
          {formatter.format(new Date(session.start))} - {formatter.format(new Date(session.end))}
        </span>
        {session.modality === "remote" ? (
          <span className='rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700'>Remoto</span>
        ) : (
          <span className='rounded-full bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700'>Presencial</span>
        )}
        {session.meetingLink && (
          <a
            href={session.meetingLink}
            target='_blank'
            rel='noopener noreferrer'
            className='inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary'
          >
            Link de reunión
          </a>
        )}
      </div>

      <footer className='flex flex-wrap gap-2'>
        <button
          className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition focus-visible:ring-2 focus-visible:ring-primary ${session.attendanceStatus === "pending" ? "bg-primary text-primary-foreground" : "border border-border text-foreground hover:border-primary"}`}
          type='button'
          onClick={() => onOpenAttendance(session)}
        >
          <HiOutlineClipboardDocumentCheck className='h-4 w-4' />
          {session.attendanceStatus === "pending" ? "Registrar asistencia" : "Ver asistencia"}
        </button>
        <button
          className='inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-semibold text-foreground transition hover:border-primary focus-visible:ring-2 focus-visible:ring-primary'
          type='button'
          onClick={() => onEditContent(session)}
        >
          ✎ Contenido
        </button>
        {onInspect && (
          <button
            className='inline-flex items-center gap-2 rounded-full border border-dashed border-border px-4 py-2 text-sm font-semibold text-muted-foreground transition hover:text-primary focus-visible:ring-2 focus-visible:ring-primary'
            type='button'
            onClick={() => onInspect(session)}
          >
            <HiOutlineEye className='h-4 w-4' /> Detalles
          </button>
        )}
      </footer>
    </article>
  );
};
