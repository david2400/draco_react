/** @format */

"use server";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/card/scenes/card";
import { getTranslations } from "next-intl/server";
import React from "react";

export default async function AdministreLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const { locale } = await Promise.resolve(params);
  const t = await getTranslations({
    locale,
    namespace: "GestionAlumnos",
  });

  return (
    <div className='flex flex-1'>
      {/* <SideBarMenu title='Filtro'>
        <MenuDynamic data={NAV_ITEMS}></MenuDynamic>
      </SideBarMenu> */}

      <section className='flex w-full flex-col gap-6 px-6 py-10'>
        <header className='space-y-2 text-muted-foreground'>
          <p className='text-xs font-semibold uppercase tracking-[0.4em] text-primary'>
            {t("sectionLabel")}
          </p>
          <div className='space-y-1 text-foreground'>
            <h1 className='text-3xl font-semibold'>{t("studentCardTitle")}</h1>
            <p>{t("studentCardDescription")}</p>
          </div>
        </header>

        <Card>
          <CardContent>
            <div className='flex flex-1'>
              {/* <SideBarMenu title='Filtro'>
                <MenuDynamic data={NAV_ITEMS}></MenuDynamic>
              </SideBarMenu> */}

              <section className='flex w-full flex-col py-10'>
                {children}
              </section>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
