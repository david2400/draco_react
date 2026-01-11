import React from 'react';
import {FormField} from './form-field';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';
import {IFormDynamicProps} from '../models/form.interface';
import {FormSelectField} from './form-select';
import {FormRadioButtonField} from './form-radiobutton';
import {FormTextAreaField} from './form-area';
import {Buttons} from '@/components/buttons/scenes';
import {FormCheckboxField} from './form-checkbox';

export const FormDynamic = ({
  fields,
  validationSchema,
  initialValues,
  onSubmit,
}: IFormDynamicProps<any>) => {
  type FormInputs = z.infer<typeof validationSchema>;

  const {
    register,
    formState: {isSubmitting, errors},
    handleSubmit,
  } = useForm<FormInputs>({
    resolver: zodResolver(validationSchema),
    defaultValues: initialValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
      {fields.map(field => {
        switch (field?.type) {
          case 'input':
            return (
              <FormField
                key={field.id}
                // {...controllerField}
                id={field.id}
                label={field.label}
                // placeholder={field.placeholder}
                error={errors.name?.message}
                {...register(field.id)}
              />
            );
          case 'textarea':
            return (
              <FormTextAreaField
                key={field.id}
                // {...controllerField}
                id={field.id}
                label={field.label}
                // placeholder={field.placeholder}
                error={errors.name?.message}
                {...register(field.id)}
              />
            );
          case 'select':
            if ('data' in field) {
              return (
                <FormSelectField
                  key={field.id}
                  id={field.id}
                  label={field.label}
                  data={field.data}
                  // placeholder={field.placeholder}
                  error={errors.name?.message}
                  {...register(field.id)}
                />
              );
            }
          case 'radio':
            if ('items' in field) {
              return (
                <FormRadioButtonField
                  key={field.id}
                  type={field.type}
                  id={field.id}
                  label={field.label}
                  items={field.items}
                  // placeholder={field.placeholder}
                  error={errors.name?.message}
                  {...register(field.id)}
                />
              );
            }
          case 'checkbox':
            if ('items' in field) {
              return (
                <FormCheckboxField
                  key={field.id}
                  type={field.type}
                  id={field.id}
                  label={field.label}
                  items={field.items}
                  // placeholder={field.placeholder}
                  error={errors.name?.message}
                  {...register(field.id)}
                />
              );
            }
          default:
            return null;
        }
      })}

      <Buttons type='submit' loading={isSubmitting}>
        Submit
      </Buttons>
    </form>
  );
};
