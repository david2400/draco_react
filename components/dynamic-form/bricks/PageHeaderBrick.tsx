'use client';

import classNames from 'classnames';

import {BrickComponentProps} from '../BrickRenderer';
import {PageHeaderBrick} from '@/types/formSchema';

export const PageHeaderBrickRenderer = ({brick}: BrickComponentProps<PageHeaderBrick>) => {
  const {title, subtitle} = brick.data ?? {};

  return (
    <header
      className={classNames(
        'flex flex-col gap-3 rounded-[1.6rem] border border-border/70 bg-card/85 px-6 py-6 shadow-[0_28px_80px_-55px_hsl(var(--ring))] backdrop-blur-sm text-foreground sm:px-10 sm:py-8',
      )}
    >
      <p className='text-xs font-semibold uppercase tracking-[0.35em] text-muted-foreground/70'>
        Resumen de la sección
      </p>
      <h1 className='text-3xl font-semibold tracking-tight sm:text-4xl'>{title}</h1>
      {subtitle ? (
        <p className='max-w-2xl text-base text-muted-foreground/90'>{subtitle}</p>
      ) : null}
    </header>
  );
};
