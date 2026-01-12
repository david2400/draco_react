'use client';

import {FormProvider, useForm} from 'react-hook-form';
// import {DynamicFormSchema, RegisterAndRenderEvent} from '@/types/formSchema';
import {BrickRenderer} from '@/components/dynamic-form/BrickRenderer';

interface DynamicFormProps {
  schema: any;
  defaultValues?: Record<string, unknown>;
}

const findRootBrick = (events: any[]) => {
  for (const event of events) {
    if (event.type === 'register_and_render') {
      return event.data.brick;
    }
  }
  return undefined;
};

export const DynamicForm = ({schema, defaultValues}: DynamicFormProps) => {
  const methods = useForm({
    defaultValues,
    mode: 'onBlur',
  });

  const rootBrick = findRootBrick(schema.events);

  if (!rootBrick) {
    return (
      <div className='rounded-2xl border border-red-200 bg-red-50 p-6 text-center text-sm text-red-700'>
        No se encontró información para renderizar el formulario.
      </div>
    );
  }

  return (
    <FormProvider {...methods}>
      <BrickRenderer brick={rootBrick} />
    </FormProvider>
  );
};
