export interface IGuardianCreateRequest {
  first_name: string;
  second_name?: string;
  last_name: string;
  document_type: string;
  document_number: string;
  email: string;
  phone: string;
  phone_alt?: string;
  address: string;
  occupation?: string;
  company?: string;
  relationship_type: string;
  notes?: string;
}
