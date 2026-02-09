"use client";

import { useMemo } from "react";

const startOfISOWeek = (value: Date) => {
  const date = new Date(value);
  const day = date.getDay();
  const diff = (day + 6) % 7; // Monday as start of week
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() - diff);
  return date;
};

const addWeeks = (value: Date, weeks: number) => {
  const date = new Date(value);
  date.setDate(date.getDate() + weeks * 7);
  return date;
};

const formatRangeLabel = (from: Date, to: Date) => {
  const formatter = new Intl.DateTimeFormat("es-CO", {
    month: "short",
    day: "numeric",
  });
  return `${formatter.format(from)} - ${formatter.format(new Date(to.getTime() - 1))}`;
};

export const useAcademicWeeks = (startDateIso: string) => {
  const baseWeekStart = useMemo(() => startOfISOWeek(new Date(startDateIso)), [startDateIso]);

  const getWeekRange = (offset: number) => {
    const from = addWeeks(baseWeekStart, offset);
    const to = addWeeks(from, 1);
    return { from, to, label: formatRangeLabel(from, to) };
  };

  const getWeekLabel = (date: Date) => {
    const diff = Math.floor((date.getTime() - baseWeekStart.getTime()) / (7 * 24 * 3600 * 1000));
    return diff >= 0 ? `Semana ${diff + 1}` : `Semana ${diff + 1}`;
  };

  return {
    baseWeekStart,
    getWeekRange,
    getWeekLabel,
  };
};
