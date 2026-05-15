'use client';

import {Buttons} from '@repo/ui/buttons/scenes/index';
import {HiOutlineCog, HiOutlineTruck, HiOutlineWrenchScrewdriver} from 'react-icons/hi2';
import {logisticsFleetVehicles} from '@modules/logistics/data/mock';
import type {FleetVehicle} from '@modules/logistics/data/mock';

const statusBadge: Record<FleetVehicle['status'], string> = {
  available: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  en_route: 'bg-sky-50 text-sky-700 border-sky-200',
  maintenance: 'bg-amber-50 text-amber-700 border-amber-200',
};

const typeIcon: Record<FleetVehicle['type'], string> = {
  truck: 'Camión',
  van: 'Van',
  bike: 'Moto',
};

export const FleetOperations = () => {
  return (
    <section className='mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-8'>
      <article className='rounded-3xl border border-primary/20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 text-white shadow-[0_45px_100px_-55px_rgba(15,23,42,0.95)]'>
        <div className='flex flex-col gap-6 md:flex-row md:items-center md:justify-between'>
          <div className='space-y-4'>
            <p className='text-xs font-semibold uppercase tracking-[0.45em] text-white/70'>
              Operación de flota
            </p>
            <h1 className='text-4xl font-semibold leading-tight md:max-w-3xl'>
              Administra vehículos, mantenimientos y asignaciones en una vista
            </h1>
            <p className='text-base text-white/80'>
              Controla disponibilidad, rutas asignadas y próximos servicios preventivos para evitar
              interrupciones en la última milla.
            </p>
          </div>
          <div className='flex flex-wrap gap-3 text-sm'>
            <Buttons className='rounded-full border border-white/30 px-5 py-2 font-semibold text-white'>
              Importar flota
            </Buttons>
            <Buttons color='success' className='rounded-full bg-white px-5 py-2 font-semibold text-slate-900'>
              Agregar vehículo
            </Buttons>
          </div>
        </div>
      </article>

      <div className='grid gap-6 sm:grid-cols-3'>
        {[
          {label: 'Vehículos en ruta', value: '18'},
          {label: 'Mantenimientos próximos', value: '4'},
          {label: 'Capacidad disponible', value: '72%'},
        ].map(card => (
          <div key={card.label} className='rounded-3xl border border-border/60 bg-card p-6 shadow-sm'>
            <p className='text-xs text-muted-foreground'>{card.label}</p>
            <p className='text-3xl font-semibold text-foreground'>{card.value}</p>
          </div>
        ))}
      </div>

      <div className='rounded-3xl border border-border/60 bg-card p-6 shadow-sm'>
        <header className='mb-4 flex items-center justify-between'>
          <div>
            <p className='text-sm font-semibold text-muted-foreground'>Inventario</p>
            <h2 className='text-2xl font-semibold'>Vehículos</h2>
          </div>
          <HiOutlineTruck className='h-6 w-6 text-primary' />
        </header>
        <div className='overflow-x-auto'>
          <table className='w-full min-w-[640px] text-sm'>
            <thead>
              <tr className='text-left text-xs uppercase tracking-widest text-muted-foreground'>
                <th className='pb-3 font-semibold'>ID</th>
                <th className='pb-3 font-semibold'>Tipo</th>
                <th className='pb-3 font-semibold'>Capacidad</th>
                <th className='pb-3 font-semibold'>Estado</th>
                <th className='pb-3 font-semibold'>Conductor</th>
                <th className='pb-3 font-semibold'>Ruta</th>
                <th className='pb-3 font-semibold'>Próx. mantenimiento</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-border/70'>
              {logisticsFleetVehicles.map(vehicle => (
                <tr key={vehicle.id}>
                  <td className='py-3 font-semibold'>{vehicle.id}</td>
                  <td className='py-3 text-muted-foreground'>{typeIcon[vehicle.type]}</td>
                  <td className='py-3 text-muted-foreground'>{vehicle.capacityKg} kg</td>
                  <td className='py-3'>
                    <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${statusBadge[vehicle.status]}`}>
                      {vehicle.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className='py-3 text-muted-foreground'>{vehicle.driver}</td>
                  <td className='py-3 text-muted-foreground'>{vehicle.route ?? '—'}</td>
                  <td className='py-3 text-muted-foreground'>{vehicle.nextMaintenance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className='rounded-3xl border border-border/60 bg-card p-6 shadow-sm'>
        <header className='mb-4 flex items-center justify-between'>
          <div>
            <p className='text-sm font-semibold text-muted-foreground'>Mantenimientos</p>
            <h3 className='text-xl font-semibold'>Acciones rápidas</h3>
          </div>
          <HiOutlineWrenchScrewdriver className='h-6 w-6 text-primary' />
        </header>
        <div className='grid gap-4 sm:grid-cols-3'>
          {[
            {label: 'Agendar servicio', detail: 'Próx. 7 días'},
            {label: 'Reporte check list', detail: 'Diario'},
            {label: 'Ver bitácora taller', detail: 'Histórico'},
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
            <p className='text-sm font-semibold text-muted-foreground'>Configuración</p>
            <h4 className='text-xl font-semibold'>Parámetros de operación</h4>
          </div>
          <HiOutlineCog className='h-6 w-6 text-primary' />
        </header>
        <div className='grid gap-4 sm:grid-cols-3'>
          {[
            {label: 'Capacidad mínima', value: '65%'},
            {label: 'Horas máximas turno', value: '10h'},
            {label: 'Tolerancia retraso', value: '15 min'},
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
