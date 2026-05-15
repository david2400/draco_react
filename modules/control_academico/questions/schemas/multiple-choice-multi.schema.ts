/**
 * Multiple Choice Multi Schema
 */

import { z } from 'zod';
import { baseQuestionSchema, optionSchema } from './base.schema';

const multipleChoiceMultiSchema = baseQuestionSchema.extend({
  questionType: z.literal('multiple_choice_multi'),
  options: z
    .array(optionSchema)
    .min(2, 'Se requieren al menos 2 opciones'),
  correctOptionIds: z
    .array(z.string())
    .min(1, 'Debe seleccionar al menos una respuesta correcta'),
  minCorrect: z.number().min(1).optional(),
  maxCorrect: z.number().optional(),
}).refine(
  (data) => data.correctOptionIds.every((id) => data.options.some((o) => o.id === id)),
  {
    message: 'Todas las respuestas correctas deben ser opciones válidas',
    path: ['correctOptionIds'],
  }
);

export default multipleChoiceMultiSchema;

export type MultipleChoiceMultiInput = z.infer<typeof multipleChoiceMultiSchema>;
