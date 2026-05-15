import {NextPage} from 'next';
import type {Metadata} from 'next';
import {getTranslations} from 'next-intl/server';
import {TrackingCenter} from '@modules/logistics/components/tracking-center';

export async function generateMetadata({
  params,
}: {
  params: {locale: string};
}): Promise<Metadata> {
  const {locale} = await Promise.resolve(params);
  const t = await getTranslations({locale, namespace: 'Titles'});

  return {
    title: `${t('logistics')} · ${t('tracking') ?? 'Tracking'}`,
    description: 'Monitor de eventos, integraciones y alertas logísticas',
  };
}

const LogisticsTrackingPage: NextPage = () => {
  return <TrackingCenter />;
};

export default LogisticsTrackingPage;
