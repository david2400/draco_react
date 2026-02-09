export interface IGroupCreateRequest {
  name: string;
  grade_id: string;
  tutor: string;
  shift: string;
  classroom: string;
  max_students: string;
  start_date: string;
  notes?: string;
}
