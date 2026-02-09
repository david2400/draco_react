/** @format */

"use client";

import React from "react";
import { HiOutlineCalendarDays, HiOutlineArrowLeft, HiOutlineArrowRight } from "react-icons/hi2";

interface WeekHeaderProps {
  label: string;
  rangeLabel: string;
  totalClasses: number;
  delivered: number;
  postponed: number;
  onPrev?: () => void;
  onNext?: () => void;
}

export const WeekHeader: React.FC<WeekHeaderProps> = ({
  label,
  rangeLabel,
  totalClasses,
  delivered,
  postponed,
  onPrev,
  onNext,
}) => {
  return (
    <header className='flex flex-col gap-4 rounded-2xl border border-border/60 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-5 text-white shadow-md'>
      <div className='flex items-center justify-between gap-3'>
        <div>
          <p className='text-xs uppercase tracking-[0.35em] text-white/60'>{rangeLabel}</p>
          <h2 className='text-2xl font-semibold'>{label}</h2>
        </div>
        <div className='flex items-center gap-2 text-white/80'>
          <button
            type='button'
            aria-label='Semana anterior'
            onClick={onPrev}
            className='rounded-full border border-white/10 p-2 transition hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white'
          >
            <HiOutlineArrowLeft className='h-5 w-5' />
          </button>
          <button
            type='button'
            aria-label='Semana siguiente'
            onClick={onNext}
            className='rounded-full border border-white/10 p-2 transition hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white'
          >
            <HiOutlineArrowRight className='h-5 w-5' />
          </button>
        </div>
      </div>
      <div className='grid grid-cols-3 gap-3 text-sm'>
        <div className='rounded-xl bg-white/10 p-3'>
          <p className='text-xs uppercase tracking-wide text-white/60'>Clases</p>
          <p className='text-2xl font-semibold'>{totalClasses}</p>
        </div>
        <div className='rounded-xl bg-white/10 p-3'>
          <p className='text-xs uppercase tracking-wide text-white/60'>Dictadas</p>
          <p className='text-2xl font-semibold text-emerald-300'>{delivered}</p>
        </div>
        <div className='rounded-xl bg-white/10 p-3'>
          <p className='text-xs uppercase tracking-wide text-white/60'>Aplazadas</p>
          <p className='text-2xl font-semibold text-amber-300'>{postponed}</p>
        </div>
      </div>
    </header>
  );
};
