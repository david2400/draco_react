/**
 * Defaults Config - Valores por defecto para cada tipo de pregunta
 */

import type {
  MultipleChoiceSingleQuestion,
  MultipleChoiceMultiQuestion,
  TrueFalseQuestion,
  OpenShortQuestion,
  OpenLongQuestion,
  NumericQuestion,
  ScaleQuestion,
  OrderingQuestion,
  MatchingQuestion,
  Difficulty,
} from '../types';
import { generateOptionId } from '../types';

// Dificultad por defecto
export const DEFAULT_DIFFICULTY: Difficulty = 'basic';

// Puntaje por defecto
export const DEFAULT_MAX_SCORE = 10;

// Valores por defecto para Multiple Choice Single
export function getMultipleChoiceSingleDefaults(): Partial<MultipleChoiceSingleQuestion> {
  return {
    questionType: 'multiple_choice_single',
    questionText: '',
    difficulty: DEFAULT_DIFFICULTY,
    maxScore: DEFAULT_MAX_SCORE,
    themeId: '',
    options: [
      { id: generateOptionId(), text: '' },
      { id: generateOptionId(), text: '' },
    ],
    correctOptionId: '',
  };
}

// Valores por defecto para Multiple Choice Multi
export function getMultipleChoiceMultiDefaults(): Partial<MultipleChoiceMultiQuestion> {
  return {
    questionType: 'multiple_choice_multi',
    questionText: '',
    difficulty: DEFAULT_DIFFICULTY,
    maxScore: DEFAULT_MAX_SCORE,
    themeId: '',
    options: [
      { id: generateOptionId(), text: '' },
      { id: generateOptionId(), text: '' },
    ],
    correctOptionIds: [],
  };
}

// Valores por defecto para True/False
export function getTrueFalseDefaults(): Partial<TrueFalseQuestion> {
  return {
    questionType: 'true_false',
    questionText: '',
    difficulty: DEFAULT_DIFFICULTY,
    maxScore: DEFAULT_MAX_SCORE,
    themeId: '',
    correctAnswer: true,
  };
}

// Valores por defecto para Open Short
export function getOpenShortDefaults(): Partial<OpenShortQuestion> {
  return {
    questionType: 'open_short',
    questionText: '',
    difficulty: DEFAULT_DIFFICULTY,
    maxScore: DEFAULT_MAX_SCORE,
    themeId: '',
    maxLength: 500,
    caseSensitive: false,
  };
}

// Valores por defecto para Open Long
export function getOpenLongDefaults(): Partial<OpenLongQuestion> {
  return {
    questionType: 'open_long',
    questionText: '',
    difficulty: DEFAULT_DIFFICULTY,
    maxScore: DEFAULT_MAX_SCORE,
    themeId: '',
    minLength: 100,
    maxLength: 5000,
  };
}

// Valores por defecto para Numeric
export function getNumericDefaults(): Partial<NumericQuestion> {
  return {
    questionType: 'numeric',
    questionText: '',
    difficulty: DEFAULT_DIFFICULTY,
    maxScore: DEFAULT_MAX_SCORE,
    themeId: '',
    correctValue: 0,
    tolerance: 0,
  };
}

// Valores por defecto para Scale
export function getScaleDefaults(): Partial<ScaleQuestion> {
  return {
    questionType: 'scale',
    questionText: '',
    difficulty: DEFAULT_DIFFICULTY,
    maxScore: DEFAULT_MAX_SCORE,
    themeId: '',
    minValue: 1,
    maxValue: 5,
    step: 1,
    labels: [
      { value: 1, text: 'Muy en desacuerdo' },
      { value: 3, text: 'Neutral' },
      { value: 5, text: 'Muy de acuerdo' },
    ],
  };
}

// Valores por defecto para Ordering
export function getOrderingDefaults(): Partial<OrderingQuestion> {
  return {
    questionType: 'ordering',
    questionText: '',
    difficulty: DEFAULT_DIFFICULTY,
    maxScore: DEFAULT_MAX_SCORE,
    themeId: '',
    items: [
      { id: generateOptionId(), text: '' },
      { id: generateOptionId(), text: '' },
    ],
    correctOrder: [],
  };
}

// Valores por defecto para Matching
export function getMatchingDefaults(): Partial<MatchingQuestion> {
  return {
    questionType: 'matching',
    questionText: '',
    difficulty: DEFAULT_DIFFICULTY,
    maxScore: DEFAULT_MAX_SCORE,
    themeId: '',
    leftItems: [
      { id: generateOptionId(), text: '' },
      { id: generateOptionId(), text: '' },
    ],
    rightItems: [
      { id: generateOptionId(), text: '' },
      { id: generateOptionId(), text: '' },
    ],
    correctPairs: [],
  };
}
