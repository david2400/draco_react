'use client';

import Image from 'next/image';
import Link from 'next/link';
import {PageHeaderData} from '@/types/formSchema';
import {ReactNode} from 'react';

interface PageHeaderProps {
  data: PageHeaderData;
  actions?: ReactNode;
}

export const PageHeader = ({data, actions}: PageHeaderProps) => {
  const {title, subtitle, imageLink, leftLink} = data;

  return (
    <header className='relative overflow-hidden rounded-3xl border border-indigo-100/40 bg-gradient-to-br from-white via-indigo-50/60 to-white px-8 py-10 shadow-[0_24px_60px_-18px_rgba(79,70,229,0.4)] md:flex md:items-center md:justify-between'>
      <div className='pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 translate-x-10 opacity-50 blur-3xl md:block'>
        <div className='h-full w-full bg-gradient-to-r from-indigo-300/40 via-purple-300/40 to-transparent'></div>
      </div>
      <div className='relative z-10 flex flex-1 flex-col gap-4'>
        {subtitle ? (
          <span className='inline-flex w-fit items-center gap-1 rounded-full border border-indigo-200/60 bg-indigo-100/60 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-700'>
            {subtitle}
          </span>
        ) : null}
        <h1 className='text-3xl font-semibold leading-tight text-slate-900 sm:text-4xl'>{title}</h1>
        {leftLink ? (
          <Link
            href={leftLink.href}
            className='inline-flex w-fit items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-sm font-semibold text-indigo-600 shadow-sm ring-1 ring-indigo-100 transition hover:bg-indigo-600 hover:text-white'
          >
            <span aria-hidden='true'>←</span>
            {leftLink.title}
          </Link>
        ) : null}
      </div>

      <div className='relative z-10 mt-8 flex items-center gap-4 md:mt-0 w-full'>
        {actions}
        {imageLink ? (
          <div className='relative h-28 w-28 shrink-0 overflow-hidden rounded-2xl border border-white/70 bg-white/80 p-3 shadow-lg transition hover:-translate-y-1 hover:shadow-xl md:h-32 md:w-32'>
            <Image
              src={imageLink}
              alt={title}
              fill
              className='object-contain'
              sizes='(min-width: 768px) 128px, 112px'
            />
          </div>
        ) : null}
      </div>
    </header>
  );
};
