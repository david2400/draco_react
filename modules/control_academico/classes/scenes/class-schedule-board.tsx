/** @format */

"use client";

import React, { useCallback, useMemo, useState } from "react";
import { EventsCalendar } from "@repo/ui/calendar/scenes";
import type { ISchedulerCalendarProps } from "@repo/ui/calendar/models";

import { IClassSession } from "../models/class.model";
import { WeekHeader } from "./week-header";
import { HolidayWarning } from "./holiday-warning";
import { ClassTimelineScene } from "./class-timeline";
import { Modal } from "@repo/ui/modals/scenes/dialog/modal";
import { BulkClassCreator, MOCK_CLASSES, Reschedule, useClassFilters } from "..";
import { Buttons } from "@repo/ui/buttons/scenes";
import { useTranslations } from "next-intl";

type CalendarEventClassNamesHandler = Extract<
  NonNullable<ISchedulerCalendarProps["eventClassNames"]>,
  (...args: any[]) => unknown
>;
type CalendarEventClickHandler = Extract<
  NonNullable<ISchedulerCalendarProps["eventClick"]>,
  (...args: any[]) => unknown
>;
type CalendarEventClickArg = Parameters<CalendarEventClickHandler>[0];

interface ClassScheduleBoardSceneProps {
  sessions: IClassSession[];
  weekLabel: string;
  rangeLabel: string;
  weekStats: {
    total: number;
    delivered: number;
    postponed: number;
  };
  onPrevWeek: () => void;
  onNextWeek: () => void;
  onOpenReschedule: () => void;
  calendarTitle: string;
  calendarSubtitle?: string;
  initialDate: string;
  holidays: string[];
  onSelectSession: (session: IClassSession) => void;
}

const academicStartDate = (MOCK_CLASSES.length ? MOCK_CLASSES : [])[0]
  ? MOCK_CLASSES.reduce((min, session) =>
      new Date(session.start) < new Date(min.start) ? session : min,
    ).start
  : new Date().toISOString();

export const ClassScheduleBoardScene: React.FC<
  ClassScheduleBoardSceneProps
> = ({
  sessions,
  weekLabel,
  rangeLabel,
  weekStats,
  onPrevWeek,
  onNextWeek,
  onOpenReschedule,
  calendarTitle,
  calendarSubtitle,
  initialDate,
  holidays,
  onSelectSession,
}) => {

  const calendarEvents = useMemo(
    () =>
      sessions.map((session) => ({
        id: String(session.id),
        title: session.subject,
        start: session.start,
        end: session.end,
        extendedProps: { session, status: session.status },
      })),
    [sessions],
  );
  const t = useTranslations("ControlAcademico.classes.attendanceView");



  const calendarEventClassNames = useCallback<CalendarEventClassNamesHandler>(
    (arg) => {
      const status = (arg.event.extendedProps as { status?: string })?.status;
      const base = "rounded-xl border px-3 py-2 text-sm shadow-sm";
      if (status === "delivered")
        return `${base} border-emerald-300 bg-emerald-50 text-emerald-900`;
      if (status === "postponed")
        return `${base} border-amber-300 bg-amber-50 text-amber-900`;
      if (status === "rescheduled")
        return `${base} border-sky-300 bg-sky-50 text-sky-900`;
      return `${base} border-border/60 bg-white text-foreground`;
    },
    [],
  );

  const handleCalendarEventClick = useCallback(
    (eventArg: CalendarEventClickArg) => {
      const session =
        (eventArg.event.extendedProps as { session?: IClassSession })
          ?.session ??
        sessions.find((cls) => String(cls.id) === eventArg.event.id);
      if (session) onSelectSession(session);
    },
    [onSelectSession, sessions],
  );

  return (
    <section className='flex flex-col gap-6'>
      <WeekHeader
        label={weekLabel}
        rangeLabel={rangeLabel}
        totalClasses={weekStats.total}
        delivered={weekStats.delivered}
        postponed={weekStats.postponed}
        onPrev={onPrevWeek}
        onNext={onNextWeek}
      />

      <HolidayWarning
        conflicts={holidays}
        onOpenReschedule={onOpenReschedule}
      />
     
      <ClassTimelineScene sessions={sessions} onSelect={onSelectSession} />

      <section className='rounded-3xl border border-border/60 bg-white/80 p-6 shadow-lg shadow-indigo-100'>
        <header className='mb-4 flex flex-col gap-1'>
          {calendarSubtitle ? (
            <p className='text-xs uppercase tracking-[0.3em] text-muted-foreground'>
              {calendarSubtitle}
            </p>
          ) : null}
          <h2 className='text-lg font-semibold text-foreground'>
            {calendarTitle}
          </h2>
        </header>
        <EventsCalendar
          events={calendarEvents}
          eventClick={handleCalendarEventClick}
          eventClassNames={calendarEventClassNames}
          weekends={false}
          slotMinTime='06:00:00'
          slotMaxTime='22:00:00'
          initialDate={initialDate}
          initialView='timeGridWeek'
        />
      </section>

    </section>
  );
};

export default ClassScheduleBoardScene;
