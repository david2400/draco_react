import {useTranslations} from 'next-intl';
import {z} from 'zod';

export const validationGuardian = () => {
  const intl = useTranslations('Form');

  return z.object({
    first_name: z.string().min(1, {message: intl('requiredField')}),
    second_name: z.string().optional(),
    last_name: z.string().min(1, {message: intl('requiredField')}),
    document_type: z.string().min(1, {message: intl('requiredField')}),
    document_number: z.string().min(6, {message: intl('requiredField')}),
    email: z.string().email({message: intl('requiredField')}),
    phone: z.string().min(6, {message: intl('requiredField')}),
    phone_alt: z.string().optional(),
    address: z.string().min(3, {message: intl('requiredField')}),
    occupation: z.string().optional(),
    company: z.string().optional(),
    relationship_type: z.string().min(1, {message: intl('requiredField')}),
    notes: z.string().optional(),
  });
};
