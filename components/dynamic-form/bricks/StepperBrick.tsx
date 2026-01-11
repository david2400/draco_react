'use client';

import {Fragment, useEffect, useMemo, useState} from 'react';
import classNames from 'classnames';
import {StepperBrick, StepStatus, StepperStep} from '@/types/formSchema';
import {BrickComponentProps} from '../BrickRenderer';

type StepperVisualConfig = {
  indicator: string;
  label: string;
  description: string;
  connector: string;
  tag: string;
};

const statusConfig: Record<StepStatus, StepperVisualConfig> = {
  complete: {
    indicator:
      'border-transparent bg-primary text-primary-foreground shadow-[0_16px_40px_-24px_hsl(var(--ring))]',
    label: 'text-foreground',
    description: 'text-muted-foreground/80',
    connector: 'bg-primary/70',
    tag: 'bg-primary/10 text-primary',
  },
  current: {
    indicator:
      'border-primary/70 bg-background text-primary shadow-[0_18px_45px_-28px_hsl(var(--ring))]',
    label: 'text-foreground',
    description: 'text-muted-foreground',
    connector: 'bg-primary/30',
    tag: 'bg-primary/15 text-primary/90',
  },
  upcoming: {
    indicator: 'border-border bg-card text-muted-foreground/60',
    label: 'text-muted-foreground/70',
    description: 'text-muted-foreground/60',
    connector: 'bg-border/70',
    tag: 'bg-border/50 text-muted-foreground/70',
  },
};

const getInitialActiveIndex = (steps: StepperStep[]): number => {
  const currentIndex = steps.findIndex(step => step.status === 'current');
  if (currentIndex >= 0) return currentIndex;
  return 0;
};

export const StepperBrickRenderer = ({brick, renderChildren}: BrickComponentProps<StepperBrick>) => {
  const {title, subtitle, steps} = brick.data;

  const [activeIndex, setActiveIndex] = useState(() => getInitialActiveIndex(steps));

  useEffect(() => {
    if (!steps.length) {
      setActiveIndex(0);
      return;
    }

    setActiveIndex(prev => {
      const boundedPrev = Math.max(0, Math.min(prev, steps.length - 1));
      if (steps[boundedPrev]?.status === 'current') {
        return boundedPrev;
      }
      return getInitialActiveIndex(steps);
    });
  }, [steps]);

  const resolvedSteps = useMemo(() => {
    if (!steps.length) return [] as (StepperStep & {status: StepStatus})[];

    return steps.map((step, index) => {
      let status: StepStatus;
      if (index < activeIndex) {
        status = 'complete';
      } else if (index === activeIndex) {
        status = 'current';
      } else {
        status = 'upcoming';
      }

      return {
        ...step,
        status,
      };
    });
  }, [steps, activeIndex]);

  if (!resolvedSteps.length) {
    return null;
  }

  const totalSteps = resolvedSteps.length;
  const hasStepContent = Boolean(brick.bricks?.length);
  const contentBricks = brick.bricks ?? [];
  const safeActiveIndex = Math.max(0, Math.min(activeIndex, totalSteps - 1));
  const activeBrick = hasStepContent ? contentBricks[safeActiveIndex] : undefined;
  const stepContent = activeBrick ? renderChildren([activeBrick]) : null;

  const canGoPrev = safeActiveIndex > 0;
  const canGoNext = safeActiveIndex < totalSteps - 1;

  const focusStepper = () => {
    if (typeof document === 'undefined') return;
    const element = document.getElementById(brick.id);
    if (!element) return;

    element.scrollIntoView({behavior: 'smooth', block: 'start'});
    if (typeof element.focus === 'function') {
      element.focus({preventScroll: true});
    }
  };

  const goToStep = (index: number) => {
    const boundedIndex = Math.max(0, Math.min(index, totalSteps - 1));
    if (boundedIndex === safeActiveIndex) return;

    setActiveIndex(boundedIndex);

    const runFocus = () => focusStepper();
    if (typeof window !== 'undefined' && typeof window.requestAnimationFrame === 'function') {
      window.requestAnimationFrame(runFocus);
    } else {
      runFocus();
    }
  };

  const handlePrev = () => {
    if (!canGoPrev) return;
    goToStep(safeActiveIndex - 1);
  };

  const handleNext = () => {
    if (!canGoNext) return;
    goToStep(safeActiveIndex + 1);
  };

  const controls = totalSteps > 1 ? (
    <div className='mt-10 flex flex-wrap justify-center gap-3 md:justify-end'>
      <button
        type='button'
        onClick={handlePrev}
        disabled={!canGoPrev}
        className={classNames(
          'inline-flex items-center justify-center rounded-full border border-transparent px-5 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background',
          canGoPrev
            ? 'border-border/70 bg-background/90 text-muted-foreground hover:-translate-y-[1px] hover:border-border hover:text-foreground'
            : 'cursor-not-allowed border-border/60 bg-muted/40 text-muted-foreground/60',
        )}
      >
        Paso anterior
      </button>
      <button
        type='button'
        onClick={handleNext}
        disabled={!canGoNext}
        className={classNames(
          'inline-flex items-center justify-center rounded-full border border-transparent px-5 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background',
          canGoNext
            ? 'bg-primary text-primary-foreground shadow-[0_18px_50px_-25px_hsl(var(--ring))] hover:-translate-y-[1px] hover:bg-primary/90'
            : 'cursor-not-allowed bg-muted text-muted-foreground/60',
        )}
      >
        {canGoNext ? 'Siguiente paso' : 'Paso final'}
      </button>
    </div>
  ) : null;

  return (
    <section
      id={brick.id}
      data-brick-type='stepper'
      tabIndex={-1}
      className='rounded-[1.8rem] border border-border/60 bg-card/80 p-[1px] shadow-[0_34px_90px_-55px_hsl(var(--ring))] backdrop-blur-xl'
    >
      <div className='rounded-[calc(1.8rem-2px)] border border-border/70 bg-background/95 px-8 py-10 shadow-[0_30px_70px_-45px_hsl(var(--ring))]'>
        <header className='mb-10 space-y-3 text-center md:text-left'>
          {title ? <h2 className='text-3xl font-semibold tracking-tight text-foreground sm:text-4xl'>{title}</h2> : null}
          {subtitle ? <p className='text-base text-muted-foreground/85'>{subtitle}</p> : null}
        </header>
        <div className='flex flex-col gap-12'>
          <div className='relative flex flex-col items-center gap-8 md:flex-row md:items-start md:justify-between'>
            <div className='absolute inset-x-16 top-6 hidden h-px bg-border/60 md:block'></div>
            {resolvedSteps.map((step, index) => {
              const status = statusConfig[step.status];
              const isCurrent = step.status === 'current';
              const isComplete = step.status === 'complete';
              const indicatorContent = isComplete ? '✓' : index + 1;
              const isLast = index === resolvedSteps.length - 1;
              const displayLabel = step.label ?? step.id ?? `Paso ${index + 1}`;
              const stepTag = 'tag' in step ? (step as {tag?: string}).tag : undefined;

              return (
                <Fragment key={step.id ?? `${brick.id}-${index}`}>
                  <div className='relative z-10 flex flex-col items-center text-center md:w-full md:max-w-xs md:flex-1 md:text-left'>
                    <span
                      className={classNames(
                        'flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 text-lg font-semibold transition-all duration-200',
                        status.indicator,
                      )}
                      aria-hidden
                    >
                      {indicatorContent}
                    </span>
                    <div className='mt-4 flex flex-col items-center gap-1 md:items-start'>
                      <span className={classNames('text-base font-semibold tracking-tight', status.label)}>{displayLabel}</span>
                      {step.description ? (
                        <span className={classNames('text-sm', status.description)}>{step.description}</span>
                      ) : null}
                    </div>
                    {stepTag ? (
                      <span className={classNames('mt-3 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em]', status.tag)}>
                        {stepTag}
                      </span>
                    ) : null}
                  </div>
                  {!isLast ? (
                    <span
                      className={classNames('hidden w-full max-w-[160px] flex-1 rounded-full md:block', status.connector)}
                      aria-hidden
                    />
                  ) : null}
                </Fragment>
              );
            })}
          </div>
          <div className='flex flex-col gap-8 rounded-3xl bg-white/90 p-8 shadow-[0_22px_60px_-36px_rgba(79,70,229,0.35)]'>
            {stepContent}
            {controls}
          </div>
        </div>
      </div>
    </section>
  );
};
