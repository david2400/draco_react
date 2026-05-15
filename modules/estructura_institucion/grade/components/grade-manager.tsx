'use client';

import React, {useCallback, useMemo, useState} from 'react';
import {useTranslations} from 'next-intl';
import {ColumnDef} from '@tanstack/react-table';
import {SubmitHandler} from 'react-hook-form';
import {Modal} from '@repo/ui/modals/scenes/dialog/modal';
import {Buttons} from '@repo/ui/buttons/scenes';
import {Input} from '@repo/ui/inputs/scenes/input';
import {RegisterGrade} from './form';
import {IGradeCreateRequest} from '../models/grade.interface';
import {HiOutlineAcademicCap, HiOutlineBuildingOffice2, HiOutlinePlusCircle} from 'react-icons/hi2';
import { DataTable } from '@repo/ui/table/scenes';

interface GradeRow extends IGradeCreateRequest {
  id: string;
  students_enrolled: number;
}

const MOCK_GRADES: GradeRow[] = [
  {
    id: 'grade-1',
    name: 'Primero A',
    code: 'PRIM-A',
    education_level: 'elementary',
    coordinator: 'María López',
    modality: 'onsite',
    capacity: '30',
    description: 'Grupo de primero con enfoque en lectoescritura.',
    students_enrolled: 28,
  },
  {
    id: 'grade-2',
    name: 'Quinto B',
    code: 'QUIN-B',
    education_level: 'elementary',
    coordinator: 'Carlos Ortíz',
    modality: 'hybrid',
    capacity: '32',
    description: 'Programa bilingüe con proyectos STEAM.',
    students_enrolled: 31,
  },
  {
    id: 'grade-3',
    name: 'Octavo Único',
    code: 'OCT-UN',
    education_level: 'middle',
    coordinator: 'Paula Giraldo',
    modality: 'onsite',
    capacity: '34',
    description: 'Enfoque académico con clubes deportivos.',
    students_enrolled: 33,
  },
  {
    id: 'grade-4',
    name: 'Once Académico',
    code: 'ONC-ACA',
    education_level: 'high',
    coordinator: 'Ricardo Salazar',
    modality: 'virtual',
    capacity: '25',
    description: 'Preparación ICFES y orientación profesional.',
    students_enrolled: 24,
  },
];

export const GradeManager = () => {
  const t = useTranslations('EstructuraInstitucion.grade');
  const tOptions = useTranslations('EstructuraInstitucion.options');
  const tActions = useTranslations('EstructuraInstitucion.actions');

  const [searchTerm, setSearchTerm] = useState('');
  const [modalityFilter, setModalityFilter] = useState<'all' | 'onsite' | 'virtual' | 'hybrid'>('all');
  const [openModal, setOpenModal] = useState(false);
  const [editingGrade, setEditingGrade] = useState<GradeRow | null>(null);

  const filteredData = useMemo(() => {
    const normalized = searchTerm.trim().toLowerCase();

    return MOCK_GRADES.filter(item => {
      const matchesSearch = normalized.length
        ? `${item.name} ${item.code} ${item.coordinator}`.toLowerCase().includes(normalized)
        : true;
      const matchesModality = modalityFilter === 'all' ? true : item.modality === modalityFilter;
      return matchesSearch && matchesModality;
    });
  }, [searchTerm, modalityFilter]);

  const metrics = useMemo(() => {
    const totalCapacity = MOCK_GRADES.reduce((acc, grade) => acc + Number(grade.capacity || 0), 0);
    const currentStudents = MOCK_GRADES.reduce((acc, grade) => acc + grade.students_enrolled, 0);
    const onsiteGrades = MOCK_GRADES.filter(grade => grade.modality === 'onsite').length;

    return {
      totalGrades: MOCK_GRADES.length,
      totalCapacity,
      currentStudents,
      onsiteGrades,
    };
  }, []);

  const handleEdit = useCallback((row: GradeRow) => {
    setEditingGrade(row);
    setOpenModal(true);
  }, []);

  const handleModalClose = useCallback((open: boolean) => {
    if (!open) {
      setEditingGrade(null);
    }
    setOpenModal(open);
  }, []);

  const handleSubmit: SubmitHandler<IGradeCreateRequest> = async values => {
    console.log('Saving grade entity', values);
    handleModalClose(false);
  };

  const columns: ColumnDef<GradeRow>[] = useMemo(
    () => [
      {
        accessorKey: 'name',
        header: t('fields.name'),
        cell: info => (
          <div className='flex flex-col'>
            <span className='font-semibold text-foreground'>{info.row.original.name}</span>
            <span className='text-xs text-muted-foreground'>{info.row.original.code}</span>
          </div>
        ),
      },
      {
        accessorKey: 'education_level',
        header: t('fields.education_level'),
        cell: info => tOptions(`education_level.${info.getValue<string>()}`),
      },
      {
        accessorKey: 'modality',
        header: t('fields.modality'),
        cell: info => tOptions(`modality.${info.getValue<string>()}`),
      },
      {
        accessorKey: 'coordinator',
        header: t('fields.coordinator'),
      },
      {
        accessorKey: 'capacity',
        header: t('fields.capacity'),
        cell: info => `${info.getValue()} · ${info.row.original.students_enrolled} ${t('description')}`,
      },
      {
        id: 'actions',
        header: 'Actions',
        enableSorting: false,
        cell: ({row}) => (
          <div className='flex gap-2'>
            <Buttons size='sm' variant='outline' onClick={() => handleEdit(row.original)}>
              Editar
            </Buttons>
            <Buttons size='sm' variant='ghost'>
              Histórico
            </Buttons>
          </div>
        ),
      },
    ],
    [t, tOptions, handleEdit]
  );

  const headerTable = useCallback(() => {
    return (
      <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
        <Input
          value={searchTerm}
          onChange={event => setSearchTerm(event.target.value)}
          placeholder={t('title')}
          className='max-w-sm'
        />
        <div className='flex flex-wrap items-center gap-2'>
          {(['all', 'onsite', 'virtual', 'hybrid'] as const).map(option => (
            <button
              key={option}
              type='button'
              onClick={() => setModalityFilter(option)}
              className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                modalityFilter === option
                  ? 'bg-primary text-primary-foreground'
                  : 'border border-border text-muted-foreground hover:text-primary'
              }`}
            >
              {option === 'all' ? 'Todas' : tOptions(`modality.${option}`)}
            </button>
          ))}
          <Buttons onClick={() => setOpenModal(true)} className='inline-flex items-center gap-2'>
            <HiOutlinePlusCircle className='h-4 w-4' />
            {tActions('saveGrade')}
          </Buttons>
        </div>
      </div>
    );
  }, [searchTerm, modalityFilter, t, tOptions, tActions]);

  const summaryCards = [
    {
      icon: HiOutlineAcademicCap,
      label: 'Total de grados',
      value: metrics.totalGrades,
      accent: 'from-indigo-500/40 to-violet-500/40 text-indigo-700',
    },
    {
      icon: HiOutlineBuildingOffice2,
      label: 'Capacidad oficial',
      value: metrics.totalCapacity,
      accent: 'from-emerald-500/40 to-teal-500/40 text-emerald-700',
    },
    {
      icon: HiOutlineAcademicCap,
      label: 'Estudiantes actuales',
      value: metrics.currentStudents,
      accent: 'from-amber-500/40 to-orange-500/40 text-amber-700',
    },
  ];

  return (
    <section className='mx-auto flex w-full flex-col gap-6 px-6'>
      <article className='rounded-3xl border border-border/40 bg-gradient-to-br from-indigo-600 via-violet-500 to-purple-500 px-8 py-10 text-white shadow-2xl'>
        <header className='space-y-4'>
          <span className='inline-flex w-fit items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-white/75'>
            {t("title")}
          </span>
          <div className='space-y-2'>
            <h1 className='text-4xl font-semibold leading-tight'>
              {t("description")}
            </h1>
            <p className='text-white/80'>
              Centraliza indicadores académicos y coordina los cupos
              disponibles.
            </p>
          </div>
          <Buttons
            color='success'
            className='inline-flex items-center gap-2 rounded-full bg-white/90 px-5 py-3 text-sm font-semibold text-primary transition hover:-translate-y-0.5 hover:bg-white'
            onClick={() => setOpenModal(true)}>
            <HiOutlinePlusCircle className='h-4 w-4' />
            {tActions("saveGrade")}
          </Buttons>
        </header>
      </article>

      <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
        {summaryCards.map((card) => (
          <div
            key={card.label}
            className={`rounded-2xl border border-border/40 bg-gradient-to-br ${card.accent} px-5 py-4 shadow-sm backdrop-blur`}>
            <div className='flex items-center justify-between text-sm font-semibold text-white/80'>
              <span>{card.label}</span>
              <card.icon className='h-5 w-5 text-white/70' />
            </div>
            <p className='mt-2 text-2xl font-semibold text-white'>
              {card.value}
            </p>
          </div>
        ))}
      </div>

      <DataTable
        data={filteredData}
        columns={columns}
        headerTable={headerTable}
        className='py-2'
      />

      <Modal
        size='lg'
        title={editingGrade ? "Editar grado" : "Crear grado"}
        open={openModal}
        onOpenChange={handleModalClose}>
        <RegisterGrade
          initialValues={editingGrade ?? undefined}
          onSubmit={handleSubmit}
        />
      </Modal>
    </section>
  );
};
