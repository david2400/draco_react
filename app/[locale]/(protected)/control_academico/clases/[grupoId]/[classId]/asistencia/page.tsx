/** @format */

import { ClassAttendanceWorkspace } from "@/modules/control_academico/classes";
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
    title: t("control_academico"),
    description: "Registro de asistencia individual por clase.",
  };
}

const ClassAttendancePage: NextPage<{ params: { locale: string } }> = async () => {
  return <ClassAttendanceWorkspace />;
};

export default ClassAttendancePage;
