import { IBaseEntity } from "@/lib/entitys/base.entity";

export type ClassStatus = "scheduled" | "delivered" | "postponed";
export type AttendanceStatus = "pending" | "completed";
export type ModalityType = "onsite" | "remote";

export interface IClassSession extends IBaseEntity {
  id: number;
  groupId: string;
  groupName: string;
  teacherId: string;
  teacherName: string;
  subject: string;
  room?: string;
  modality: ModalityType;
  start: string; // ISO string
  end: string; // ISO string
  weekIndex: number;
  status: ClassStatus;
  hasHolidayImpact?: boolean;
  attendanceStatus: AttendanceStatus;
  contentPlan?: string;
  contentDelivered?: string;
  meetingLink?: string;
}

export interface IWeekAggregate {
  weekIndex: number;
  from: string;
  to: string;
  classes: IClassSession[];
}

export interface IClassFilters {
  teacherId?: string;
  groupId?: string;
  from?: string;
  to?: string;
  subject?: string;
}

export interface IBulkClassInput {
  groupId: string;
  range: { from: string; to: string };
  days: number[]; // 0-6 (sun-sat)
  startHour: string; // HH:mm
  endHour: string; // HH:mm
}

export interface IBulkClassPreview extends IBulkClassInput {
  weekIndexes: number[];
  generatedClasses: Omit<IClassSession, "id">[];
  conflicts: string[];
}

export interface IHolidayConflict {
  date: string;
  reason: string;
}

export interface IAttendanceRecord {
  classId: number;
  totalStudents: number;
  present: number;
  updatedAt: string;
}

export interface IContentHistoryItem {
  date: string;
  summary: string;
}

export interface IContentPlan {
  classId: number;
  weekIndex: number;
  planned: string;
  delivered?: string;
  history: IContentHistoryItem[];
}

export interface IReschedulePreview {
  classId: number;
  originalDate: string;
  suggestedDate: string;
  reason: string;
}

export interface IStudentAttendanceSummary {
  id: string;
  name: string;
  attendanceCount: number;
  totalSessions: number;
}

export interface IGroupStudentStats {
  groupId: string;
  students: IStudentAttendanceSummary[];
}
