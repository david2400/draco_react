"use client";

import { useMemo, useState } from "react";
import { IClassFilters, IClassSession, IWeekAggregate } from "../models/class.model";
import { useAcademicWeeks } from "./useAcademicWeeks";

interface Options {
  sessions: IClassSession[];
  academicStartDate: string;
}

export const useClassFilters = ({ sessions, academicStartDate }: Options) => {
  const [filters, setFilters] = useState<IClassFilters>({});
  const [currentWeekOffset, setCurrentWeekOffset] = useState(0);
  const { getWeekRange } = useAcademicWeeks(academicStartDate);

  const activeRange = useMemo(() => getWeekRange(currentWeekOffset), [currentWeekOffset, getWeekRange]);

  const filteredSessions = useMemo(() => {
    return sessions.filter((session) => {
      if (filters.teacherId && session.teacherId !== filters.teacherId) return false;
      if (filters.groupId && session.groupId !== filters.groupId) return false;
      if (filters.from && new Date(session.start) < new Date(filters.from)) return false;
      if (filters.to && new Date(session.end) > new Date(filters.to)) return false;
      const withinWeek = new Date(session.start) >= activeRange.from && new Date(session.start) < activeRange.to;
      return withinWeek;
    });
  }, [sessions, filters, activeRange]);

  const groupedByWeek: IWeekAggregate = useMemo(() => {
    return {
      weekIndex: currentWeekOffset + 1,
      from: activeRange.from.toISOString(),
      to: activeRange.to.toISOString(),
      classes: filteredSessions,
    };
  }, [filteredSessions, activeRange, currentWeekOffset]);

  const stats = useMemo(() => {
    const total = filteredSessions.length;
    const delivered = filteredSessions.filter((cls) => cls.status === "delivered").length;
    const postponed = filteredSessions.filter((cls) => cls.status === "postponed").length;
    return { total, delivered, postponed };
  }, [filteredSessions]);

  return {
    filters,
    setFilters,
    filteredSessions,
    groupedByWeek,
    weekRange: activeRange,
    weekStats: stats,
    currentWeekOffset,
    setCurrentWeekOffset,
  };
};
