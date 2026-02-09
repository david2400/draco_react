import {useTranslations} from 'next-intl';
import {z} from 'zod';

export const validationGroup = () => {
  const intl = useTranslations('Form');

  return z.object({
    name: z.string().min(1, {message: intl('requiredField')}),
    grade_id: z.string().min(1, {message: intl('requiredField')}),
    tutor: z.string().min(1, {message: intl('requiredField')}),
    shift: z.string().min(1, {message: intl('requiredField')}),
    classroom: z.string().min(1, {message: intl('requiredField')}),
    max_students: z.string().min(1, {message: intl('requiredField')}),
    start_date: z.string().min(1, {message: intl('requiredField')}),
    notes: z.string().optional(),
  });
};
