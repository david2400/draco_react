'use client';

import {Buttons} from '@repo/ui/buttons/scenes/index';
import {
  HiOutlineBeaker,
  HiOutlineCog6Tooth,
  HiOutlineAdjustmentsHorizontal,
  HiOutlineChartBar,
  HiOutlineShieldExclamation,
} from 'react-icons/hi2';
import {
  logisticsIntegrationChecklist,
  logisticsOptimizerStats,
  logisticsRules,
} from '@modules/logistics/data/mock';
import type {IntegrationChecklistItem, LogisticsRule, OptimizerStat} from '@modules/logistics/data/mock';

const priorityPill: Record<LogisticsRule['priority'], string> = {
  High: 'bg-rose-50 text-rose-700 border-rose-200',
  Medium: 'bg-amber-50 text-amber-700 border-amber-200',
  Low: 'bg-slate-50 text-slate-700 border-slate-200',
};

export const RulesStudio = () => {
  return (
    <section className='mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-8'>
      <article className='rounded-3xl border border-primary/20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 text-white shadow-[0_30px_80px_-35px_rgba(15,23,42,0.9)]'>
        <div className='flex flex-col gap-6 md:flex-row md:items-center md:justify-between'>
          <div className='space-y-4'>
            <p className='text-xs font-semibold uppercase tracking-[0.5em] text-white/60'>
              Motor de reglas
            </p>
            <h1 className='text-4xl font-semibold leading-tight md:max-w-3xl'>
              Diseña políticas logísticas, simula escenarios y controla SLA en un solo lugar
            </h1>
            <p className='text-base text-white/80'>
              Prioriza transportadoras, ajusta costos y define condiciones por zona, cliente o canal
              con versionado seguro.
            </p>
          </div>
          <div className='flex flex-wrap gap-3 text-sm'>
            <Buttons className='rounded-full border border-white/30 px-5 py-2 font-semibold text-white'>
              Importar reglas
            </Buttons>
            <Buttons color='success' className='rounded-full bg-white px-5 py-2 font-semibold text-slate-900'>
              Nueva regla
            </Buttons>
          </div>
        </div>
      </article>

      <div className='grid gap-6 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]'>
        <div className='rounded-3xl border border-border/60 bg-card p-6 shadow-sm'>
          <header className='mb-4 flex items-center justify-between'>
            <div>
              <p className='text-sm font-semibold text-muted-foreground'>Reglas activas</p>
              <h2 className='text-2xl font-semibold'>Catálogo operativo</h2>
            </div>
            <HiOutlineAdjustmentsHorizontal className='h-6 w-6 text-primary' />
          </header>
          <div className='space-y-4'>
            {logisticsRules.map(rule => (
              <div
                key={rule.id}
                className='rounded-2xl border border-border/60 p-4 transition hover:border-primary/60 hover:shadow-md'
              >
                <div className='flex items-center justify-between'>
                  <div>
                    <p className='text-sm font-semibold'>{rule.name}</p>
                    <p className='text-xs text-muted-foreground'>{rule.scope}</p>
                  </div>
                  <div className='flex items-center gap-3 text-xs font-semibold'>
                    <span className={`rounded-full border px-3 py-1 ${priorityPill[rule.priority]}`}>
                      {rule.priority}
                    </span>
                    <span className='rounded-full bg-muted px-3 py-1 text-muted-foreground'>SLA {rule.sla}</span>
                    <span
                      className={`rounded-full border px-3 py-1 ${rule.active ? 'border-emerald-300 text-emerald-600' : 'border-slate-200 text-slate-500'}`}
                    >
                      {rule.active ? 'Activa' : 'En pausa'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className='space-y-6'>
          <div className='rounded-3xl border border-border/60 bg-card p-6 shadow-sm'>
            <header className='mb-3 flex items-center justify-between'>
              <div>
                <p className='text-sm font-semibold text-muted-foreground'>Simulador</p>
                <h3 className='text-xl font-semibold'>Impacto operativo</h3>
              </div>
              <HiOutlineBeaker className='h-6 w-6 text-primary' />
            </header>
            <div className='grid gap-3 sm:grid-cols-3'>
              {logisticsOptimizerStats.map((stat: OptimizerStat) => (
                <div key={stat.label} className='rounded-2xl border border-border/60 p-4'>
                  <p className='text-xs text-muted-foreground'>{stat.label}</p>
                  <p className='text-2xl font-semibold'>{stat.value}</p>
                  <p className={`text-xs ${stat.trend === 'positivo' ? 'text-emerald-500' : stat.trend === 'negativo' ? 'text-rose-500' : 'text-slate-500'}`}>
                    {stat.trend === 'positivo'
                      ? 'Mejora'
                      : stat.trend === 'negativo'
                        ? 'Riesgo'
                        : 'Estable'}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className='rounded-3xl border border-border/60 bg-card p-6 shadow-sm'>
            <header className='mb-3 flex items-center justify-between'>
              <div>
                <p className='text-sm font-semibold text-muted-foreground'>Checklist de integración</p>
                <h4 className='text-lg font-semibold'>Prerequisitos</h4>
              </div>
              <HiOutlineCog6Tooth className='h-6 w-6 text-primary' />
            </header>
            <div className='space-y-3'>
              {logisticsIntegrationChecklist.map((item: IntegrationChecklistItem) => (
                <div key={item.label} className='flex items-center justify-between rounded-2xl border border-border/60 p-4'>
                  <div>
                    <p className='text-sm font-semibold'>{item.label}</p>
                    <p className='text-xs text-muted-foreground'>Estado {item.status}</p>
                  </div>
                  <span
                    className={`rounded-full border px-3 py-1 text-xs font-semibold ${
                      item.status === 'Completa'
                        ? 'border-emerald-200 text-emerald-600'
                        : item.status === 'En curso'
                          ? 'border-amber-200 text-amber-600'
                          : 'border-slate-200 text-slate-500'
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className='rounded-3xl border border-border/60 bg-card p-6 shadow-sm'>
        <header className='mb-4 flex items-center justify-between'>
          <div>
            <p className='text-sm font-semibold text-muted-foreground'>Gobernanza</p>
            <h5 className='text-xl font-semibold'>Versiones y riesgos</h5>
          </div>
          <HiOutlineShieldExclamation className='h-6 w-6 text-primary' />
        </header>
        <div className='grid gap-4 sm:grid-cols-3'>
          {[
            {label: 'Versiones activas', value: '5'},
            {label: 'Cambios pendientes', value: '12'},
            {label: 'Alertas automatizadas', value: '7'},
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
