'use client';

import {PageDesktopData} from '@/types/formSchema';
import {ReactNode} from 'react';

interface PageDesktopProps {
  data?: PageDesktopData;
  children?: ReactNode;
}

export const PageDesktop = ({children}: PageDesktopProps) => {
  return (
    <section className='relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-900 pb-16 pt-12'>
      <div className='pointer-events-none absolute inset-x-0 top-0 mx-auto h-64 max-w-5xl rounded-full bg-indigo-500/30 blur-3xl'></div>
      <div className='mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 sm:px-6 lg:px-8'>
        <div className='rounded-3xl bg-white/5 p-1 backdrop-blur-xl shadow-[0_20px_50px_rgba(15,23,42,0.35)]'>
          <div className='rounded-[calc(1.5rem-4px)] bg-gradient-to-br from-white/95 to-white/70 px-6 py-8 shadow-2xl backdrop-blur-xl sm:px-10 sm:py-12'>
            <div className='mx-auto flex w-full max-w-5xl flex-col gap-8'>{children}</div>
          </div>
        </div>
      </div>
    </section>
  );
};
