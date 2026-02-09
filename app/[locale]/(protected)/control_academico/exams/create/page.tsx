/** @format */
import { Metadata, NextPage } from "next";
import { getTranslations } from "next-intl/server";
import { RegisterExamForm } from "@/modules/control_academico/exams/components/form";

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

const ExamsCreatePage: NextPage<{ params: { locale: string } }> = async () => {
  return <RegisterExamForm />;
};

export default ExamsCreatePage;
