"use client";

import React, { useCallback, useMemo, useState } from "react";
import { Input } from "@repo/ui/inputs/scenes/input";
import { Buttons } from "@repo/ui/buttons/scenes";
import { Badge } from "@repo/ui/badges/scenes/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card/scenes/card";
import { HiOutlineMagnifyingGlass, HiOutlinePlus, HiOutlineTrash } from "react-icons/hi2";

export type CriterionItem = {
  id: string;
  name: string;
  description?: string;
  weight?: string;
  notes_template?: string;
};

const DEFAULT_CRITERIA: CriterionItem[] = [
  {
    id: "c-001",
    name: "Exactitud",
    description: "Valora la corrección del procedimiento y el resultado.",
    weight: "40",
    notes_template: "Se evaluó la precisión de la respuesta.",
  },
  {
    id: "c-002",
    name: "Argumentación",
    description: "Evalúa la claridad y consistencia de la justificación.",
    weight: "35",
    notes_template: "Se revisó la coherencia del razonamiento.",
  },
  {
    id: "c-003",
    name: "Presentación",
    description: "Orden, legibilidad y uso adecuado del lenguaje.",
    weight: "25",
    notes_template: "Se tuvo en cuenta la estructura y redacción.",
  },
];

export function CriteriaPicker({
  value,
  onChange,
  criteria,
  title,
  description,
}: {
  value: string[];
  onChange: (next: string[]) => void;
  criteria?: CriterionItem[];
  title?: string;
  description?: string;
}) {
  const [query, setQuery] = useState("");
  const [activeId, setActiveId] = useState<string | null>(null);

  const dataset = criteria ?? DEFAULT_CRITERIA;

  const selectedSet = useMemo(() => new Set(value), [value]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return dataset;
    return dataset.filter((item) => {
      return (
        item.name.toLowerCase().includes(q) ||
        (item.description ?? "").toLowerCase().includes(q) ||
        (item.weight ?? "").toLowerCase().includes(q)
      );
    });
  }, [dataset, query]);

  const selectedItems = useMemo(() => {
    const byId = new Map(dataset.map((c) => [c.id, c] as const));
    return value.map((id) => byId.get(id)).filter(Boolean) as CriterionItem[];
  }, [dataset, value]);

  const activeItem = useMemo(() => {
    if (!activeId) return null;
    return dataset.find((c) => c.id === activeId) ?? null;
  }, [activeId, dataset]);

  const handleAdd = useCallback(
    (id: string) => {
      if (selectedSet.has(id)) return;
      onChange([...value, id]);
      setActiveId(id);
    },
    [onChange, selectedSet, value]
  );

  const handleRemove = useCallback(
    (id: string) => {
      const next = value.filter((x) => x !== id);
      onChange(next);
      if (activeId === id) {
        setActiveId(next.length ? (next[next.length - 1] ?? null) : null);
      }
    },
    [activeId, onChange, value]
  );

  return (
    <div className='col-span-12 grid grid-cols-12 gap-4'>
      <div className='col-span-12 flex flex-col gap-1'>
        <div className='flex flex-col gap-1'>
          {title ? <p className='text-sm font-semibold'>{title}</p> : null}
          {description ? <p className='text-xs text-muted-foreground'>{description}</p> : null}
        </div>
      </div>

      <div className='col-span-12 lg:col-span-7'>
        <Card className='h-full'>
          <CardHeader className='space-y-3'>
            <div className='flex flex-col gap-1'>
              <CardTitle className='text-base'>Criterios</CardTitle>
              <p className='text-xs text-muted-foreground'>Busca y agrega criterios para calificar el examen.</p>
            </div>

            <div className='relative'>
              <span className='pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground'>
                <HiOutlineMagnifyingGlass className='h-4 w-4' />
              </span>
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder='Buscar por nombre o descripción...'
                className='pl-9'
              />
            </div>

            <div className='flex items-center justify-between text-xs text-muted-foreground'>
              <span>{filtered.length} resultados</span>
              <span>{value.length} seleccionados</span>
            </div>
          </CardHeader>

          <CardContent className='space-y-2'>
            {filtered.length ? (
              filtered.map((item) => {
                const selected = selectedSet.has(item.id);
                return (
                  <div
                    key={item.id}
                    onClick={() => setActiveId(item.id)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setActiveId(item.id);
                      }
                    }}
                    role='button'
                    tabIndex={0}
                    className={`w-full rounded-2xl border px-4 py-3 text-left transition ${
                      activeId === item.id ? "border-primary/50 bg-primary/5" : "border-border/60 hover:bg-muted/40"
                    }`}
                  >
                    <div className='flex items-start justify-between gap-3'>
                      <div className='min-w-0 space-y-2'>
                        <p className='line-clamp-1 text-sm font-semibold text-foreground'>{item.name}</p>
                        <div className='flex flex-wrap items-center gap-2'>
                          {item.weight ? <Badge variant='counter'>peso {item.weight}%</Badge> : null}
                        </div>
                        {item.description ? (
                          <p className='line-clamp-2 text-xs text-muted-foreground'>{item.description}</p>
                        ) : (
                          <p className='line-clamp-1 text-xs text-muted-foreground'>Sin descripción</p>
                        )}
                      </div>

                      <div className='shrink-0'>
                        <Buttons
                          type='button'
                          size='sm'
                          variant={selected ? "outline" : "default"}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            if (!selected) handleAdd(item.id);
                          }}
                          disabled={selected}
                          className='inline-flex items-center gap-2'
                        >
                          <HiOutlinePlus className='h-4 w-4' />
                          {selected ? "Agregado" : "Agregar"}
                        </Buttons>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className='rounded-2xl border border-dashed border-border/70 px-4 py-8 text-center text-sm text-muted-foreground'>
                No hay criterios que coincidan con tu búsqueda.
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className='col-span-12 lg:col-span-5'>
        <Card className='h-full'>
          <CardHeader className='space-y-3'>
            <div className='space-y-1'>
              <CardTitle className='text-base'>Seleccionados</CardTitle>
              <p className='text-xs text-muted-foreground'>Define los criterios con los que se evaluará.</p>
            </div>
          </CardHeader>

          <CardContent className='space-y-3'>
            {selectedItems.length ? (
              <div className='space-y-2'>
                {selectedItems.map((item) => {
                  return (
                    <div
                      key={item.id}
                      className={`rounded-2xl border px-4 py-3 transition ${
                        activeId === item.id ? "border-primary/50 bg-primary/5" : "border-border/60"
                      }`}
                    >
                      <div className='flex items-start justify-between gap-3'>
                        <button
                          type='button'
                          onClick={() => setActiveId(item.id)}
                          className='min-w-0 text-left'
                        >
                          <p className='line-clamp-1 text-sm font-semibold text-foreground'>{item.name}</p>
                          {item.weight ? (
                            <p className='text-xs text-muted-foreground'>Peso: {item.weight}%</p>
                          ) : null}
                        </button>

                        <Buttons
                          type='button'
                          size='sm'
                          variant='ghost'
                          onClick={() => handleRemove(item.id)}
                          className='inline-flex items-center gap-2'
                        >
                          <HiOutlineTrash className='h-4 w-4' />
                          Quitar
                        </Buttons>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className='rounded-2xl border border-dashed border-border/70 px-4 py-8 text-center text-sm text-muted-foreground'>
                Aún no has agregado criterios.
              </div>
            )}

            <div className='rounded-2xl border border-border/60 bg-muted/20 px-4 py-4'>
              <p className='text-xs font-semibold uppercase tracking-wide text-muted-foreground'>Preview</p>

              {activeItem ? (
                <div className='mt-2 space-y-3'>
                  <div className='space-y-2'>
                    <p className='text-sm font-semibold text-foreground'>{activeItem.name}</p>
                    <div className='flex flex-wrap gap-2'>
                      {activeItem.weight ? <Badge variant='counter'>peso {activeItem.weight}%</Badge> : null}
                    </div>
                    {activeItem.description ? (
                      <p className='text-sm text-foreground'>{activeItem.description}</p>
                    ) : (
                      <p className='text-sm text-muted-foreground'>(sin descripción)</p>
                    )}
                  </div>

                  {activeItem.notes_template ? (
                    <div className='space-y-1'>
                      <p className='text-xs font-semibold text-muted-foreground'>Plantilla de observación</p>
                      <p className='text-sm text-foreground'>{activeItem.notes_template}</p>
                    </div>
                  ) : null}
                </div>
              ) : (
                <p className='mt-2 text-sm text-muted-foreground'>Selecciona un criterio para ver el detalle.</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
