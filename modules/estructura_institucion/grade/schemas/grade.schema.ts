import {useTranslations} from 'next-intl';
import {z} from 'zod';

export const validationGrade = () => {
  const intl = useTranslations('Form');

  return z.object({
    name: z.string().min(1, {message: intl('requiredField')}),
    code: z.string().min(1, {message: intl('requiredField')}),
    education_level: z.string().min(1, {message: intl('requiredField')}),
    coordinator: z.string().min(1, {message: intl('requiredField')}),
    modality: z.string().min(1, {message: intl('requiredField')}),
    capacity: z.string().min(1, {message: intl('requiredField')}),
    description: z.string().optional(),
  });
};
