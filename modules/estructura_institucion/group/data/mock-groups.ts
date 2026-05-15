import {IGroupCreateRequest} from '../models/group.interface';

export interface IGroupRow extends IGroupCreateRequest {
  id: string;
  students_assigned: number;
  status: 'active' | 'suspended' | 'graduated';
}

export const MOCK_GROUPS: IGroupRow[] = [
  {
    id: 'group-1',
    name: 'Primero A - Mañana',
    grade_id: 'Primero',
    tutor: 'Laura Méndez',
    shift: 'morning',
    classroom: 'Aula 101',
    max_students: '30',
    start_date: '2025-02-01',
    notes: 'Enfoque en transición lectora.',
    students_assigned: 28,
    status: 'active',
  },
  {
    id: 'group-2',
    name: 'Quinto B - Tarde',
    grade_id: 'Quinto',
    tutor: 'Mauricio Pérez',
    shift: 'afternoon',
    classroom: 'Laboratorio 2',
    max_students: '32',
    start_date: '2025-02-01',
    notes: 'Club de ciencia semanal.',
    students_assigned: 30,
    status: 'active',
  },
  {
    id: 'group-3',
    name: 'Octavo Único - Nocturno',
    grade_id: 'Octavo',
    tutor: 'Sonia Rojas',
    shift: 'evening',
    classroom: 'Sala híbrida',
    max_students: '28',
    start_date: '2025-02-01',
    notes: 'Modalidad híbrida experimental.',
    students_assigned: 25,
    status: 'suspended',
  },
];
