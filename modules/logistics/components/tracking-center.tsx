'use client';

import {Buttons} from '@repo/ui/buttons/scenes/index';
import {
  HiOutlineBellAlert,
  HiOutlineGlobeAlt,
  HiOutlineMapPin,
  HiOutlineSignal,
  HiOutlineSparkles,
  HiOutlineWifi,
} from 'react-icons/hi2';

import {
  logisticsShipments,
  logisticsTimeline,
  logisticsTrackingChannels,
} from '@modules/logistics/data/mock';
import type {ShipmentRow, TrackingChannel} from '@modules/logistics/data/mock';
import type {ShipmentStatus} from '@modules/logistics/domain/models';

const statusColors: Record<ShipmentStatus, string> = {
  prepared: 'text-amber-500',
  dispatched: 'text-sky-500',
  in_transit: 'text-indigo-500',
  delayed: 'text-rose-500',
  delivered: 'text-emerald-500',
  failed: 'text-red-500',
  returned: 'text-slate-500',
};

const connectionBadge: Record<'online' | 'offline', string> = {
  online: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  offline: 'bg-rose-50 text-rose-700 border-rose-200',
};

export const TrackingCenter = () => {
  return (
    <section className='mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-8'>
      <article className='rounded-3xl border border-primary/20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 text-white shadow-[0_40px_90px_-45px_rgba(15,23,42,0.95)]'>
        <div className='flex flex-col gap-6 md:flex-row md:items-center md:justify-between'>
          <div className='space-y-4'>
            <p className='text-sm font-semibold uppercase tracking-[0.35em] text-white/70'>
              Centro de tracking
            </p>
            <h1 className='text-4xl font-semibold leading-tight md:max-w-2xl'>
              Trazabilidad minuto a minuto y salud de integraciones con transportadoras
            </h1>
            <p className='text-base text-white/80'>
              Consolida eventos en tránsito, detecta fallas de conectividad y dispara notificaciones
              proactivas a clientes y equipos de soporte.
            </p>
            <div className='flex flex-wrap gap-3 text-sm'>
              <Buttons className='rounded-full border border-white/30 px-5 py-2 font-semibold text-white'>
                Historial completo
              </Buttons>
              <Buttons color='success' className='rounded-full bg-white px-5 py-2 font-semibold text-slate-900'>
                Crear alerta SLA
              </Buttons>
            </div>
          </div>
          <div className='rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur'>
            <p className='text-sm text-white/70'>Eventos procesados · últimos 60 minutos</p>
            <p className='mt-3 text-center text-5xl font-semibold'>642</p>
            <p className='text-center text-xs text-emerald-300'>+12% vs. promedio</p>
            <div className='mt-6 grid grid-cols-2 gap-3 text-sm'>
              <div className='rounded-2xl bg-white/10 p-4 text-center'>
                <p className='text-3xl font-semibold'>7</p>
                <p className='text-white/70'>rutas críticas</p>
              </div>
              <div className='rounded-2xl bg-white/10 p-4 text-center'>
                <p className='text-3xl font-semibold'>3</p>
                <p className='text-white/70'>canales en riesgo</p>
              </div>
            </div>
          </div>
        </div>
      </article>

      <div className='grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]'>
        <div className='rounded-3xl border border-border/60 bg-card p-6 shadow-sm'>
          <header className='mb-4 flex items-center justify-between'>
            <div>
              <p className='text-sm font-semibold text-muted-foreground'>Conectividad</p>
              <h2 className='text-2xl font-semibold'>Integraciones con carriers</h2>
            </div>
            <HiOutlineWifi className='h-6 w-6 text-primary' />
          </header>
          <div className='space-y-4'>
            {logisticsTrackingChannels.map((channel: TrackingChannel) => (
              <div
                key={channel.name}
                className='flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border/70 p-4'
              >
                <div>
                  <p className='text-base font-semibold'>{channel.name}</p>
                  <p className='text-xs text-muted-foreground'>Útimo evento: {channel.lastEvent}</p>
                </div>
                <div className='flex flex-wrap items-center gap-3 text-xs font-semibold'>
                  <span className='rounded-full bg-muted px-3 py-1 text-muted-foreground'>Uptime {channel.uptime}</span>
                  <span className='rounded-full bg-muted px-3 py-1 text-muted-foreground'>Latencia {channel.latency}</span>
                  <span
                    className={`rounded-full border px-3 py-1 ${connectionBadge[channel.connected ? 'online' : 'offline']}`}
                  >
                    {channel.connected ? 'En línea' : 'Sin conexión'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className='rounded-3xl border border-border/60 bg-card p-6 shadow-sm'>
          <header className='mb-4 flex items-center justify-between'>
            <div>
              <p className='text-sm font-semibold text-muted-foreground'>Alertas y eventos</p>
              <h3 className='text-xl font-semibold'>Línea de tiempo</h3>
            </div>
            <HiOutlineBellAlert className='h-6 w-6 text-primary' />
          </header>
          <div className='space-y-4'>
            {logisticsTimeline.map(event => (
              <div key={event.title} className='flex gap-4 rounded-2xl border border-border/70 p-4'>
                <div className='rounded-2xl bg-muted p-3'>
                  {event.title.includes('Ruta') ? (
                    <HiOutlineGlobeAlt className={`h-5 w-5 ${event.accent}`} />
                  ) : event.title.includes('alerta') ? (
                    <HiOutlineBellAlert className={`h-5 w-5 ${event.accent}`} />
                  ) : (
                    <HiOutlineSparkles className={`h-5 w-5 ${event.accent}`} />
                  )}
                </div>
                <div className='flex-1'>
                  <p className='text-sm font-semibold'>{event.title}</p>
                  <p className='text-xs text-muted-foreground'>{event.detail}</p>
                </div>
                <span className='text-xs font-semibold text-muted-foreground'>{event.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className='rounded-3xl border border-border/60 bg-card p-6 shadow-sm'>
        <header className='mb-4 flex items-center justify-between'>
          <div>
            <p className='text-sm font-semibold text-muted-foreground'>Shipments críticos</p>
            <h4 className='text-xl font-semibold'>Radar en tránsito</h4>
          </div>
          <Buttons className='inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs font-semibold'>
            <HiOutlineMapPin className='h-4 w-4' />
            Ver mapa
          </Buttons>
        </header>
        <div className='overflow-x-auto'>
          <table className='w-full min-w-[640px] text-sm'>
            <thead>
              <tr className='text-left text-xs uppercase tracking-widest text-muted-foreground'>
                <th className='pb-3 font-semibold'>ID</th>
                <th className='pb-3 font-semibold'>Destino</th>
                <th className='pb-3 font-semibold'>Carrier</th>
                <th className='pb-3 font-semibold'>Estado</th>
                <th className='pb-3 font-semibold'>ETA</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-border/70'>
              {logisticsShipments.map((shipment: ShipmentRow) => (
                <tr key={shipment.id}>
                  <td className='py-3 font-semibold'>{shipment.id}</td>
                  <td className='py-3 text-muted-foreground'>
                    {shipment.city}
                    <span className='block text-xs text-muted-foreground'>{shipment.customer}</span>
                  </td>
                  <td className='py-3'>{shipment.carrier}</td>
                  <td className='py-3'>
                    <span className={`font-semibold ${statusColors[shipment.status]}`}>
                      {shipment.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className='py-3 text-muted-foreground'>{shipment.eta}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
