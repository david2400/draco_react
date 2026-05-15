/** @format */

import { Metadata, NextPage } from "next";
import { getTranslations } from "next-intl/server";
import { GroupStudentManager } from "@/modules/estructura_institucion/groupStudents/components/group-student-manager";

export async function generateMetadata({
  params,
}: {
  params: { locale: string; groupId: string };
}): Promise<Metadata> {
  const { locale } = await Promise.resolve(params);
  const t = await getTranslations({ locale, namespace: "Titles" });

  return {
    title: t("gestion_alumnos"),
    description: "Registro individual de estudiantes.",
  };
}

const GroupStudentsPage: NextPage<{ params: { locale: string; groupId: string } }> = async ({
  params,
}) => {
  const { locale, groupId } = await Promise.resolve(params);
  await getTranslations({
    locale,
    namespace: "GestionAlumnos",
  });

  return <GroupStudentManager groupId={groupId} />;
};

export default GroupStudentsPage;
