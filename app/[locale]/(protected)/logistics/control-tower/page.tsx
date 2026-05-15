import {NextPage} from 'next';
import type {Metadata} from 'next';
import {getTranslations} from 'next-intl/server';
import {ControlTower} from '@modules/logistics/components/control-tower';

export async function generateMetadata({
  params,
}: {
  params: {locale: string};
}): Promise<Metadata> {
  const {locale} = await Promise.resolve(params);
  const t = await getTranslations({locale, namespace: 'Titles'});

  return {
    title: `${t('logistics')} · ${t('controlTower') ?? 'Control tower'}`,
    description: 'Vista 360° de alertas, zonas y riesgos logísticos',
  };
}

const LogisticsControlTowerPage: NextPage = () => {
  return <ControlTower />;
};

export default LogisticsControlTowerPage;
