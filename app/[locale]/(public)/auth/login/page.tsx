/** @format */

import { Login } from "@/modules/auth/login/components/form";
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
    title: t("category"),
    description: "Administra las marcas de productos en Cygnus Shop",
  };
}

const LoginPage: NextPage = () => {
  return <Login></Login>;
};

export default LoginPage;
