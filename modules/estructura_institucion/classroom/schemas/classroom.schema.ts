import {useTranslations} from 'next-intl';
import {z} from 'zod';

export const validationClassroom = () => {
  const intl = useTranslations('Form');

  return z.object({
    name: z.string().min(1, {message: intl('requiredField')}),
    code: z.string().min(1, {message: intl('requiredField')}),
    building: z.string().min(1, {message: intl('requiredField')}),
    floor: z.string().min(1, {message: intl('requiredField')}),
    capacity: z.string().min(1, {message: intl('requiredField')}),
    resources: z.string().optional(),
    description: z.string().optional(),
  });
};
