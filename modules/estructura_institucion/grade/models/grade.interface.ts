export interface IGradeCreateRequest {
  name: string;
  code: string;
  education_level: string;
  coordinator: string;
  modality: string;
  capacity: string;
  description?: string;
}
