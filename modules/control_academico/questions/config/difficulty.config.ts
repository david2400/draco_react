/**
 * Difficulty Config - Configuración de niveles de dificultad
 */

import type { Difficulty } from '../types';

export interface DifficultyConfig {
  value: Difficulty;
  label: string;
  labelKey: string; // Key para i18n
  color: string;
  order: number;
}

export const DIFFICULTY_CONFIG: Record<Difficulty, DifficultyConfig> = {
  intro: {
    value: 'intro',
    label: 'Introductorio',
    labelKey: 'difficulty.intro',
    color: 'bg-green-100 text-green-800',
    order: 1,
  },
  basic: {
    value: 'basic',
    label: 'Básico',
    labelKey: 'difficulty.basic',
    color: 'bg-blue-100 text-blue-800',
    order: 2,
  },
  intermediate: {
    value: 'intermediate',
    label: 'Intermedio',
    labelKey: 'difficulty.intermediate',
    color: 'bg-yellow-100 text-yellow-800',
    order: 3,
  },
  advanced: {
    value: 'advanced',
    label: 'Avanzado',
    labelKey: 'difficulty.advanced',
    color: 'bg-red-100 text-red-800',
    order: 4,
  },
};

/**
 * Obtiene todas las dificultades ordenadas
 */
export function getAllDifficulties(): DifficultyConfig[] {
  return Object.values(DIFFICULTY_CONFIG).sort((a, b) => a.order - b.order);
}

/**
 * Obtiene la configuración de una dificultad
 */
export function getDifficultyConfig(difficulty: Difficulty): DifficultyConfig {
  return DIFFICULTY_CONFIG[difficulty];
}

/**
 * Obtiene opciones para select de dificultad
 */
export function getDifficultyOptions(): Array<{ id: string; value: string; label: string }> {
  return getAllDifficulties().map((d) => ({
    id: d.value,
    value: d.value,
    label: d.label,
  }));
}
