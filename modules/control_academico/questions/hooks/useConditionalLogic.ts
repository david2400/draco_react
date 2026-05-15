/**
 * useConditionalLogic - Hook para lógica condicional entre preguntas
 */

'use client';

import { useMemo } from 'react';
import type {
  Question,
  QuestionCondition,
  QuestionVisibility,
  Answer,
} from '../types';
import { evaluateCondition } from '../types';

interface UseConditionalLogicOptions {
  questions: Question[];
  conditions: QuestionCondition[];
  answers: Map<string, Answer>;
}

export function useConditionalLogic({
  questions,
  conditions,
  answers,
}: UseConditionalLogicOptions): Map<string, QuestionVisibility> {
  return useMemo(() => {
    const visibility = new Map<string, QuestionVisibility>();

    for (const question of questions) {
      // Encontrar condiciones que afectan a esta pregunta
      const questionConditions = conditions.filter(
        (c) => c.targetQuestionId === question.id
      );

      // Por defecto, la pregunta es visible y no requerida
      let isVisible = true;
      let isRequired = false;
      let shouldSkip = false;

      for (const condition of questionConditions) {
        const sourceAnswer = answers.get(condition.sourceQuestionId);
        const meetsCondition = evaluateCondition(
          condition,
          sourceAnswer?.value
        );

        switch (condition.action) {
          case 'show':
            // Solo mostrar si se cumple la condición
            isVisible = isVisible && meetsCondition;
            break;

          case 'hide':
            // Ocultar si se cumple la condición
            if (meetsCondition) {
              isVisible = false;
            }
            break;

          case 'require':
            // Hacer requerida si se cumple la condición
            if (meetsCondition) {
              isRequired = true;
            }
            break;

          case 'skip':
            // Saltar si se cumple la condición
            if (meetsCondition) {
              shouldSkip = true;
              isVisible = false;
            }
            break;

          case 'jump_to':
            // Manejado a nivel de navegación, no de visibilidad
            break;
        }
      }

      visibility.set(question.id, {
        questionId: question.id,
        isVisible,
        isRequired,
        shouldSkip,
      });
    }

    return visibility;
  }, [questions, conditions, answers]);
}

/**
 * Hook para obtener las preguntas visibles en orden
 */
export function useVisibleQuestions(
  questions: Question[],
  visibility: Map<string, QuestionVisibility>
): Question[] {
  return useMemo(() => {
    return questions.filter((q) => {
      const vis = visibility.get(q.id);
      return vis?.isVisible !== false;
    });
  }, [questions, visibility]);
}

/**
 * Hook para calcular el progreso considerando condiciones
 */
export function useQuestionProgress(
  questions: Question[],
  visibility: Map<string, QuestionVisibility>,
  answers: Map<string, Answer>
): { answered: number; total: number; percentage: number } {
  return useMemo(() => {
    const visibleQuestions = questions.filter((q) => {
      const vis = visibility.get(q.id);
      return vis?.isVisible !== false;
    });

    const answeredCount = visibleQuestions.filter((q) =>
      answers.has(q.id)
    ).length;

    const total = visibleQuestions.length;
    const percentage = total > 0 ? Math.round((answeredCount / total) * 100) : 0;

    return {
      answered: answeredCount,
      total,
      percentage,
    };
  }, [questions, visibility, answers]);
}
