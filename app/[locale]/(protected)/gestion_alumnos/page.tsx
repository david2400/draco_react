import { Metadata, NextPage } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = await Promise.resolve(params);
  const t = await getTranslations({ locale, namespace: "Titles" });

  return {
    title: t("gestion_alumnos"),
    description:
      "Portal para registrar estudiantes, acudientes y vínculos familiares.",
  };
}

const GestionAlumnosPage: NextPage<{ params: { locale: string } }> = async ({
  params,
}) => {
  const t = await getTranslations({
    locale: params.locale,
    namespace: "GestionAlumnos",
  });

  return <></>;
};

export default GestionAlumnosPage;
