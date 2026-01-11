'use client';

import Link from 'next/link';
import classNames from 'classnames';
import {SummaryBrick} from '@/types/formSchema';
import {BrickComponentProps} from '../BrickRenderer';
import {useApiRequest} from '@/hooks/useApiRequest';

export const SummaryBrickRenderer = ({brick}: BrickComponentProps<SummaryBrick>) => {
  const {title, subtitle, items, ctaLabel, ctaEvent} = brick.data;
  const {execute, isLoading, hasError, error, hasSuccess, reset} = useApiRequest();

  const handleCta = async () => {
    if (!ctaEvent) return;

    try {
      await execute(ctaEvent.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section className='space-y-6 rounded-[1.8rem] border border-border/70 bg-card/85 p-8 shadow-[0_28px_80px_-50px_hsl(var(--ring))] backdrop-blur-sm sm:p-10'>
      <header className='space-y-2 text-foreground'>
        {title ? <h2 className='text-2xl font-semibold tracking-tight sm:text-3xl'>{title}</h2> : null}
        {subtitle ? <p className='text-base text-muted-foreground/85'>{subtitle}</p> : null}
      </header>

      <dl className='space-y-4'>
        {items.map(item => {
          const key = item.id ?? `${brick.id}-${item.label}`;
          const hasLink = Boolean(item.href);

          return (
            <div
              key={key}
              className='flex flex-col gap-3 rounded-2xl border border-border/60 bg-background/90 px-5 py-4 shadow-[0_20px_50px_-40px_hsl(var(--ring))] transition-all duration-200 hover:-translate-y-[1px] hover:border-border hover:bg-background sm:flex-row sm:items-center sm:justify-between'
            >
              <div className='flex items-center gap-3 text-muted-foreground'>
                {item.icon ? (
                  <span className='text-2xl' aria-hidden='true'>
                    {item.icon}
                  </span>
                ) : null}
                <div>
                  <dt className='text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground/70'>{item.label}</dt>
                  {item.helperText ? <p className='text-xs text-muted-foreground/65'>{item.helperText}</p> : null}
                </div>
              </div>
              <dd className='text-base font-semibold text-foreground sm:text-right'>
                {hasLink ? (
                  <Link
                    href={item.href!}
                    className='inline-flex items-center gap-2 text-primary transition hover:text-primary/80'
                    target={item.href?.startsWith('http') ? '_blank' : undefined}
                    rel={item.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                  >
                    <span>{item.value}</span>
                    <span aria-hidden='true'>↗</span>
                  </Link>
                ) : (
                  <span>{item.value}</span>
                )}
              </dd>
            </div>
          );
        })}
      </dl>

      {hasError ? (
        <div className='rounded-2xl border border-destructive/40 bg-destructive/10 p-4 text-sm text-destructive shadow-sm'>
          <p className='font-semibold'>{error ?? 'Ocurrió un error al procesar la acción.'}</p>
        </div>
      ) : null}

      {hasSuccess ? (
        <div className='flex flex-wrap items-center gap-3 rounded-2xl border border-primary/50 bg-primary/10 p-4 text-sm text-primary shadow-sm'>
          <span className='inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground'>✓</span>
          <span className='font-semibold'>Acción realizada correctamente.</span>
          <button
            type='button'
            className='text-xs font-semibold text-primary hover:text-primary/80'
            onClick={reset}
          >
            Cerrar
          </button>
        </div>
      ) : null}

      {ctaLabel ? (
        <button
          type='button'
          className='inline-flex items-center justify-center rounded-full border border-transparent bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-[0_22px_60px_-35px_hsl(var(--ring))] transition hover:-translate-y-[1px] hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-70'
          onClick={handleCta}
          disabled={isLoading}
        >
          {isLoading ? (
            <span className='flex items-center gap-2'>
              <span className='h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground/60 border-t-transparent'></span>
              Procesando
            </span>
          ) : (
            <span className='flex items-center gap-2'>
              <span>{ctaLabel}</span>
              <span aria-hidden='true'>→</span>
            </span>
          )}
        </button>
      ) : null}
    </section>
  );
};
