'use client';

import {Buttons} from '@repo/ui/buttons/scenes/index';
import {
  HiOutlineAdjustmentsHorizontal,
  HiOutlineArrowPathRoundedSquare,
  HiOutlineClipboardDocumentList,
  HiOutlineClock,
  HiOutlineGlobeAmericas,
  HiOutlineTruck,
} from 'react-icons/hi2';

import {
  logisticsShipmentBatches,
  logisticsShipments,
  logisticsTimeline,
} from '@modules/logistics/data/mock';
import type {ShipmentBatch, ShipmentRow} from '@modules/logistics/data/mock';
import type {ShipmentStatus} from '@modules/logistics/domain/models';

const shipmentStatusStyles: Record<
  ShipmentStatus,
  {badge: string; label: string; chip: string}
> = {
  prepared: {
    label: 'Preparado',
    badge: 'bg-amber-50 text-amber-700 border-amber-200',
    chip: 'text-amber-500',
  },
  dispatched: {
    label: 'Despachado',
    badge: 'bg-sky-50 text-sky-700 border-sky-200',
    chip: 'text-sky-500',
  },
  in_transit: {
    label: 'En tránsito',
    badge: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    chip: 'text-indigo-500',
  },
  delayed: {
    label: 'Atrasado',
    badge: 'bg-rose-50 text-rose-700 border-rose-200',
    chip: 'text-rose-500',
  },
  delivered: {
    label: 'Entregado',
    badge: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    chip: 'text-emerald-500',
  },
  failed: {
    label: 'Fallido',
    badge: 'bg-red-50 text-red-700 border-red-200',
    chip: 'text-red-500',
  },
  returned: {
    label: 'Devuelto',
    badge: 'bg-slate-50 text-slate-700 border-slate-200',
    chip: 'text-slate-500',
  },
};

const batchStatus: Record<ShipmentBatch['status'], string> = {
  Planificada: 'bg-slate-100 text-slate-700 border-slate-200',
  'En curso': 'bg-emerald-100 text-emerald-700 border-emerald-200',
  'Requiere acción': 'bg-amber-100 text-amber-700 border-amber-200',
};

export const ShipmentsControl = () => {
  return (
    <section className='mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-8'>
      <article className='rounded-3xl border border-primary/20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 text-white shadow-[0_25px_60px_-20px_rgba(15,23,42,0.85)]'>
        <header className='flex flex-col gap-6 md:flex-row md:items-center md:justify-between'>
          <div className='space-y-3'>
            <p className='text-sm font-semibold uppercase tracking-[0.35em] text-white/70'>
              Torre de control · Envíos
            </p>
            <h1 className='text-balance text-4xl font-semibold leading-tight md:max-w-2xl'>
              Coordina oleadas, asigna transportadoras y vigila SLA en tiempo real
            </h1>
            <p className='max-w-3xl text-base text-white/80'>
              Genera lotes automáticamente desde las órdenes y monitorea el estado de cada paquete
              hasta su entrega final.
            </p>
          </div>
          <div className='flex gap-3'>
            <Buttons className='rounded-full border border-white/30 px-5 py-2 text-sm font-semibold text-white'>
              Reglas de asignación
            </Buttons>
            <Buttons
              color='success'
              className='rounded-full bg-white px-5 py-2 text-sm font-semibold text-slate-900'
            >
              Crear wave
            </Buttons>
          </div>
        </header>
        <div className='mt-8 grid gap-4 sm:grid-cols-3'>
          {[
            {label: 'Pedidos listos', value: '86', icon: HiOutlineClipboardDocumentList},
            {label: 'Capacidad disponible', value: '62%', icon: HiOutlineGlobeAmericas},
            {label: 'Tiempo medio despacho', value: '4.4h', icon: HiOutlineClock},
          ].map(metric => (
            <div
              key={metric.label}
              className='flex items-center gap-3 rounded-2xl border border-white/15 bg-white/5 p-4 backdrop-blur'
            >
              <metric.icon className='h-8 w-8 text-white/90' />
              <div>
                <p className='text-sm text-white/70'>{metric.label}</p>
                <p className='text-2xl font-semibold'>{metric.value}</p>
              </div>
            </div>
          ))}
        </div>
      </article>

      <div className='grid gap-6 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]'>
        <div className='rounded-3xl border border-border/60 bg-card p-6 shadow-sm'>
          <header className='mb-5 flex flex-wrap items-center justify-between gap-3'>
            <div>
              <p className='text-sm font-semibold text-muted-foreground'>Cola operativa</p>
              <h2 className='text-2xl font-semibold'>Envíos en curso</h2>
            </div>
            <Buttons className='inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs font-semibold'>
              <HiOutlineAdjustmentsHorizontal className='h-4 w-4' />
              Filtros
            </Buttons>
          </header>
          <div className='overflow-x-auto'>
            <table className='w-full min-w-[720px] text-sm'>
              <thead>
                <tr className='text-left text-xs uppercase tracking-widest text-muted-foreground'>
                  <th className='pb-3 font-semibold'>ID</th>
                  <th className='pb-3 font-semibold'>Destino</th>
                  <th className='pb-3 font-semibold'>Carrier</th>
                  <th className='pb-3 font-semibold'>Estado</th>
                  <th className='pb-3 font-semibold'>ETA</th>
                  <th className='pb-3 font-semibold'>Riesgo</th>
                </tr>
              </thead>
              <tbody className='divide-y divide-border/70'>
                {logisticsShipments.map((shipment: ShipmentRow) => {
                  const styles = shipmentStatusStyles[shipment.status];
                  return (
                    <tr key={shipment.id}>
                      <td className='py-3 font-semibold'>{shipment.id}</td>
                      <td className='py-3 text-muted-foreground'>
                        <span className='font-semibold text-foreground'>{shipment.city}</span>
                        <span className='block text-xs text-muted-foreground'>{shipment.customer}</span>
                      </td>
                      <td className='py-3'>{shipment.carrier}</td>
                      <td className='py-3'>
                        <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${styles.badge}`}>
                          {styles.label}
                        </span>
                      </td>
                      <td className='py-3 text-muted-foreground'>{shipment.eta}</td>
                      <td className='py-3'>
                        <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${styles.chip}`}>
                          {shipment.risk}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className='space-y-6'>
          <div className='rounded-3xl border border-border/60 bg-card p-6 shadow-sm'>
            <header className='mb-4 flex items-center justify-between'>
              <div>
                <p className='text-sm font-semibold text-muted-foreground'>Oleadas</p>
                <h3 className='text-xl font-semibold'>Despachos programados</h3>
              </div>
              <HiOutlineTruck className='h-6 w-6 text-primary' />
            </header>
            <div className='space-y-3'>
              {logisticsShipmentBatches.map(batch => (
                <div
                  key={batch.id}
                  className='rounded-2xl border border-border/70 p-4 transition hover:border-primary/70 hover:shadow-md'
                >
                  <div className='flex items-center justify-between text-sm'>
                    <span className='font-semibold'>{batch.id}</span>
                    <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${batchStatus[batch.status]}`}>
                      {batch.status}
                    </span>
                  </div>
                  <div className='mt-2 flex flex-wrap gap-3 text-xs text-muted-foreground'>
                    <span>{batch.carrier}</span>
                    <span>{batch.zone}</span>
                    <span>{batch.stops} paradas</span>
                    <span className='font-semibold text-foreground'>{batch.eta}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className='rounded-3xl border border-border/60 bg-card p-6 shadow-sm'>
            <header className='mb-3 flex items-center justify-between'>
              <div>
                <p className='text-sm font-semibold text-muted-foreground'>Actividad reciente</p>
                <h4 className='text-lg font-semibold'>Eventos clave</h4>
              </div>
              <HiOutlineArrowPathRoundedSquare className='h-6 w-6 text-primary' />
            </header>
            <div className='space-y-4'>
              {logisticsTimeline.map(event => (
                <div key={event.title} className='flex gap-4 rounded-2xl border border-border/70 p-3'>
                  <div className='rounded-xl bg-muted p-2'>
                    <HiOutlineClock className={`h-5 w-5 ${event.accent}`} />
                  </div>
                  <div className='flex-1'>
                    <p className='text-sm font-semibold text-foreground'>{event.title}</p>
                    <p className='text-xs text-muted-foreground'>{event.detail}</p>
                  </div>
                  <span className='text-xs font-semibold text-muted-foreground'>{event.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
