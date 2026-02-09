/**
 * Matching Schema
 */

import { z } from 'zod';
import { baseQuestionSchema, matchItemSchema, matchPairSchema } from './base.schema';

const matchingSchema = baseQuestionSchema.extend({
  questionType: z.literal('matching'),
  leftItems: z
    .array(matchItemSchema)
    .min(2, 'Se requieren al menos 2 items en la columna izquierda'),
  rightItems: z
    .array(matchItemSchema)
    .min(2, 'Se requieren al menos 2 items en la columna derecha'),
  correctPairs: z
    .array(matchPairSchema)
    .min(1, 'Debe definir al menos un par correcto'),
}).refine(
  (data) => {
    const leftIds = data.leftItems.map((i) => i.id);
    const rightIds = data.rightItems.map((i) => i.id);
    return data.correctPairs.every(
      (pair) => leftIds.includes(pair.leftId) && rightIds.includes(pair.rightId)
    );
  },
  {
    message: 'Los pares deben referenciar items válidos',
    path: ['correctPairs'],
  }
);

export default matchingSchema;

export type MatchingInput = z.infer<typeof matchingSchema>;
