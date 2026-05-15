/**
 * Option Types - Tipos para opciones de respuesta
 */

import type { QuestionMedia } from './media.types';

// Opción básica para preguntas de selección
export interface Option {
  id: string;
  text: string;
  media?: QuestionMedia;
  order?: number;
}

// Item para preguntas de ordenamiento
export interface OrderItem {
  id: string;
  text: string;
  media?: QuestionMedia;
}

// Item para preguntas de emparejamiento
export interface MatchItem {
  id: string;
  text: string;
  media?: QuestionMedia;
}

// Par correcto para emparejamiento
export interface MatchPair {
  leftId: string;
  rightId: string;
}

// Etiqueta para escalas
export interface ScaleLabel {
  value: number;
  text: string;
}

// Tipo para crear nuevas opciones
export interface CreateOptionInput {
  text: string;
  media?: QuestionMedia;
}

// Helper para generar IDs únicos
export function generateOptionId(): string {
  return `opt_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

// Helper para crear una opción vacía
export function createEmptyOption(): Option {
  return {
    id: generateOptionId(),
    text: '',
  };
}

// Helper para crear un item de ordenamiento vacío
export function createEmptyOrderItem(): OrderItem {
  return {
    id: generateOptionId(),
    text: '',
  };
}

// Helper para crear un item de emparejamiento vacío
export function createEmptyMatchItem(): MatchItem {
  return {
    id: generateOptionId(),
    text: '',
  };
}
