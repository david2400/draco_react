/**
 * Control Académico - Classes module exports
 */

// Models & data
export * from "./models/class.model";
export * from "./mocks/data";

// Components
export { ClassManager } from "./components/class-manager";
export { ClassScheduleBoard } from "./components/class-schedule-board";
export { ClassAttendanceWorkspace } from "./components/class-attendance-workspace";
export { BulkClassCreator } from "./components/bulk-class-creator";

// Scenes
export { ClassDetailPanel } from "./scenes/class-detail-panel";
export { ClassTimelineScene } from "./scenes/class-timeline";
export { ClassList } from "./scenes/class-list";
export { ClassCard } from "./scenes/class-card";
export { WeekHeader } from "./scenes/week-header";
export { HolidayWarning } from "./scenes/holiday-warning";
export { AttendancePanel } from "./scenes/attendance-panel";
export { ContentPanel } from "./scenes/content-panel";
export { Reschedule } from "./scenes/reschedule";

// Hooks
export { useAcademicWeeks } from "./hooks/useAcademicWeeks";
export { useClassFilters } from "./hooks/useClassFilters";
export { useBulkScheduling } from "./hooks/useBulkScheduling";
export { useReschedulePreview } from "./hooks/useReschedulePreview";

// Schemas
export * from "./schemas/class.schema";
