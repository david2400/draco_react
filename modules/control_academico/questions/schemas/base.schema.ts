/**
 * Base Schema - Schema compartido por todos los tipos de pregunta
 */

import { z } from 'zod';

// Schema para opciones
export const optionSchema = z.object({
  id: z.string().min(1),
  text: z.string().min(1, 'El texto de la opción es requerido'),
  order: z.number().optional(),
});

// Schema para media
export const mediaSchema = z.object({
  id: z.string(),
  type: z.enum(['image', 'audio', 'video', 'document']),
  url: z.string().url(),
  alt: z.string().optional(),
  caption: z.string().optional(),
});

// Schema para etiquetas de escala
export const scaleLabelSchema = z.object({
  value: z.number(),
  text: z.string(),
});

// Schema para items de ordenamiento
export const orderItemSchema = z.object({
  id: z.string().min(1),
  text: z.string().min(1, 'El texto del item es requerido'),
});

// Schema para items de emparejamiento
export const matchItemSchema = z.object({
  id: z.string().min(1),
  text: z.string().min(1, 'El texto del item es requerido'),
});

// Schema para pares de emparejamiento
export const matchPairSchema = z.object({
  leftId: z.string().min(1),
  rightId: z.string().min(1),
});

// Schema para rúbrica
export const rubricLevelSchema = z.object({
  points: z.number().min(0),
  description: z.string(),
});

export const rubricItemSchema = z.object({
  id: z.string(),
  criterion: z.string().min(1),
  maxPoints: z.number().min(0),
  levels: z.array(rubricLevelSchema).optional(),
});

// Schema para metadatos
export const metadataSchema = z.object({
  tags: z.array(z.string()).optional(),
  category: z.string().optional(),
  source: z.string().optional(),
  notes: z.string().optional(),
});

// Schema base compartido
export const baseQuestionSchema = z.object({
  id: z.string().optional(),
  questionText: z.string().min(1, 'El texto de la pregunta es requerido'),
  difficulty: z.enum(['intro', 'basic', 'intermediate', 'advanced'], {
    errorMap: () => ({ message: 'Selecciona una dificultad válida' }),
  }),
  maxScore: z.number().min(0, 'El puntaje debe ser positivo'),
  themeId: z.string().min(1, 'El tema es requerido'),
  media: z.array(mediaSchema).optional(),
  metadata: metadataSchema.optional(),
  version: z.number().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

// Tipo inferido del schema base
export type BaseQuestionInput = z.infer<typeof baseQuestionSchema>;
