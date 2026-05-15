'use client';

import React, {useMemo, useState} from 'react';
import {Buttons} from '@repo/ui/buttons/scenes/index';
import {
  HiOutlineBolt,
  HiOutlineGlobeAlt,
  HiOutlineMap,
  HiOutlineMapPin,
  HiOutlineRectangleStack,
  HiOutlineTruck,
} from 'react-icons/hi2';
import {
  logisticsConsolidatedLoad,
  logisticsOptimizerStats,
  logisticsRouteLegs,
  logisticsRouteSnapshots,
} from '@modules/logistics/data/mock';
import {Modal} from '@repo/ui/modals/scenes/dialog/modal';

const trendColor: Record<string, string> = {
  positivo: 'text-emerald-600',
  neutral: 'text-slate-500',
  negativo: 'text-rose-600',
};

export const RouteOptimizer = () => {
  const [optimizeModalOpen, setOptimizeModalOpen] = useState(false);
  const [optimizationMessage, setOptimizationMessage] = useState<string | null>(null);
  const [generatingManifest, setGeneratingManifest] = useState(false);
  const [optimizeForm, setOptimizeForm] = useState({
    region: 'Sabana Norte',
    date: new Date().toISOString().slice(0, 10),
    consolidateReturns: true,
    maxStops: 45,
  });

  const totals = useMemo(() => {
    const shipments = logisticsRouteSnapshots.reduce((sum, snapshot) => sum + snapshot.shipments, 0);
    return {shipments};
  }, []);

  const handleOptimizeSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setOptimizationMessage(null);
    setTimeout(() => {
      setOptimizationMessage(
        `Se generó un plan optimizado para ${optimizeForm.region} con máximo ${optimizeForm.maxStops} paradas.`
      );
      setOptimizeModalOpen(false);
      setTimeout(() => setOptimizationMessage(null), 5000);
    }, 800);
  };

  const handleManifestExport = () => {
    setGeneratingManifest(true);
    setOptimizationMessage(null);
    setTimeout(() => {
      setGeneratingManifest(false);
      setOptimizationMessage('Manifiesto exportado (mock) y enviado a transportadoras.');
      setTimeout(() => setOptimizationMessage(null), 5000);
    }, 1200);
  };

  return (
    <section className='mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-8'>
      <article className='rounded-3xl border border-border/40 bg-gradient-to-br from-indigo-900 via-indigo-800 to-slate-900 px-8 py-12 text-white shadow-[0_30px_80px_-35px_rgba(79,70,229,0.8)]'>
        <div className='flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between'>
          <div className='space-y-4'>
            <span className='inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-white/70'>
              Rutas & despacho
            </span>
            <div className='space-y-4'>
              <h1 className='text-4xl font-semibold leading-tight md:text-5xl'>
                Planifica rutas inteligentes con priorización por zonas, ventanas y SLA
              </h1>
              <p className='max-w-2xl text-base text-white/80'>
                Consolida pedidos por región, aplica reglas de consolidación y envía planes al TMS o a
                transportadoras externas con un clic. Visualiza capacidad usada y eventos críticos en
                vivo.
              </p>
            </div>
            <div className='flex flex-wrap gap-3'>
              <Buttons
                color='success'
                className='inline-flex items-center gap-2 rounded-full bg-white/90 px-5 py-3 text-sm font-semibold text-indigo-900 transition hover:-translate-y-0.5 hover:bg-white'
                onClick={() => setOptimizeModalOpen(true)}
              >
                <HiOutlineBolt className='h-4 w-4' />
                Optimizar rutas hoy
              </Buttons>
              <Buttons
                className='rounded-full border border-white/30 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/10'
                loading={generatingManifest}
                onClick={handleManifestExport}
              >
                Exportar manifiesto
              </Buttons>
            </div>
          </div>
          <div className='rounded-3xl border border-white/10 bg-white/5 p-6 text-sm backdrop-blur'>
            <div className='flex items-center gap-3 text-white/80'>
              <HiOutlineMap className='h-6 w-6 text-white' />
              <div>
                <p className='text-xs uppercase tracking-[0.3em] text-white/60'>Rutas activas</p>
                <p className='text-3xl font-semibold text-white'>18</p>
              </div>
            </div>
            <hr className='my-4 border-white/10' />
            <div className='space-y-3 text-white/70'>
              <div className='flex items-center justify-between text-xs uppercase tracking-[0.3em]'>
                <span>Capacidad</span>
                <span>82%</span>
              </div>
              <div className='h-2 rounded-full bg-white/10'>
                <div className='h-full rounded-full bg-gradient-to-r from-emerald-400 to-lime-400' style={{width: '82%'}} />
              </div>
              <div className='flex items-center justify-between text-xs uppercase tracking-[0.3em]'>
                <span>Ventanas cumplidas</span>
                <span>96%</span>
              </div>
            </div>
          </div>
        </div>
      </article>

      {optimizationMessage ? (
        <div className='rounded-2xl border border-primary/40 bg-primary/5 px-4 py-3 text-sm font-semibold text-primary'>
          {optimizationMessage}
        </div>
      ) : null}

      <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
        {logisticsRouteSnapshots.map(route => (
          <div
            key={route.region}
            className='rounded-3xl border border-border/60 bg-card p-5 shadow-sm transition hover:-translate-y-1 hover:border-primary/60'
          >
            <div className='flex items-center justify-between text-xs font-semibold text-muted-foreground'>
              <span>{route.status}</span>
              <HiOutlineGlobeAlt className='h-4 w-4 text-primary' />
            </div>
            <h3 className='mt-2 text-xl font-semibold text-foreground'>{route.region}</h3>
            <p className='text-sm text-muted-foreground'>
              {route.shipments} envíos · {route.distance}
            </p>
            <dl className='mt-4 grid grid-cols-2 gap-4 text-sm text-muted-foreground'>
              <div>
                <dt className='text-xs uppercase tracking-[0.3em]'>ETA</dt>
                <dd className='text-base font-semibold text-foreground'>{route.eta}</dd>
              </div>
              <div>
                <dt className='text-xs uppercase tracking-[0.3em]'>Carrier</dt>
                <dd className='text-base font-semibold text-foreground'>{route.carrier}</dd>
              </div>
            </dl>
          </div>
        ))}
      </div>

      <div className='grid gap-6 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]'>
        <div className='rounded-3xl border border-border/60 bg-card p-6 shadow-sm'>
          <header className='mb-4 flex items-center justify-between'>
            <div>
              <p className='text-sm font-semibold text-muted-foreground'>Itinerario</p>
              <h2 className='text-2xl font-semibold text-foreground'>Ruta Sabana Norte</h2>
            </div>
            <Buttons className='rounded-full border border-border px-4 py-2 text-xs font-semibold'>
              Ajustar secuencia
            </Buttons>
          </header>
          <div className='space-y-3'>
            {logisticsRouteLegs.map(leg => (
              <div
                key={`${leg.city}-${leg.time}`}
                className='flex items-center gap-4 rounded-2xl border border-border/70 p-4'
              >
                <div className='rounded-2xl bg-muted p-2'>
                  <HiOutlineMapPin className='h-5 w-5 text-primary' />
                </div>
                <div className='flex-1'>
                  <p className='text-sm font-semibold text-foreground'>
                    {leg.city} · {leg.time}
                  </p>
                  <p className='text-xs text-muted-foreground'>{leg.action}</p>
                </div>
                <span className='rounded-full bg-muted px-3 py-1 text-xs font-semibold text-muted-foreground'>
                  {leg.type}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className='space-y-6'>
          <div className='rounded-3xl border border-border/60 bg-card p-6 shadow-sm'>
            <header className='mb-4 flex items-center justify-between'>
              <div>
                <p className='text-sm font-semibold text-muted-foreground'>Optimización</p>
                <h3 className='text-xl font-semibold'>KPIs del motor</h3>
              </div>
              <HiOutlineBolt className='h-6 w-6 text-primary' />
            </header>
            <div className='space-y-3'>
              {logisticsOptimizerStats.map(stat => (
                <div
                  key={stat.label}
                  className='rounded-2xl border border-border/70 px-4 py-3 text-sm font-semibold text-foreground'
                >
                  <div className='flex items-center justify-between'>
                    <span>{stat.label}</span>
                    <span className={trendColor[stat.trend]}>{stat.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className='rounded-3xl border border-border/60 bg-card p-6 shadow-sm'>
            <header className='mb-4 flex items-center justify-between'>
              <div>
                <p className='text-sm font-semibold text-muted-foreground'>Carga consolidada</p>
                <h3 className='text-xl font-semibold'>Resumen</h3>
              </div>
              <HiOutlineRectangleStack className='h-6 w-6 text-primary' />
            </header>
            <ul className='space-y-3 text-sm text-muted-foreground'>
              {logisticsConsolidatedLoad.map(item => (
                <li key={item.label} className='flex items-center justify-between'>
                  <span>{item.label}</span>
                  <span className='font-semibold text-foreground'>{item.value}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <Modal
        title='Ejecutar optimización'
        open={optimizeModalOpen}
        onOpenChange={setOptimizeModalOpen}
        size='lg'
      >
        <form className='space-y-4' onSubmit={handleOptimizeSubmit}>
          <div className='grid gap-3 md:grid-cols-2'>
            <label className='flex flex-col gap-2 text-sm font-semibold text-muted-foreground'>
              Región / ruta
              <select
                className='rounded-2xl border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/40'
                value={optimizeForm.region}
                onChange={event => setOptimizeForm(prev => ({...prev, region: event.target.value}))}
              >
                {logisticsRouteSnapshots.map(route => (
                  <option key={route.region} value={route.region}>
                    {route.region}
                  </option>
                ))}
              </select>
            </label>
            <label className='flex flex-col gap-2 text-sm font-semibold text-muted-foreground'>
              Fecha despacho
              <input
                type='date'
                className='rounded-2xl border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/40'
                value={optimizeForm.date}
                onChange={event => setOptimizeForm(prev => ({...prev, date: event.target.value}))}
              />
            </label>
          </div>
          <div className='grid gap-3 md:grid-cols-2'>
            <label className='flex flex-col gap-2 text-sm font-semibold text-muted-foreground'>
              Stops máximos
              <input
                type='number'
                min={10}
                max={120}
                className='rounded-2xl border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/40'
                value={optimizeForm.maxStops}
                onChange={event => setOptimizeForm(prev => ({...prev, maxStops: Number(event.target.value)}))}
              />
            </label>
            <label className='flex items-center gap-3 text-sm font-semibold text-muted-foreground'>
              <input
                type='checkbox'
                className='size-4 rounded border border-border text-primary focus:ring-2 focus:ring-primary/30'
                checked={optimizeForm.consolidateReturns}
                onChange={event =>
                  setOptimizeForm(prev => ({...prev, consolidateReturns: event.target.checked}))
                }
              />
              Consolidar devoluciones
            </label>
          </div>
          <div className='rounded-2xl border border-border bg-muted/30 px-4 py-3 text-sm text-muted-foreground'>
            {totals.shipments} envíos disponibles para optimizar hoy.
          </div>
          <div className='flex justify-end gap-3 pt-2'>
            <Buttons
              type='button'
              variant='ghost'
              className='border border-border px-4 py-2 text-sm'
              onClick={() => setOptimizeModalOpen(false)}
            >
              Cancelar
            </Buttons>
            <Buttons type='submit' color='success' className='px-5 py-2 text-sm font-semibold'>
              Confirmar optimización
            </Buttons>
          </div>
        </form>
      </Modal>
    </section>
  );
};
