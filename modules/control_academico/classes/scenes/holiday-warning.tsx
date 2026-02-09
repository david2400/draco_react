/** @format */

"use client";

import React from "react";
import { HiOutlineExclamationTriangle, HiOutlineCalendar } from "react-icons/hi2";

interface HolidayWarningProps {
  conflicts: string[];
  onOpenReschedule?: () => void;
}

export const HolidayWarning: React.FC<HolidayWarningProps> = ({ conflicts, onOpenReschedule }) => {
  if (!conflicts.length) return null;

  return (
    <div className='rounded-2xl border border-amber-200 bg-amber-50/80 px-4 py-3 text-sm text-amber-900 shadow-sm'>
      <div className='flex items-start gap-3'>
        <HiOutlineExclamationTriangle className='mt-1 h-5 w-5 text-amber-500' />
        <div className='space-y-1'>
          <p className='font-semibold'>Festivos detectados</p>
          <ul className='space-y-1 text-xs'>
            {conflicts.map((date) => (
              <li key={date} className='inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 text-amber-900'>
                <HiOutlineCalendar className='h-4 w-4' />
                {new Date(date).toLocaleDateString("es-CO", { weekday: "long", month: "short", day: "numeric" })}
              </li>
            ))}
          </ul>
          {onOpenReschedule && (
            <button
              type='button'
              onClick={onOpenReschedule}
              className='text-xs font-semibold text-amber-800 underline underline-offset-4'
            >
              Reprogramar automáticamente
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
