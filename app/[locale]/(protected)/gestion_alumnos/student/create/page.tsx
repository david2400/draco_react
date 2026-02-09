/** @format */

import {Metadata, NextPage} from 'next';
import {getTranslations} from 'next-intl/server';
import {StudentCreateFlow} from '@modules/gestion_alumnos/student/components/student-create-flow';

export async function generateMetadata({params}: {params: {locale: string}}): Promise<Metadata> {
  const {locale} = await Promise.resolve(params);
  const t = await getTranslations({locale, namespace: 'Titles'});

  return {
    title: t('gestion_alumnos'),
    description: 'Registro individual de estudiantes.',
  };
}

const StudentCreatePage: NextPage<{params: {locale: string}}> = async ({params}) => {
  await getTranslations({locale: params.locale, namespace: 'GestionAlumnos'});
  return <StudentCreateFlow />;
};

export default StudentCreatePage;
