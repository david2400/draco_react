/** @format */

import { Metadata, NextPage } from "next";
import { getTranslations } from "next-intl/server";
import { UpdateExamForm } from "@/modules/control_academico/exams/components/form";

export async function generateMetadata({
  params,
}: {
  params: { locale: string; id: string };
}): Promise<Metadata> {
  const { locale } = await Promise.resolve(params);
  const t = await getTranslations({ locale, namespace: "Titles" });

  return {
    title: t("control_academico"),
    description: "Gestión de evaluaciones diagnósticas.",
  };
}

const ExamsUpdatePage: NextPage<{ params: { locale: string; id: string } }> = async ({
  params,
}) => {
  const { id } = await Promise.resolve(params);
  const numericId = Number(id);

  return <UpdateExamForm id={Number.isFinite(numericId) ? numericId : 0} />;
};

export default ExamsUpdatePage;
