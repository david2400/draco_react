/**
 * Condition Types - Tipos para lógica condicional entre preguntas
 */

// Operadores de comparación
export type ConditionOperator =
  | 'equals'
  | 'not_equals'
  | 'contains'
  | 'not_contains'
  | 'greater_than'
  | 'less_than'
  | 'greater_or_equal'
  | 'less_or_equal'
  | 'is_empty'
  | 'is_not_empty';

// Acciones a ejecutar cuando se cumple la condición
export type ConditionAction = 'show' | 'hide' | 'require' | 'skip' | 'jump_to';

// Condición individual
export interface QuestionCondition {
  id: string;
  sourceQuestionId: string;
  targetQuestionId: string;
  operator: ConditionOperator;
  value?: string | number | boolean;
  action: ConditionAction;
  jumpToQuestionId?: string; // Solo para action 'jump_to'
}

// Grupo de condiciones (AND/OR)
export interface ConditionGroup {
  id: string;
  logic: 'and' | 'or';
  conditions: QuestionCondition[];
}

// Resultado de evaluación de visibilidad
export interface QuestionVisibility {
  questionId: string;
  isVisible: boolean;
  isRequired: boolean;
  shouldSkip: boolean;
}

// Helper para crear condición vacía
export function createEmptyCondition(
  sourceQuestionId: string,
  targetQuestionId: string
): QuestionCondition {
  return {
    id: `cond_${Date.now()}`,
    sourceQuestionId,
    targetQuestionId,
    operator: 'equals',
    value: '',
    action: 'show',
  };
}

// Helper para evaluar una condición simple
export function evaluateCondition(
  condition: QuestionCondition,
  answerValue: unknown
): boolean {
  const { operator, value } = condition;

  switch (operator) {
    case 'equals':
      return answerValue === value;
    case 'not_equals':
      return answerValue !== value;
    case 'contains':
      return String(answerValue).includes(String(value));
    case 'not_contains':
      return !String(answerValue).includes(String(value));
    case 'greater_than':
      return Number(answerValue) > Number(value);
    case 'less_than':
      return Number(answerValue) < Number(value);
    case 'greater_or_equal':
      return Number(answerValue) >= Number(value);
    case 'less_or_equal':
      return Number(answerValue) <= Number(value);
    case 'is_empty':
      return answerValue === '' || answerValue === null || answerValue === undefined ||
        (Array.isArray(answerValue) && answerValue.length === 0);
    case 'is_not_empty':
      return answerValue !== '' && answerValue !== null && answerValue !== undefined &&
        !(Array.isArray(answerValue) && answerValue.length === 0);
    default:
      return true;
  }
}
