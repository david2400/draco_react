'use client';

import {Buttons} from '@repo/ui/buttons/scenes/index';
import {HiOutlineBoltSlash, HiOutlineLink, HiOutlineRss, HiOutlineServerStack} from 'react-icons/hi2';
import {logisticsIntegrationLogs, logisticsTrackingChannels} from '@modules/logistics/data/mock';
import type {IntegrationLog, TrackingChannel} from '@modules/logistics/data/mock';

const statusBadge: Record<IntegrationLog['status'], string> = {
  success: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  error: 'bg-rose-50 text-rose-700 border-rose-200',
  retrying: 'bg-amber-50 text-amber-700 border-amber-200',
};

export const IntegrationsConsole = () => {
  return (
    <section className='mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-8'>
      <article className='rounded-3xl border border-primary/20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 text-white shadow-[0_35px_90px_-45px_rgba(15,23,42,0.95)]'>
        <div className='flex flex-col gap-6 md:flex-row md:items-center md:justify-between'>
          <div className='space-y-4'>
            <p className='text-xs font-semibold uppercase tracking-[0.55em] text-white/70'>
              Integraciones & APIs
            </p>
            <h1 className='text-4xl font-semibold leading-tight md:max-w-3xl'>
              Supervisa webhooks, llaves y estados de conectividad con carriers
            </h1>
            <p className='text-base text-white/80'>
              Reintenta eventos, rota credenciales y valida la latencia de cada proveedor en tiempo
              real.
            </p>
          </div>
          <div className='flex flex-wrap gap-3 text-sm'>
            <Buttons className='rounded-full border border-white/30 px-5 py-2 font-semibold text-white'>
              Rotar credenciales
            </Buttons>
            <Buttons color='success' className='rounded-full bg-white px-5 py-2 font-semibold text-slate-900'>
              Nueva integración
            </Buttons>
          </div>
        </div>
      </article>

      <div className='rounded-3xl border border-border/60 bg-card p-6 shadow-sm'>
        <header className='mb-4 flex items-center justify-between'>
          <div>
            <p className='text-sm font-semibold text-muted-foreground'>Canales</p>
            <h2 className='text-2xl font-semibold'>Salud en vivo</h2>
          </div>
          <HiOutlineRss className='h-6 w-6 text-primary' />
        </header>
        <div className='grid gap-4 md:grid-cols-3'>
          {logisticsTrackingChannels.map((channel: TrackingChannel) => (
            <div key={channel.name} className='rounded-2xl border border-border/60 p-4'>
              <p className='text-base font-semibold'>{channel.name}</p>
              <p className='text-xs text-muted-foreground'>Último evento {channel.lastEvent}</p>
              <div className='mt-3 flex flex-wrap items-center gap-3 text-xs font-semibold'>
                <span className='rounded-full bg-muted px-3 py-1 text-muted-foreground'>Uptime {channel.uptime}</span>
                <span className='rounded-full bg-muted px-3 py-1 text-muted-foreground'>Latency {channel.latency}</span>
                <span className={`rounded-full border px-3 py-1 ${channel.connected ? 'border-emerald-200 text-emerald-600' : 'border-rose-200 text-rose-600'}`}>
                  {channel.connected ? 'Online' : 'Offline'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className='rounded-3xl border border-border/60 bg-card p-6 shadow-sm'>
        <header className='mb-4 flex items-center justify-between'>
          <div>
            <p className='text-sm font-semibold text-muted-foreground'>Logs recientes</p>
            <h3 className='text-xl font-semibold'>Eventos API/Webhook</h3>
          </div>
          <HiOutlineLink className='h-6 w-6 text-primary' />
        </header>
        <div className='overflow-x-auto'>
          <table className='w-full min-w-[640px] text-sm'>
            <thead>
              <tr className='text-left text-xs uppercase tracking-widest text-muted-foreground'>
                <th className='pb-3 font-semibold'>ID</th>
                <th className='pb-3 font-semibold'>Proveedor</th>
                <th className='pb-3 font-semibold'>Tipo</th>
                <th className='pb-3 font-semibold'>Estado</th>
                <th className='pb-3 font-semibold'>Respuesta</th>
                <th className='pb-3 font-semibold'>Hora</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-border/70'>
              {logisticsIntegrationLogs.map(log => (
                <tr key={log.id}>
                  <td className='py-3 font-semibold'>{log.id}</td>
                  <td className='py-3 text-muted-foreground'>{log.provider}</td>
                  <td className='py-3 text-muted-foreground'>{log.type}</td>
                  <td className='py-3'>
                    <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${statusBadge[log.status]}`}>
                      {log.status}
                    </span>
                  </td>
                  <td className='py-3 text-muted-foreground'>{log.responseTime}</td>
                  <td className='py-3 text-muted-foreground'>{log.timestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className='rounded-3xl border border-border/60 bg-card p-6 shadow-sm'>
        <header className='mb-4 flex items-center justify-between'>
          <div>
            <p className='text-sm font-semibold text-muted-foreground'>Acciones</p>
            <h4 className='text-xl font-semibold'>Playbooks</h4>
          </div>
          <HiOutlineBoltSlash className='h-6 w-6 text-primary' />
        </header>
        <div className='grid gap-4 sm:grid-cols-3'>
          {[
            {label: 'Reintentar lote fallido', detail: 'Últimos 50 eventos'},
            {label: 'Fallback a polling', detail: 'BlueCargo / Caribe'},
            {label: 'Regenerar secret webhook', detail: 'Andes Express'},
          ].map(action => (
            <div key={action.label} className='rounded-2xl border border-border/60 p-4 text-center'>
              <p className='text-sm font-semibold'>{action.label}</p>
              <p className='text-xs text-muted-foreground'>{action.detail}</p>
            </div>
          ))}
        </div>
      </div>

      <div className='rounded-3xl border border-border/60 bg-card p-6 shadow-sm'>
        <header className='mb-4 flex items-center justify-between'>
          <div>
            <p className='text-sm font-semibold text-muted-foreground'>Configuraciones</p>
            <h5 className='text-xl font-semibold'>Políticas</h5>
          </div>
          <HiOutlineServerStack className='h-6 w-6 text-primary' />
        </header>
        <div className='grid gap-4 sm:grid-cols-3'>
          {[
            {label: 'Timeout webhooks', value: '8 s'},
            {label: 'Reintentos máximos', value: '5'},
            {label: 'Retención logs', value: '30 días'},
          ].map(setting => (
            <div key={setting.label} className='rounded-2xl border border-border/60 p-4 text-center'>
              <p className='text-sm font-semibold'>{setting.label}</p>
              <p className='text-xl font-semibold text-primary'>{setting.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
