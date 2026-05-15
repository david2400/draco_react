/** @format */

"use server";
import { SideBarMenu } from "@repo/ui/modals/scenes/sidebar/sidebarMenu";
import React from "react";
import { MenuDynamic } from "@repo/ui/collapse/components/menuDynamic";
import { ListItemData } from "@repo/ui/collapse/models/collapse.interfaces";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/card/scenes/card";
import { getTranslations } from "next-intl/server";

const NAV_ITEMS: ListItemData[] = [
  {
    label: "gestion_alumnos",
    options: [
      { label: "students", href: "/gestion_alumnos/student" },
      { label: "guardians", href: "/gestion_alumnos/guardian" },
      { label: "relationships", href: "/gestion_alumnos/relationship" },
    ],
  },
  {
    label: "docs",
    href: "#",
    // icon: BiCloset,
  },
];

export default async function AdministreLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const {locale} = await Promise.resolve(params);
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
          <CardHeader>
            <CardTitle>{t("studentCardTitle")}</CardTitle>
            <CardDescription>{t("studentCardDescription")}</CardDescription>
          </CardHeader>
          <CardContent>{children}</CardContent>
        </Card>
      </section>
    </div>
  );
}
