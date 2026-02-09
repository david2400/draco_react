/** @format */

import { Metadata, NextPage } from "next";
import { getTranslations } from "next-intl/server";
import { StudentManager } from "@modules/gestion_alumnos/student/components/student-manager";

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

const StudentPage: NextPage<{ params: { locale: string } }> = async ({
  params,
}) => {
  const t = await getTranslations({
    locale: params.locale,
    namespace: "GestionAlumnos",
  });

  return <StudentManager />;
};

export default StudentPage;
