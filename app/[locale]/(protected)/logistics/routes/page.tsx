import {NextPage} from 'next';
import type {Metadata} from 'next';
import {getTranslations} from 'next-intl/server';
import {RouteOptimizer} from '@modules/logistics/components/route-optimizer';

export async function generateMetadata({
  params,
}: {
  params: {locale: string};
}): Promise<Metadata> {
  const {locale} = await Promise.resolve(params);
  const t = await getTranslations({locale, namespace: 'Titles'});

  return {
    title: `${t('logistics')} · ${t('routes') ?? 'Routes'}`,
    description: 'Optimización de rutas, ventanas y capacidad operativa',
  };
}

const LogisticsRoutesPage: NextPage = () => {
  return <RouteOptimizer />;
};

export default LogisticsRoutesPage;
