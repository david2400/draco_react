/** @format */

import { Metadata, NextPage } from "next";
import { getTranslations } from "next-intl/server";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/card/scenes/card";
import { RegisterFamilyLink } from "@modules/gestion_alumnos/relationship/components/form";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = await Promise.resolve(params);
  const t = await getTranslations({ locale, namespace: "Titles" });

  return {
    title: t("gestion_alumnos"),
    description: "Asociación entre estudiantes y acudientes.",
  };
}

const RelationshipPage: NextPage<{ params: { locale: string } }> = async ({
  params,
}) => {
  const t = await getTranslations({
    locale: params.locale,
    namespace: "GestionAlumnos",
  });

  return <RegisterFamilyLink />;
};

export default RelationshipPage;
