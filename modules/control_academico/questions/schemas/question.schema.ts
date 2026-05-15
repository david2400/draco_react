import {useTranslations} from 'next-intl';
import {z} from 'zod';

export const validationQuestion = () => {
  const intl = useTranslations('Form');

  return z.object({
    question_text: z.string().min(1, {message: intl('requiredField')}),
    question_type: z.enum(['multiple_choice', 'true_false', 'open'], {
      errorMap: () => ({message: intl('requiredField')}),
    }),
    options: z.string().optional(),
    correct_answer: z.string().optional(),
    max_score: z.string().min(1, {message: intl('requiredField')}),
    theme_id: z.string().min(1, {message: intl('requiredField')}),
    difficulty: z.string().min(1, {message: intl('requiredField')}),
  });
};
