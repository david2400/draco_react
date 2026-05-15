import {useTranslations} from 'next-intl';
import {z} from 'zod';

export const validationRelationship = () => {
  const intl = useTranslations('Form');

  return z.object({
    student_id: z.string().min(1, {message: intl('requiredField')}),
    guardian_id: z.string().min(1, {message: intl('requiredField')}),
    relationship_type: z.string().min(1, {message: intl('requiredField')}),
    priority: z.string().min(1, {message: intl('requiredField')}),
    custody_level: z.string().min(1, {message: intl('requiredField')}),
    start_date: z.string().min(1, {message: intl('requiredField')}),
    notes: z.string().optional(),
  });
};
