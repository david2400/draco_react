/** @format */

import { Metadata, NextPage } from "next";
import { getTranslations } from "next-intl/server";
import { QuestionManager } from "@/modules/control_academico/questions";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = await Promise.resolve(params);
  const t = await getTranslations({ locale, namespace: "Titles" });

  return {
    title: t("control_academico"),
    description: "Banco de preguntas institucional.",
  };
}

const QuestionsPage: NextPage<{ params: { locale: string } }> = async () => {
  return <QuestionManager />;
};

export default QuestionsPage;
