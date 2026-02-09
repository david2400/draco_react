import type {IClassroomCreateRequest} from '../models/classroom.interface';

export type ClassroomStatus = 'active' | 'maintenance' | 'inactive';

export interface IClassroomRow extends IClassroomCreateRequest {
  id: string;
  occupancy: number;
  groupsCount: number;
  shiftsCovered: Array<'morning' | 'afternoon' | 'evening'>;
  status: ClassroomStatus;
  updatedAt: string;
  linkedGroups: string[];
}

export const MOCK_CLASSROOMS: IClassroomRow[] = [
  {
    id: 'classroom-101',
    name: 'Laboratorio STEAM',
    code: 'LAB-STEAM',
    building: 'Innovación',
    floor: '2',
    capacity: '28',
    resources: 'Impresora 3D, kits de robótica, proyectores 4K',
    description: 'Espacio flexible para proyectos interdisciplinarios centrados en ciencia y tecnología.',
    occupancy: 25,
    groupsCount: 2,
    shiftsCovered: ['morning', 'afternoon'],
    status: 'active',
    updatedAt: '2025-01-12T10:30:00Z',
    linkedGroups: ['group-1', 'group-2'],
  },
  {
    id: 'classroom-202',
    name: 'Sala Creativa',
    code: 'CRTV-202',
    building: 'Artes',
    floor: '3',
    capacity: '24',
    resources: 'Paredes magnéticas, audio envolvente, tablets de dibujo',
    description: 'Ideal para proyectos de ideación y trabajo colaborativo con grupos reducidos.',
    occupancy: 18,
    groupsCount: 1,
    shiftsCovered: ['afternoon'],
    status: 'active',
    updatedAt: '2025-01-08T09:05:00Z',
    linkedGroups: ['group-2'],
  },
  {
    id: 'classroom-303',
    name: 'Aula Híbrida 303',
    code: 'HB-303',
    building: 'Central',
    floor: '3',
    capacity: '32',
    resources: 'Pantallas táctiles, cámaras PTZ, monitoreo ambiental',
    description: 'Configurada para sesiones híbridas sincrónicas y asincrónicas.',
    occupancy: 0,
    groupsCount: 0,
    shiftsCovered: ['evening'],
    status: 'maintenance',
    updatedAt: '2025-01-20T15:45:00Z',
    linkedGroups: [],
  },
];
