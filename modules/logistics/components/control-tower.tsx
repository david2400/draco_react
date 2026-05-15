'use client';

import {Buttons} from '@repo/ui/buttons/scenes/index';
import {
  HiOutlineExclamationTriangle,
  HiOutlineGlobeEuropeAfrica,
  HiOutlineMap,
  HiOutlinePresentationChartLine,
  HiOutlineQueueList,
} from 'react-icons/hi2';

import {
  logisticsControlAlerts,
  logisticsShipments,
  logisticsTimeline,
} from '@modules/logistics/data/mock';
import type {ControlTowerAlert, ShipmentRow} from '@modules/logistics/data/mock';

export const ControlTower = () => {
  return (
    <section className='mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-8'>
      <article className='rounded-3xl border border-primary/25 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 text-white shadow-[0_45px_110px_-55px_rgba(15,23,42,0.95)]'>
        <div className='flex flex-col gap-6 md:flex-row md:items-center md:justify-between'>
          <div className='space-y-4'>
            <p className='text-xs font-semibold uppercase tracking-[0.55em] text-white/70'>
              Control tower
            </p>
            <h1 className='text-4xl font-semibold leading-tight md:max-w-3xl'>
              Monitorea zonas, capacidad y alertas en tiempo real
            </h1>
            <p className='text-base text-white/80'>
              Visualiza SLA críticos, congestiones y fallas de integraciones para disparar playbooks
              en minutos.
            </p>
          </div>
          <div className='flex flex-wrap gap-3 text-sm'>
            <Buttons className='rounded-full border border-white/30 px-5 py-2 font-semibold text-white'>
              Playbooks
            </Buttons>
            <Buttons color='success' className='rounded-full bg-white px-5 py-2 font-semibold text-slate-900'>
              Crear alerta
            </Buttons>
          </div>
        </div>
        <div className='mt-8 grid gap-4 sm:grid-cols-3'>
          {[
            {label: 'Alertas abiertas', value: logisticsControlAlerts.length.toString()},
            {label: 'Rutas críticas', value: '7'},
            {label: 'Incidencias hoy', value: '18'},
          ].map(card => (
            <div key={card.label} className='rounded-2xl border border-white/15 bg-white/5 p-4 text-center backdrop-blur'>
              <p className='text-3xl font-semibold'>{card.value}</p>
              <p className='text-xs text-white/70'>{card.label}</p>
            </div>
          ))}
        </div>
      </article>

      <div className='grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]'>
        <div className='rounded-3xl border border-border/60 bg-card p-6 shadow-sm'>
          <header className='mb-4 flex items-center justify-between'>
            <div>
              <p className='text-sm font-semibold text-muted-foreground'>Alertas</p>
              <h2 className='text-2xl font-semibold'>Zonas en riesgo</h2>
            </div>
            <HiOutlineExclamationTriangle className='h-6 w-6 text-primary' />
          </header>
          <div className='space-y-4'>
            {logisticsControlAlerts.map((alert: ControlTowerAlert) => (
              <div
                key={alert.id}
                className='rounded-2xl border border-border/70 p-4 transition hover:border-primary/70 hover:shadow-md'
              >
                <div className='flex flex-wrap items-center justify-between gap-3'>
                  <div>
                    <p className='text-sm font-semibold'>{alert.title}</p>
                    <p className='text-xs text-muted-foreground'>{alert.detail}</p>
                  </div>
                  <span className='rounded-full bg-muted px-3 py-1 text-xs font-semibold text-muted-foreground'>
                    {alert.zone}
                  </span>
                </div>
                {alert.etaRisk ? (
                  <p className='mt-2 text-xs text-rose-500'>Impacto estimado: {alert.etaRisk}</p>
                ) : null}
              </div>
            ))}
          </div>
        </div>

        <div className='space-y-6'>
          <div className='rounded-3xl border border-border/60 bg-card p-6 shadow-sm'>
            <header className='mb-4 flex items-center justify-between'>
              <div>
                <p className='text-sm font-semibold text-muted-foreground'>Mapa operativo</p>
                <h3 className='text-xl font-semibold'>Resumen regiones</h3>
              </div>
              <HiOutlineGlobeEuropeAfrica className='h-6 w-6 text-primary' />
            </header>
            <p className='text-sm text-muted-foreground'>Vista de mapa interactivo pendiente de integrar.</p>
            <div className='mt-4 grid gap-3 sm:grid-cols-3'>
              {[
                {label: 'Sabana', risk: 'medio'},
                {label: 'Caribe', risk: 'alto'},
                {label: 'Eje Cafetero', risk: 'bajo'},
              ].map(zone => (
                <div key={zone.label} className='rounded-2xl border border-border/60 p-4 text-center'>
                  <p className='text-base font-semibold'>{zone.label}</p>
                  <p
                    className={`text-xs font-semibold ${
                      zone.risk === 'alto'
                        ? 'text-rose-500'
                        : zone.risk === 'medio'
                          ? 'text-amber-500'
                          : 'text-emerald-500'
                    }`}
                  >
                    Riesgo {zone.risk}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className='rounded-3xl border border-border/60 bg-card p-6 shadow-sm'>
            <header className='mb-3 flex items-center justify-between'>
              <div>
                <p className='text-sm font-semibold text-muted-foreground'>Timeline</p>
                <h4 className='text-lg font-semibold'>Eventos recientes</h4>
              </div>
              <HiOutlineQueueList className='h-6 w-6 text-primary' />
            </header>
            <div className='space-y-3'>
              {logisticsTimeline.map(event => (
                <div key={event.title} className='rounded-2xl border border-border/70 p-3'>
                  <p className='text-sm font-semibold'>{event.title}</p>
                  <p className='text-xs text-muted-foreground'>{event.detail}</p>
                  <span className='text-xs text-muted-foreground'>{event.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className='rounded-3xl border border-border/60 bg-card p-6 shadow-sm'>
        <header className='mb-4 flex items-center justify-between'>
          <div>
            <p className='text-sm font-semibold text-muted-foreground'>Cola priorizada</p>
            <h5 className='text-xl font-semibold'>Shipments críticos</h5>
          </div>
          <Buttons className='inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs font-semibold'>
            <HiOutlineMap className='h-4 w-4' />
            Ver en mapa
          </Buttons>
        </header>
        <div className='overflow-x-auto'>
          <table className='w-full min-w-[640px] text-sm'>
            <thead>
              <tr className='text-left text-xs uppercase tracking-widest text-muted-foreground'>
                <th className='pb-3 font-semibold'>ID</th>
                <th className='pb-3 font-semibold'>Zona</th>
                <th className='pb-3 font-semibold'>Carrier</th>
                <th className='pb-3 font-semibold'>ETA</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-border/70'>
              {logisticsShipments.map((shipment: ShipmentRow) => (
                <tr key={shipment.id}>
                  <td className='py-3 font-semibold'>{shipment.id}</td>
                  <td className='py-3 text-muted-foreground'>{shipment.city}</td>
                  <td className='py-3 text-muted-foreground'>{shipment.carrier}</td>
                  <td className='py-3 text-muted-foreground'>{shipment.eta}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className='rounded-3xl border border-border/60 bg-card p-6 shadow-sm'>
        <header className='mb-4 flex items-center justify-between'>
          <div>
            <p className='text-sm font-semibold text-muted-foreground'>KPIs</p>
            <h6 className='text-xl font-semibold'>Riesgos y desempeño</h6>
          </div>
          <HiOutlinePresentationChartLine className='h-6 w-6 text-primary' />
        </header>
        <div className='grid gap-4 sm:grid-cols-3'>
          {[
            {label: 'OTIF', value: '97.8%'},
            {label: 'Alertas críticas activas', value: '4'},
            {label: 'Playbooks ejecutados', value: '12'},
          ].map(card => (
            <div key={card.label} className='rounded-2xl border border-border/60 p-4 text-center'>
              <p className='text-3xl font-semibold text-primary'>{card.value}</p>
              <p className='text-xs text-muted-foreground'>{card.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
