import {useTranslations} from 'next-intl';
import {z} from 'zod';

export const validationGroupStudent = () => {
  const intl = useTranslations('Form');

  return z.object({
    group_id: z.string().min(1, {message: intl('requiredField')}),
    student_id: z.string().min(1, {message: intl('requiredField')}),
    enrollment_date: z.string().min(1, {message: intl('requiredField')}),
    status: z.string().min(1, {message: intl('requiredField')}),
    notes: z.string().optional(),
  });
};
