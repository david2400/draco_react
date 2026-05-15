/**
 * QuestionBankPickerV2 - Selector de preguntas usando la nueva arquitectura
 */

'use client';

import React, { useCallback, useMemo, useState } from 'react';
import { Input } from '@repo/ui/inputs/scenes/input';
import { Buttons } from '@repo/ui/buttons/scenes';
import { Badge } from '@repo/ui/badges/scenes/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@repo/ui/card/scenes/card';
import { HiOutlineMagnifyingGlass, HiOutlinePlus, HiOutlineTrash, HiOutlineEye } from 'react-icons/hi2';
import type { Question, QuestionType } from '../../questions/types';
import { QuestionRenderer } from '../../questions/renderers';
import { getDifficultyConfig } from '../../questions/config';

// Mapeo de tipos de pregunta a etiquetas legibles
const QUESTION_TYPE_LABELS: Record<QuestionType, string> = {
  multiple_choice_single: 'Opción única',
  multiple_choice_multi: 'Opción múltiple',
  true_false: 'V/F',
  open_short: 'Respuesta corta',
  open_long: 'Respuesta larga',
  numeric: 'Numérica',
  scale: 'Escala',
  ordering: 'Ordenamiento',
  matching: 'Emparejamiento',
};

interface QuestionBankPickerV2Props {
  value: string[];
  onChange: (next: string[]) => void;
  questions: Question[];
  title?: string;
  description?: string;
  emptyLabel?: string;
  showPreview?: boolean;
}

export function QuestionBankPickerV2({
  value,
  onChange,
  questions,
  title,
  description,
  emptyLabel,
  showPreview = true,
}: QuestionBankPickerV2Props) {
  const [query, setQuery] = useState('');
  const [activeId, setActiveId] = useState<string | null>(null);
  const [previewMode, setPreviewMode] = useState(false);

  const selectedSet = useMemo(() => new Set(value), [value]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return questions;
    return questions.filter((item) => {
      return (
        item.questionText.toLowerCase().includes(q) ||
        item.questionType.toLowerCase().includes(q) ||
        item.themeId?.toLowerCase().includes(q)
      );
    });
  }, [questions, query]);

  const selectedItems = useMemo(() => {
    const byId = new Map(questions.map((q) => [q.id, q] as const));
    return value.map((id) => byId.get(id)).filter(Boolean) as Question[];
  }, [questions, value]);

  const activeItem = useMemo(() => {
    if (!activeId) return null;
    return questions.find((q) => q.id === activeId) ?? null;
  }, [activeId, questions]);

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

  const handleMoveUp = useCallback(
    (index: number) => {
      if (index === 0) return;
      const next = [...value];
      [next[index - 1], next[index]] = [next[index]!, next[index - 1]!];
      onChange(next);
    },
    [onChange, value]
  );

  const handleMoveDown = useCallback(
    (index: number) => {
      if (index === value.length - 1) return;
      const next = [...value];
      [next[index], next[index + 1]] = [next[index + 1]!, next[index]!];
      onChange(next);
    },
    [onChange, value]
  );

  const getDifficultyBadge = (difficulty: string) => {
    const config = getDifficultyConfig(difficulty as any);
    return config ? (
      <Badge className={config.color}>{config.label}</Badge>
    ) : (
      <Badge variant="secondary">{difficulty}</Badge>
    );
  };

  return (
    <div className="col-span-12 grid grid-cols-12 gap-4">
      {/* Header */}
      <div className="col-span-12 flex flex-col gap-1">
        {title && <p className="text-sm font-semibold">{title}</p>}
        {description && <p className="text-xs text-muted-foreground">{description}</p>}
      </div>

      {/* Banco de preguntas */}
      <div className="col-span-12 lg:col-span-7">
        <Card className="h-full">
          <CardHeader className="space-y-3">
            <div className="flex flex-col gap-1">
              <CardTitle className="text-base">Banco de preguntas</CardTitle>
              <p className="text-xs text-muted-foreground">
                Busca y agrega preguntas al examen.
              </p>
            </div>

            <div className="relative">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                <HiOutlineMagnifyingGlass className="h-4 w-4" />
              </span>
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar por texto, tipo o tema..."
                className="pl-9"
              />
            </div>

            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>{filtered.length} resultados</span>
              <span>{value.length} seleccionadas</span>
            </div>
          </CardHeader>

          <CardContent className="space-y-2 max-h-[500px] overflow-y-auto">
            {filtered.length ? (
              filtered.map((item) => {
                const selected = selectedSet.has(item.id);
                return (
                  <div
                    key={item.id}
                    onClick={() => setActiveId(item.id)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setActiveId(item.id);
                      }
                    }}
                    role="button"
                    tabIndex={0}
                    className={`w-full rounded-2xl border px-4 py-3 text-left transition cursor-pointer ${
                      activeId === item.id
                        ? 'border-primary/50 bg-primary/5'
                        : 'border-border/60 hover:bg-muted/40'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0 space-y-2 flex-1">
                        <p className="line-clamp-2 text-sm font-semibold text-foreground">
                          {item.questionText}
                        </p>
                        <div className="flex flex-wrap items-center gap-2">
                          <Badge variant="outline">
                            {QUESTION_TYPE_LABELS[item.questionType]}
                          </Badge>
                          {getDifficultyBadge(item.difficulty)}
                          {item.themeId && (
                            <Badge variant="outline">{item.themeId}</Badge>
                          )}
                          <Badge variant="counter">+{item.maxScore} pts</Badge>
                        </div>
                      </div>

                      <div className="shrink-0">
                        <Buttons
                          type="button"
                          size="sm"
                          variant={selected ? 'outline' : 'default'}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            if (!selected) handleAdd(item.id);
                          }}
                          disabled={selected}
                          className="inline-flex items-center gap-2"
                        >
                          <HiOutlinePlus className="h-4 w-4" />
                          {selected ? 'Agregada' : 'Agregar'}
                        </Buttons>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="rounded-2xl border border-dashed border-border/70 px-4 py-8 text-center text-sm text-muted-foreground">
                {emptyLabel ?? 'No hay preguntas que coincidan con tu búsqueda.'}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Panel derecho: Seleccionadas + Preview */}
      <div className="col-span-12 lg:col-span-5">
        <Card className="h-full">
          <CardHeader className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <CardTitle className="text-base">Seleccionadas</CardTitle>
                <p className="text-xs text-muted-foreground">
                  {selectedItems.length} pregunta{selectedItems.length !== 1 ? 's' : ''} •{' '}
                  {selectedItems.reduce((acc, q) => acc + q.maxScore, 0)} pts total
                </p>
              </div>
              {showPreview && activeItem && (
                <Buttons
                  type="button"
                  size="sm"
                  variant={previewMode ? 'default' : 'outline'}
                  onClick={() => setPreviewMode(!previewMode)}
                  className="inline-flex items-center gap-2"
                >
                  <HiOutlineEye className="h-4 w-4" />
                  {previewMode ? 'Lista' : 'Preview'}
                </Buttons>
              )}
            </div>
          </CardHeader>

          <CardContent className="space-y-3">
            {previewMode && activeItem ? (
              /* Preview Mode - Muestra la pregunta como la vería el estudiante */
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Vista previa
                  </p>
                  <Buttons
                    type="button"
                    size="sm"
                    variant="ghost"
                    onClick={() => setPreviewMode(false)}
                  >
                    Cerrar
                  </Buttons>
                </div>
                <div className="rounded-2xl border border-border/60 bg-background p-4">
                  <QuestionRenderer question={activeItem} disabled />
                </div>
              </div>
            ) : (
              /* Lista de seleccionadas */
              <>
                {selectedItems.length ? (
                  <div className="space-y-2 max-h-[300px] overflow-y-auto">
                    {selectedItems.map((item, index) => (
                      <div
                        key={item.id}
                        className={`rounded-2xl border px-4 py-3 transition ${
                          activeId === item.id
                            ? 'border-primary/50 bg-primary/5'
                            : 'border-border/60'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <button
                            type="button"
                            onClick={() => setActiveId(item.id)}
                            className="min-w-0 text-left flex-1"
                          >
                            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                              Pregunta {index + 1} • {item.maxScore} pts
                            </p>
                            <p className="line-clamp-2 text-sm font-semibold text-foreground">
                              {item.questionText}
                            </p>
                          </button>

                          <div className="flex items-center gap-1 shrink-0">
                            <Buttons
                              type="button"
                              size="sm"
                              variant="ghost"
                              onClick={() => handleMoveUp(index)}
                              disabled={index === 0}
                              className="p-1"
                            >
                              ↑
                            </Buttons>
                            <Buttons
                              type="button"
                              size="sm"
                              variant="ghost"
                              onClick={() => handleMoveDown(index)}
                              disabled={index === selectedItems.length - 1}
                              className="p-1"
                            >
                              ↓
                            </Buttons>
                            <Buttons
                              type="button"
                              size="sm"
                              variant="ghost"
                              onClick={() => handleRemove(item.id)}
                              className="inline-flex items-center gap-1 text-destructive"
                            >
                              <HiOutlineTrash className="h-4 w-4" />
                            </Buttons>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-2xl border border-dashed border-border/70 px-4 py-8 text-center text-sm text-muted-foreground">
                    Aún no has agregado preguntas.
                  </div>
                )}

                {/* Mini preview */}
                {activeItem && (
                  <div className="rounded-2xl border border-border/60 bg-muted/20 px-4 py-4">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        Detalle
                      </p>
                      {showPreview && (
                        <Buttons
                          type="button"
                          size="sm"
                          variant="ghost"
                          onClick={() => setPreviewMode(true)}
                          className="text-xs"
                        >
                          Ver como estudiante
                        </Buttons>
                      )}
                    </div>

                    <div className="mt-2 space-y-3">
                      <div className="space-y-2">
                        <p className="text-sm font-semibold text-foreground">
                          {activeItem.questionText}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="outline">
                            {QUESTION_TYPE_LABELS[activeItem.questionType]}
                          </Badge>
                          {getDifficultyBadge(activeItem.difficulty)}
                          <Badge variant="counter">+{activeItem.maxScore} pts</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default QuestionBankPickerV2;
