/**
 * Scale Schema
 */

import { z } from 'zod';
import { baseQuestionSchema, scaleLabelSchema } from './base.schema';

const scaleSchema = baseQuestionSchema.extend({
  questionType: z.literal('scale'),
  minValue: z.number({
    required_error: 'El valor mínimo es requerido',
  }),
  maxValue: z.number({
    required_error: 'El valor máximo es requerido',
  }),
  step: z.number().positive('El paso debe ser positivo'),
  labels: z.array(scaleLabelSchema).optional(),
}).refine(
  (data) => data.maxValue > data.minValue,
  {
    message: 'El valor máximo debe ser mayor al mínimo',
    path: ['maxValue'],
  }
);

export default scaleSchema;

export type ScaleInput = z.infer<typeof scaleSchema>;
