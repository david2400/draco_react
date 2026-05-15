"use client";

import { useCallback, useMemo, useState } from "react";
import {
  IClassSession,
  IHolidayConflict,
  IReschedulePreview,
} from "../models/class.model";

const addDaysSkippingHolidays = (date: Date, holidays: IHolidayConflict[], step = 1) => {
  let next = new Date(date);
  do {
    next = new Date(next.getTime() + step * 24 * 60 * 60 * 1000);
  } while (holidays.some((holiday) => holiday.date.slice(0, 10) === next.toISOString().slice(0, 10)));
  return next;
};

interface Options {
  sessions: IClassSession[];
  holidays?: IHolidayConflict[];
}

export const useReschedulePreview = ({ sessions, holidays = [] }: Options) => {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [strategy, setStrategy] = useState<"push_one_day" | "next_available">("push_one_day");
  const [preview, setPreview] = useState<IReschedulePreview[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const selectedSessions = useMemo(
    () => sessions.filter((session) => selectedIds.includes(session.id)),
    [selectedIds, sessions],
  );

  const generatePreview = useCallback(async () => {
    if (!selectedSessions.length) return false;
    setIsLoading(true);
    const result: IReschedulePreview[] = selectedSessions.map((session) => {
      const originalDate = new Date(session.start);
      const targetDate =
        strategy === "push_one_day"
          ? addDaysSkippingHolidays(originalDate, holidays, 1)
          : addDaysSkippingHolidays(originalDate, holidays, 1);

      return {
        classId: session.id,
        originalDate: session.start,
        suggestedDate: targetDate.toISOString(),
        reason: strategy === "push_one_day" ? "Desplazado por festivo" : "Siguiente fecha disponible",
      };
    });
    setPreview(result);
    setIsLoading(false);
    return true;
  }, [holidays, selectedSessions, strategy]);

  const applyChanges = useCallback(async () => {
    if (!preview.length) return false;
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setIsLoading(false);
    return true;
  }, [preview]);

  const reset = () => {
    setPreview([]);
    setSelectedIds([]);
  };

  return {
    selectedIds,
    setSelectedIds,
    strategy,
    setStrategy,
    preview,
    isLoading,
    generatePreview,
    applyChanges,
    reset,
  };
};
