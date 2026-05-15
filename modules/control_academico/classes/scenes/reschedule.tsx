/** @format */

"use client";

import React from "react";
import { useReschedulePreview } from "../hooks/useReschedulePreview";
import { IClassSession } from "../models/class.model";
import { HolidayWarning } from "./holiday-warning";
import { ACADEMIC_HOLIDAYS } from "../mocks/data";

interface RescheduleModalProps {
  open: boolean;
  onOpenChange: (value: boolean) => void;
  sessions: IClassSession[];
}

export const Reschedule: React.FC<RescheduleModalProps> = ({ open, onOpenChange, sessions }) => {
  const {
    selectedIds,
    setSelectedIds,
    strategy,
    setStrategy,
    preview,
    generatePreview,
    applyChanges,
    isLoading,
  } = useReschedulePreview({ sessions, holidays: ACADEMIC_HOLIDAYS });

  if (!open) return null;

  const toggleSelection = (id: number) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  const handlePreview = async () => {
    await generatePreview();
  };

  const handleConfirm = async () => {
    const ok = await applyChanges();
    if (ok) onOpenChange(false);
  };

  return (
    <section className='rounded-3xl border border-border/60 bg-white p-6 shadow-2xl'>
      <header className='space-y-2'>
        <p className='text-xs uppercase tracking-[0.3em] text-muted-foreground'>Reprogramación</p>
        <h2 className='text-2xl font-semibold text-foreground'>Mover clases afectadas</h2>
      </header>

      <div className='mt-6 grid grid-cols-12 gap-4'>
        <div className='col-span-12 lg:col-span-6 space-y-3 rounded-2xl border border-border/60 p-4'>
          <p className='text-xs uppercase tracking-[0.3em] text-muted-foreground'>Selecciona clases</p>
          <div className='space-y-2 max-h-64 overflow-y-auto'>
            {sessions.map((session) => (
              <label key={session.id} className='flex items-center gap-3 rounded-xl border border-border/40 px-3 py-2 text-sm'>
                <input
                  type='checkbox'
                  checked={selectedIds.includes(session.id)}
                  onChange={() => toggleSelection(session.id)}
                  className='rounded border-border/70 text-primary focus:ring-primary'
                />
                <div>
                  <p className='font-semibold'>{session.subject}</p>
                  <p className='text-xs text-muted-foreground'>
                    {new Date(session.start).toLocaleString("es-CO", {
                      weekday: "long",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </label>
            ))}
          </div>
        </div>

        <div className='col-span-12 space-y-4 lg:col-span-6'>
          <div className='rounded-2xl border border-border/60 p-4'>
            <p className='text-xs uppercase tracking-[0.3em] text-muted-foreground'>Estrategia</p>
            <div className='mt-3 flex gap-2'>
              {(["push_one_day", "next_available"] as const).map((option) => (
                <button
                  key={option}
                  type='button'
                  onClick={() => setStrategy(option)}
                  className={`flex-1 rounded-full px-4 py-2 text-sm font-semibold transition ${
                    strategy === option ? "bg-primary text-primary-foreground" : "border border-border text-muted-foreground"
                  }`}
                >
                  {option === "push_one_day" ? "Desplazar un día" : "Siguiente disponible"}
                </button>
              ))}
            </div>
          </div>

          <HolidayWarning conflicts={preview.map((item) => item.suggestedDate)} />

          <div className='rounded-2xl border border-border/60 p-4 text-sm text-muted-foreground'>
            {preview.length ? (
              <ul className='space-y-2 text-xs'>
                {preview.map((item) => (
                  <li key={item.classId} className='rounded-xl border border-border/40 bg-muted/20 px-3 py-2'>
                    Clase #{item.classId}: {new Date(item.originalDate).toLocaleDateString("es-CO")}
                    <span className='mx-2 text-muted-foreground'>→</span>
                    {new Date(item.suggestedDate).toLocaleDateString("es-CO")}
                  </li>
                ))}
              </ul>
            ) : (
              <p>Genera una vista previa para validar los desplazamientos.</p>
            )}
          </div>

          <div className='flex flex-col gap-2 sm:flex-row'>
            <button
              type='button'
              onClick={handlePreview}
              className='flex-1 rounded-full border border-border px-4 py-2 text-sm font-semibold text-foreground'
              disabled={isLoading || !selectedIds.length}
            >
              Vista previa
            </button>
            <button
              type='button'
              onClick={handleConfirm}
              className='flex-1 rounded-full bg-primary py-2 text-sm font-semibold text-primary-foreground'
              disabled={isLoading || !preview.length}
            >
              Confirmar cambios
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
