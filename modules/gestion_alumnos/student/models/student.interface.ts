export interface IStudentCreateRequest {
  first_name: string;
  second_name?: string;
  first_last_name: string;
  second_last_name?: string;
  document_type: string;
  document_number: string;
  blood_type?: string;
  eps?: string;
  birth_date: string;
  gender: string;
  grade: string;
  email: string;
  phone: string;
  address: string;
  neighborhood?: string;
  notes?: string;
}
