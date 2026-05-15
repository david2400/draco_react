import {NextPage} from 'next';
import type {Metadata} from 'next';
import {getTranslations} from 'next-intl/server';
import {LogisticsDashboard} from '@modules/logistics/components/dashboard';

export async function generateMetadata({
  params,
}: {
  params: {locale: string};
}): Promise<Metadata> {
  const {locale} = await Promise.resolve(params);
  const t = await getTranslations({locale, namespace: 'Titles'});

  return {
    title: t('logistics'),
    description: 'Gestión integral de envíos, transportadoras y rutas',
  };
}

const LogisticsPage: NextPage = () => {
  return <LogisticsDashboard />;
};

export default LogisticsPage;
