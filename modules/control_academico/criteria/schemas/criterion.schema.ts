import {useTranslations} from 'next-intl';
import {z} from 'zod';

export const validationCriterion = () => {
  const intl = useTranslations('Form');

  return z.object({
    name: z.string().min(1, {message: intl('requiredField')}),
    description: z.string().min(1, {message: intl('requiredField')}),
    weight: z.string().min(1, {message: intl('requiredField')}),
    notes_template: z.string().optional(),
  });
};
