import {NextPage} from 'next';
import type {Metadata} from 'next';
import {getTranslations} from 'next-intl/server';
import {ReturnsHub} from '@modules/logistics/components/returns-hub';

export async function generateMetadata({
  params,
}: {
  params: {locale: string};
}): Promise<Metadata> {
  const {locale} = await Promise.resolve(params);
  const t = await getTranslations({locale, namespace: 'Titles'});

  return {
    title: `${t('logistics')} · ${t('returns') ?? 'Devoluciones'}`,
    description: 'Workflow de logística inversa y recolecciones',
  };
}

const LogisticsReturnsPage: NextPage = () => {
  return <ReturnsHub />;
};

export default LogisticsReturnsPage;
