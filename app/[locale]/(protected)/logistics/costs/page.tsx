import {NextPage} from 'next';
import type {Metadata} from 'next';
import {getTranslations} from 'next-intl/server';
import {CostAnalytics} from '@modules/logistics/components/cost-analytics';

export async function generateMetadata({
  params,
}: {
  params: {locale: string};
}): Promise<Metadata> {
  const {locale} = await Promise.resolve(params);
  const t = await getTranslations({locale, namespace: 'Titles'});

  return {
    title: `${t('logistics')} · ${t('costs') ?? 'Costos'}`,
    description: 'Análisis de tarifas, conciliación y recargos logísticos',
  };
}

const LogisticsCostsPage: NextPage = () => {
  return <CostAnalytics />;
};

export default LogisticsCostsPage;
