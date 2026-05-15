/** @format */

"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { bulkClassSchema, BulkClassInput } from "../schemas/class.schema";
import { WeekHeader } from "../scenes/week-header";
import { useBulkScheduling } from "../hooks/useBulkScheduling";
import { ACADEMIC_HOLIDAYS } from "../mocks/data";

interface BulkClassCreatorProps {
  open: boolean;
  onOpenChange: (value: boolean) => void;
  groupStartDate: string;
}

const daysOptions = [
  { value: 1, label: "Lunes" },
  { value: 2, label: "Martes" },
  { value: 3, label: "Miércoles" },
  { value: 4, label: "Jueves" },
  { value: 5, label: "Viernes" },
  { value: 6, label: "Sábado" },
];

export const BulkClassCreator: React.FC<BulkClassCreatorProps> = ({ open, onOpenChange, groupStartDate }) => {
  const form = useForm<BulkClassInput>({
    resolver: zodResolver(bulkClassSchema(groupStartDate)),
    defaultValues: {
      groupId: "",
      range: { from: "", to: "" },
      days: [1, 3],
      startHour: "08:00",
      endHour: "10:00",
    },
  });

  const { preview, conflicts, generatePreview, save, isLoading, reset } = useBulkScheduling({
    holidays: ACADEMIC_HOLIDAYS,
  });

  const onSubmit = form.handleSubmit(async (values) => {
    const ok = await generatePreview(values);
    if (!ok) return;
  });

  const handleConfirm = async () => {
    const success = await save();
    if (success) {
      reset();
      onOpenChange(false);
    }
  };

  if (!open) return null;

  return (
    <section className='bg-white p-6'>
      <header className='space-y-2'>
        <p className='text-xs uppercase tracking-[0.3em] text-muted-foreground'>Creación en bloque</p>
        <h2 className='text-2xl font-semibold text-foreground'>Programar varias clases</h2>
      </header>

      <form onSubmit={onSubmit} className='mt-6 grid grid-cols-12 gap-4'>
        <div className='col-span-12 md:col-span-6 space-y-3'>
          <label className='flex flex-col text-sm font-medium text-foreground'>
            Grupo
            <input
              {...form.register("groupId")}
              className='rounded-xl border border-border/60 bg-transparent px-3 py-2 text-sm'
              placeholder='Selecciona un grupo'
            />
          </label>
          <div className='grid gap-3 md:grid-cols-2'>
            <label className='flex flex-col text-sm font-medium text-foreground'>
              Fecha inicial
              <input type='date' {...form.register("range.from")} className='rounded-xl border border-border/60 px-3 py-2 text-sm' />
            </label>
            <label className='flex flex-col text-sm font-medium text-foreground'>
              Fecha final
              <input type='date' {...form.register("range.to")} className='rounded-xl border border-border/60 px-3 py-2 text-sm' />
            </label>
          </div>
          <div className='grid gap-3 md:grid-cols-2'>
            <label className='flex flex-col text-sm font-medium text-foreground'>
              Hora inicio
              <input type='time' {...form.register("startHour")} className='rounded-xl border border-border/60 px-3 py-2 text-sm' />
            </label>
            <label className='flex flex-col text-sm font-medium text-foreground'>
              Hora fin
              <input type='time' {...form.register("endHour")} className='rounded-xl border border-border/60 px-3 py-2 text-sm' />
            </label>
          </div>
          <div className='space-y-2'>
            <p className='text-xs uppercase tracking-[0.3em] text-muted-foreground'>Días</p>
            <div className='flex flex-wrap gap-2'>
              {daysOptions.map((option) => {
                const active = form.watch("days").includes(option.value);
                return (
                  <button
                    key={option.value}
                    type='button'
                    onClick={() => {
                      const current = form.getValues("days");
                      const next = active ? current.filter((day) => day !== option.value) : [...current, option.value];
                      form.setValue("days", next);
                    }}
                    className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                      active ? "bg-primary text-primary-foreground" : "border border-border text-muted-foreground"
                    }`}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          </div>
          <button
            type='submit'
            className='w-full rounded-full bg-primary py-2 text-sm font-semibold text-primary-foreground'
            disabled={isLoading}
          >
            Generar vista previa
          </button>
        </div>

        <div className='col-span-12 md:col-span-6 space-y-4'>
          <WeekHeader
            label={preview ? `${preview.generatedClasses.length} clases` : "Semana preliminar"}
            rangeLabel={preview ? `${preview.range.from} → ${preview.range.to}` : "Selecciona un rango"}
            totalClasses={preview?.generatedClasses.length ?? 0}
            delivered={0}
            postponed={conflicts.length}
          />

          <div className='rounded-2xl border border-border/60 p-4 text-sm text-muted-foreground'>
            {preview ? (
              <>
                <p className='text-sm font-semibold text-foreground'>Vista previa</p>
                <ul className='mt-3 max-h-48 space-y-2 overflow-y-auto text-xs'>
                  {preview.generatedClasses.map((cls, idx) => (
                    <li key={idx} className='rounded-xl border border-border/40 bg-muted/20 px-3 py-2'>
                      {new Date(cls.start).toLocaleString("es-CO", { weekday: "long", hour: "2-digit", minute: "2-digit" })}
                    </li>
                  ))}
                </ul>
                {conflicts.length > 0 && (
                  <p className='mt-3 text-xs text-amber-600'>
                    {conflicts.length} fechas coinciden con festivos. Ajusta o reprograma.
                  </p>
                )}
                <button
                  type='button'
                  className='mt-4 w-full rounded-full bg-foreground py-2 text-sm font-semibold text-white'
                  onClick={handleConfirm}
                  disabled={isLoading}
                >
                  Confirmar bloque
                </button>
              </>
            ) : (
              <p>Configura un rango y genera la vista previa para validar choques.</p>
            )}
          </div>
        </div>
      </form>
    </section>
  );
};
