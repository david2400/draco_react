'use client';

import React, {useCallback, useMemo, useState} from 'react';
import Link from 'next/link';
import {useTranslations} from 'next-intl';
import {SubmitHandler} from 'react-hook-form';
import {Buttons} from '@repo/ui/buttons/scenes';
import {buttonVariants} from '@repo/ui/buttons/scenes/button';
import {Input} from '@repo/ui/inputs/scenes/input';
import {Badge} from '@repo/ui/badges/scenes/badge';
import {Modal} from '@repo/ui/modals/scenes/dialog/modal';
import {
  HiOutlineBuildingOffice2,
  HiOutlineCalendarDays,
  HiOutlineCheckCircle,
  HiOutlineClock,
  HiOutlineMinusCircle,
  HiOutlinePlusCircle,
  HiOutlineSparkles,
  HiOutlineUserGroup,
  HiOutlineUsers,
} from 'react-icons/hi2';

import {RegisterClassroom} from './form';
import {IClassroomCreateRequest} from '../models/classroom.interface';
import {IClassroomRow, MOCK_CLASSROOMS} from '../data/mock-classrooms';
import {MOCK_GROUPS} from '../../group/data/mock-groups';
import {cn} from '@/lib/utils';

const STATUS_MAP: Record<
  NonNullable<IClassroomRow['status']>,
  {labelKey: string; badgeClass: string; accentClass: string}
> = {
  active: {
    labelKey: 'classroomStatus.active',
    badgeClass: 'bg-emerald-500/15 text-emerald-600 ring-1 ring-emerald-500/30',
    accentClass: 'from-emerald-500/10 via-emerald-500/5 to-transparent',
  },
  maintenance: {
    labelKey: 'classroomStatus.maintenance',
    badgeClass: 'bg-amber-500/15 text-amber-600 ring-1 ring-amber-500/30',
    accentClass: 'from-amber-500/10 via-amber-500/5 to-transparent',
  },
  inactive: {
    labelKey: 'classroomStatus.inactive',
    badgeClass: 'bg-slate-500/15 text-slate-600 ring-1 ring-slate-500/30',
    accentClass: 'from-slate-500/10 via-slate-500/5 to-transparent',
  },
};

const SHIFT_ORDER: Array<'morning' | 'afternoon' | 'evening'> = ['morning', 'afternoon', 'evening'];

const buildGroupDictionary = () => new Map(MOCK_GROUPS.map(group => [group.id, group]));

export const ClassroomManager = () => {
  const t = useTranslations('EstructuraInstitucion.classroom');
  const tOptions = useTranslations('EstructuraInstitucion.options');
  const tActions = useTranslations('EstructuraInstitucion.actions');
  const tGroup = useTranslations('EstructuraInstitucion.group');

  const [classrooms, setClassrooms] = useState<IClassroomRow[]>(MOCK_CLASSROOMS);
  const [searchTerm, setSearchTerm] = useState('');
  const [shiftFilter, setShiftFilter] = useState<'all' | 'morning' | 'afternoon' | 'evening'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'maintenance' | 'inactive'>('all');
  const [openModal, setOpenModal] = useState(false);
  const [editingClassroom, setEditingClassroom] = useState<IClassroomRow | null>(null);

  const groupDictionary = useMemo(buildGroupDictionary, []);

  const filteredClassrooms = useMemo(() => {
    const normalized = searchTerm.trim().toLowerCase();

    return classrooms.filter(classroom => {
      const matchesSearch = normalized.length
        ? `${classroom.name} ${classroom.code} ${classroom.building}`.toLowerCase().includes(normalized)
        : true;
      const matchesShift =
        shiftFilter === 'all'
          ? true
          : classroom.shiftsCovered?.some(shift => shift === shiftFilter);
      const matchesStatus = statusFilter === 'all' ? true : classroom.status === statusFilter;

      return matchesSearch && matchesShift && matchesStatus;
    });
  }, [classrooms, searchTerm, shiftFilter, statusFilter]);

  const metrics = useMemo(() => {
    const totalCapacity = classrooms.reduce((acc, classroom) => acc + Number(classroom.capacity || 0), 0);
    const currentOccupancy = classrooms.reduce((acc, classroom) => acc + Number(classroom.occupancy || 0), 0);
    const activeRooms = classrooms.filter(classroom => classroom.status === 'active').length;
    const coverage = new Set(SHIFT_ORDER.filter(shift => classrooms.some(room => room.shiftsCovered.includes(shift))));

    return {
      totalRooms: classrooms.length,
      totalCapacity,
      currentOccupancy,
      activeRooms,
      coverage: coverage.size,
    };
  }, [classrooms]);

  const handleModalToggle = useCallback(
    (open: boolean) => {
      if (!open) {
        setEditingClassroom(null);
      }
      setOpenModal(open);
    },
    []
  );

  const handleSubmit: SubmitHandler<IClassroomCreateRequest> = async values => {
    setClassrooms(prev => {
      if (editingClassroom) {
        return prev.map(item =>
          item.id === editingClassroom.id
            ? {
                ...item,
                ...values,
              }
            : item
        );
      }

      const newClassroom: IClassroomRow = {
        id: `classroom-${Date.now()}`,
        ...values,
        occupancy: 0,
        groupsCount: 0,
        shiftsCovered: ['morning'],
        status: 'active',
        updatedAt: new Date().toISOString(),
        linkedGroups: [],
      };

      return [newClassroom, ...prev];
    });
    handleModalToggle(false);
  };

  const openCreate = () => handleModalToggle(true);
  const openEdit = (classroom: IClassroomRow) => {
    setEditingClassroom(classroom);
    handleModalToggle(true);
  };

  const renderStatusBadge = (status: IClassroomRow['status']) => {
    if (!status) return null;
    const map = STATUS_MAP[status];
    return (
      <span className={cn('inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em]', map.badgeClass)}>
        {tOptions(map.labelKey)}
      </span>
    );
  };

  const relativeTimeFromNow = (dateIso: string) => {
    const formatter = new Intl.RelativeTimeFormat('es', {numeric: 'auto'});
    const value = new Date(dateIso).getTime();
    if (Number.isNaN(value)) return '';

    const diffMs = value - Date.now();
    const diffMinutes = Math.round(diffMs / (1000 * 60));
    const ranges: Array<{unit: Intl.RelativeTimeFormatUnit; amount: number}> = [
      {unit: 'year', amount: 60 * 24 * 365},
      {unit: 'month', amount: 60 * 24 * 30},
      {unit: 'week', amount: 60 * 24 * 7},
      {unit: 'day', amount: 60 * 24},
      {unit: 'hour', amount: 60},
      {unit: 'minute', amount: 1},
    ];

    for (const range of ranges) {
      if (Math.abs(diffMinutes) >= range.amount || range.unit === 'minute') {
        const value = Math.round(diffMinutes / range.amount);
        return formatter.format(value, range.unit);
      }
    }
    return '';
  };

  return (
    <section className='mx-auto flex w-full flex-col gap-8 px-6 py-10'>
      <article className='rounded-3xl border border-border/40 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 px-8 py-10 text-white shadow-2xl'>
        <header className='space-y-4'>
          <span className='inline-flex w-fit items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-white/70'>
            {t('title')}
          </span>
          <div className='space-y-2'>
            <h1 className='text-4xl font-semibold leading-tight'>{t('description')}</h1>
            <p className='text-white/80'>{t('linkedGroupsDescription')}</p>
          </div>
          <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
            <div className='rounded-2xl border border-white/10 bg-white/10 p-4'>
              <p className='text-xs uppercase tracking-[0.3em] text-white/60'>{t('metrics.totalRooms')}</p>
              <p className='text-3xl font-semibold'>{metrics.totalRooms}</p>
            </div>
            <div className='rounded-2xl border border-white/10 bg-white/10 p-4'>
              <p className='text-xs uppercase tracking-[0.3em] text-white/60'>{t('metrics.totalCapacity')}</p>
              <p className='text-3xl font-semibold'>{metrics.totalCapacity}</p>
            </div>
            <div className='rounded-2xl border border-white/10 bg-white/10 p-4'>
              <p className='text-xs uppercase tracking-[0.3em] text-white/60'>{t('metrics.currentOccupancy')}</p>
              <p className='text-3xl font-semibold'>{metrics.currentOccupancy}</p>
            </div>
            <div className='rounded-2xl border border-white/10 bg-white/10 p-4'>
              <p className='text-xs uppercase tracking-[0.3em] text-white/60'>{t('metrics.coverage')}</p>
              <p className='text-3xl font-semibold'>{metrics.coverage}</p>
            </div>
          </div>
          <div className='flex flex-wrap items-center gap-3'>
            <Buttons
              color='success'
              className='inline-flex items-center gap-2 rounded-full bg-white/90 px-5 py-3 text-sm font-semibold text-primary transition hover:-translate-y-0.5 hover:bg-white'
              onClick={openCreate}
            >
              <HiOutlinePlusCircle className='h-4 w-4' />
              {tActions('saveClassroom')}
            </Buttons>
            <Link
              href='/estructura_institucion/group'
              className={cn(
                buttonVariants({variant: 'ghost'}),
                'gap-2 text-white'
              )}
            >
              <HiOutlineSparkles className='h-4 w-4' />
              {tActions('manageGroups')}
            </Link>
          </div>
        </header>
      </article>

      <div className='flex flex-col gap-4 rounded-3xl border border-border/50 bg-card/60 p-5 shadow-sm lg:flex-row lg:items-center lg:justify-between'>
        <Input
          value={searchTerm}
          onChange={event => setSearchTerm(event.target.value)}
          placeholder={t('searchPlaceholder')}
          className='w-full lg:max-w-sm'
        />
        <div className='flex flex-wrap items-center gap-2'>
          {(['all', ...SHIFT_ORDER] as const).map(option => (
            <button
              key={option}
              type='button'
              onClick={() => setShiftFilter(option)}
              className={cn(
                'rounded-full border px-3 py-1 text-xs font-semibold transition',
                shiftFilter === option ? 'border-primary bg-primary text-primary-foreground' : 'border-border text-muted-foreground hover:text-primary'
              )}
            >
              {option === 'all' ? tOptions('shift.all') : tOptions(`shift.${option}`)}
            </button>
          ))}
        </div>
        <div className='flex flex-wrap items-center gap-2'>
          {(['all', 'active', 'maintenance', 'inactive'] as const).map(option => (
            <button
              key={option}
              type='button'
              onClick={() => setStatusFilter(option)}
              className={cn(
                'rounded-full border px-3 py-1 text-xs font-semibold transition',
                statusFilter === option ? 'border-primary bg-primary text-primary-foreground' : 'border-border text-muted-foreground hover:text-primary'
              )}
            >
              {option === 'all' ? t('filters.allStatuses') : tOptions(`classroomStatus.${option}`)}
            </button>
          ))}
        </div>
      </div>

      {filteredClassrooms.length === 0 ? (
        <div className='rounded-3xl border border-dashed border-border/40 bg-background/60 p-10 text-center text-sm text-muted-foreground'>
          {t('emptyState')}
        </div>
      ) : (
        <div className='grid gap-5 lg:grid-cols-2'>
          {filteredClassrooms.map(classroom => {
            const capacityNumber = Number(classroom.capacity || 0) || 0;
            const occupancyPercent = capacityNumber
              ? Math.min(100, Math.round((Number(classroom.occupancy || 0) / capacityNumber) * 100))
              : 0;
            const linkedGroups = classroom.linkedGroups?.map(id => groupDictionary.get(id)).filter(Boolean) ?? [];
            const statusAccent = STATUS_MAP[classroom.status ?? 'active'];

            return (
              <article
                key={classroom.id}
                className='flex flex-col gap-4 rounded-3xl border border-border/50 bg-background/80 p-6 shadow-sm'
              >
                <div className='flex flex-col gap-3 border-b border-border/50 pb-4 md:flex-row md:items-center md:justify-between'>
                  <div>
                    <div className='flex items-center gap-3'>
                      <h3 className='text-xl font-semibold text-foreground'>{classroom.name}</h3>
                      {renderStatusBadge(classroom.status)}
                    </div>
                    <p className='text-sm text-muted-foreground'>
                      {classroom.code} · {classroom.building} · {t('fields.floor')} {classroom.floor}
                    </p>
                  </div>
                  <div className='flex items-center gap-2 text-xs text-muted-foreground'>
                    <HiOutlineCalendarDays className='h-4 w-4' />
                    {relativeTimeFromNow(classroom.updatedAt)}
                  </div>
                </div>

                <div className='flex flex-wrap gap-3 rounded-2xl bg-gradient-to-r p-4 text-sm'
                  style={{backgroundImage: statusAccent ? `linear-gradient(120deg, ${statusAccent.accentClass})` : undefined}}>
                  <div className='flex flex-1 items-center gap-3'>
                    <div className='rounded-2xl bg-primary/10 p-3 text-primary'>
                      <HiOutlineUsers className='h-5 w-5' />
                    </div>
                    <div>
                      <p className='text-xs uppercase tracking-[0.3em] text-muted-foreground'>{t('metrics.currentOccupancy')}</p>
                      <p className='text-lg font-semibold text-foreground'>
                        {classroom.occupancy}/{classroom.capacity}
                      </p>
                    </div>
                  </div>
                  <div className='flex flex-1 flex-col justify-center'>
                    <div className='flex items-center justify-between text-xs text-muted-foreground'>
                      <span>{t('metrics.capacityUsage')}</span>
                      <span>{occupancyPercent}%</span>
                    </div>
                    <div className='h-2 rounded-full bg-muted'>
                      <div
                        className='h-full rounded-full bg-primary transition-all'
                        style={{width: `${occupancyPercent}%`}}
                      />
                    </div>
                  </div>
                </div>

                <div className='flex flex-wrap gap-2'>
                  {classroom.shiftsCovered.map(shift => (
                    <Badge key={shift} variant='outline' className='gap-1 text-xs'>
                      <HiOutlineClock className='h-4 w-4 text-muted-foreground' />
                      {tOptions(`shift.${shift}`)}
                    </Badge>
                  ))}
                  {linkedGroups.length ? (
                    <Badge variant='default' className='gap-1 bg-primary/15 text-primary'>
                      <HiOutlineBuildingOffice2 className='h-4 w-4' />
                      {t('selectionSummary', {count: linkedGroups.length})}
                    </Badge>
                  ) : (
                    <Badge variant='outline' className='gap-1 text-xs text-muted-foreground'>
                      <HiOutlineMinusCircle className='h-4 w-4' />
                      {tGroup('emptyState')}
                    </Badge>
                  )}
                </div>

                <div className='space-y-2 rounded-2xl border border-border/40 p-4'>
                  <p className='text-xs uppercase tracking-[0.3em] text-muted-foreground'>{tGroup('title')}</p>
                  {linkedGroups.length === 0 ? (
                    <p className='text-sm text-muted-foreground'>{t('noGroupsAttached')}</p>
                  ) : (
                    <ul className='space-y-2 text-sm'>
                      {linkedGroups.map(group => (
                        <li key={group!.id} className='flex items-center justify-between rounded-xl border border-border/30 px-3 py-2'>
                          <span className='font-medium text-foreground'>{group!.name}</span>
                          <span className='text-xs text-muted-foreground'>
                            {tGroup('fields.tutor')}: {group!.tutor}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className='flex flex-wrap gap-3 border-t border-border/40 pt-4'>
                  <Link
                    href={`/estructura_institucion/classroom/${classroom.id}/groups`}
                    className={cn(
                      buttonVariants({variant: 'secondary'}),
                      'flex-1 min-w-[140px] text-center'
                    )}
                  >
                    {tActions('manageGroups')}
                  </Link>
                  <Buttons variant='outline' className='flex-1 min-w-[140px]' onClick={() => openEdit(classroom)}>
                    {tActions('edit')}
                  </Buttons>
                  <Buttons variant='ghost' className='flex-1 min-w-[140px] text-destructive'>
                    {tActions('delete')}
                  </Buttons>
                </div>
              </article>
            );
          })}
        </div>
      )}

      <Modal
        size='lg'
        title={editingClassroom ? t('modal.editTitle') : t('modal.createTitle')}
        open={openModal}
        onOpenChange={handleModalToggle}
      >
        <RegisterClassroom initialValues={editingClassroom ?? undefined} onSubmit={handleSubmit} />
      </Modal>

    </section>
  );
};
