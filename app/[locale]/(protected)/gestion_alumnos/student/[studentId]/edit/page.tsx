/** @format */

import {Metadata, NextPage} from 'next';
import {getTranslations} from 'next-intl/server';
import {StudentEditScreen} from '@modules/gestion_alumnos/student/components/student-edit-screen';

export async function generateMetadata({params}: {params: {locale: string; studentId: string}}): Promise<Metadata> {
  const {locale} = await Promise.resolve(params);
  const t = await getTranslations({locale, namespace: 'Titles'});

  return {
    title: t('gestion_alumnos'),
    description: 'Actualización de información de estudiantes.',
  };
}

const StudentEditPage: NextPage<{params: {locale: string; studentId: string}}> = async ({params}) => {
  await getTranslations({locale: params.locale, namespace: 'GestionAlumnos'});
  return <StudentEditScreen studentId={params.studentId} />;
};

export default StudentEditPage;
