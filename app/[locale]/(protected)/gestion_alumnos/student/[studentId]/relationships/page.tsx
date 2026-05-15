/** @format */

import { Metadata, NextPage } from "next";
import { getTranslations } from "next-intl/server";
import { StudentRelationshipManager } from "@modules/gestion_alumnos/relationship/components/student-relationship-manager";

export async function generateMetadata({
  params,
}: {
  params: { locale: string; studentId: string };
}): Promise<Metadata> {
  const { locale } = await Promise.resolve(params);
  const t = await getTranslations({ locale, namespace: "Titles" });

  return {
    title: t("gestion_alumnos"),
    description: "Asociación entre estudiantes y acudientes.",
  };
}

const StudentRelationshipsPage: NextPage<{
  params: { locale: string; studentId: string };
  searchParams?: { guardianId?: string };
}> = async ({ params, searchParams }) => {
  await getTranslations({ locale: params.locale, namespace: "GestionAlumnos" });
  return (
    <StudentRelationshipManager
      studentId={params.studentId}
      initialGuardianId={searchParams?.guardianId}
    />
  );
};

export default StudentRelationshipsPage;
