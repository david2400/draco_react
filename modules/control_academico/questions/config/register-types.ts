/**
 * Register Types - Registra todos los tipos de pregunta disponibles
 * Este archivo se importa una vez al inicializar la aplicación
 */

import { registerQuestionType } from './question-registry';
import {
  getMultipleChoiceSingleDefaults,
  getMultipleChoiceMultiDefaults,
  getTrueFalseDefaults,
  getOpenShortDefaults,
  getOpenLongDefaults,
  getNumericDefaults,
  getScaleDefaults,
  getOrderingDefaults,
  getMatchingDefaults,
} from './defaults.config';

/**
 * Inicializa el registro de tipos de pregunta
 */
export function initializeQuestionTypes(): void {
  // Multiple Choice Single
  registerQuestionType({
    type: 'multiple_choice_single',
    label: 'Opción múltiple (única)',
    labelKey: 'questionTypes.multiple_choice_single',
    icon: 'circle-dot',
    description: 'El usuario selecciona una única respuesta correcta',
    renderer: () => import('../renderers/types/MultipleChoiceSingleRenderer'),
    editor: () => import('../editors/types/MultipleChoiceSingleEditor'),
    defaultValue: getMultipleChoiceSingleDefaults,
    schema: () => import('../schemas/multiple-choice-single.schema'),
  });

  // Multiple Choice Multi
  registerQuestionType({
    type: 'multiple_choice_multi',
    label: 'Opción múltiple (varias)',
    labelKey: 'questionTypes.multiple_choice_multi',
    icon: 'check-square',
    description: 'El usuario puede seleccionar múltiples respuestas correctas',
    renderer: () => import('../renderers/types/MultipleChoiceMultiRenderer'),
    editor: () => import('../editors/types/MultipleChoiceMultiEditor'),
    defaultValue: getMultipleChoiceMultiDefaults,
    schema: () => import('../schemas/multiple-choice-multi.schema'),
  });

  // True/False
  registerQuestionType({
    type: 'true_false',
    label: 'Verdadero / Falso',
    labelKey: 'questionTypes.true_false',
    icon: 'toggle-left',
    description: 'El usuario elige entre verdadero o falso',
    renderer: () => import('../renderers/types/TrueFalseRenderer'),
    editor: () => import('../editors/types/TrueFalseEditor'),
    defaultValue: getTrueFalseDefaults,
    schema: () => import('../schemas/true-false.schema'),
  });

  // Open Short
  registerQuestionType({
    type: 'open_short',
    label: 'Respuesta corta',
    labelKey: 'questionTypes.open_short',
    icon: 'text-cursor-input',
    description: 'El usuario escribe una respuesta breve',
    renderer: () => import('../renderers/types/OpenShortRenderer'),
    editor: () => import('../editors/types/OpenShortEditor'),
    defaultValue: getOpenShortDefaults,
    schema: () => import('../schemas/open-short.schema'),
  });

  // Open Long
  registerQuestionType({
    type: 'open_long',
    label: 'Respuesta larga',
    labelKey: 'questionTypes.open_long',
    icon: 'file-text',
    description: 'El usuario escribe una respuesta extensa',
    renderer: () => import('../renderers/types/OpenLongRenderer'),
    editor: () => import('../editors/types/OpenLongEditor'),
    defaultValue: getOpenLongDefaults,
    schema: () => import('../schemas/open-long.schema'),
  });

  // Numeric
  registerQuestionType({
    type: 'numeric',
    label: 'Numérica',
    labelKey: 'questionTypes.numeric',
    icon: 'hash',
    description: 'El usuario ingresa un valor numérico',
    renderer: () => import('../renderers/types/NumericRenderer'),
    editor: () => import('../editors/types/NumericEditor'),
    defaultValue: getNumericDefaults,
    schema: () => import('../schemas/numeric.schema'),
  });

  // Scale
  registerQuestionType({
    type: 'scale',
    label: 'Escala',
    labelKey: 'questionTypes.scale',
    icon: 'sliders-horizontal',
    description: 'El usuario selecciona un valor en una escala',
    renderer: () => import('../renderers/types/ScaleRenderer'),
    editor: () => import('../editors/types/ScaleEditor'),
    defaultValue: getScaleDefaults,
    schema: () => import('../schemas/scale.schema'),
  });

  // Ordering
  registerQuestionType({
    type: 'ordering',
    label: 'Ordenamiento',
    labelKey: 'questionTypes.ordering',
    icon: 'list-ordered',
    description: 'El usuario ordena elementos en secuencia',
    renderer: () => import('../renderers/types/OrderingRenderer'),
    editor: () => import('../editors/types/OrderingEditor'),
    defaultValue: getOrderingDefaults,
    schema: () => import('../schemas/ordering.schema'),
  });

  // Matching
  registerQuestionType({
    type: 'matching',
    label: 'Emparejamiento',
    labelKey: 'questionTypes.matching',
    icon: 'git-merge',
    description: 'El usuario empareja elementos de dos columnas',
    renderer: () => import('../renderers/types/MatchingRenderer'),
    editor: () => import('../editors/types/MatchingEditor'),
    defaultValue: getMatchingDefaults,
    schema: () => import('../schemas/matching.schema'),
  });
}
