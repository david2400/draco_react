/** @format */

import {Metadata, NextPage} from 'next';
import {getTranslations} from 'next-intl/server';
import {ClassroomManager} from '@/modules/estructura_institucion/classroom/components/classroom-manager';

export async function generateMetadata({
  params,
}: {
  params: {locale: string};
}): Promise<Metadata> {
  const {locale} = await Promise.resolve(params);
  const t = await getTranslations({locale, namespace: 'Titles'});

  return {
    title: t('estructura_institucion_classroom') ?? 'Classroom setup',
    description: 'Manage classrooms, resources and linked groups.',
  };
}

const ClassroomPage: NextPage<{params: {locale: string}}> = async ({
  params,
}) => {
  await getTranslations({
    locale: params.locale,
    namespace: 'EstructuraInstitucion.classroom',
  });

  return <ClassroomManager />;
};

export default ClassroomPage;
