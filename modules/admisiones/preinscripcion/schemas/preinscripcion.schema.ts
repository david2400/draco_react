import {useTranslations} from 'next-intl';
import {z} from 'zod';

export const validationPreinscripcion = () => {
  const intl = useTranslations('Form');

  return z.object({
    lead_name: z.string().min(1, {message: intl('requiredField')}),
    student_name: z.string().min(1, {message: intl('requiredField')}),
    contact_email: z.string().email({message: intl('requiredField')}),
    contact_phone: z.string().min(6, {message: intl('requiredField')}),
    prospective_grade: z.string().min(1, {message: intl('requiredField')}),
    source: z.string().min(1, {message: intl('requiredField')}),
    comments: z.string().optional(),
  });
};
