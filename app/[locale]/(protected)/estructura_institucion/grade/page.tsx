/** @format */

import { Metadata, NextPage } from "next";
import { getTranslations } from "next-intl/server";
import { GradeManager } from "@/modules/estructura_institucion/grade/components/grade-manager";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = await Promise.resolve(params);
  const t = await getTranslations({ locale, namespace: "Titles" });

  return {
    title: t("gestion_alumnos"),
    description: "Registro individual de estudiantes.",
  };
}

const GradePage: NextPage<{ params: { locale: string } }> = async () => {
  return <GradeManager />;
};

export default GradePage;
