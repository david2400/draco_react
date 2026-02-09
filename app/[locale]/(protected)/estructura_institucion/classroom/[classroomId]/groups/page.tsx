/** @format */

import {Metadata, NextPage} from 'next';
import {getTranslations} from 'next-intl/server';
import {ClassroomGroupManagerScene} from '@/modules/estructura_institucion/classroom/scenes/classroom-group-manager';

interface PageParams {
  params: Promise<{
    locale: string;
    classroomId: string;
  }>;
}

export async function generateMetadata({params}: PageParams): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'Titles'});
  return {
    title: t('estructura_institucion_classroom') ?? 'Classroom group links',
    description: 'Attach or remove groups from a classroom.',
  };
}

const ClassroomGroupsPage: NextPage<Awaited<PageParams['params']>> = async params => {
  const {locale, classroomId} = params;
  await getTranslations({locale, namespace: 'EstructuraInstitucion.classroom'});

  return <ClassroomGroupManagerScene classroomId={classroomId} />;
};

export default ClassroomGroupsPage;
