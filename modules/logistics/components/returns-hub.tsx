'use client';

import {Buttons} from '@repo/ui/buttons/scenes/index';
import {
  HiOutlineArrowPath,
  HiOutlineClipboardDocumentCheck,
  HiOutlineCubeTransparent,
  HiOutlineInboxArrowDown,
  HiOutlineShieldCheck,
} from 'react-icons/hi2';

import {logisticsReturnTickets} from '@modules/logistics/data/mock';
import type {ReturnTicket} from '@modules/logistics/data/mock';

const returnBadge: Record<ReturnTicket['status'], string> = {
  requested: 'bg-slate-50 text-slate-700 border-slate-200',
  scheduled: 'bg-indigo-50 text-indigo-700 border-indigo-200',
  in_collection: 'bg-amber-50 text-amber-700 border-amber-200',
  received: 'bg-emerald-50 text-emerald-700 border-emerald-200',
};

const workflowSteps = [
  {label: 'Solicitud', detail: 'Portal / call center', icon: HiOutlineInboxArrowDown},
  {label: 'Validación', detail: 'Políticas y evidencias', icon: HiOutlineShieldCheck},
  {label: 'Recolección', detail: 'Rutas integradas', icon: HiOutlineArrowPath},
  {label: 'Inspección', detail: 'Calidad y warehouse', icon: HiOutlineClipboardDocumentCheck},
  {label: 'Cierre', detail: 'Nota crédito / reenvío', icon: HiOutlineCubeTransparent},
];

export const ReturnsHub = () => {
  return (
    <section className='mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-8'>
      <article className='rounded-3xl border border-primary/20 bg-gradient-to-br from-purple-900 via-slate-900 to-slate-900 p-8 text-white shadow-[0_35px_80px_-35px_rgba(59,7,100,0.85)]'>
        <div className='flex flex-col gap-6 md:flex-row md:items-center md:justify-between'>
          <div className='space-y-4'>
            <p className='text-sm font-semibold uppercase tracking-[0.35em] text-white/70'>
              Logística inversa
            </p>
            <h1 className='text-4xl font-semibold leading-tight md:max-w-2xl'>
              Orquesta devoluciones y recolecciones con reglas dinámicas
            </h1>
            <p className='text-base text-white/80'>
              Reduce costos de reverse logistics con validaciones automáticas, ventanas coordinadas
              y comunicación proactiva al cliente.
            </p>
          </div>
          <div className='flex flex-wrap gap-3 text-sm'>
            <Buttons className='rounded-full border border-white/30 px-5 py-2 font-semibold text-white'>
              Configurar políticas
            </Buttons>
            <Buttons color='success' className='rounded-full bg-white px-5 py-2 font-semibold text-slate-900'>
              Crear devolución
            </Buttons>
          </div>
        </div>
        <div className='mt-8 grid gap-4 sm:grid-cols-3'>
          {[
            {label: 'Pendientes', value: '42', accent: 'text-amber-300'},
            {label: 'Recolecciones hoy', value: '18', accent: 'text-emerald-300'},
            {label: 'Tiempo promedio', value: '36h', accent: 'text-sky-300'},
          ].map(metric => (
            <div key={metric.label} className='rounded-2xl border border-white/10 bg-white/5 p-4 text-center backdrop-blur'>
              <p className={`text-3xl font-semibold ${metric.accent}`}>{metric.value}</p>
              <p className='text-xs text-white/70'>{metric.label}</p>
            </div>
          ))}
        </div>
      </article>

      <div className='rounded-3xl border border-border/60 bg-card p-6 shadow-sm'>
        <header className='mb-5'>
          <p className='text-sm font-semibold text-muted-foreground'>Workflow</p>
          <h2 className='text-2xl font-semibold'>Fases de devolución</h2>
        </header>
        <div className='grid gap-4 md:grid-cols-5'>
          {workflowSteps.map(step => (
            <div
              key={step.label}
              className='rounded-2xl border border-border/60 p-4 text-center shadow-sm transition hover:border-primary/50'
            >
              <div className='mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-muted'>
                <step.icon className='h-6 w-6 text-primary' />
              </div>
              <p className='text-sm font-semibold'>{step.label}</p>
              <p className='text-xs text-muted-foreground'>{step.detail}</p>
            </div>
          ))}
        </div>
      </div>

      <div className='rounded-3xl border border-border/60 bg-card p-6 shadow-sm'>
        <header className='mb-4 flex items-center justify-between'>
          <div>
            <p className='text-sm font-semibold text-muted-foreground'>Solicitudes activas</p>
            <h3 className='text-xl font-semibold'>Tickets de devolución</h3>
          </div>
        </header>
        <div className='overflow-x-auto'>
          <table className='w-full min-w-[640px] text-sm'>
            <thead>
              <tr className='text-left text-xs uppercase tracking-widest text-muted-foreground'>
                <th className='pb-3 font-semibold'>ID</th>
                <th className='pb-3 font-semibold'>Cliente</th>
                <th className='pb-3 font-semibold'>Ciudad</th>
                <th className='pb-3 font-semibold'>Ventana</th>
                <th className='pb-3 font-semibold'>Estado</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-border/70'>
              {logisticsReturnTickets.map(ticket => (
                <tr key={ticket.id}>
                  <td className='py-3 font-semibold'>{ticket.id}</td>
                  <td className='py-3 text-muted-foreground'>{ticket.customer}</td>
                  <td className='py-3 text-muted-foreground'>{ticket.city}</td>
                  <td className='py-3 text-muted-foreground'>{ticket.pickupWindow}</td>
                  <td className='py-3'>
                    <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${returnBadge[ticket.status]}`}>
                      {ticket.status.replace('_', ' ')}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
