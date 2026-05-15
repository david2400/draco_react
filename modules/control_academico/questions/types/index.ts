/**
 * Types barrel export
 */

// Question types
export type {
  QuestionType,
  Difficulty,
  QuestionBase,
  QuestionMetadata,
  MultipleChoiceSingleQuestion,
  MultipleChoiceMultiQuestion,
  TrueFalseQuestion,
  OpenShortQuestion,
  OpenLongQuestion,
  NumericQuestion,
  ScaleQuestion,
  OrderingQuestion,
  MatchingQuestion,
  Question,
  RubricItem,
  RubricLevel,
} from './question.types';

export {
  isMultipleChoiceSingle,
  isMultipleChoiceMulti,
  isTrueFalse,
  isOpenShort,
  isOpenLong,
  isNumeric,
  isScale,
  isOrdering,
  isMatching,
} from './question.types';

// Option types
export type {
  Option,
  OrderItem,
  MatchItem,
  MatchPair,
  ScaleLabel,
  CreateOptionInput,
} from './option.types';

export {
  generateOptionId,
  createEmptyOption,
  createEmptyOrderItem,
  createEmptyMatchItem,
} from './option.types';

// Media types
export type {
  MediaType,
  QuestionMedia,
  MediaUploadInput,
  MediaUploadState,
} from './media.types';

export {
  generateMediaId,
  getMediaTypeFromMime,
  isSupportedMediaType,
} from './media.types';

// Answer types
export type {
  AnswerValue,
  Answer,
  AnswerValidationResult,
  AnswerValidationDetail,
  AnswerState,
  AnswerMap,
} from './answer.types';

export { createEmptyAnswer } from './answer.types';

// Condition types
export type {
  ConditionOperator,
  ConditionAction,
  QuestionCondition,
  ConditionGroup,
  QuestionVisibility,
} from './condition.types';

export {
  createEmptyCondition,
  evaluateCondition,
} from './condition.types';
