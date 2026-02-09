/** @format */

import { Metadata, NextPage } from "next";
import { getTranslations } from "next-intl/server";
import { GuardianStudentManager } from "@modules/gestion_alumnos/guardian/components/guardian-student-manager";
import { CardDescription, CardHeader, CardTitle } from "@repo/ui/card/scenes/card";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = await Promise.resolve(params);
  const t = await getTranslations({ locale, namespace: "Titles" });

  return {
    title: t("gestion_alumnos"),
    description: "Registro de acudientes y tutores.",
  };
}

const GuardianPage: NextPage<{
  params: { locale: string };
  searchParams?: { studentId?: string };
}> = async ({ params, searchParams }) => {
  const { locale } = await Promise.resolve(params);
  const { studentId } = await Promise.resolve(searchParams ?? {});
  const t = await getTranslations({ locale, namespace: "GestionAlumnos" });

  return (
    <>
      <CardHeader>
        <CardTitle>{t("studentCardTitle")}</CardTitle>
        <CardDescription>{t("studentCardDescription")}</CardDescription>
      </CardHeader>
      <GuardianStudentManager initialStudentId={studentId} />
    </>
  );
};

export default GuardianPage;
