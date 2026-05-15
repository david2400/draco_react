/** @format */

import { ClassScheduleBoard } from "@/modules/control_academico/classes";
import { Metadata, NextPage } from "next";
import { getTranslations } from "next-intl/server";

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

const ClasesPage: NextPage<{ params: { locale: string } }> = async () => {
  return <ClassScheduleBoard />;
};

export default ClasesPage;
