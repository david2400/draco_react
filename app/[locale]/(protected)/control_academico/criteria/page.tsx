/** @format */

import { Metadata, NextPage } from "next";
import { getTranslations } from "next-intl/server";
import { CriteriaManager } from "@/modules/control_academico/criteria/components/criteria-manager";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = await Promise.resolve(params);
  const t = await getTranslations({ locale, namespace: "Titles" });

  return {
    title: t("control_academico"),
    description: "Criterios de calificación personalizados.",
  };
}

const CriteriaPage: NextPage<{ params: { locale: string } }> = async () => {
  return <CriteriaManager />;
};

export default CriteriaPage;
