/** @format */

import { Metadata, NextPage } from "next";
import { getTranslations } from "next-intl/server";
import { GroupManager } from "@/modules/estructura_institucion/group/components/group-manager";

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

const GroupPage: NextPage<{ params: { locale: string } }> = async ({params}) => {
  const {locale} = await Promise.resolve(params);
  await getTranslations({
    locale,
    namespace: "GestionAlumnos",
  });

  return <GroupManager />;
};

export default GroupPage;
