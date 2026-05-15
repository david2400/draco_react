export interface IClassroomCreateRequest {
  name: string;
  code: string;
  building: string;
  floor: string;
  capacity: string;
  resources?: string;
  description?: string;
}
