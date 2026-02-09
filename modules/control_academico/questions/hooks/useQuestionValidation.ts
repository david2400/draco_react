/**
 * useQuestionValidation - Hook para validación de respuestas
 */

'use client';

import { useMemo, useCallback } from 'react';
import type {
  Question,
  Answer,
  AnswerValidationResult,
  MultipleChoiceSingleQuestion,
  MultipleChoiceMultiQuestion,
  TrueFalseQuestion,
  NumericQuestion,
  OrderingQuestion,
  MatchingQuestion,
} from '../types';

interface UseQuestionValidationReturn {
  validateAnswer: (question: Question, answer: Answer) => AnswerValidationResult;
  isAnswerComplete: (question: Question, value: unknown) => boolean;
}

export function useQuestionValidation(): UseQuestionValidationReturn {
  const validateAnswer = useCallback(
    (question: Question, answer: Answer): AnswerValidationResult => {
      switch (question.questionType) {
        case 'multiple_choice_single':
          return validateMultipleChoiceSingle(
            question as MultipleChoiceSingleQuestion,
            answer.value as string
          );

        case 'multiple_choice_multi':
          return validateMultipleChoiceMulti(
            question as MultipleChoiceMultiQuestion,
            answer.value as string[]
          );

        case 'true_false':
          return validateTrueFalse(
            question as TrueFalseQuestion,
            answer.value as boolean
          );

        case 'numeric':
          return validateNumeric(
            question as NumericQuestion,
            answer.value as number
          );

        case 'ordering':
          return validateOrdering(
            question as OrderingQuestion,
            answer.value as string[]
          );

        case 'matching':
          return validateMatching(
            question as MatchingQuestion,
            answer.value as Array<{ leftId: string; rightId: string }>
          );

        case 'open_short':
        case 'open_long':
          // Respuestas abiertas requieren evaluación manual
          return {
            isValid: true,
            score: 0,
            maxScore: question.maxScore,
            feedback: 'Pendiente de revisión',
          };

        case 'scale':
          // Escalas no tienen respuesta correcta
          return {
            isValid: true,
            score: question.maxScore,
            maxScore: question.maxScore,
          };

        default: {
          // Exhaustive check - should never reach here
          const _exhaustiveCheck: never = question;
          return {
            isValid: false,
            score: 0,
            maxScore: 0,
            feedback: 'Tipo de pregunta no soportado',
          };
        }
      }
    },
    []
  );

  const isAnswerComplete = useCallback(
    (question: Question, value: unknown): boolean => {
      if (value === null || value === undefined) return false;

      switch (question.questionType) {
        case 'multiple_choice_single':
          return typeof value === 'string' && value.length > 0;

        case 'multiple_choice_multi':
          return Array.isArray(value) && value.length > 0;

        case 'true_false':
          return typeof value === 'boolean';

        case 'numeric':
          return typeof value === 'number' && !isNaN(value);

        case 'scale':
          return typeof value === 'number';

        case 'ordering':
          return Array.isArray(value) && value.length > 0;

        case 'matching':
          return Array.isArray(value) && value.length > 0;

        case 'open_short':
        case 'open_long':
          return typeof value === 'string' && value.trim().length > 0;

        default:
          return false;
      }
    },
    []
  );

  return { validateAnswer, isAnswerComplete };
}

// Funciones de validación específicas
function validateMultipleChoiceSingle(
  question: MultipleChoiceSingleQuestion,
  selectedId: string
): AnswerValidationResult {
  const isCorrect = selectedId === question.correctOptionId;
  const selectedOption = question.options.find((o) => o.id === selectedId);

  return {
    isValid: true,
    isCorrect,
    score: isCorrect ? question.maxScore : 0,
    maxScore: question.maxScore,
    feedback: isCorrect
      ? 'Correcto'
      : `Incorrecto. La respuesta correcta era: ${
          question.options.find((o) => o.id === question.correctOptionId)?.text
        }`,
  };
}

function validateMultipleChoiceMulti(
  question: MultipleChoiceMultiQuestion,
  selectedIds: string[]
): AnswerValidationResult {
  const correctIds = new Set(question.correctOptionIds);
  const selected = new Set(selectedIds);

  const correctCount = selectedIds.filter((id) => correctIds.has(id)).length;
  const incorrectCount = selectedIds.filter((id) => !correctIds.has(id)).length;
  const missedCount = question.correctOptionIds.filter(
    (id) => !selected.has(id)
  ).length;

  const isFullyCorrect =
    correctCount === correctIds.size && incorrectCount === 0;

  // Puntuación parcial
  const partialScore = Math.max(
    0,
    (correctCount / correctIds.size) * question.maxScore -
      (incorrectCount * question.maxScore) / correctIds.size
  );

  return {
    isValid: true,
    isCorrect: isFullyCorrect,
    score: isFullyCorrect ? question.maxScore : Math.round(partialScore),
    maxScore: question.maxScore,
    feedback: isFullyCorrect
      ? 'Correcto'
      : `${correctCount} de ${correctIds.size} correctas, ${incorrectCount} incorrectas`,
  };
}

function validateTrueFalse(
  question: TrueFalseQuestion,
  answer: boolean
): AnswerValidationResult {
  const isCorrect = answer === question.correctAnswer;

  return {
    isValid: true,
    isCorrect,
    score: isCorrect ? question.maxScore : 0,
    maxScore: question.maxScore,
    feedback: isCorrect
      ? 'Correcto'
      : `Incorrecto. La respuesta correcta era: ${
          question.correctAnswer ? 'Verdadero' : 'Falso'
        }`,
  };
}

function validateNumeric(
  question: NumericQuestion,
  value: number
): AnswerValidationResult {
  const tolerance = question.tolerance ?? 0;
  const diff = Math.abs(value - question.correctValue);
  const isCorrect = diff <= tolerance;

  return {
    isValid: true,
    isCorrect,
    score: isCorrect ? question.maxScore : 0,
    maxScore: question.maxScore,
    feedback: isCorrect
      ? 'Correcto'
      : `Incorrecto. La respuesta correcta era: ${question.correctValue}${
          question.unit ? ` ${question.unit}` : ''
        }`,
  };
}

function validateOrdering(
  question: OrderingQuestion,
  userOrder: string[]
): AnswerValidationResult {
  const correctOrder = question.correctOrder;

  if (userOrder.length !== correctOrder.length) {
    return {
      isValid: false,
      isCorrect: false,
      score: 0,
      maxScore: question.maxScore,
      feedback: 'Orden incompleto',
    };
  }

  let correctPositions = 0;
  for (let i = 0; i < correctOrder.length; i++) {
    if (userOrder[i] === correctOrder[i]) {
      correctPositions++;
    }
  }

  const isFullyCorrect = correctPositions === correctOrder.length;
  const partialScore =
    (correctPositions / correctOrder.length) * question.maxScore;

  return {
    isValid: true,
    isCorrect: isFullyCorrect,
    score: isFullyCorrect ? question.maxScore : Math.round(partialScore),
    maxScore: question.maxScore,
    feedback: isFullyCorrect
      ? 'Correcto'
      : `${correctPositions} de ${correctOrder.length} en posición correcta`,
  };
}

function validateMatching(
  question: MatchingQuestion,
  userPairs: Array<{ leftId: string; rightId: string }>
): AnswerValidationResult {
  const correctPairs = question.correctPairs;

  let correctCount = 0;
  for (const userPair of userPairs) {
    const isCorrect = correctPairs.some(
      (cp) => cp.leftId === userPair.leftId && cp.rightId === userPair.rightId
    );
    if (isCorrect) correctCount++;
  }

  const isFullyCorrect = correctCount === correctPairs.length;
  const partialScore = (correctCount / correctPairs.length) * question.maxScore;

  return {
    isValid: true,
    isCorrect: isFullyCorrect,
    score: isFullyCorrect ? question.maxScore : Math.round(partialScore),
    maxScore: question.maxScore,
    feedback: isFullyCorrect
      ? 'Correcto'
      : `${correctCount} de ${correctPairs.length} pares correctos`,
  };
}
