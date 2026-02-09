/** @format */

"use client";

import React, { useMemo, useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import { useRouter, useParams } from "next/navigation";
import { Buttons } from "@repo/ui/buttons/scenes";
import { Modal } from "@repo/ui/modals/scenes/dialog/modal";

import { ClassScheduleBoardScene } from "../scenes/class-schedule-board";
import { useClassFilters } from "../hooks/useClassFilters";
import { IClassSession } from "../models/class.model";
import { ClassDetailPanel } from "../scenes/class-detail-panel";
import { MOCK_ATTENDANCE, MOCK_CLASSES, MOCK_GROUP_STATS } from "../mocks/data";

const academicStartDate = (MOCK_CLASSES.length ? MOCK_CLASSES : [])[0]
  ? MOCK_CLASSES.reduce((min, session) => (new Date(session.start) < new Date(min.start) ? session : min)).start
  : new Date().toISOString();

const formatRange = (fromIso: string, toIso: string) => {
  const formatter = new Intl.DateTimeFormat("es-CO", {
    month: "short",
    day: "numeric",
  });
  return `${formatter.format(new Date(fromIso))} - ${formatter.format(new Date(new Date(toIso).getTime() - 1))}`;
};

interface ClassScheduleBoardContainerProps {
  onSelectSession?: (session: IClassSession) => void;
  onOpenReschedule?: () => void;
}

export const ClassScheduleBoard: React.FC<ClassScheduleBoardContainerProps> = ({
  onSelectSession,
  onOpenReschedule,
}) => {
  const t = useTranslations("ControlAcademico.classes");
  const router = useRouter();
  const params = useParams<{ locale?: string; grupoId?: string }>();

  const { filteredSessions, groupedByWeek, weekStats, setCurrentWeekOffset } = useClassFilters({
    sessions: MOCK_CLASSES,
    academicStartDate,
  });

  const holidayConflicts = useMemo(() => {
    return groupedByWeek.classes.filter((cls) => cls.hasHolidayImpact).map((cls) => cls.start);
  }, [groupedByWeek.classes]);

  const [selectedSession, setSelectedSession] = useState<IClassSession | null>(null);

  const selectedStudents = useMemo(() => {
    if (!selectedSession) return [];
    return (
      MOCK_GROUP_STATS.find((group) => group.groupId === selectedSession.groupId)?.students ?? []
    );
  }, [selectedSession]);

  const selectedAttendance = useMemo(() => {
    if (!selectedSession) return undefined;
    return MOCK_ATTENDANCE.find((record) => record.classId === selectedSession.id);
  }, [selectedSession]);

  const detailTitle = selectedSession ? `${selectedSession.subject} · ${selectedSession.groupName}` : undefined;

  const handleSelectSession = useCallback(
    (session: IClassSession) => {
      setSelectedSession(session);
      onSelectSession?.(session);
    },
    [onSelectSession],
  );

  const handleNavigateToAttendance = useCallback(() => {
    if (!selectedSession) return;
    const locale = params?.locale ?? "es";
    const targetGroup = params?.grupoId ?? selectedSession.groupId;
    router.push(`/${locale}/control_academico/clases/${targetGroup}/${selectedSession.id}/asistencia`);
  }, [params?.grupoId, params?.locale, router, selectedSession]);

  return (
    <>
      <ClassScheduleBoardScene
        sessions={filteredSessions}
        weekLabel={`${t("weekLabel")} ${groupedByWeek.weekIndex}`}
        rangeLabel={formatRange(groupedByWeek.from, groupedByWeek.to)}
        weekStats={weekStats}
        onPrevWeek={() => setCurrentWeekOffset((prev) => prev - 1)}
        onNextWeek={() => setCurrentWeekOffset((prev) => prev + 1)}
        onOpenReschedule={onOpenReschedule ?? (() => {})}
        calendarTitle={t("calendar.title", { defaultMessage: "Clases por grupo" })}
        calendarSubtitle={t("calendar.subtitle", { defaultMessage: "Calendario semanal" })}
        initialDate={groupedByWeek.from}
        holidays={holidayConflicts}
        onSelectSession={handleSelectSession}
      />

      <Modal
        size='xl'
        title={detailTitle}
        description={selectedSession?.groupName}
        open={Boolean(selectedSession)}
        onOpenChange={(open) => {
          if (!open) setSelectedSession(null);
        }}
        footer={
          <div className='flex w-full justify-end gap-3'>
            <Buttons variant='ghost' onClick={() => setSelectedSession(null)}>
              {t("actions.reschedule")}
            </Buttons>
            <Buttons color='primary' onClick={handleNavigateToAttendance}>
              {t("cta.viewAttendance")}
            </Buttons>
          </div>
        }
      >
        {selectedSession && (
          <ClassDetailPanel
            session={selectedSession}
            students={selectedStudents}
            attendanceRecord={selectedAttendance}
          />
        )}
      </Modal>
    </>
  );
};

export default ClassScheduleBoard;
