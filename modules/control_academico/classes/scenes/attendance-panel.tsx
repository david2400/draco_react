/** @format */

"use client";

import React from "react";
import {
  HiOutlineClipboardDocumentCheck,
  HiOutlineExclamationTriangle,
} from "react-icons/hi2";
import { IAttendanceRecord, IClassSession } from "../models/class.model";

interface AttendancePanelProps {
  sessions: IClassSession[];
  records: IAttendanceRecord[];
  onOpenAttendance: (session: IClassSession) => void;
}

export const AttendancePanel: React.FC<AttendancePanelProps> = ({ sessions, records, onOpenAttendance }) => {
  const pending = sessions.filter((session) => session.attendanceStatus === "pending");
  const history = records.filter((record) => record.present > 0);

  return (
    <section className='rounded-3xl border border-border/60 bg-white p-6 shadow-lg shadow-primary/5'>
      <header className='flex items-center justify-between gap-4'>
        <div>
          <p className='text-xs uppercase tracking-[0.3em] text-muted-foreground'>Asistencia</p>
          <h2 className='text-2xl font-semibold text-foreground'>Seguimiento en tiempo real</h2>
        </div>
        <span className='inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-xs font-semibold text-primary'>
          <HiOutlineClipboardDocumentCheck className='h-4 w-4' />
          {pending.length} pendientes
        </span>
      </header>

      <div className='mt-6 space-y-4'>
        {pending.length ? (
          pending.map((session) => (
            <article
              key={session.id}
              className='flex items-center justify-between gap-4 rounded-2xl border border-amber-200/70 bg-amber-50/70 px-4 py-3 text-sm text-amber-900'
            >
              <div>
                <p className='font-semibold'>{session.subject}</p>
                <p className='text-xs text-amber-800'>Grupo {session.groupName} · {new Date(session.start).toLocaleString("es-CO", { weekday: "long", hour: "2-digit", minute: "2-digit" })}</p>
              </div>
              <button
                type='button'
                onClick={() => onOpenAttendance(session)}
                className='rounded-full bg-amber-900 px-4 py-2 text-xs font-semibold text-white transition hover:bg-amber-800 focus-visible:ring-2 focus-visible:ring-amber-700'
              >
                Registrar
              </button>
            </article>
          ))
        ) : (
          <p className='rounded-2xl border border-border/60 bg-muted/30 px-4 py-3 text-sm text-muted-foreground'>
            Todo al día. ¡Excelente!
          </p>
        )}
      </div>

      <div className='mt-8'>
        <p className='mb-3 text-xs uppercase tracking-[0.3em] text-muted-foreground'>Histórico</p>
        <div className='space-y-3'>
          {history.length ? (
            history.map((record) => (
              <article
                key={record.classId}
                className='flex items-center justify-between rounded-2xl border border-border/60 px-4 py-3 text-sm'
              >
                <div>
                  <p className='font-semibold'>Clase #{record.classId}</p>
                  <p className='text-xs text-muted-foreground'>Actualizado {record.updatedAt ? new Date(record.updatedAt).toLocaleString("es-CO") : "--"}</p>
                </div>
                <div className='text-right text-xs text-muted-foreground'>
                  Presentes {record.present}/{record.totalStudents}
                </div>
              </article>
            ))
          ) : (
            <div className='flex items-center gap-3 rounded-2xl border border-dashed border-border/60 px-4 py-3 text-sm text-muted-foreground'>
              <HiOutlineExclamationTriangle className='h-4 w-4' />
              Sin registros previos.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
