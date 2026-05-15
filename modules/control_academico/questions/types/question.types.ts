/**
 * Question Types - Discriminated Unions
 * Cada tipo de pregunta tiene su propia estructura tipada
 */

// Tipos de pregunta soportados
export type QuestionType =
  | 'multiple_choice_single'
  | 'multiple_choice_multi'
  | 'true_false'
  | 'open_short'
  | 'open_long'
  | 'numeric'
  | 'scale'
  | 'ordering'
  | 'matching';

// Niveles de dificultad
export type Difficulty = 'intro' | 'basic' | 'intermediate' | 'advanced';

// Importar tipos relacionados
import type { Option, OrderItem, MatchItem, MatchPair, ScaleLabel } from './option.types';
import type { QuestionMedia } from './media.types';

// Metadatos opcionales
export interface QuestionMetadata {
  tags?: string[];
  category?: string;
  source?: string;
  notes?: string;
}

// Base compartida por todas las preguntas
export interface QuestionBase {
  id: string;
  questionText: string;
  questionType: QuestionType;
  difficulty: Difficulty;
  maxScore: number;
  themeId: string;
  media?: QuestionMedia[];
  metadata?: QuestionMetadata;
  version?: number;
  createdAt?: string;
  updatedAt?: string;
}

// Opción múltiple - respuesta única
export interface MultipleChoiceSingleQuestion extends QuestionBase {
  questionType: 'multiple_choice_single';
  options: Option[];
  correctOptionId: string;
}

// Opción múltiple - múltiples respuestas
export interface MultipleChoiceMultiQuestion extends QuestionBase {
  questionType: 'multiple_choice_multi';
  options: Option[];
  correctOptionIds: string[];
  minCorrect?: number;
  maxCorrect?: number;
}

// Verdadero / Falso
export interface TrueFalseQuestion extends QuestionBase {
  questionType: 'true_false';
  correctAnswer: boolean;
}

// Respuesta abierta corta
export interface OpenShortQuestion extends QuestionBase {
  questionType: 'open_short';
  expectedKeywords?: string[];
  maxLength?: number;
  caseSensitive?: boolean;
}

// Respuesta abierta larga
export interface OpenLongQuestion extends QuestionBase {
  questionType: 'open_long';
  rubric?: RubricItem[];
  minLength?: number;
  maxLength?: number;
}

// Rúbrica para evaluación de respuestas largas
export interface RubricItem {
  id: string;
  criterion: string;
  maxPoints: number;
  levels?: RubricLevel[];
}

export interface RubricLevel {
  points: number;
  description: string;
}

// Pregunta numérica
export interface NumericQuestion extends QuestionBase {
  questionType: 'numeric';
  correctValue: number;
  tolerance?: number;
  unit?: string;
}

// Escala (Likert, rangos)
export interface ScaleQuestion extends QuestionBase {
  questionType: 'scale';
  minValue: number;
  maxValue: number;
  step: number;
  labels?: ScaleLabel[];
}

// Ordenamiento
export interface OrderingQuestion extends QuestionBase {
  questionType: 'ordering';
  items: OrderItem[];
  correctOrder: string[];
}

// Emparejamiento
export interface MatchingQuestion extends QuestionBase {
  questionType: 'matching';
  leftItems: MatchItem[];
  rightItems: MatchItem[];
  correctPairs: MatchPair[];
}

// Union type principal - discriminated union
export type Question =
  | MultipleChoiceSingleQuestion
  | MultipleChoiceMultiQuestion
  | TrueFalseQuestion
  | OpenShortQuestion
  | OpenLongQuestion
  | NumericQuestion
  | ScaleQuestion
  | OrderingQuestion
  | MatchingQuestion;

// Type guard helpers
export function isMultipleChoiceSingle(q: Question): q is MultipleChoiceSingleQuestion {
  return q.questionType === 'multiple_choice_single';
}

export function isMultipleChoiceMulti(q: Question): q is MultipleChoiceMultiQuestion {
  return q.questionType === 'multiple_choice_multi';
}

export function isTrueFalse(q: Question): q is TrueFalseQuestion {
  return q.questionType === 'true_false';
}

export function isOpenShort(q: Question): q is OpenShortQuestion {
  return q.questionType === 'open_short';
}

export function isOpenLong(q: Question): q is OpenLongQuestion {
  return q.questionType === 'open_long';
}

export function isNumeric(q: Question): q is NumericQuestion {
  return q.questionType === 'numeric';
}

export function isScale(q: Question): q is ScaleQuestion {
  return q.questionType === 'scale';
}

export function isOrdering(q: Question): q is OrderingQuestion {
  return q.questionType === 'ordering';
}

export function isMatching(q: Question): q is MatchingQuestion {
  return q.questionType === 'matching';
}
