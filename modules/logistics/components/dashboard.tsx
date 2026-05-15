'use client';

import React from 'react';
import {Buttons} from '@repo/ui/buttons/scenes/index';
import {
  HiOutlineArrowTrendingUp,
  HiOutlineBellAlert,
  HiOutlineBolt,
  HiOutlineCheckCircle,
  HiOutlineCube,
  HiOutlineMap,
  HiOutlineSparkles,
  HiOutlineTruck,
} from 'react-icons/hi2';
import type {ShipmentStatus} from '@modules/logistics/domain/models';
import type {ReturnTicket} from '@modules/logistics/data/mock';
import {
  logisticsCarrierPerformances,
  logisticsConsolidatedLoad,
  logisticsIntegrationChecklist,
  logisticsMetrics,
  logisticsOptimizerStats,
  logisticsReturnTickets,
  logisticsRouteLegs,
  logisticsRouteSnapshots,
  logisticsRules,
  logisticsShipments,
  logisticsTimeline,
} from '@modules/logistics/data/mock';

type RiskLevel = 'Bajo' | 'Medio' | 'Alto' | 'N/A';

const shipmentStatusStyles: Record<ShipmentStatus, {label: string; badge: string; pill: string}> = {
  prepared: {
    label: 'Preparado',
    badge: 'bg-amber-100 text-amber-700 border-amber-200',
    pill: 'text-amber-500',
  },
  dispatched: {
    label: 'Despachado',
    badge: 'bg-sky-100 text-sky-700 border-sky-200',
    pill: 'text-sky-500',
  },
  in_transit: {
    label: 'En tránsito',
    badge: 'bg-indigo-100 text-indigo-700 border-indigo-200',
    pill: 'text-indigo-500',
  },
  delayed: {
    label: 'Atrasado',
    badge: 'bg-rose-100 text-rose-700 border-rose-200',
    pill: 'text-rose-500',
  },
  delivered: {
    label: 'Entregado',
    badge: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    pill: 'text-emerald-500',
  },
  failed: {
    label: 'Fallido',
    badge: 'bg-red-100 text-red-700 border-red-200',
    pill: 'text-red-500',
  },
  returned: {
    label: 'Devuelto',
    badge: 'bg-zinc-100 text-zinc-700 border-zinc-200',
    pill: 'text-zinc-500',
  },
};

const riskColor: Record<RiskLevel, string> = {
  Bajo: 'bg-emerald-50 text-emerald-600',
  Medio: 'bg-amber-50 text-amber-600',
  Alto: 'bg-rose-50 text-rose-600',
  'N/A': 'bg-muted text-muted-foreground',
};

type LogisticsRule = {
  id: string;
  name: string;
  scope: string;
  sla: string;
  priority: 'High' | 'Medium' | 'Low';
  active: boolean;
};

const returnBadge: Record<ReturnTicket['status'], string> = {
  requested: 'bg-slate-100 text-slate-700 border-slate-200',
  scheduled: 'bg-indigo-100 text-indigo-700 border-indigo-200',
  in_collection: 'bg-amber-100 text-amber-700 border-amber-200',
  received: 'bg-emerald-100 text-emerald-700 border-emerald-200',
};

export const LogisticsDashboard = () => {
  return (
    <section className='mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-8'>
      <article className='relative isolate overflow-hidden rounded-3xl border border-border/40 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-8 py-12 text-white shadow-[0_25px_60px_-20px_rgba(15,23,42,0.9)]'>
        <div className='relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between'>
          <div className='space-y-6'>
            <span className='inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-white/80'>
              Módulo logístico
            </span>
            <header className='space-y-4'>
              <h1 className='text-balance text-4xl font-semibold leading-tight md:text-5xl'>
                Orquesta envíos, transportadoras y rutas en una sola vista operativa
              </h1>
              <p className='max-w-2xl text-base text-white/80'>
                Monitoriza SLA, prioriza transportadoras, dispara notificaciones y gestiona
                devoluciones con un panel diseñado para operaciones de e-commerce en tiempo real.
              </p>
            </header>
            <div className='flex flex-wrap gap-3 text-sm text-white/80'>
              <Buttons
                color='success'
                className='inline-flex items-center gap-2 rounded-full bg-white/90 px-5 py-3 text-sm font-semibold text-slate-900 shadow-lg shadow-slate-900/20 transition hover:-translate-y-0.5 hover:bg-white'
              >
                <HiOutlineSparkles className='h-4 w-4' />
                Crear regla logística
              </Buttons>
              <Buttons className='rounded-full border border-white/30 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/10'>
                Ver transportadoras
              </Buttons>
            </div>
          </div>
          <div className='rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur'>
            <div className='flex items-start justify-between text-sm text-white/80'>
              <span>Tiempo medio de despacho</span>
              <span>Últimos 7 días</span>
            </div>
            <div className='mt-4 text-center'>
              <p className='text-5xl font-semibold tracking-tight'>4.3h</p>
              <p className='text-sm text-emerald-300'>↓ 11% vs semana anterior</p>
            </div>
            <div className='mt-6 grid grid-cols-2 gap-4 text-sm'>
              <div className='rounded-2xl bg-white/10 p-4 text-center'>
                <p className='text-3xl font-semibold'>98%</p>
                <p className='text-white/70'>OTIF</p>
              </div>
              <div className='rounded-2xl bg-white/10 p-4 text-center'>
                <p className='text-3xl font-semibold'>12</p>
                <p className='text-white/70'>Alertas SLA</p>
              </div>
            </div>
          </div>
        </div>
      </article>

      <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
        {logisticsMetrics.map(metric => (
          <div
            key={metric.label}
            className={`rounded-3xl border border-border/60 bg-gradient-to-br ${metric.accent} p-5`}
          >
            <div className='flex items-center justify-between text-sm font-semibold'>
              <span>{metric.label}</span>
              {metric.label === 'Envíos activos' ? (
                <HiOutlineTruck className='h-5 w-5 opacity-80' />
              ) : metric.label === 'SLA al borde' ? (
                <HiOutlineBellAlert className='h-5 w-5 opacity-80' />
              ) : metric.label === 'Transportadoras activas' ? (
                <HiOutlineSparkles className='h-5 w-5 opacity-80' />
              ) : (
                <HiOutlineMap className='h-5 w-5 opacity-80' />
              )}
            </div>
            <p className='mt-3 text-3xl font-semibold'>{metric.value}</p>
            <p className='text-xs text-muted-foreground/80'>{metric.subtext}</p>
          </div>
        ))}
      </div>

      <div className='grid gap-8 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]'>
        <div className='rounded-3xl border border-border/60 bg-card p-6 shadow-sm'>
          <header className='flex items-start justify-between'>
            <div>
              <p className='text-sm font-semibold text-muted-foreground'>Rastreo en vivo</p>
              <h2 className='text-2xl font-semibold text-foreground'>Envíos críticos</h2>
            </div>
            <Buttons className='rounded-full border border-border px-4 py-2 text-xs font-semibold'>
              Ver todos
            </Buttons>
          </header>
          <div className='mt-6 overflow-x-auto'>
            <table className='w-full min-w-[600px] text-sm'>
              <thead>
                <tr className='text-left text-xs uppercase tracking-widest text-muted-foreground'>
                  <th className='pb-3 font-semibold'>ID</th>
                  <th className='pb-3 font-semibold'>Destino</th>
                  <th className='pb-3 font-semibold'>Cliente</th>
                  <th className='pb-3 font-semibold'>Estado</th>
                  <th className='pb-3 font-semibold'>ETA</th>
                  <th className='pb-3 font-semibold'>Transportadora</th>
                  <th className='pb-3 font-semibold'>Riesgo</th>
                </tr>
              </thead>
              <tbody className='divide-y divide-border/70'>
                {logisticsShipments.map(shipment => {
                  const styles = shipmentStatusStyles[shipment.status];
                  return (
                    <tr key={shipment.id} className='align-top'>
                      <td className='py-3 font-semibold'>{shipment.id}</td>
                      <td className='py-3 text-muted-foreground'>{shipment.city}</td>
                      <td className='py-3 text-muted-foreground'>{shipment.customer}</td>
                      <td className='py-3'>
                        <span
                          className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${styles.badge}`}
                        >
                          {styles.label}
                        </span>
                      </td>
                      <td className='py-3 text-muted-foreground'>{shipment.eta}</td>
                      <td className='py-3 text-muted-foreground'>{shipment.carrier}</td>
                      <td className='py-3'>
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${riskColor[shipment.risk]}`}
                        >
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
                <p className='text-sm font-semibold text-muted-foreground'>Transportadoras</p>
                <h3 className='text-xl font-semibold'>Cobertura y desempeño</h3>
              </div>
              <HiOutlineTruck className='h-6 w-6 text-primary' />
            </header>
            <div className='space-y-4'>
              {logisticsCarrierPerformances.map(carrier => (
                <div
                  key={carrier.name}
                  className='rounded-2xl border border-border/70 p-4 transition hover:border-primary/70 hover:shadow-md'
                >
                  <div className='flex items-center justify-between'>
                    <div>
                      <p className='text-base font-semibold'>{carrier.name}</p>
                      <p className='text-xs text-muted-foreground'>{carrier.coverage}</p>
                    </div>
                    <span className='rounded-full bg-muted px-3 py-1 text-xs font-semibold text-muted-foreground'>
                      {carrier.type}
                    </span>
                  </div>
                  <div className='mt-3 flex items-center gap-4 text-sm'>
                    <span className='inline-flex items-center gap-1 text-emerald-600'>
                      <HiOutlineCheckCircle className='h-4 w-4' />
                      {carrier.successRate} éxito
                    </span>
                    <span className='inline-flex items-center gap-1 text-sky-600'>
                      <HiOutlineMap className='h-4 w-4' />
                      {carrier.avgEta} promedio
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className='rounded-3xl border border-border/60 bg-card p-6 shadow-sm'>
            <header className='mb-4 flex items-center justify-between'>
              <div>
                <p className='text-sm font-semibold text-muted-foreground'>Últimos eventos</p>
                <h3 className='text-xl font-semibold'>Trazabilidad</h3>
              </div>
              <HiOutlineCube className='h-6 w-6 text-primary' />
            </header>
            <div className='space-y-4'>
              {logisticsTimeline.map(event => (
                <div key={event.title} className='flex gap-4'>
                  <div className='rounded-2xl bg-muted p-2'>
                    {event.title.includes('alerta') ? (
                      <HiOutlineBellAlert className={`h-5 w-5 ${event.accent}`} />
                    ) : event.title.includes('Ruta') ? (
                      <HiOutlineBolt className={`h-5 w-5 ${event.accent}`} />
                    ) : (
                      <HiOutlineCheckCircle className={`h-5 w-5 ${event.accent}`} />
                    )}
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

      <div className='grid gap-8 lg:grid-cols-2'>
        <div className='rounded-3xl border border-border/60 bg-card p-6 shadow-sm'>
          <header className='flex items-start justify-between'>
            <div>
              <p className='text-sm font-semibold text-muted-foreground'>Reglas y SLA</p>
              <h3 className='text-xl font-semibold'>Prioridades operativas</h3>
            </div>
            <Buttons className='rounded-full border border-border px-3 py-1 text-xs font-semibold'>
              Configurar
            </Buttons>
          </header>
          <div className='mt-5 space-y-3'>
            {logisticsRules.map(rule => (
              <div
                key={rule.id}
                className='flex items-center justify-between rounded-2xl border border-border/60 p-4'
              >
                <div>
                  <p className='text-sm font-semibold'>{rule.name}</p>
                  <p className='text-xs text-muted-foreground'>{rule.scope}</p>
                </div>
                <div className='flex items-center gap-4 text-xs font-semibold'>
                  <span className='rounded-full bg-muted px-3 py-1 text-muted-foreground'>{rule.sla}</span>
                  <span
                    className={`rounded-full px-3 py-1 ${
                      rule.priority === 'High'
                        ? 'bg-rose-100 text-rose-700'
                        : rule.priority === 'Medium'
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {rule.priority}
                  </span>
                  <span
                    className={`rounded-full border px-3 py-1 ${
                      rule.active
                        ? 'border-emerald-300 text-emerald-600'
                        : 'border-slate-200 text-slate-500'
                    }`}
                  >
                    {rule.active ? 'Activa' : 'Pausada'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className='rounded-3xl border border-border/60 bg-card p-6 shadow-sm'>
          <header className='flex items-start justify-between'>
            <div>
              <p className='text-sm font-semibold text-muted-foreground'>Logística inversa</p>
              <h3 className='text-xl font-semibold'>Devoluciones y recolecciones</h3>
            </div>
            <Buttons className='rounded-full border border-border px-3 py-1 text-xs font-semibold'>
              Ver flujo
            </Buttons>
          </header>
          <div className='mt-5 space-y-3'>
            {logisticsReturnTickets.map(ticket => (
              <div
                key={ticket.id}
                className='flex items-center justify-between rounded-2xl border border-border/60 p-4'
              >
                <div>
                  <p className='text-sm font-semibold'>{ticket.customer}</p>
                  <p className='text-xs text-muted-foreground'>
                    {ticket.city} · {ticket.pickupWindow}
                  </p>
                </div>
                <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${returnBadge[ticket.status]}`}>
                  {ticket.status.replace('_', ' ')}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
