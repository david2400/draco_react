/**
 * Questions Module - Main barrel export
 * 
 * Este módulo proporciona una arquitectura extensible para preguntas
 * con soporte para múltiples tipos, validación, y renderizado dinámico.
 */

// Types
export * from './types';

// Config
export {
  registerQuestionType,
  getQuestionConfig,
  getAllQuestionTypes,
  isQuestionTypeRegistered,
  getDefaultValues,
  getSchemaForType,
  initializeQuestionTypes,
  getDifficultyOptions,
  getAllDifficulties,
  getDifficultyConfig,
  DIFFICULTY_CONFIG,
  DEFAULT_DIFFICULTY,
  DEFAULT_MAX_SCORE,
} from './config';

export type {
  QuestionRendererProps,
  QuestionEditorProps,
  QuestionTypeConfig,
  DifficultyConfig,
} from './config';

// Schemas
export {
  baseQuestionSchema,
  optionSchema,
  mediaSchema,
  multipleChoiceSingleSchema,
  multipleChoiceMultiSchema,
  trueFalseSchema,
  openShortSchema,
  openLongSchema,
  numericSchema,
  scaleSchema,
  orderingSchema,
  matchingSchema,
} from './schemas';

// Hooks
export {
  useQuestionForm,
  useQuestionValidation,
  useConditionalLogic,
  useVisibleQuestions,
  useQuestionProgress,
} from './hooks';

// Renderers
export { QuestionRenderer } from './renderers';

// Editors
export { QuestionEditor } from './editors';

// Scenes
export { QuestionFormScene } from './scenes/QuestionFormScene';

// Components
export { QuestionManager } from './components/question-manager';

// Legacy exports for backward compatibility
export { FormQuestion } from './scenes/formQuestion';
