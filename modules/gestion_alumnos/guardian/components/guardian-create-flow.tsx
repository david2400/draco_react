'use client';

import React, {useCallback} from 'react';
import {useRouter} from 'next/navigation';

import {RegisterGuardian} from './form';

export const GuardianCreateFlow = ({studentId}: {studentId?: string}) => {
  const router = useRouter();

  const handleCreated = useCallback(
    async (guardianId: string) => {
      if (studentId) {
        router.push(
          `/gestion_alumnos/student/${encodeURIComponent(studentId)}/relationships?guardianId=${encodeURIComponent(guardianId)}`
        );
        return;
      }
      router.push('/gestion_alumnos/relationship');
    },
    [router, studentId]
  );

  return <RegisterGuardian onCreated={handleCreated} />;
};
