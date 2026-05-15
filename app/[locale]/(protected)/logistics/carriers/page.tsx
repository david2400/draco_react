import {NextPage} from 'next';
import type {Metadata} from 'next';
import {getTranslations} from 'next-intl/server';
import {CarrierCenter} from '@modules/logistics/components/carrier-center';

export async function generateMetadata({
  params,
}: {
  params: {locale: string};
}): Promise<Metadata> {
  const {locale} = await Promise.resolve(params);
  const t = await getTranslations({locale, namespace: 'Titles'});

  return {
    title: `${t('logistics')} · ${t('carriers') ?? 'Carriers'}`,
    description: 'Control de transportadoras, integraciones y desempeño',
  };
}

const LogisticsCarriersPage: NextPage = () => {
  return <CarrierCenter />;
};

export default LogisticsCarriersPage;
