/**
 * Config barrel export
 */

export {
  registerQuestionType,
  getQuestionConfig,
  getAllQuestionTypes,
  isQuestionTypeRegistered,
  getDefaultValues,
  getSchemaForType,
} from './question-registry';

export type {
  QuestionRendererProps,
  QuestionEditorProps,
  QuestionTypeConfig,
} from './question-registry';

export {
  DIFFICULTY_CONFIG,
  getAllDifficulties,
  getDifficultyConfig,
  getDifficultyOptions,
} from './difficulty.config';

export type { DifficultyConfig } from './difficulty.config';

export {
  DEFAULT_DIFFICULTY,
  DEFAULT_MAX_SCORE,
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

export { initializeQuestionTypes } from './register-types';
