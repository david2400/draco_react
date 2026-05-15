/** @format */

import { Metadata, NextPage } from "next";
import { getTranslations } from "next-intl/server";
import { ExamManager } from "@/modules/control_academico/exams/components/exam-manager";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = await Promise.resolve(params);
  const t = await getTranslations({ locale, namespace: "Titles" });

  return {
    title: t("control_academico"),
    description: "Gestión de evaluaciones diagnósticas.",
  };
}

const ExamsPage: NextPage<{ params: { locale: string } }> = async () => {
  return <ExamManager />;
};

export default ExamsPage;
