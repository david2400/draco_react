import {NextPage} from 'next';
import type {Metadata} from 'next';
import {getTranslations} from 'next-intl/server';
import {ShipmentsControl} from '@modules/logistics/components/shipments-control';

export async function generateMetadata({
  params,
}: {
  params: {locale: string};
}): Promise<Metadata> {
  const {locale} = await Promise.resolve(params);
  const t = await getTranslations({locale, namespace: 'Titles'});

  return {
    title: `${t('logistics')} · ${t('shipments') ?? 'Envíos'}`,
    description: 'Gestión en tiempo real de pedidos, oleadas y SLA',
  };
}

const LogisticsShipmentsPage: NextPage = () => {
  return <ShipmentsControl />;
};

export default LogisticsShipmentsPage;
