'use client';

import {useState} from 'react';
import {IoClose} from 'react-icons/io5';
import {GiHamburgerMenu} from 'react-icons/gi';
import type {ISideMenu} from '../../models/sideMenu.interfaces';
import {Buttons} from '@/components/buttons/scenes';

export const SideBarMenu = ({className, title, children}: ISideMenu) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      {sidebarOpen && (
        <div
          className='fixed inset-0 bg-black/50 md:hidden z-30'
          onClick={() => setSidebarOpen(false)}
          aria-hidden='true'
        />
      )}
      {/* Sidebar - Fixed en mobile, Relative en desktop */}
      <aside
        className={`${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 md:relative md:h-auto md:flex-shrink-0 fixed md:static top-0 left-0 h-screen md:h-auto w-64 md:w-auto bg-white shadow-lg md:shadow-sm transition-transform duration-300 ease-in-out z-40 overflow-y-auto md:overflow-visible ${className || ''}`}
      >
        {/* Header con close button (solo visible en mobile) */}
        <div className='md:hidden sticky top-0 bg-white border-b border-slate-200 p-4 flex justify-between items-center'>
          <h2 className='text-lg font-semibold text-slate-900'>{title}</h2>
          <Buttons
            variant='ghost'
            size='sm'
            className='!p-2'
            onClick={toggleSidebar}
            aria-label='Cerrar menú'
          >
            <IoClose className='w-5 h-5' />
          </Buttons>
        </div>

        {/* Contenido del sidebar */}
        <div className='p-6 space-y-6 md:p-4'>{children}</div>
      </aside>

      {/* Hamburger button - Solo visible en mobile */}
      <Buttons
        className='md:hidden fixed top-4 left-4 z-50 bg-transparent'
        variant='outline'
        size='sm'
        onClick={toggleSidebar}
        aria-label='Abrir menú'
      >
        <GiHamburgerMenu className='w-5 h-5' />
      </Buttons>
    </>
  );
};
