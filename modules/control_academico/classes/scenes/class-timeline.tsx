/** @format */

"use client";

import React, { useMemo } from "react";
import { HiOutlineClock, HiOutlineChevronRight } from "react-icons/hi2";
import { IClassSession } from "../models/class.model";

interface ClassTimelineSceneProps {
  sessions: IClassSession[];
  onSelect?: (session: IClassSession) => void;
}

const weekdayFormatter = new Intl.DateTimeFormat("es-CO", { weekday: "long" });
const dateFormatter = new Intl.DateTimeFormat("es-CO", { month: "short", day: "numeric" });
const timeFormatter = new Intl.DateTimeFormat("es-CO", { hour: "2-digit", minute: "2-digit" });

export const ClassTimelineScene: React.FC<ClassTimelineSceneProps> = ({ sessions, onSelect }) => {
  const grouped = useMemo(() => {
    const map = new Map<string, IClassSession[]>();
    sessions.forEach((session) => {
      const dayKey = new Date(session.start).toISOString().slice(0, 10);
      const bucket = map.get(dayKey) ?? [];
      bucket.push(session);
      map.set(dayKey, bucket);
    });

    return Array.from(map.entries())
      .sort(([a], [b]) => new Date(a).getTime() - new Date(b).getTime())
      .map(([date, items]) => ({ date, items: items.sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime()) }));
  }, [sessions]);

  if (!grouped.length) return null;

  return (
    <section className='rounded-3xl border border-border/60 bg-white/80 p-6 shadow-lg shadow-indigo-100'>
      <header className='mb-4 flex items-center justify-between'>
        <div>
          <p className='text-xs uppercase tracking-[0.3em] text-muted-foreground'>Timeline semanal</p>
          <h2 className='text-lg font-semibold text-foreground'>Vista rápida por día</h2>
        </div>
      </header>

      <div className='flex w-full snap-x gap-4 overflow-x-auto pb-2'>
        {grouped.map(({ date, items }) => (
          <article
            key={date}
            className='min-w-[240px] snap-start rounded-2xl border border-border/60 bg-gradient-to-b from-muted/60 to-background p-4'
          >
            <header className='mb-3'>
              <p className='text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground'>
                {weekdayFormatter.format(new Date(date))}
              </p>
              <p className='text-foreground'>{dateFormatter.format(new Date(date))}</p>
            </header>

            <ul className='space-y-3 text-sm'>
              {items.map((session) => (
                <li key={session.id}>
                  <button
                    type='button'
                    onClick={() => onSelect?.(session)}
                    className='flex w-full items-center justify-between rounded-xl border border-border/60 bg-white/70 px-3 py-2 text-left text-foreground transition hover:border-primary focus-visible:ring-2 focus-visible:ring-primary'
                  >
                    <div>
                      <p className='font-semibold'>{session.subject}</p>
                      <p className='text-xs text-muted-foreground'>{session.groupName}</p>
                      <span className='mt-1 inline-flex items-center gap-1 text-xs text-muted-foreground'>
                        <HiOutlineClock className='h-4 w-4' />
                        {timeFormatter.format(new Date(session.start))} - {timeFormatter.format(new Date(session.end))}
                      </span>
                    </div>
                    <HiOutlineChevronRight className='h-4 w-4 text-muted-foreground' />
                  </button>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
};
