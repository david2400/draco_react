'use client';

import {FormEvent} from 'react';
import {useFormContext} from 'react-hook-form';
import classNames from 'classnames';
import {FinderBarConfig} from '@/types/formSchema';

interface FinderBarProps {
  config: FinderBarConfig;
  isLoading?: boolean;
  submitLabel?: string;
  loadingLabel?: string;
  onSubmit?: () => void;
}

export const FinderBar = ({config, isLoading, submitLabel = 'Buscar', loadingLabel, onSubmit}: FinderBarProps) => {
  const {register, formState} = useFormContext();
  const fieldName = config.finderId;
  const fieldError = formState.errors?.[fieldName];

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (typeof onSubmit === 'function') {
      onSubmit();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='flex flex-col gap-4 rounded-[1.4rem] border border-border/70 bg-card/90 p-4 shadow-[0_22px_60px_-40px_hsl(var(--ring))] backdrop-blur-sm transition md:flex-row md:items-end md:gap-6 md:p-5'
    >
      <div className='flex flex-1 flex-col gap-3'>
        <label htmlFor={fieldName} className='flex items-center gap-2 text-sm font-semibold text-muted-foreground'>
          <span className='inline-flex h-7 w-7 items-center justify-center rounded-full border border-border/70 bg-background/80 text-sm text-foreground shadow-sm'>🔍</span>
          {config.placeholder ?? 'Describe tu producto'}
        </label>
        <div
          className={classNames(
            'relative flex w-full items-center overflow-hidden rounded-2xl border border-border/60 bg-background/80 px-4 py-3 text-base shadow-inner transition focus-within:border-primary/60 focus-within:bg-background focus-within:ring-4 focus-within:ring-primary/20',
            {'border-destructive/50 focus-within:border-destructive focus-within:ring-destructive/20': fieldError},
          )}
        >
          <input
            id={fieldName}
            {...register(fieldName)}
            maxLength={config.maxLength}
            placeholder={config.placeholder}
            className='w-full bg-transparent pr-10 text-base text-foreground placeholder:text-muted-foreground/70 focus:outline-none'
          />
          <span className='pointer-events-none absolute right-4 top-1/2 hidden -translate-y-1/2 text-xs font-semibold uppercase tracking-[0.35em] text-slate-400 lg:block'>
            ML
          </span>
        </div>
        {fieldError ? (
          <span className='flex items-center gap-2 text-xs font-medium text-destructive'>
            <span className='h-2 w-2 rounded-full bg-destructive'></span>
            {String(fieldError.message ?? 'Este campo es obligatorio')}
          </span>
        ) : (
          <span className='text-xs text-muted-foreground/75'>Máx. {config.maxLength ?? 1000} caracteres</span>
        )}
      </div>
      <button
        type='submit'
        className='inline-flex items-center justify-center rounded-full border border-transparent bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground shadow-[0_24px_60px_-32px_hsl(var(--ring))] transition hover:-translate-y-[1px] hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-70'
        disabled={isLoading}
      >
        {isLoading ? (
          <span className='flex items-center gap-2'>
            <span className='h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground/60 border-t-transparent'></span>
            {loadingLabel ?? submitLabel}
          </span>
        ) : (
          <span className='flex items-center gap-2'>
            <span>Buscar ahora</span>
            <span aria-hidden='true'>→</span>
          </span>
        )}
      </button>
    </form>
  );
};
