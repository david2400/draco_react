/**
 * Question Registry - Registro dinámico de tipos de pregunta
 * Permite agregar nuevos tipos sin modificar código existente
 */

import type { ComponentType } from 'react';
import type { z } from 'zod';
import type { Question, QuestionType } from '../types';

// Props para componentes de renderizado
export interface QuestionRendererProps<T extends Question = Question> {
  question: T;
  value?: unknown;
  onChange?: (value: unknown) => void;
  disabled?: boolean;
  showFeedback?: boolean;
  showCorrectAnswer?: boolean;
}

// Props para componentes de edición
export interface QuestionEditorProps<T extends Question = Question> {
  errors?: Record<string, string>;
}

// Configuración de un tipo de pregunta
export interface QuestionTypeConfig<T extends Question = Question> {
  type: T['questionType'];
  label: string;
  labelKey: string; // Key para i18n
  icon: string;
  description?: string;
  renderer: () => Promise<{ default: ComponentType<QuestionRendererProps<T>> }>;
  editor: () => Promise<{ default: ComponentType<QuestionEditorProps<T>> }>;
  defaultValue: () => Partial<T>;
  schema: () => Promise<{ default: z.ZodSchema }>;
}

// Registro interno
const questionRegistry = new Map<QuestionType, QuestionTypeConfig>();

/**
 * Registra un nuevo tipo de pregunta
 */
export function registerQuestionType<T extends Question>(
  config: QuestionTypeConfig<T>
): void {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  questionRegistry.set(config.type, config as any);
}

/**
 * Obtiene la configuración de un tipo de pregunta
 */
export function getQuestionConfig(type: QuestionType): QuestionTypeConfig | undefined {
  return questionRegistry.get(type);
}

/**
 * Obtiene todos los tipos de pregunta registrados
 */
export function getAllQuestionTypes(): QuestionTypeConfig[] {
  return Array.from(questionRegistry.values());
}

/**
 * Verifica si un tipo está registrado
 */
export function isQuestionTypeRegistered(type: QuestionType): boolean {
  return questionRegistry.has(type);
}

/**
 * Obtiene los valores por defecto para un tipo
 */
export function getDefaultValues(type: QuestionType): Partial<Question> | undefined {
  const config = questionRegistry.get(type);
  return config?.defaultValue();
}

/**
 * Obtiene el schema de validación para un tipo
 */
export async function getSchemaForType(type: QuestionType): Promise<z.ZodSchema | undefined> {
  const config = questionRegistry.get(type);
  if (!config) return undefined;
  const module = await config.schema();
  return module.default;
}
