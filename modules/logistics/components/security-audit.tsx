'use client';

import {Buttons} from '@repo/ui/buttons/scenes/index';
import {
  HiOutlineEye,
  HiOutlineKey,
  HiOutlineLockClosed,
  HiOutlineShieldCheck,
  HiOutlineUsers,
} from 'react-icons/hi2';

import {logisticsAuditLog} from '@modules/logistics/data/mock';
import type {AuditLogEntry} from '@modules/logistics/data/mock';

const criticalityBadge: Record<AuditLogEntry['criticality'], string> = {
  alta: 'bg-rose-50 text-rose-700 border-rose-200',
  media: 'bg-amber-50 text-amber-700 border-amber-200',
  baja: 'bg-emerald-50 text-emerald-700 border-emerald-200',
};

export const SecurityAudit = () => {
  return (
    <section className='mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-8'>
      <article className='rounded-3xl border border-primary/20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 text-white shadow-[0_35px_85px_-35px_rgba(15,23,42,0.95)]'>
        <div className='flex flex-col gap-6 md:flex-row md:items-center md:justify-between'>
          <div className='space-y-4'>
            <p className='text-xs font-semibold uppercase tracking-[0.5em] text-white/70'>
              Seguridad y auditoría
            </p>
            <h1 className='text-4xl font-semibold leading-tight md:max-w-3xl'>
              Controla accesos, registra cambios críticos y cumple con políticas de seguridad
            </h1>
            <p className='text-base text-white/80'>
              Cada modificación en reglas, rutas o transportadoras queda registrada con contexto e
              impacto, listo para auditorías internas y regulatorias.
            </p>
          </div>
          <div className='flex flex-wrap gap-3 text-sm'>
            <Buttons className='rounded-full border border-white/30 px-5 py-2 font-semibold text-white'>
              Exportar bitácora
            </Buttons>
            <Buttons color='success' className='rounded-full bg-white px-5 py-2 font-semibold text-slate-900'>
              Configurar roles
            </Buttons>
          </div>
        </div>
      </article>

      <div className='grid gap-6 sm:grid-cols-3'>
        {[
          {label: 'Roles activos', value: '12', icon: HiOutlineUsers},
          {label: 'Llaves rotadas (30d)', value: '26', icon: HiOutlineKey},
          {label: 'Alertas críticas', value: '4', icon: HiOutlineShieldCheck},
        ].map(card => (
          <div key={card.label} className='rounded-3xl border border-border/60 bg-card p-6 shadow-sm'>
            <div className='flex items-center gap-3'>
              <card.icon className='h-8 w-8 text-primary' />
              <div>
                <p className='text-xs text-muted-foreground'>{card.label}</p>
                <p className='text-3xl font-semibold text-foreground'>{card.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className='rounded-3xl border border-border/60 bg-card p-6 shadow-sm'>
        <header className='mb-4 flex items-center justify-between'>
          <div>
            <p className='text-sm font-semibold text-muted-foreground'>Bitácora reciente</p>
            <h2 className='text-2xl font-semibold'>Eventos auditables</h2>
          </div>
          <Buttons className='inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs font-semibold'>
            <HiOutlineEye className='h-4 w-4' />
            Ver filtros
          </Buttons>
        </header>
        <div className='overflow-x-auto'>
          <table className='w-full min-w-[720px] text-sm'>
            <thead>
              <tr className='text-left text-xs uppercase tracking-widest text-muted-foreground'>
                <th className='pb-3 font-semibold'>ID</th>
                <th className='pb-3 font-semibold'>Entidad</th>
                <th className='pb-3 font-semibold'>Acción</th>
                <th className='pb-3 font-semibold'>Actor</th>
                <th className='pb-3 font-semibold'>Rol</th>
                <th className='pb-3 font-semibold'>Hora</th>
                <th className='pb-3 font-semibold'>Detalle</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-border/70'>
              {logisticsAuditLog.map(entry => (
                <tr key={entry.id}>
                  <td className='py-3 font-semibold'>{entry.id}</td>
                  <td className='py-3 text-muted-foreground'>{entry.entity}</td>
                  <td className='py-3 text-muted-foreground'>{entry.action}</td>
                  <td className='py-3 text-muted-foreground'>{entry.actor}</td>
                  <td className='py-3 text-muted-foreground'>{entry.role}</td>
                  <td className='py-3 text-muted-foreground'>{entry.timestamp}</td>
                  <td className='py-3'>
                    <div className='flex items-center justify-between gap-3'>
                      <span className='text-xs text-muted-foreground'>{entry.details}</span>
                      <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${criticalityBadge[entry.criticality]}`}>
                        {entry.criticality}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className='rounded-3xl border border-border/60 bg-card p-6 shadow-sm'>
        <header className='mb-4 flex items-center justify-between'>
          <div>
            <p className='text-sm font-semibold text-muted-foreground'>Controles preventivos</p>
            <h3 className='text-xl font-semibold'>Hardening</h3>
          </div>
          <HiOutlineLockClosed className='h-6 w-6 text-primary' />
        </header>
        <div className='grid gap-4 sm:grid-cols-3'>
          {[
            {label: 'MFA obligatorio', status: 'Activo'},
            {label: 'Segregación por región', status: 'Aplicada'},
            {label: 'Webhooks firmados', status: 'Vigente'},
          ].map(control => (
            <div key={control.label} className='rounded-2xl border border-border/60 p-4 text-center'>
              <p className='text-sm font-semibold'>{control.label}</p>
              <p className='text-xs text-muted-foreground'>{control.status}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
