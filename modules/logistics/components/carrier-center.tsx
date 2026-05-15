'use client';

import React, {useMemo, useState} from 'react';
import {Buttons} from '@repo/ui/buttons/scenes/index';
import {
  HiOutlineChartBar,
  HiOutlineGlobeAmericas,
  HiOutlineShieldCheck,
  HiOutlineSparkles,
  HiOutlineTruck,
} from 'react-icons/hi2';
import {
  logisticsCarrierCards,
  logisticsIntegrationChecklist,
} from '@modules/logistics/data/mock';
import type {CarrierCard} from '@modules/logistics/data/mock';
import {Modal} from '@repo/ui/modals/scenes/dialog/modal';

export const CarrierCenter = () => {
  const [carrierList, setCarrierList] = useState(logisticsCarrierCards);
  const [createCarrierOpen, setCreateCarrierOpen] = useState(false);
  const [importingRates, setImportingRates] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  const [newCarrier, setNewCarrier] = useState({
    name: '',
    type: 'Interna' as CarrierCard['type'],
    coverage: '',
    vehicles: 10,
    successRateValue: 95,
    avgEta: '8h',
    features: '',
  });

  const handleCarrierField = (field: keyof typeof newCarrier, value: string | number) => {
    setNewCarrier(prev => ({...prev, [field]: value}));
  };

  const handleCreateCarrier = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const featureList = newCarrier.features
      .split(',')
      .map(item => item.trim())
      .filter(Boolean);

    const payload: CarrierCard = {
      name: newCarrier.name || 'Transportadora sin nombre',
      type: newCarrier.type,
      coverage: newCarrier.coverage || 'Cobertura pendiente',
      vehicles: Number(newCarrier.vehicles) || 0,
      successRateValue: Number(newCarrier.successRateValue) || 0,
      successRate: `${Number(newCarrier.successRateValue).toFixed(1)}%`,
      avgEta: newCarrier.avgEta || '—',
      features: featureList.length ? featureList : ['Pendiente de definir'],
    };

    setCarrierList(prev => [...prev, payload]);
    setCreateCarrierOpen(false);
    setFeedbackMessage(`Transportadora “${payload.name}” registrada (mock).`);
    setNewCarrier({
      name: '',
      type: 'Interna',
      coverage: '',
      vehicles: 10,
      successRateValue: 95,
      avgEta: '8h',
      features: '',
    });

    setTimeout(() => setFeedbackMessage(null), 4000);
  };

  const handleImportRates = () => {
    setImportingRates(true);
    setFeedbackMessage(null);
    setTimeout(() => {
      setImportingRates(false);
      setFeedbackMessage('Archivo de tarifas importado y en validación (mock).');
      setTimeout(() => setFeedbackMessage(null), 4000);
    }, 1500);
  };

  const coverageSummary = useMemo(() => {
    const internal = carrierList.filter(carrier => carrier.type === 'Interna').length;
    const external = carrierList.length - internal;
    return {internal, external};
  }, [carrierList]);

  return (
    <section className='mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-8'>
      <article className='rounded-3xl border border-border/40 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-8 py-12 text-white shadow-[0_30px_70px_-30px_rgba(15,23,42,0.9)]'>
        <div className='flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between'>
          <div className='space-y-4'>
            <span className='inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-white/70'>
              Transportadoras
            </span>
            <div className='space-y-4'>
              <h1 className='text-4xl font-semibold leading-tight md:text-5xl'>
                Orquesta transportadoras internas y externas desde un solo panel
              </h1>
              <p className='max-w-2xl text-base text-white/80'>
                Monitorea desempeño, cobertura y cumplimiento contractual. Activa o pausa partners en
                tiempo real, ajusta tarifas y valida integraciones desde una vista orientada a
                operaciones.
              </p>
            </div>
            <div className='flex flex-wrap gap-3'>
              <Buttons
                color='success'
                className='inline-flex items-center gap-2 rounded-full bg-white/90 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:bg-white'
                onClick={() => setCreateCarrierOpen(true)}
              >
                <HiOutlineSparkles className='h-4 w-4' />
                Registrar transportadora
              </Buttons>
              <Buttons
                className='rounded-full border border-white/30 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/10'
                loading={importingRates}
                onClick={handleImportRates}
              >
                Importar tarifas
              </Buttons>
            </div>
          </div>
          <div className='rounded-3xl border border-white/10 bg-white/5 p-6 text-sm backdrop-blur'>
            <div className='flex items-center gap-3 text-white/70'>
              <HiOutlineGlobeAmericas className='h-6 w-6 text-white' />
              <div>
                <p className='text-xs uppercase tracking-[0.3em] text-white/60'>Cobertura</p>
                <p className='text-2xl font-semibold text-white'>251 ciudades</p>
              </div>
            </div>
            <hr className='my-4 border-white/10' />
            <div className='grid grid-cols-2 gap-4 text-center text-white/80'>
              <div>
                <p className='text-3xl font-semibold'>96.2%</p>
                <p className='text-xs uppercase tracking-[0.2em]'>OTD</p>
              </div>
              <div>
                <p className='text-3xl font-semibold'>{carrierList.length}</p>
                <p className='text-xs uppercase tracking-[0.2em]'>Activas</p>
              </div>
            </div>
            <p className='mt-4 text-xs text-white/70'>
              Internas: {coverageSummary.internal} · Externas: {coverageSummary.external}
            </p>
          </div>
        </div>
      </article>

      {feedbackMessage ? (
        <div className='rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700'>
          {feedbackMessage}
        </div>
      ) : null}

      <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
        {carrierList.map(carrier => (
          <div
            key={carrier.name}
            className='rounded-3xl border border-border/60 bg-card p-5 shadow-sm transition hover:-translate-y-1 hover:border-primary/60 hover:shadow-2xl'
          >
            <div className='flex items-center justify-between text-xs font-semibold text-muted-foreground'>
              <span className='uppercase tracking-widest'>{carrier.type}</span>
              <HiOutlineTruck className='h-4 w-4 text-primary' />
            </div>
            <h3 className='mt-2 text-xl font-semibold text-foreground'>{carrier.name}</h3>
            <p className='text-sm text-muted-foreground'>{carrier.coverage}</p>
            <div className='mt-4 grid grid-cols-2 gap-3 text-xs text-muted-foreground'>
              <div className='rounded-2xl bg-muted px-3 py-2 text-center'>
                <p className='text-lg font-semibold text-foreground'>{carrier.vehicles}</p>
                <p>vehículos</p>
              </div>
              <div className='rounded-2xl bg-muted px-3 py-2 text-center'>
                <p className='text-lg font-semibold text-foreground'>{carrier.successRate}</p>
                <p>OTO</p>
              </div>
            </div>
            <p className='mt-3 text-xs uppercase tracking-[0.3em] text-muted-foreground'>Promedio</p>
            <p className='text-base font-semibold text-foreground'>{carrier.avgEta}</p>
            <ul className='mt-3 flex flex-wrap gap-2 text-xs'>
              {carrier.features.map(feature => (
                <li key={feature} className='rounded-full bg-muted px-3 py-1 text-muted-foreground'>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className='grid gap-6 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]'>
        <div className='rounded-3xl border border-border/60 bg-card p-6 shadow-sm'>
          <header className='mb-6 flex items-center justify-between'>
            <div>
              <p className='text-sm font-semibold text-muted-foreground'>Integraciones</p>
              <h2 className='text-2xl font-semibold text-foreground'>Checklist técnico</h2>
            </div>
            <Buttons className='rounded-full border border-border px-4 py-2 text-xs font-semibold'>
              Ver documentación
            </Buttons>
          </header>
          <div className='space-y-3'>
            {logisticsIntegrationChecklist.map(item => (
              <div
                key={item.label}
                className='flex items-center justify-between rounded-2xl border border-border/70 p-4'
              >
                <div className='flex items-center gap-3'>
                  <HiOutlineShieldCheck className='h-5 w-5 text-primary' />
                  <p className='text-sm font-semibold text-foreground'>{item.label}</p>
                </div>
                <span
                  className={`rounded-full border px-3 py-1 text-xs font-semibold ${
                    item.status === 'Completa'
                      ? 'border-emerald-200 bg-emerald-50 text-emerald-600'
                      : item.status === 'En curso'
                        ? 'border-amber-200 bg-amber-50 text-amber-600'
                        : 'border-slate-200 bg-slate-50 text-slate-600'
                  }`}
                >
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className='rounded-3xl border border-border/60 bg-card p-6 shadow-sm'>
          <header className='mb-4 flex items-center justify-between'>
            <div>
              <p className='text-sm font-semibold text-muted-foreground'>Insights</p>
              <h2 className='text-xl font-semibold text-foreground'>Rendimiento semanal</h2>
            </div>
            <HiOutlineChartBar className='h-6 w-6 text-primary' />
          </header>
          <div className='space-y-4 text-sm text-muted-foreground'>
            <div className='rounded-2xl bg-muted p-4'>
              <p className='text-xs uppercase tracking-[0.3em] text-muted-foreground'>Costo medio</p>
              <p className='text-3xl font-semibold text-foreground'>$12.4 USD</p>
              <p className='text-emerald-600'>-4.2% vs semana pasada</p>
            </div>
            <ul className='space-y-3'>
              <li className='flex items-center justify-between'>
                <span>Incidencias SLA</span>
                <span className='font-semibold text-foreground'>6 casos</span>
              </li>
              <li className='flex items-center justify-between'>
                <span>Alertas de capacidad</span>
                <span className='font-semibold text-foreground'>3 transportadoras</span>
              </li>
              <li className='flex items-center justify-between'>
                <span>Servicios premium</span>
                <span className='font-semibold text-foreground'>+28% utilización</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <Modal
        title='Registrar transportadora'
        open={createCarrierOpen}
        onOpenChange={setCreateCarrierOpen}
        size='lg'
      >
        <form className='space-y-4' onSubmit={handleCreateCarrier}>
          <div className='grid gap-3 md:grid-cols-2'>
            <label className='flex flex-col gap-2 text-sm font-semibold text-muted-foreground'>
              Nombre comercial
              <input
                type='text'
                className='rounded-2xl border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/40'
                value={newCarrier.name}
                onChange={event => handleCarrierField('name', event.target.value)}
                required
              />
            </label>
            <label className='flex flex-col gap-2 text-sm font-semibold text-muted-foreground'>
              Tipo
              <select
                className='rounded-2xl border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/40'
                value={newCarrier.type}
                onChange={event => handleCarrierField('type', event.target.value)}
              >
                <option value='Interna'>Interna</option>
                <option value='Externa'>Externa</option>
              </select>
            </label>
          </div>
          <div className='grid gap-3 md:grid-cols-2'>
            <label className='flex flex-col gap-2 text-sm font-semibold text-muted-foreground'>
              Cobertura
              <input
                type='text'
                className='rounded-2xl border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/40'
                placeholder='Ciudades o región'
                value={newCarrier.coverage}
                onChange={event => handleCarrierField('coverage', event.target.value)}
              />
            </label>
            <label className='flex flex-col gap-2 text-sm font-semibold text-muted-foreground'>
              Vehículos disponibles
              <input
                type='number'
                min={0}
                className='rounded-2xl border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/40'
                value={newCarrier.vehicles}
                onChange={event => handleCarrierField('vehicles', Number(event.target.value))}
              />
            </label>
          </div>
          <div className='grid gap-3 md:grid-cols-2'>
            <label className='flex flex-col gap-2 text-sm font-semibold text-muted-foreground'>
              Nivel de cumplimiento (%)
              <input
                type='number'
                min={0}
                max={100}
                step={0.1}
                className='rounded-2xl border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/40'
                value={newCarrier.successRateValue}
                onChange={event => handleCarrierField('successRateValue', Number(event.target.value))}
              />
            </label>
            <label className='flex flex-col gap-2 text-sm font-semibold text-muted-foreground'>
              ETA promedio
              <input
                type='text'
                className='rounded-2xl border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/40'
                placeholder='Ej. 6h 30m'
                value={newCarrier.avgEta}
                onChange={event => handleCarrierField('avgEta', event.target.value)}
              />
            </label>
          </div>
          <label className='flex flex-col gap-2 text-sm font-semibold text-muted-foreground'>
            Capacidades destacadas (separadas por comas)
            <textarea
              className='rounded-2xl border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/40'
              rows={3}
              placeholder='Same-day, Cross docking, eCommerce API...'
              value={newCarrier.features}
              onChange={event => handleCarrierField('features', event.target.value)}
            />
          </label>
          <div className='flex justify-end gap-3 pt-2'>
            <Buttons
              type='button'
              variant='ghost'
              className='border border-border px-4 py-2 text-sm'
              onClick={() => setCreateCarrierOpen(false)}
            >
              Cancelar
            </Buttons>
            <Buttons type='submit' color='success' className='px-5 py-2 text-sm font-semibold'>
              Guardar transportadora
            </Buttons>
          </div>
        </form>
      </Modal>
    </section>
  );
};
