/**
 * Schemas barrel export
 */

export {
  baseQuestionSchema,
  optionSchema,
  mediaSchema,
  scaleLabelSchema,
  orderItemSchema,
  matchItemSchema,
  matchPairSchema,
  rubricItemSchema,
  rubricLevelSchema,
  metadataSchema,
} from './base.schema';

export type { BaseQuestionInput } from './base.schema';

export { default as multipleChoiceSingleSchema } from './multiple-choice-single.schema';
export type { MultipleChoiceSingleInput } from './multiple-choice-single.schema';

export { default as multipleChoiceMultiSchema } from './multiple-choice-multi.schema';
export type { MultipleChoiceMultiInput } from './multiple-choice-multi.schema';

export { default as trueFalseSchema } from './true-false.schema';
export type { TrueFalseInput } from './true-false.schema';

export { default as openShortSchema } from './open-short.schema';
export type { OpenShortInput } from './open-short.schema';

export { default as openLongSchema } from './open-long.schema';
export type { OpenLongInput } from './open-long.schema';

export { default as numericSchema } from './numeric.schema';
export type { NumericInput } from './numeric.schema';

export { default as scaleSchema } from './scale.schema';
export type { ScaleInput } from './scale.schema';

export { default as orderingSchema } from './ordering.schema';
export type { OrderingInput } from './ordering.schema';

export { default as matchingSchema } from './matching.schema';
export type { MatchingInput } from './matching.schema';
