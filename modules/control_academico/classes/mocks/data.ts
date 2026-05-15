import {
  IAttendanceRecord,
  IClassSession,
  IContentPlan,
  IGroupStudentStats,
  IHolidayConflict,
} from "../models/class.model";

const addDays = (date: Date, days: number) => {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
};

const addHours = (date: Date, hours: number) => {
  const next = new Date(date);
  next.setHours(next.getHours() + hours);
  return next;
};

const formatISO = (date: Date) => date.toISOString();

const baseWeek = new Date("2026-02-02T08:00:00-05:00");

const now = new Date();

const buildClass = (overrides: Partial<IClassSession>): IClassSession => ({
  id: Math.floor(Math.random() * 100000),
  groupId: "grp-1",
  groupName: "Matemáticas Avanzadas",
  teacherId: "tch-1",
  teacherName: "Laura Pardo",
  subject: "Matemáticas",
  modality: "onsite",
  start: formatISO(baseWeek),
  end: formatISO(addHours(baseWeek, 2)),
  weekIndex: 1,
  status: "scheduled",
  attendanceStatus: "pending",
  created_at: now,
  updated_at: now,
  meetingLink: "https://meet.kleverkid.com/session/abc123",
  ...overrides,
});

export const MOCK_CLASSES: IClassSession[] = [
  buildClass({
    id: 1001,
    groupId: "grp-1",
    groupName: "Matemáticas Avanzadas",
    teacherId: "tch-1",
    teacherName: "Laura Pardo",
    subject: "Cálculo diferencial",
    start: formatISO(baseWeek),
    end: formatISO(addHours(baseWeek, 2)),
    status: "delivered",
    attendanceStatus: "completed",
    contentPlan: "Límites laterales",
    contentDelivered: "Resolución de ejercicios en tablero",
    meetingLink: "https://meet.kleverkid.com/mat101",
  }),
  buildClass({
    id: 1002,
    groupId: "grp-2",
    groupName: "Lenguaje Integral 8º",
    teacherId: "tch-2",
    teacherName: "Manuel Rivas",
    subject: "Lectura crítica",
    start: formatISO(addDays(baseWeek, 1)),
    end: formatISO(addHours(addDays(baseWeek, 1), 2)),
    modality: "remote",
    status: "scheduled",
    weekIndex: 1,
    meetingLink: "https://meet.kleverkid.com/lang201",
  }),
  buildClass({
    id: 1003,
    groupId: "grp-3",
    groupName: "Ciencias Naturales 7º",
    teacherId: "tch-3",
    teacherName: "Sandra Ibáñez",
    subject: "Evolución",
    start: formatISO(addDays(baseWeek, 2)),
    end: formatISO(addHours(addDays(baseWeek, 2), 2)),
    status: "postponed",
    hasHolidayImpact: true,
    weekIndex: 1,
  }),
  buildClass({
    id: 1004,
    groupId: "grp-2",
    groupName: "Lenguaje Integral 8º",
    teacherId: "tch-2",
    teacherName: "Manuel Rivas",
    subject: "Argumentación",
    start: formatISO(addDays(baseWeek, 7)),
    end: formatISO(addHours(addDays(baseWeek, 7), 2)),
    weekIndex: 2,
  }),
  buildClass({
    id: 1005,
    groupId: "grp-4",
    groupName: "Historia 6º",
    teacherId: "tch-4",
    teacherName: "Camila Rodríguez",
    subject: "Independencia",
    start: formatISO(addDays(baseWeek, 8)),
    end: formatISO(addHours(addDays(baseWeek, 8), 2)),
    weekIndex: 2,
  }),
  buildClass({
    id: 1006,
    groupId: "grp-1",
    groupName: "Matemáticas Avanzadas",
    teacherId: "tch-1",
    teacherName: "Laura Pardo",
    subject: "Derivadas",
    start: formatISO(addDays(baseWeek, 9)),
    end: formatISO(addHours(addDays(baseWeek, 9), 2)),
    weekIndex: 2,
  }),
];

export const MOCK_ATTENDANCE: IAttendanceRecord[] = [
  {
    classId: 1001,
    totalStudents: 32,
    present: 30,
    updatedAt: formatISO(addHours(baseWeek, 3)),
  },
  {
    classId: 1002,
    totalStudents: 30,
    present: 0,
    updatedAt: "",
  },
];

export const MOCK_CONTENT: IContentPlan[] = [
  {
    classId: 1001,
    weekIndex: 1,
    planned: "Revisión de límites y salto entre funciones",
    delivered: "Actividades prácticas con GeoGebra",
    history: [
      {
        date: formatISO(addDays(baseWeek, 0)),
        summary: "Ajustes al plan por diagnósticos previos",
      },
      {
        date: formatISO(addDays(baseWeek, 1)),
        summary: "Complementos sugeridos por coordinación",
      },
    ],
  },
  {
    classId: 1003,
    weekIndex: 1,
    planned: "Darwin y síntesis moderna",
    history: [],
  },
];

export const ACADEMIC_HOLIDAYS: IHolidayConflict[] = [
  { date: formatISO(addDays(baseWeek, 2)), reason: "Festivo nacional" },
  { date: formatISO(addDays(baseWeek, 10)), reason: "Jornada institucional" },
];

export const TEACHERS = [
  { id: "tch-1", name: "Laura Pardo" },
  { id: "tch-2", name: "Manuel Rivas" },
  { id: "tch-3", name: "Sandra Ibáñez" },
  { id: "tch-4", name: "Camila Rodríguez" },
];

export const GROUPS = [
  { id: "grp-1", name: "Matemáticas Avanzadas" },
  { id: "grp-2", name: "Lenguaje Integral 8º" },
  { id: "grp-3", name: "Ciencias Naturales 7º" },
  { id: "grp-4", name: "Historia 6º" },
];

export const MOCK_GROUP_STATS: IGroupStudentStats[] = [
  {
    groupId: "grp-1",
    students: [
      { id: "stu-1", name: "Valentina Díaz", attendanceCount: 8, totalSessions: 10 },
      { id: "stu-2", name: "Juan Esteban", attendanceCount: 9, totalSessions: 10 },
      { id: "stu-3", name: "Sara Méndez", attendanceCount: 7, totalSessions: 10 },
    ],
  },
  {
    groupId: "grp-2",
    students: [
      { id: "stu-4", name: "Mateo Silva", attendanceCount: 6, totalSessions: 8 },
      { id: "stu-5", name: "Lucía Álvarez", attendanceCount: 8, totalSessions: 8 },
    ],
  },
];
