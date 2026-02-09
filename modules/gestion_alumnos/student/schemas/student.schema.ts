import {useTranslations} from 'next-intl';
import {z} from 'zod';

export const validationStudent = () => {
  const intl = useTranslations('Form');

  return z.object({
    first_name: z.string().min(1, {message: intl('requiredField')}),
    second_name: z.string().optional(),
    first_last_name: z.string().min(1, {message: intl('requiredField')}),
    second_last_name: z.string().optional(),
    document_type: z.string().optional(),
    document_number: z.string().min(6, {message: intl('requiredField')}),
    birth_date: z.string().min(1, {message: intl('requiredField')}),
    gender: z.string().optional(),
    grade: z.string().optional(),
    blood_type: z.string().optional(),
    eps: z.string().optional(),
    email: z.string().email({message: intl('requiredField')}),
    phone: z.string().min(6, {message: intl('requiredField')}),
    address: z.string().min(3, {message: intl('requiredField')}),
    neighborhood: z.string().optional(),
    notes: z.string().optional(),
  });
};
