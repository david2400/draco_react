"use client";

import { useMemo, useState } from "react";
import {
  IBulkClassInput,
  IBulkClassPreview,
  IHolidayConflict,
  IClassSession,
} from "../models/class.model";

const addDays = (date: Date, days: number) => {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
};

const setTimeFromHour = (date: Date, hour: string) => {
  const [hours = 0, minutes = 0] = hour
    .split(":")
    .map((segment) => Number(segment)) as [number?, number?];
  const d = new Date(date);
  d.setHours(hours, minutes, 0, 0);
  return d;
};

interface Options {
  holidays?: IHolidayConflict[];
  template?: Partial<IClassSession>;
}

export const useBulkScheduling = ({ holidays = [], template = {} }: Options = {}) => {
  const [preview, setPreview] = useState<IBulkClassPreview | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const conflicts = preview?.conflicts ?? [];

  const generatePreview = async (payload: IBulkClassInput) => {
    setIsLoading(true);
    const generated: Omit<IClassSession, "id">[] = [];
    const conflictDates: string[] = [];
    const from = new Date(payload.range.from);
    const to = new Date(payload.range.to);

    for (let cursor = new Date(from); cursor <= to; cursor = addDays(cursor, 1)) {
      const dayOfWeek = cursor.getDay();
      if (!payload.days.includes(dayOfWeek)) continue;
      const start = setTimeFromHour(cursor, payload.startHour);
      const end = setTimeFromHour(cursor, payload.endHour);

      const isoStart = start.toISOString();
      const isoEnd = end.toISOString();
      const hasHoliday = holidays.some((holiday) => holiday.date.slice(0, 10) === isoStart.slice(0, 10));
      if (hasHoliday) {
        conflictDates.push(isoStart);
      }

      generated.push({
        ...template,
        groupId: payload.groupId,
        groupName: template.groupName ?? "",
        teacherId: template.teacherId ?? "",
        teacherName: template.teacherName ?? "",
        subject: template.subject ?? "",
        modality: template.modality ?? "onsite",
        start: isoStart,
        end: isoEnd,
        weekIndex: 0,
        status: "scheduled",
        attendanceStatus: "pending",
      } as Omit<IClassSession, "id">);
    }

    setPreview({
      ...payload,
      weekIndexes: [],
      generatedClasses: generated,
      conflicts: conflictDates,
    });

    setIsLoading(false);
    return generated.length > 0;
  };

  const save = async () => {
    if (!preview) return false;
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 600));
    setIsLoading(false);
    return true;
  };

  const reset = () => setPreview(null);

  return {
    preview,
    conflicts,
    isLoading,
    generatePreview,
    save,
    reset,
  };
};
