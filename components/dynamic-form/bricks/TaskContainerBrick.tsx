'use client';

import {useState} from 'react';
import classNames from 'classnames';
import {TaskContainerBrick} from '@/types/formSchema';
import {BrickComponentProps} from '../BrickRenderer';

export const TaskContainerBrickRenderer = ({
  brick,
  renderChildren,
}: BrickComponentProps<TaskContainerBrick>) => {
  const initiallyOpen = brick.data.isOpen ?? true;
  const [isOpen, setIsOpen] = useState(initiallyOpen);
  const isCollapsible = Boolean(brick.data.collapsible);
  const metricsPath = brick.data.metrics?.path;
  const sectionLabel =
    typeof metricsPath === 'string' && metricsPath.length > 1
      ? metricsPath.replace('/', '').replace(/[-_]/g, ' ')
      : 'Sección';

  return (
    <div
      className={classNames(
        'flex flex-col gap-6 rounded-[1.6rem] border border-border/70 bg-card/80 p-6 shadow-[0_30px_80px_-50px_hsl(var(--ring))] backdrop-blur-sm',
      )}
    >
      <header
        className={classNames(
          'flex flex-col gap-1 border-b border-border/60 pb-4',
          'flex items-center justify-between gap-4 bg-gradient-to-r from-background/95 via-background/80 to-primary/10 px-7 py-5',
          {'cursor-pointer': isCollapsible}
        )}
        onClick={() => {
          if (isCollapsible) {
            setIsOpen(prev => !prev);
          }
        }}
      >
        <div className='flex flex-col gap-1'>
          <p className='text-xs font-semibold uppercase tracking-[0.35em] text-indigo-500/80'>
            {sectionLabel}
          </p>
          <p className='text-xl font-semibold text-center text-slate-900'>
            {brick.id.replace(/[-_]/g, ' ')}
          </p>
        </div>
        {isCollapsible ? (
          <button
            type='button'
            className='inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/80 px-4 py-1 text-sm font-semibold text-primary transition hover:-translate-y-[1px] hover:border-primary/60 hover:bg-primary hover:text-primary-foreground'
            aria-expanded={isOpen}
          >
            {isOpen ? 'Ocultar' : 'Mostrar'}
          </button>
        ) : null}
      </header>

      <div
        className={classNames(
          'overflow-hidden px-2 py-6 transition-all duration-500 ease-out sm:px-4',
          isOpen ? 'max-h-[3000px] opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <div className='space-y-8 text-muted-foreground'>{renderChildren(isOpen ? brick.bricks : [])}</div>
      </div>
    </div>
  );
};
