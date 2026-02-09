/** @format */

"use client";

import React from "react";
import { IClassSession, IContentPlan } from "../models/class.model";

interface ContentPanelProps {
  sessions: IClassSession[];
  contentPlans: IContentPlan[];
  onEditContent: (session: IClassSession) => void;
}

export const ContentPanel: React.FC<ContentPanelProps> = ({ sessions, contentPlans, onEditContent }) => {
  const byWeek = contentPlans.reduce<Record<number, IContentPlan[]>>((acc, plan) => {
    const index = plan.weekIndex ?? 0;
    const bucket = acc[index] ?? [];
    bucket.push(plan);
    acc[index] = bucket;
    return acc;
  }, {});

  return (
    <section className='rounded-3xl border border-border/60 bg-gradient-to-b from-white to-muted/30 p-6 shadow-lg shadow-indigo-100'>
      <header className='flex items-center justify-between gap-3'>
        <div>
          <p className='text-xs uppercase tracking-[0.3em] text-muted-foreground'>Contenido</p>
          <h2 className='text-2xl font-semibold text-foreground'>Planificación modular</h2>
        </div>
        <span className='text-xs text-muted-foreground'>
          {contentPlans.length} clases con contenido definido
        </span>
      </header>

      <div className='mt-6 space-y-6'>
        {Object.entries(byWeek).map(([weekIndex, items]) => (
          <article key={weekIndex} className='space-y-3 rounded-2xl border border-border/60 bg-white/80 p-4'>
            <header className='flex items-center justify-between'>
              <h3 className='text-lg font-semibold text-foreground'>Semana {weekIndex}</h3>
              <span className='text-xs font-semibold text-muted-foreground'>
                {items.length} clases
              </span>
            </header>
            <div className='space-y-3'>
              {items.map((plan) => {
                const session = sessions.find((cls) => cls.id === plan.classId);
                if (!session) return null;
                return (
                  <div
                    key={plan.classId}
                    className='rounded-2xl border border-border/60 bg-muted/40 p-4 text-sm text-muted-foreground'
                  >
                    <header className='flex items-center justify-between gap-3 text-foreground'>
                      <div>
                        <p className='text-sm font-semibold'>{session.subject}</p>
                        <p className='text-xs text-muted-foreground'>Grupo {session.groupName}</p>
                      </div>
                      <button
                        type='button'
                        onClick={() => onEditContent(session)}
                        className='rounded-full border border-border px-3 py-1 text-xs font-semibold text-foreground transition hover:border-primary focus-visible:ring-2 focus-visible:ring-primary'
                      >
                        Editar
                      </button>
                    </header>
                    <div className='mt-3 space-y-2 text-xs'>
                      <p>
                        <span className='font-semibold text-foreground'>Plan:</span> {plan.planned}
                      </p>
                      {plan.delivered && (
                        <p>
                          <span className='font-semibold text-foreground'>Dictado:</span> {plan.delivered}
                        </p>
                      )}
                    </div>
                    {plan.history.length > 0 && (
                      <div className='mt-3 rounded-xl border border-border/60 bg-white/70 p-3 text-xs'>
                        <p className='text-[11px] uppercase tracking-[0.3em] text-muted-foreground'>Historial</p>
                        <ul className='mt-2 space-y-1'>
                          {plan.history.map((entry, idx) => (
                            <li key={idx} className='flex justify-between text-muted-foreground'>
                              <span>{new Date(entry.date).toLocaleDateString("es-CO")}</span>
                              <span className='text-right'>{entry.summary}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
