/** @format */

"use client";

import React, { useMemo, useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import { Buttons } from "@repo/ui/buttons/scenes";
import { Modal } from "@repo/ui/modals/scenes/dialog/modal";

import { ClassList } from "../scenes/class-list";
import { AttendancePanel } from "../scenes/attendance-panel";
import { ContentPanel } from "../scenes/content-panel";
import { BulkClassCreator } from "./bulk-class-creator";
import { Reschedule } from "../scenes/reschedule";
import { ClassDetailPanel } from "../scenes/class-detail-panel";
import { ClassScheduleBoardScene } from "../scenes/class-schedule-board";
import { useClassFilters } from "../hooks/useClassFilters";
import {
  MOCK_CLASSES,
  MOCK_ATTENDANCE,
  MOCK_CONTENT,
  TEACHERS,
  GROUPS,
  ACADEMIC_HOLIDAYS,
  MOCK_GROUP_STATS,
} from "../mocks/data";
import { IClassSession } from "../models/class.model";

const academicStartDate = (MOCK_CLASSES.length ? MOCK_CLASSES : [])[0]
  ? MOCK_CLASSES.reduce((min, session) =>
      new Date(session.start) < new Date(min.start) ? session : min,
    ).start
  : new Date().toISOString();

const formatRange = (fromIso: string, toIso: string) => {
  const formatter = new Intl.DateTimeFormat("es-CO", {
    month: "short",
    day: "numeric",
  });
  return `${formatter.format(new Date(fromIso))} - ${formatter.format(new Date(new Date(toIso).getTime() - 1))}`;
};

export const ClassManager: React.FC = () => {
  const t = useTranslations("ControlAcademico.classes");
  const tActions = useTranslations("ControlAcademico.actions");

  const {
    filters,
    setFilters,
    filteredSessions,
    groupedByWeek,
    weekStats,
    currentWeekOffset,
    setCurrentWeekOffset,
  } = useClassFilters({ sessions: MOCK_CLASSES, academicStartDate });

  const [search, setSearch] = useState("");
  const [openBulkModal, setOpenBulkModal] = useState(false);
  const [openRescheduleModal, setOpenRescheduleModal] = useState(false);
  const [selectedClass, setSelectedClass] = useState<IClassSession | null>(null);

  const heroStats = useMemo(() => {
    const total = MOCK_CLASSES.length;
    const delivered = MOCK_CLASSES.filter((cls) => cls.status === "delivered").length;
    const pendingAttendance = MOCK_CLASSES.filter((cls) => cls.attendanceStatus === "pending").length;
    return { total, delivered, pendingAttendance };
  }, []);

  const teacherOptions = useMemo(() => [{ id: "", name: t("filters.allTeachers") }, ...TEACHERS], [t]);
  const groupOptions = useMemo(() => [{ id: "", name: t("filters.allGroups") }, ...GROUPS], [t]);

  const handleOpenAttendance = useCallback((session: IClassSession) => {
    console.log("open attendance", session.id);
  }, []);

  const handleEditContent = useCallback((session: IClassSession) => {
    console.log("edit content", session.id);
  }, []);

  const handleInspect = useCallback((session: IClassSession) => {
    setSelectedClass(session);
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearch(value);
    setFilters((prev) => ({ ...prev, subject: value } as any));
  };

  const filteredBySearch = useMemo(() => {
    if (!search.trim()) return filteredSessions;
    const normalized = search.toLowerCase();
    return filteredSessions.filter((session) =>
      `${session.subject} ${session.groupName}`.toLowerCase().includes(normalized),
    );
  }, [filteredSessions, search]);

  const holidayConflicts = useMemo(() => {
    return groupedByWeek.classes.filter((cls) => cls.hasHolidayImpact).map((cls) => cls.start);
  }, [groupedByWeek.classes]);

  const summaryCards = [
    {
      label: t("summary.totalClasses"),
      value: heroStats.total,
      accent: "from-indigo-500/40 to-blue-500/40 text-indigo-900",
    },
    {
      label: t("summary.delivered"),
      value: heroStats.delivered,
      accent: "from-emerald-500/40 to-teal-500/40 text-emerald-900",
    },
    {
      label: t("summary.pendingAttendance"),
      value: heroStats.pendingAttendance,
      accent: "from-amber-500/40 to-orange-500/40 text-amber-900",
    },
  ];

  const selectedStudents = useMemo(() => {
    if (!selectedClass) return [];
    return (
      MOCK_GROUP_STATS.find((group) => group.groupId === selectedClass.groupId)?.students ?? []
    );
  }, [selectedClass]);

  const selectedAttendance = useMemo(() => {
    if (!selectedClass) return undefined;
    return MOCK_ATTENDANCE.find((record) => record.classId === selectedClass.id);
  }, [selectedClass]);

  const detailTitle = selectedClass ? `${selectedClass.subject} · ${selectedClass.groupName}` : undefined;


  return (
    <section className='mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-8'>
      <article className='rounded-3xl border border-border/40 bg-gradient-to-br from-blue-600 via-indigo-500 to-purple-600 px-8 py-10 text-white shadow-2xl'>
        <header className='space-y-4'>
          <span className='inline-flex w-fit items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-white/70'>
            {t("title")}
          </span>
          <div className='space-y-2'>
            <h1 className='text-4xl font-semibold leading-tight'>
              {t("description")}
            </h1>
            <p className='text-white/80'>{t("subheading")}</p>
          </div>
          <div className='flex flex-wrap gap-3'>
            <Buttons color='primary' onClick={() => setOpenBulkModal(true)}>
              {tActions("bulkSchedule")}
            </Buttons>
            <Buttons
              variant='outline'
              onClick={() => setOpenRescheduleModal(true)}>
              {tActions("reschedule")} (Holiday)
            </Buttons>
          </div>
        </header>
      </article>

      <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
        {summaryCards.map((card) => (
          <div
            key={card.label}
            className={`rounded-2xl border border-border/40 bg-gradient-to-br ${card.accent} px-5 py-4 shadow-sm backdrop-blur`}>
            <p className='text-sm font-semibold text-white/80'>{card.label}</p>
            <p className='mt-2 text-3xl font-semibold text-white'>
              {card.value}
            </p>
          </div>
        ))}
      </div>

      <div className='rounded-3xl border border-border/60 bg-white/80 p-6 shadow-lg shadow-primary/5'>
        <div className='grid gap-4 md:grid-cols-4'>
          <label className='flex flex-col text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground'>
            {t("filters.teacher")}
            <select
              className='mt-2 rounded-xl border border-border/60 bg-transparent px-3 py-2 text-sm text-foreground'
              value={filters.teacherId ?? ""}
              onChange={(event) =>
                setFilters((prev) => ({
                  ...prev,
                  teacherId: event.target.value || undefined,
                }))
              }>
              {teacherOptions.map((teacher) => (
                <option key={teacher.id} value={teacher.id}>
                  {teacher.name}
                </option>
              ))}
            </select>
          </label>

          <label className='flex flex-col text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground'>
            {t("filters.group")}
            <select
              className='mt-2 rounded-xl border border-border/60 bg-transparent px-3 py-2 text-sm text-foreground'
              value={filters.groupId ?? ""}
              onChange={(event) =>
                setFilters((prev) => ({
                  ...prev,
                  groupId: event.target.value || undefined,
                }))
              }>
              {groupOptions.map((group) => (
                <option key={group.id} value={group.id}>
                  {group.name}
                </option>
              ))}
            </select>
          </label>

          <label className='flex flex-col text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground'>
            {t("filters.search")}
            <input
              type='search'
              value={search}
              onChange={handleSearchChange}
              placeholder={t("filters.searchPlaceholder")}
              className='mt-2 rounded-xl border border-border/60 bg-transparent px-3 py-2 text-sm text-foreground'
            />
          </label>

          <div className='flex flex-col justify-end gap-2 text-xs'>
            <span className='text-muted-foreground'>
              {t("filters.weekNavigation")}
            </span>
            <div className='flex gap-2'>
              <button
                type='button'
                onClick={() => setCurrentWeekOffset((prev) => prev - 1)}
                className='flex-1 rounded-full border border-border px-3 py-2 text-sm font-semibold text-foreground'>
                {t("filters.prevWeek")}
              </button>
              <button
                type='button'
                onClick={() => setCurrentWeekOffset((prev) => prev + 1)}
                className='flex-1 rounded-full border border-border px-3 py-2 text-sm font-semibold text-foreground'>
                {t("filters.nextWeek")}
              </button>
            </div>
          </div>
        </div>
      </div>

      <ClassScheduleBoardScene
        sessions={filteredBySearch}
        weekLabel={`${t("weekLabel")} ${groupedByWeek.weekIndex}`}
        rangeLabel={formatRange(groupedByWeek.from, groupedByWeek.to)}
        weekStats={weekStats}
        onPrevWeek={() => setCurrentWeekOffset((prev) => prev - 1)}
        onNextWeek={() => setCurrentWeekOffset((prev) => prev + 1)}
        onOpenReschedule={() => setOpenRescheduleModal(true)}
        calendarTitle={t("calendar.title", { default: "Clases por grupo" })}
        calendarSubtitle={t("calendar.subtitle", {
          default: "Calendario semanal",
        })}
        initialDate={groupedByWeek.from}
        holidays={holidayConflicts}
        onSelectSession={handleInspect}
      />

      <ClassList
        sessions={filteredBySearch}
        onOpenAttendance={handleOpenAttendance}
        onEditContent={handleEditContent}
        onInspect={handleInspect}
      />

      <div className='grid gap-6 lg:grid-cols-2'>
        <AttendancePanel
          sessions={filteredBySearch}
          records={MOCK_ATTENDANCE}
          onOpenAttendance={handleOpenAttendance}
        />
        <ContentPanel
          sessions={filteredBySearch}
          contentPlans={MOCK_CONTENT}
          onEditContent={handleEditContent}
        />
      </div>

      <Modal
        size='xl'
        title={t("modals.bulkTitle")}
        description={t("modals.bulkDescription")}
        open={openBulkModal}
        onOpenChange={setOpenBulkModal}>
        <BulkClassCreator
          open={openBulkModal}
          onOpenChange={setOpenBulkModal}
          groupStartDate={academicStartDate}
        />
      </Modal>

      <Modal
        size='xl'
        title={t("modals.rescheduleTitle")}
        description={t("modals.rescheduleDescription")}
        open={openRescheduleModal}
        onOpenChange={setOpenRescheduleModal}>
        <Reschedule
          open={openRescheduleModal}
          onOpenChange={setOpenRescheduleModal}
          sessions={filteredBySearch}
        />
      </Modal>

      <Modal
        size='xl'
        title={detailTitle}
        open={Boolean(selectedClass)}
        onOpenChange={(open) => {
          if (!open) setSelectedClass(null);
        }}>
        {selectedClass && (
          <ClassDetailPanel
            session={selectedClass}
            students={selectedStudents}
            attendanceRecord={selectedAttendance}
          />
        )}
      </Modal>
    </section>
  );
};
