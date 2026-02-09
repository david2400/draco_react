"use client";

import React, { useCallback, useMemo, useState } from "react";
import { Input } from "@repo/ui/inputs/scenes/input";
import { Buttons } from "@repo/ui/buttons/scenes";
import { Badge } from "@repo/ui/badges/scenes/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card/scenes/card";
import { HiOutlineMagnifyingGlass, HiOutlinePlus, HiOutlineTrash } from "react-icons/hi2";

export type QuestionBankItem = {
  id: string;
  question_text: string;
  question_type: "multiple_choice" | "true_false" | "open";
  correct_answer?: string;
  difficulty?: string;
  theme_id?: string;
  max_score?: string;
};

const DEFAULT_QUESTIONS: QuestionBankItem[] = [
  {
    id: "q-001",
    question_text: "¿Cuál es el resultado de 8 × 7?",
    question_type: "open",
    correct_answer: "56",
    difficulty: "basic",
    theme_id: "math",
    max_score: "1",
  },
  {
    id: "q-002",
    question_text: "La fotosíntesis ocurre principalmente en...",
    question_type: "multiple_choice",
    correct_answer: "Las hojas",
    difficulty: "basic",
    theme_id: "science",
    max_score: "1",
  },
  {
    id: "q-003",
    question_text: "Verdadero o falso: La Tierra es plana.",
    question_type: "true_false",
    correct_answer: "Falso",
    difficulty: "basic",
    theme_id: "science",
    max_score: "1",
  },
  {
    id: "q-004",
    question_text: "Explica con tus palabras qué es una metáfora.",
    question_type: "open",
    correct_answer: "Una figura literaria que compara sin usar 'como'.",
    difficulty: "intermediate",
    theme_id: "language",
    max_score: "2",
  },
];

export function QuestionBankPicker({
  value,
  onChange,
  questions,
  title,
  description,
  emptyLabel,
}: {
  value: string[];
  onChange: (next: string[]) => void;
  questions?: QuestionBankItem[];
  title?: string;
  description?: string;
  emptyLabel?: string;
}) {
  const [query, setQuery] = useState("");
  const [activeId, setActiveId] = useState<string | null>(null);

  const dataset = questions ?? DEFAULT_QUESTIONS;

  const selectedSet = useMemo(() => new Set(value), [value]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return dataset;
    return dataset.filter((item) => {
      return (
        item.question_text.toLowerCase().includes(q) ||
        (item.correct_answer ?? "").toLowerCase().includes(q) ||
        (item.theme_id ?? "").toLowerCase().includes(q)
      );
    });
  }, [dataset, query]);

  const selectedItems = useMemo(() => {
    const byId = new Map(dataset.map((q) => [q.id, q] as const));
    return value.map((id) => byId.get(id)).filter(Boolean) as QuestionBankItem[];
  }, [dataset, value]);

  const activeItem = useMemo(() => {
    if (!activeId) return null;
    return dataset.find((q) => q.id === activeId) ?? null;
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
              <CardTitle className='text-base'>Banco de preguntas</CardTitle>
              <p className='text-xs text-muted-foreground'>Busca y agrega preguntas al examen.</p>
            </div>

            <div className='relative'>
              <span className='pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground'>
                <HiOutlineMagnifyingGlass className='h-4 w-4' />
              </span>
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder='Buscar por texto, tema o respuesta...'
                className='pl-9'
              />
            </div>

            <div className='flex items-center justify-between text-xs text-muted-foreground'>
              <span>{filtered.length} resultados</span>
              <span>{value.length} seleccionadas</span>
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
                        <p className='line-clamp-2 text-sm font-semibold text-foreground'>{item.question_text}</p>
                        <div className='flex flex-wrap items-center gap-2'>
                          <Badge variant='outline'>{item.question_type.replace("_", " ")}</Badge>
                          {item.difficulty ? <Badge variant='secondary'>{item.difficulty}</Badge> : null}
                          {item.theme_id ? <Badge variant='outline'>{item.theme_id}</Badge> : null}
                        </div>
                        {item.correct_answer ? (
                          <p className='line-clamp-1 text-xs text-muted-foreground'>Respuesta: {item.correct_answer}</p>
                        ) : (
                          <p className='line-clamp-1 text-xs text-muted-foreground'>Sin respuesta configurada</p>
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
                          {selected ? "Agregada" : "Agregar"}
                        </Buttons>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className='rounded-2xl border border-dashed border-border/70 px-4 py-8 text-center text-sm text-muted-foreground'>
                {emptyLabel ?? "No hay preguntas que coincidan con tu búsqueda."}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className='col-span-12 lg:col-span-5'>
        <Card className='h-full'>
          <CardHeader className='space-y-3'>
            <div className='space-y-1'>
              <CardTitle className='text-base'>Seleccionadas</CardTitle>
              <p className='text-xs text-muted-foreground'>Orden y preview de lo que irá en el examen.</p>
            </div>
          </CardHeader>

          <CardContent className='space-y-3'>
            {selectedItems.length ? (
              <div className='space-y-2'>
                {selectedItems.map((item, index) => {
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
                          <p className='text-xs font-semibold uppercase tracking-wide text-muted-foreground'>
                            Pregunta {index + 1}
                          </p>
                          <p className='line-clamp-2 text-sm font-semibold text-foreground'>{item.question_text}</p>
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
                Aún no has agregado preguntas.
              </div>
            )}

            <div className='rounded-2xl border border-border/60 bg-muted/20 px-4 py-4'>
              <p className='text-xs font-semibold uppercase tracking-wide text-muted-foreground'>Preview</p>

              {activeItem ? (
                <div className='mt-2 space-y-3'>
                  <div className='space-y-2'>
                    <p className='text-sm font-semibold text-foreground'>{activeItem.question_text}</p>
                    <div className='flex flex-wrap gap-2'>
                      <Badge variant='outline'>{activeItem.question_type.replace("_", " ")}</Badge>
                      {activeItem.difficulty ? <Badge variant='secondary'>{activeItem.difficulty}</Badge> : null}
                      {activeItem.max_score ? <Badge variant='counter'>+{activeItem.max_score}</Badge> : null}
                    </div>
                  </div>

                  <div className='space-y-1'>
                    <p className='text-xs font-semibold text-muted-foreground'>Respuesta esperada</p>
                    <p className='text-sm text-foreground'>{activeItem.correct_answer ?? "(sin respuesta)"}</p>
                  </div>
                </div>
              ) : (
                <p className='mt-2 text-sm text-muted-foreground'>Selecciona una pregunta para ver el detalle.</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
