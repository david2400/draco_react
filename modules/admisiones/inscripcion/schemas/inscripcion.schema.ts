import {useTranslations} from 'next-intl';
import {z} from 'zod';

export const validationInscripcion = () => {
  const intl = useTranslations('Form');

  return z.object({
    applicant_id: z.string().min(1, {message: intl('requiredField')}),
    previous_school: z.string().min(1, {message: intl('requiredField')}),
    academic_average: z.string().min(1, {message: intl('requiredField')}),
    payment_receipt: z.string().min(1, {message: intl('requiredField')}),
    application_status: z.string().min(1, {message: intl('requiredField')}),
    observations: z.string().optional(),
  });
};
