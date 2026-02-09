'use client';

import React, {useCallback, useMemo} from 'react';
import {SubmitHandler} from 'react-hook-form';
import {useTranslations} from 'next-intl';

import {FormStudent} from '../scenes/formStudent';
import {validationStudent} from '../schemas/student.schema';
import {IStudentCreateRequest} from '../models/student.interface';
import {StudentRelationshipManager} from '@modules/gestion_alumnos/relationship/components/student-relationship-manager';

export const StudentEditScreen = ({studentId}: {studentId: string}) => {
  const t = useTranslations('GestionAlumnos');

  const initialValues: IStudentCreateRequest = useMemo(
    () => ({
      first_name: 'Nombre',
      second_name: '',
      first_last_name: 'Apellido',
      second_last_name: '',
      document_type: 'ti',
      document_number: '1000000',
      blood_type: '',
      eps: '',
      birth_date: '2015-01-01',
      gender: 'female',
      grade: '1',
      email: 'example@email.com',
      phone: '3000000000',
      address: 'Dirección',
      neighborhood: '',
      notes: '',
    }),
    []
  );

  const onSubmit: SubmitHandler<IStudentCreateRequest> = useCallback(async values => {
    console.log('update student', {studentId, ...values});
  }, [studentId]);

  return (
    <div className='space-y-10'>
      <section className='space-y-4'>
        <div className='space-y-1'>
          <h2 className='text-xl font-semibold text-foreground'>{t('studentCardTitle')}</h2>
          <p className='text-sm text-muted-foreground'>{t('studentCardDescription')}</p>
        </div>
        <FormStudent initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationStudent()} />
      </section>

      <section className='space-y-4'>
        <div className='space-y-1'>
          <h2 className='text-xl font-semibold text-foreground'>{t('relationshipCardTitle')}</h2>
          <p className='text-sm text-muted-foreground'>{t('relationshipCardDescription')}</p>
        </div>
        <StudentRelationshipManager studentId={studentId} variant='compact' />
      </section>
    </div>
  );
};
