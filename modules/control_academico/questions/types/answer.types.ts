/**
 * Answer Types - Tipos para respuestas de usuarios
 */

import type {
  Question,
  QuestionType,
  MultipleChoiceSingleQuestion,
  MultipleChoiceMultiQuestion,
  TrueFalseQuestion,
  NumericQuestion,
  ScaleQuestion,
  OrderingQuestion,
  MatchingQuestion,
} from './question.types';
import type { MatchPair } from './option.types';

// Valor de respuesta según tipo de pregunta (conditional type)
export type AnswerValue<T extends Question> =
  T extends MultipleChoiceSingleQuestion ? string :
  T extends MultipleChoiceMultiQuestion ? string[] :
  T extends TrueFalseQuestion ? boolean :
  T extends NumericQuestion ? number :
  T extends ScaleQuestion ? number :
  T extends OrderingQuestion ? string[] :
  T extends MatchingQuestion ? MatchPair[] :
  string;

// Respuesta genérica
export interface Answer<T extends Question = Question> {
  id: string;
  questionId: string;
  questionType: T['questionType'];
  value: AnswerValue<T>;
  timestamp: string;
  timeSpentMs?: number;
}

// Resultado de validación de respuesta
export interface AnswerValidationResult {
  isValid: boolean;
  isCorrect?: boolean;
  score: number;
  maxScore: number;
  feedback?: string;
  details?: AnswerValidationDetail[];
}

// Detalle de validación (para respuestas parciales)
export interface AnswerValidationDetail {
  itemId: string;
  isCorrect: boolean;
  points: number;
  feedback?: string;
}

// Estado de respuesta en formulario
export interface AnswerState {
  questionId: string;
  value: unknown;
  isDirty: boolean;
  isValid: boolean;
  error?: string;
}

// Mapa de respuestas por pregunta
export type AnswerMap = Map<string, Answer>;

// Helper para crear respuesta vacía
export function createEmptyAnswer<T extends Question>(
  questionId: string,
  questionType: T['questionType']
): Answer<T> {
  return {
    id: `ans_${Date.now()}`,
    questionId,
    questionType,
    value: getDefaultAnswerValue(questionType) as AnswerValue<T>,
    timestamp: new Date().toISOString(),
  };
}

// Valor por defecto según tipo
function getDefaultAnswerValue(type: QuestionType): unknown {
  switch (type) {
    case 'multiple_choice_single':
      return '';
    case 'multiple_choice_multi':
      return [];
    case 'true_false':
      return null;
    case 'numeric':
      return null;
    case 'scale':
      return null;
    case 'ordering':
      return [];
    case 'matching':
      return [];
    case 'open_short':
    case 'open_long':
    default:
      return '';
  }
}
