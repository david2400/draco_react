/**
 * Numeric Schema
 */

import { z } from 'zod';
import { baseQuestionSchema } from './base.schema';

const numericSchema = baseQuestionSchema.extend({
  questionType: z.literal('numeric'),
  correctValue: z.number({
    required_error: 'El valor correcto es requerido',
  }),
  tolerance: z.number().min(0, 'La tolerancia debe ser positiva').optional(),
  unit: z.string().optional(),
});

export default numericSchema;

export type NumericInput = z.infer<typeof numericSchema>;
