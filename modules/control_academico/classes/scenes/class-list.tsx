/** @format */

"use client";

import React from "react";
import { IClassSession } from "../models/class.model";
import { ClassCard } from "./class-card";

interface ClassListProps {
  sessions: IClassSession[];
  onOpenAttendance: (session: IClassSession) => void;
  onEditContent: (session: IClassSession) => void;
  onInspect?: (session: IClassSession) => void;
}

export const ClassList: React.FC<ClassListProps> = ({ sessions, onOpenAttendance, onEditContent, onInspect }) => {
  if (!sessions.length) {
    return (
      <div className='rounded-2xl border border-dashed border-border/60 bg-muted/30 p-6 text-center text-sm text-muted-foreground'>
        No hay clases programadas para esta semana con los filtros actuales.
      </div>
    );
  }

  const grouped = sessions.reduce<Record<string, IClassSession[]>>((acc, session) => {
    const key = session.teacherName || "Docente";
    const bucket = acc[key] ?? [];
    bucket.push(session);
    acc[key] = bucket;
    return acc;
  }, {});

  return (
    <div className='space-y-6'>
      {Object.entries(grouped).map(([teacher, items]) => (
        <section key={teacher} className='space-y-3'>
          <header className='flex items-center justify-between'>
            <div>
              <p className='text-xs uppercase tracking-[0.3em] text-muted-foreground'>Profesor</p>
              <h3 className='text-lg font-semibold text-foreground'>{teacher}</h3>
            </div>
            <span className='text-xs font-semibold text-muted-foreground'>
              {items.length} {items.length === 1 ? "clase" : "clases"}
            </span>
          </header>
          <div className='grid gap-4 md:grid-cols-2'>
            {items.map((session) => (
              <ClassCard
                key={session.id}
                session={session}
                onOpenAttendance={onOpenAttendance}
                onEditContent={onEditContent}
                onInspect={onInspect}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};
