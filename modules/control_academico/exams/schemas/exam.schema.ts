import {useTranslations} from 'next-intl';
import {z} from 'zod';

/**
 * Schema de validación para exámenes
 */
export const validationExam = () => {
  const intl = useTranslations('Form');

  return z.object({
    nombre: z.string().min(1, {message: intl('requiredField')}),
    code: z.string().min(1, {message: intl('requiredField')}),
    subject: z.string().min(1, {message: intl('requiredField')}),
    grade_level: z.string().min(1, {message: intl('requiredField')}),
    scheduled_date: z.string().min(1, {message: intl('requiredField')}),
    duration: z.string().min(1, {message: intl('requiredField')}),
    instructions: z.string().optional(),
    question_ids: z.array(z.string()).min(1, {message: 'Debe agregar al menos una pregunta'}),
    criteria_ids: z.array(z.string()).optional(),
  });
};

/**
 * Schema base para exámenes (sin i18n, para uso en servidor)
 */
export const examSchema = z.object({
  id: z.string().optional(),
  nombre: z.string().min(1, 'El nombre es requerido'),
  code: z.string().min(1, 'El código es requerido'),
  subject: z.string().min(1, 'La asignatura es requerida'),
  grade_level: z.string().min(1, 'El grado es requerido'),
  scheduled_date: z.string().min(1, 'La fecha es requerida'),
  duration: z.string().min(1, 'La duración es requerida'),
  instructions: z.string().optional(),
  question_ids: z.array(z.string()).min(1, 'Debe agregar al menos una pregunta'),
  criteria_ids: z.array(z.string()).optional(),
  status: z.enum(['draft', 'scheduled', 'active', 'completed', 'archived']).optional(),
});

export type ExamSchemaInput = z.infer<typeof examSchema>;
