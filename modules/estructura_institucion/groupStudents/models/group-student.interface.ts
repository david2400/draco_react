export interface IGroupStudentRequest {
  group_id: string;
  student_id: string;
  enrollment_date: string;
  status: 'active' | 'suspended' | 'graduated';
  notes?: string;
}
