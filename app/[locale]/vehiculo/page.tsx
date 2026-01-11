'use client';

import { DynamicForm } from '@/components/dynamic-form/DynamicForm';
import {categoryFinderSchema} from '@/lib/demo/categoryFinderSchema';
import {NextPage} from 'next';

const VehiculoPage: NextPage = () => {
  return (
    <DynamicForm
      schema={categoryFinderSchema}
      defaultValues={{
        keywords: 'Celular Samsung Galaxy A56 5G 256GB',
        universal_code: '887276246529',
        photos_photos: [],
      }}
    />
  );
};

export default VehiculoPage;
