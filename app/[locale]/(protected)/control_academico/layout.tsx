/** @format */

"use server";
import React from "react";
import { getTranslations } from "next-intl/server";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/card/scenes/card";

export default async function ControlAcademicoLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const { locale } = await Promise.resolve(params);
  const t = await getTranslations({
    locale,
    namespace: "ControlAcademico.layout",
  });

  return (
    <div className='flex flex-1'>
      <section className='mx-auto flex w-full flex-col gap-6 px-6 py-10'>
        <header className='space-y-2 text-muted-foreground'>
          <p className='text-xs font-semibold uppercase tracking-[0.4em] text-primary'>
            {t("sectionLabel")}
          </p>
          <div className='space-y-1 text-foreground'>
            <h1 className='text-3xl font-semibold'>{t("title")}</h1>
            <p>{t("description")}</p>
          </div>
        </header>

        <Card>
          <CardHeader>
            <CardTitle>{t("title")}</CardTitle>
            <CardDescription>{t("description")}</CardDescription>
          </CardHeader>
          <CardContent>{children}</CardContent>
        </Card>
      </section>
    </div>
  );
}
