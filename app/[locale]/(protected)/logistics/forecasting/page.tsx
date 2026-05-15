import {NextPage} from 'next';
import type {Metadata} from 'next';
import {getTranslations} from 'next-intl/server';
import {ForecastingHub} from '@modules/logistics/components/forecasting-hub';

export async function generateMetadata({
  params,
}: {
  params: {locale: string};
}): Promise<Metadata> {
  const {locale} = await Promise.resolve(params);
  const t = await getTranslations({locale, namespace: 'Titles'});

  return {
    title: `${t('logistics')} · ${t('forecasting') ?? 'Forecasting'}`,
    description: 'Proyección de demanda, brechas de capacidad y acciones sugeridas',
  };
}

const LogisticsForecastingPage: NextPage = () => {
  return <ForecastingHub />;
};

export default LogisticsForecastingPage;
