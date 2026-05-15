'use client';

import {Buttons} from '@repo/ui/buttons/scenes/index';
import {HiOutlineBanknotes, HiOutlineChartPie, HiOutlineReceiptPercent} from 'react-icons/hi2';
import {logisticsCarrierCosts, logisticsCostMetrics} from '@modules/logistics/data/mock';
import type {CarrierCostBreakdown, LogisticsCostMetric} from '@modules/logistics/data/mock';

const trendColor: Record<LogisticsCostMetric['trend'], string> = {
  up: 'text-rose-500',
  down: 'text-emerald-500',
  flat: 'text-slate-500',
};

export const CostAnalytics = () => {
  return (
    <section className='mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-8'>
      <article className='rounded-3xl border border-primary/20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 text-white shadow-[0_40px_100px_-55px_rgba(15,23,42,0.95)]'>
        <div className='flex flex-col gap-6 md:flex-row md:items-center md:justify-between'>
          <div className='space-y-4'>
            <p className='text-xs font-semibold uppercase tracking-[0.55em] text-white/70'>
              Costos logísticos
            </p>
            <h1 className='text-4xl font-semibold leading-tight md:max-w-3xl'>
              Conciliación de tarifas, variaciones y recargos por transportadora
            </h1>
            <p className='text-base text-white/80'>
              Visualiza el costo real por envío, compara contra presupuestos y actúa sobre desviaciones
              antes de cerrar el mes.
            </p>
          </div>
          <div className='flex flex-wrap gap-3 text-sm'>
            <Buttons className='rounded-full border border-white/30 px-5 py-2 font-semibold text-white'>
              Exportar reporte
            </Buttons>
            <Buttons color='success' className='rounded-full bg-white px-5 py-2 font-semibold text-slate-900'>
              Configurar reglas de costo
            </Buttons>
          </div>
        </div>
      </article>

      <div className='grid gap-6 sm:grid-cols-3'>
        {logisticsCostMetrics.map(metric => (
          <div key={metric.label} className='rounded-3xl border border-border/60 bg-card p-6 shadow-sm'>
            <p className='text-xs text-muted-foreground'>{metric.label}</p>
            <p className='text-3xl font-semibold text-foreground'>{metric.value}</p>
            <p className={`text-xs font-semibold ${trendColor[metric.trend]}`}>
              {metric.trend === 'up' ? '↑' : metric.trend === 'down' ? '↓' : '→'} tendencia
            </p>
          </div>
        ))}
      </div>

      <div className='rounded-3xl border border-border/60 bg-card p-6 shadow-sm'>
        <header className='mb-4 flex items-center justify-between'>
          <div>
            <p className='text-sm font-semibold text-muted-foreground'>Comparativo</p>
            <h2 className='text-2xl font-semibold'>Transportadoras</h2>
          </div>
          <HiOutlineChartPie className='h-6 w-6 text-primary' />
        </header>
        <div className='overflow-x-auto'>
          <table className='w-full min-w-[520px] text-sm'>
            <thead>
              <tr className='text-left text-xs uppercase tracking-widest text-muted-foreground'>
                <th className='pb-3 font-semibold'>Carrier</th>
                <th className='pb-3 font-semibold'>Costo promedio</th>
                <th className='pb-3 font-semibold'>Variación</th>
                <th className='pb-3 font-semibold'>Moneda</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-border/70'>
              {logisticsCarrierCosts.map((carrier: CarrierCostBreakdown) => (
                <tr key={carrier.carrier}>
                  <td className='py-3 font-semibold'>{carrier.carrier}</td>
                  <td className='py-3 text-muted-foreground'>{carrier.avgCost}</td>
                  <td className='py-3 text-muted-foreground'>{carrier.variance}</td>
                  <td className='py-3 text-muted-foreground'>{carrier.currency}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className='rounded-3xl border border-border/60 bg-card p-6 shadow-sm'>
        <header className='mb-4 flex items-center justify-between'>
          <div>
            <p className='text-sm font-semibold text-muted-foreground'>Acciones rápidas</p>
            <h3 className='text-xl font-semibold'>Optimización</h3>
          </div>
          <HiOutlineBanknotes className='h-6 w-6 text-primary' />
        </header>
        <div className='grid gap-4 sm:grid-cols-3'>
          {[
            {label: 'Recalcular tarifas dinámicas', detail: 'Basado en FX y fuel surcharge'},
            {label: 'Conciliar facturas 3PL', detail: 'Últimos 7 días'},
            {label: 'Simular mix de carriers', detail: 'Escenarios llenado'},
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
            <p className='text-sm font-semibold text-muted-foreground'>Alertas financieras</p>
            <h4 className='text-xl font-semibold'>Recargos SLA</h4>
          </div>
          <HiOutlineReceiptPercent className='h-6 w-6 text-primary' />
        </header>
        <div className='grid gap-4 sm:grid-cols-3'>
          {[
            {label: 'Recargos mes actual', value: '$3 890'},
            {label: 'SLA comprometidos', value: '11'},
            {label: 'Ajustes aprobados', value: '$940'},
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
