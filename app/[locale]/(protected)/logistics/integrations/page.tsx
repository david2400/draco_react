import {NextPage} from 'next';
import type {Metadata} from 'next';
import {getTranslations} from 'next-intl/server';
import {IntegrationsConsole} from '@modules/logistics/components/integrations-console';

export async function generateMetadata({
  params,
}: {
  params: {locale: string};
}): Promise<Metadata> {
  const {locale} = await Promise.resolve(params);
  const t = await getTranslations({locale, namespace: 'Titles'});

  return {
    title: `${t('logistics')} · ${t('integrations') ?? 'Integraciones'}`,
    description: 'Monitoreo de APIs, webhooks y salud de proveedores logísticos',
  };
}

const LogisticsIntegrationsPage: NextPage = () => {
  return <IntegrationsConsole />;
};

export default LogisticsIntegrationsPage;
