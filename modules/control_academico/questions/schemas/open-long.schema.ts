/**
 * Open Long Schema
 */

import { z } from 'zod';
import { baseQuestionSchema, rubricItemSchema } from './base.schema';

const openLongSchema = baseQuestionSchema.extend({
  questionType: z.literal('open_long'),
  rubric: z.array(rubricItemSchema).optional(),
  minLength: z.number().min(1).optional(),
  maxLength: z.number().min(1).optional(),
}).refine(
  (data) => {
    if (data.minLength && data.maxLength) {
      return data.maxLength >= data.minLength;
    }
    return true;
  },
  {
    message: 'La longitud máxima debe ser mayor o igual a la mínima',
    path: ['maxLength'],
  }
);

export default openLongSchema;

export type OpenLongInput = z.infer<typeof openLongSchema>;
