/**
 * True/False Schema
 */

import { z } from 'zod';
import { baseQuestionSchema } from './base.schema';

const trueFalseSchema = baseQuestionSchema.extend({
  questionType: z.literal('true_false'),
  correctAnswer: z.boolean({
    required_error: 'Debe seleccionar verdadero o falso',
  }),
});

export default trueFalseSchema;

export type TrueFalseInput = z.infer<typeof trueFalseSchema>;
