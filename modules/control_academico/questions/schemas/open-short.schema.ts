/**
 * Open Short Schema
 */

import { z } from 'zod';
import { baseQuestionSchema } from './base.schema';

const openShortSchema = baseQuestionSchema.extend({
  questionType: z.literal('open_short'),
  expectedKeywords: z.array(z.string()).optional(),
  maxLength: z.number().min(1).optional(),
  caseSensitive: z.boolean().optional(),
});

export default openShortSchema;

export type OpenShortInput = z.infer<typeof openShortSchema>;
