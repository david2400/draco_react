'use client';

import {Buttons} from '@repo/ui/buttons/scenes/index';
import {HiOutlineChartBar, HiOutlineClock, HiOutlineSparkles} from 'react-icons/hi2';
import {logisticsDemandForecast} from '@modules/logistics/data/mock';
import type {DemandForecast} from '@modules/logistics/data/mock';

export const ForecastingHub = () => {
  return (
    <section className='mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-8'>
      <article className='rounded-3xl border border-primary/20 bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 p-8 text-white shadow-[0_40px_110px_-60px_rgba(49,46,129,0.9)]'>
        <div className='flex flex-col gap-6 md:flex-row md:items-center md:justify-between'>
          <div className='space-y-4'>
            <p className='text-xs font-semibold uppercase tracking-[0.55em] text-white/70'>
              Forecasting
            </p>
            <h1 className='text-4xl font-semibold leading-tight md:max-w-3xl'>
              Anticípate a la demanda y ajusta capacidad por región
            </h1>
            <p className='text-base text-white/80'>
              Proyecta el volumen de envíos, identifica brechas y toma decisiones de personal y
              transportadoras con semanas de anticipación.
            </p>
          </div>
          <div className='flex flex-wrap gap-3 text-sm'>
            <Buttons className='rounded-full border border-white/30 px-5 py-2 font-semibold text-white'>
              Modelos históricos
            </Buttons>
            <Buttons color='success' className='rounded-full bg-white px-5 py-2 font-semibold text-slate-900'>
              Crear escenario
            </Buttons>
          </div>
        </div>
      </article>

      <div className='grid gap-6 sm:grid-cols-3'>
        {[
          {label: 'Volumen proyectado (30d)', value: '6 480 envíos', icon: HiOutlineChartBar},
          {label: 'Brecha máxima', value: '260 paquetes', icon: HiOutlineClock},
          {label: 'Acciones recomendadas', value: '12', icon: HiOutlineSparkles},
        ].map(card => (
          <div key={card.label} className='rounded-3xl border border-border/60 bg-card p-6 shadow-sm'>
            <card.icon className='h-6 w-6 text-primary' />
            <p className='mt-3 text-xs text-muted-foreground'>{card.label}</p>
            <p className='text-2xl font-semibold text-foreground'>{card.value}</p>
          </div>
        ))}
      </div>

      <div className='rounded-3xl border border-border/60 bg-card p-6 shadow-sm'>
        <header className='mb-4'>
          <p className='text-sm font-semibold text-muted-foreground'>Proyección semanal</p>
          <h2 className='text-2xl font-semibold'>Capacidad vs. demanda</h2>
        </header>
        <div className='overflow-x-auto'>
          <table className='w-full min-w-[520px] text-sm'>
            <thead>
              <tr className='text-left text-xs uppercase tracking-widest text-muted-foreground'>
                <th className='pb-3 font-semibold'>Semana</th>
                <th className='pb-3 font-semibold'>Envíos esperados</th>
                <th className='pb-3 font-semibold'>Brecha capacidad</th>
                <th className='pb-3 font-semibold'>Recomendación</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-border/70'>
              {logisticsDemandForecast.map((row: DemandForecast) => (
                <tr key={row.week}>
                  <td className='py-3 font-semibold'>{row.week}</td>
                  <td className='py-3 text-muted-foreground'>{row.expectedShipments}</td>
                  <td className={`py-3 text-sm font-semibold ${row.capacityGap < 0 ? 'text-rose-500' : 'text-emerald-500'}`}>
                    {row.capacityGap}
                  </td>
                  <td className='py-3 text-muted-foreground'>{row.recommendation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className='rounded-3xl border border-border/60 bg-card p-6 shadow-sm'>
        <header className='mb-4'>
          <p className='text-sm font-semibold text-muted-foreground'>Planificación</p>
          <h3 className='text-xl font-semibold'>Acciones sugeridas</h3>
        </header>
        <div className='grid gap-4 sm:grid-cols-3'>
          {[
            {label: 'Reservar capacidad 3PL', detail: 'Semana 04, Caribe'},
            {label: 'Configurar turno nocturno', detail: 'Semana 06, Bogotá'},
            {label: 'Campaña preventa clientes', detail: 'Informar tiempos extendidos'},
          ].map(action => (
            <div key={action.label} className='rounded-2xl border border-border/60 p-4 text-center'>
              <p className='text-sm font-semibold'>{action.label}</p>
              <p className='text-xs text-muted-foreground'>{action.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
