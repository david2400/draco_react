'use server';
import {SideBarMenu} from '@repo/ui/modals/scenes/sidebar/sidebarMenu';
import React from 'react';
import {MenuDynamic} from '@repo/ui/collapse/components/menuDynamic';
import {ListItemData} from '@repo/ui/collapse/models/collapse.interfaces';

export default async function PqrsLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}>) {
  const {locale} = await params;
  const NAV_ITEMS: ListItemData[] = [
    {
      label: 'Create',
      href: '/pqrs/create',
    },
    {
      label: 'Administre',
      href: '/pqrs/administration',
    },
  ];

  return (
    <>
      <SideBarMenu title='Filtro'>
        <MenuDynamic data={NAV_ITEMS}></MenuDynamic>
      </SideBarMenu>
      <main className='flex-1 min-h-screen bg-gradient-to-br from-slate-50 to-slate-100'>
        {children}
      </main>
    </>
  );
}
