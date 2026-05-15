import {NextPage} from 'next';
import type {Metadata} from 'next';
import {getTranslations} from 'next-intl/server';
import {FleetOperations} from '@modules/logistics/components/fleet-operations';

export async function generateMetadata({
  params,
}: {
  params: {locale: string};
}): Promise<Metadata> {
  const {locale} = await Promise.resolve(params);
  const t = await getTranslations({locale, namespace: 'Titles'});

  return {
    title: `${t('logistics')} · ${t('fleet') ?? 'Flota'}`,
    description: 'Disponibilidad vehicular, mantenimientos y parámetros operativos',
  };
}

const LogisticsFleetPage: NextPage = () => {
  return <FleetOperations />;
};

export default LogisticsFleetPage;
