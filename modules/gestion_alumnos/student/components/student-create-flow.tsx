'use client';

import React, {useCallback} from 'react';
import {useRouter} from 'next/navigation';

import {RegisterStudent} from './form';

export const StudentCreateFlow = () => {
  const router = useRouter();

  const handleCreated = useCallback(
    async (studentId: string) => {
      router.push(`/gestion_alumnos/guardian?studentId=${encodeURIComponent(studentId)}`);
    },
    [router]
  );

  return <RegisterStudent onCreated={handleCreated} />;
};
