/**
 * Multiple Choice Single Schema
 */

import { z } from 'zod';
import { baseQuestionSchema, optionSchema } from './base.schema';

const multipleChoiceSingleSchema = baseQuestionSchema.extend({
  questionType: z.literal('multiple_choice_single'),
  options: z
    .array(optionSchema)
    .min(2, 'Se requieren al menos 2 opciones'),
  correctOptionId: z.string().min(1, 'Debe seleccionar una respuesta correcta'),
}).refine(
  (data) => data.options.some((o) => o.id === data.correctOptionId),
  {
    message: 'La respuesta correcta debe ser una de las opciones',
    path: ['correctOptionId'],
  }
);

export default multipleChoiceSingleSchema;

export type MultipleChoiceSingleInput = z.infer<typeof multipleChoiceSingleSchema>;
