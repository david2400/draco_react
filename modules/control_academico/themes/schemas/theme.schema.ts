import {useTranslations} from 'next-intl';
import {z} from 'zod';

export const validationTheme = () => {
  const intl = useTranslations('Form');

  return z.object({
    name: z.string().min(1, {message: intl('requiredField')}),
    subject: z.string().min(1, {message: intl('requiredField')}),
    difficulty: z.string().min(1, {message: intl('requiredField')}),
    description: z.string().optional(),
    tags: z.string().optional(),
  });
};
