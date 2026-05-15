/**
 * Ordering Schema
 */

import { z } from 'zod';
import { baseQuestionSchema, orderItemSchema } from './base.schema';

const orderingSchema = baseQuestionSchema.extend({
  questionType: z.literal('ordering'),
  items: z
    .array(orderItemSchema)
    .min(2, 'Se requieren al menos 2 items para ordenar'),
  correctOrder: z
    .array(z.string())
    .min(2, 'Debe definir el orden correcto'),
}).refine(
  (data) => {
    const itemIds = data.items.map((i) => i.id);
    return data.correctOrder.every((id) => itemIds.includes(id));
  },
  {
    message: 'El orden correcto debe incluir todos los items',
    path: ['correctOrder'],
  }
).refine(
  (data) => data.correctOrder.length === data.items.length,
  {
    message: 'El orden correcto debe tener la misma cantidad de items',
    path: ['correctOrder'],
  }
);

export default orderingSchema;

export type OrderingInput = z.infer<typeof orderingSchema>;
