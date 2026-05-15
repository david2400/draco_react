export interface IStudentGuardianLinkRequest {
  student_id: string;
  guardian_id: string;
  relationship_type: string;
  priority: string;
  custody_level: string;
  start_date: string;
  notes?: string;
}
