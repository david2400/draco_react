'use client';

import {useMemo, useState} from 'react';
import classNames from 'classnames';
import {useFormContext} from 'react-hook-form';
import {FinderBarConfig, SearchHubBrick, SearchHubTab} from '@/types/formSchema';
import {BrickComponentProps} from '../BrickRenderer';
import {useApiRequest} from '@/hooks/useApiRequest';
import {FinderBar} from '../elements/FinderBar';
import {FinderHubHeader} from '../elements/FinderHubHeader';
import {PhotoUploader} from '../elements/PhotoUploader';

const TABS_VARIANTS = ['tabs', 'accordions'] as const;

export type TabsVariant = (typeof TABS_VARIANTS)[number];

export interface SearchHubBrickRendererProps extends BrickComponentProps<SearchHubBrick> {
  tabsVariant?: TabsVariant;
}

const getTabId = (tab: SearchHubTab) => `${tab.finderHubHeader?.title ?? tab.boxTitle}-${tab.type}`;

const getDefaultTab = (tabs: SearchHubTab[]) => tabs[0]?.type ?? '';

const getPhotoFieldName = (tab: SearchHubTab) => `${tab.type}_photos`;

const hasFinderBar = (tab: SearchHubTab): tab is SearchHubTab & {finderBar: FinderBarConfig} => {
  const finderBar = (tab as any).finderBar;
  return finderBar && typeof finderBar === 'object' && typeof finderBar.finderId === 'string';
};

const hasPhotoConfig = (
  tab: SearchHubTab
): tab is SearchHubTab & {
  searchByPictureComponentData: NonNullable<SearchHubTab['searchByPictureComponentData']>;
} => {
  return tab && typeof (tab as any).searchByPictureComponentData === 'object';
};

const renderTabIcon = (tab: SearchHubTab) => {
  if (!tab.tag) return null;
  return (
    <span className='inline-flex items-center gap-1 rounded-full border border-border/70 bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-primary'>
      {tab.tag}
    </span>
  );
};

export const SearchHubBrickRenderer = ({
  brick,
  tabsVariant = 'tabs',
}: SearchHubBrickRendererProps) => {
  const tabs = brick.data.searchHub ?? [];
  const defaultTab = getDefaultTab(tabs);
  const [activeTab, setActiveTab] = useState(defaultTab);
  const variant: TabsVariant = TABS_VARIANTS.includes(tabsVariant) ? tabsVariant : 'tabs';

  const form = useFormContext();
  const {execute, isLoading, hasError, error, reset, hasSuccess, loadingEvents, errorEvents} =
    useApiRequest();

  const footerButton = brick.data.footerButton;

  const footerButtonLabel = useMemo(() => {
    if (!footerButton) return null;
    return isLoading ? (footerButton.loadingLabel ?? 'Procesando') : footerButton.label;
  }, [footerButton, isLoading]);

  const sanitizePayload = (values: Record<string, unknown>) => {
    const sanitizedEntries = Object.entries(values).filter(([, value]) => {
      if (Array.isArray(value)) {
        return value.some(item => !(item instanceof File));
      }
      return !(value instanceof File);
    });

    return sanitizedEntries.reduce<Record<string, unknown>>((acc, [key, value]) => {
      if (Array.isArray(value)) {
        acc[key] = value.filter(item => !(item instanceof File));
      } else {
        acc[key] = value;
      }
      return acc;
    }, {});
  };

  const handleSubmit = async (tab: SearchHubTab) => {
    if (tab.event?.type !== 'request') return;

    const validationFields: string[] = [];
    if (hasFinderBar(tab)) {
      validationFields.push(tab.finderBar.finderId);
    }
    if (hasPhotoConfig(tab)) {
      validationFields.push(getPhotoFieldName(tab));
    }

    if (validationFields.length) {
      const isValid = await form.trigger(validationFields as any, {shouldFocus: true});
      if (!isValid) return;
    }

    const formValues = form.getValues();
    let payload: Record<string, unknown> | FormData | undefined = formValues;

    if (hasPhotoConfig(tab)) {
      const fieldName = getPhotoFieldName(tab);
      const files = (formValues[fieldName] as File[] | undefined) ?? [];
      const formData = new FormData();

      files.forEach(file => {
        formData.append(fieldName, file);
      });

      Object.entries(formValues).forEach(([key, value]) => {
        if (key === fieldName || value === undefined || value === null) return;

        if (Array.isArray(value)) {
          value.forEach(item => {
            if (item instanceof File) {
              formData.append(key, item);
            } else {
              formData.append(`${key}[]`, String(item));
            }
          });
        } else if (value instanceof File) {
          formData.append(key, value);
        } else {
          formData.append(key, String(value));
        }
      });

      payload = formData;
    }

    try {
      await execute(tab.event.data, {payload});
    } catch (err) {
      console.error(err);
    }
  };

  const handlePredictiveSearch = async () => {
    const predictiveEvent = brick.data.apiCallToPredictionSearchEndpointEvent;
    if (!predictiveEvent) return;

    try {
      const formValues = form.getValues();
      const sanitizedValues = sanitizePayload(formValues as Record<string, unknown>);
      await execute(predictiveEvent.data, {payload: sanitizedValues});
    } catch (err) {
      console.error(err);
    }
  };

  const handleScrollToStepper = () => {
    const stepper = document.querySelector<HTMLElement>('[data-brick-type="stepper"]');
    if (!stepper) return;

    stepper.scrollIntoView({behavior: 'smooth', block: 'start'});
    if (typeof stepper.focus === 'function') {
      stepper.focus({preventScroll: true});
    }
  };

  const renderTabContent = (tab: SearchHubTab) => {
    if (hasFinderBar(tab)) {
      const submitLabel = footerButton?.label ?? 'Buscar';
      const loadingLabel = footerButton?.loadingLabel ?? 'Buscando';

      return (
        <div className='flex flex-col gap-5 rounded-[1.6rem] border border-border/70 bg-card/85 p-6 shadow-[0_26px_70px_-48px_hsl(var(--ring))] backdrop-blur-sm'>
          <FinderHubHeader header={tab.finderHubHeader} modalData={tab.modalData} />
          <FinderBar
            config={tab.finderBar}
            isLoading={isLoading}
            submitLabel={submitLabel}
            loadingLabel={loadingLabel}
            onSubmit={() => handleSubmit(tab)}
          />
        </div>
      );
    }

    if (hasPhotoConfig(tab)) {
      const submitLabel = footerButton?.label ?? 'Subir foto';
      const loadingLabel = footerButton?.loadingLabel ?? 'Subiendo';
      const fieldName = getPhotoFieldName(tab);

      return (
        <div className='flex flex-col gap-5 rounded-[1.6rem] border border-border/70 bg-card/85 p-6 shadow-[0_26px_70px_-48px_hsl(var(--ring))] backdrop-blur-sm'>
          <FinderHubHeader header={tab.finderHubHeader} modalData={tab.modalData} />
          <PhotoUploader
            fieldName={fieldName}
            config={tab.searchByPictureComponentData}
            isLoading={isLoading}
            submitLabel={submitLabel}
            loadingLabel={loadingLabel}
            onSubmit={() => handleSubmit(tab)}
          />
        </div>
      );
    }

    return (
      <div className='rounded-[1.6rem] border border-dashed border-border/60 bg-muted/40 p-6 text-sm text-muted-foreground shadow-inner backdrop-blur-sm'>
        <p className='font-semibold text-foreground'>Próximamente</p>
        <p className='mt-1 text-sm text-muted-foreground/80'>
          Este tipo de buscador no está soportado aún ({tab.type}).
        </p>
      </div>
    );
  };

  const content = tabs.map(tab => {
    const isActive = tab.type === activeTab;
    const tabContent = renderTabContent(tab);

    if (variant === 'accordions') {
      return (
        <div
          key={getTabId(tab)}
          className='rounded-[1.6rem] border border-border/70 bg-card/85 shadow-[0_28px_70px_-50px_hsl(var(--ring))] backdrop-blur-sm'
        >
          <button
            type='button'
            className='flex w-full items-center justify-between gap-3 rounded-[1.6rem] px-7 py-5 text-left text-base font-semibold text-foreground transition hover:bg-background/80'
            onClick={() => setActiveTab(isActive ? '' : tab.type)}
            aria-expanded={isActive}
          >
            <div className='flex flex-col gap-1'>
              <span className='text-lg font-semibold text-foreground'>{tab.boxTitle}</span>
              <span className='text-xs font-medium text-muted-foreground/85'>
                {tab.finderHubHeader?.subtitle}
              </span>
            </div>
            {renderTabIcon(tab)}
          </button>
          {isActive ? (
            <div className='border-t border-border/60 px-7 py-6'>{tabContent}</div>
          ) : null}
        </div>
      );
    }

    if (!isActive) {
      return null;
    }

    return (
      <div
        key={getTabId(tab)}
        className='rounded-[1.6rem] border border-border/70 bg-card/85 p-6 shadow-[0_30px_80px_-48px_hsl(var(--ring))] backdrop-blur-sm transition ring-2 ring-primary/20 ring-offset-2 ring-offset-background'
      >
        <button
          type='button'
          className='flex items-center justify-between gap-3 rounded-[1.6rem] px-7 py-5 text-left text-base font-semibold text-foreground transition hover:bg-background/80'
          onClick={() => setActiveTab(tab.type)}
          aria-selected={isActive}
        >
          <div className='flex flex-col gap-1'>
            <span className='text-lg font-semibold text-foreground'>{tab.boxTitle}</span>
            <span className='text-xs font-medium text-muted-foreground/85'>
              {tab.finderHubHeader?.subtitle}
            </span>
          </div>
          {renderTabIcon(tab)}
        </button>
        <div className='px-7 py-6'>{tabContent}</div>
      </div>
    );
  });

  return (
    <section className='space-y-8 rounded-[1.8rem] border border-border/60 bg-card/70 p-2 shadow-[0_40px_110px_-70px_hsl(var(--ring))] backdrop-blur-xl'>
      <div className='rounded-[calc(1.8rem-4px)] border border-border/70 bg-background/90 px-6 py-8 shadow-[inset_0_1px_0_0_hsl(var(--border))] sm:px-10 sm:py-10'>
        {variant === 'tabs' ? (
          <nav
            className='mb-6 flex flex-wrap gap-3 rounded-full border border-border/70 bg-card/85 p-3 shadow-[0_18px_50px_-36px_hsl(var(--ring))] backdrop-blur-sm'
            role='tablist'
          >
            {tabs.map(tab => {
              const isActive = tab.type === activeTab;
              return (
                <button
                  key={getTabId(tab)}
                  type='button'
                  role='tab'
                  aria-selected={isActive}
                  className={classNames(
                    'inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background',
                    isActive
                      ? 'bg-primary text-primary-foreground shadow-[0_18px_50px_-24px_hsl(var(--ring))]'
                      : 'border border-transparent bg-background/70 text-muted-foreground hover:border-border hover:text-foreground'
                  )}
                  onClick={() => setActiveTab(tab.type)}
                >
                  <span>{tab.boxTitle}</span>
                  {renderTabIcon(tab)}
                </button>
              );
            })}
          </nav>
        ) : null}

        <div className='grid gap-6 md:grid-cols-[2fr,1fr]'>
          <div className='space-y-5'>{content}</div>
          <aside className='flex flex-col gap-4 rounded-[1.6rem] border border-border/70 bg-card/85 p-6 text-sm text-muted-foreground shadow-[0_24px_70px_-50px_hsl(var(--ring))] backdrop-blur-sm'>
            <div className='space-y-2'>
              <p className='text-xs font-semibold uppercase tracking-[0.35em] text-muted-foreground/70'>
                Tips
              </p>
              <p className='text-lg font-semibold text-foreground'>Mejora tus resultados</p>
              <p className='text-sm text-muted-foreground/85'>
                Comparte detalles concretos, usa fotos nítidas y suma códigos para afinar
                coincidencias.
              </p>
            </div>
            <button
              type='button'
              className='inline-flex items-center justify-center rounded-full border border-transparent bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground shadow-[0_18px_45px_-26px_hsl(var(--ring))] transition hover:-translate-y-[1px] hover:bg-primary/90'
              onClick={handlePredictiveSearch}
            >
              {footerButtonLabel ?? 'Buscar sugerencias'}
            </button>
            <button
              type='button'
              className='inline-flex items-center justify-center rounded-full border border-border/70 bg-background/80 px-5 py-2 text-sm font-semibold text-foreground transition hover:-translate-y-[1px] hover:border-border hover:bg-background'
              onClick={handleScrollToStepper}
            >
              Ver pasos
            </button>
            {loadingEvents?.length ? (
              <ul className='space-y-2 text-xs text-muted-foreground/80'>
                {loadingEvents.map(eventName => (
                  <li key={eventName} className='flex items-center gap-2'>
                    <span className='h-2 w-2 rounded-full bg-primary/60'></span>
                    {eventName}
                  </li>
                ))}
              </ul>
            ) : null}
          </aside>
        </div>

        {hasError ? (
          <div className='rounded-[1.6rem] border border-destructive/50 bg-destructive/10 p-5 text-sm text-destructive shadow-inner'>
            <p className='font-semibold'>
              {error ?? 'Ocurrió un error al procesar la solicitud. Intenta nuevamente.'}
            </p>
            {errorEvents?.length ? (
              <ul className='mt-3 space-y-1 text-xs text-destructive/80'>
                {errorEvents.map(eventName => (
                  <li key={eventName}>• {eventName}</li>
                ))}
              </ul>
            ) : null}
          </div>
        ) : null}

        {hasSuccess ? (
          <div className='flex flex-wrap items-center gap-2 rounded-[1.6rem] border border-primary/40 bg-primary/10 p-5 text-sm text-primary shadow-inner'>
            <span className='inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground'>
              ✓
            </span>
            <span className='font-semibold'>Solicitud procesada con éxito.</span>
            <button
              type='button'
              className='inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold text-primary hover:text-primary/80'
              onClick={reset}
            >
              Cerrar
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
};
