'use client';

import {DynamicForm} from '@repo/ui/dynamic-form';
import {categoryFinderSchema} from '@/lib/demo/categoryFinderSchema';
import {NextPage} from 'next';
import Vehiculo from '@/modules/vehiculo/sell';

const VehiculoPage: NextPage = () => {
  return (
    <Vehiculo></Vehiculo>
  );
};

export default VehiculoPage;
