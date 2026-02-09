'use client';

import {useEffect, useMemo, useState} from 'react';
import Link from 'next/link';
import {useTranslations} from 'next-intl';
import {Buttons} from '@repo/ui/buttons/scenes';
import {buttonVariants} from '@repo/ui/buttons/scenes/button';
import {Input} from '@repo/ui/inputs/scenes/input';
import {Badge} from '@repo/ui/badges/scenes/badge';
import {HiOutlineCheckCircle, HiOutlineUserGroup} from 'react-icons/hi2';
import {cn} from '@/lib/utils';
import {IClassroomRow, MOCK_CLASSROOMS} from '../data/mock-classrooms';
import {IGroupRow, MOCK_GROUPS} from '../../group/data/mock-groups';
import {Modal} from '@repo/ui/modals/scenes/dialog/modal';

interface ClassroomGroupManagerSceneProps {
  classroomId?: string;
}

export const ClassroomGroupManagerScene = ({classroomId}: ClassroomGroupManagerSceneProps) => {
  const tClassroom = useTranslations('EstructuraInstitucion.classroom');
  const tGroup = useTranslations('EstructuraInstitucion.group');
  const tActions = useTranslations('EstructuraInstitucion.actions');
  const tOptions = useTranslations('EstructuraInstitucion.options');

  const classroom = useMemo<IClassroomRow | undefined>(() => {
    if (!classroomId) return MOCK_CLASSROOMS[0];
    return MOCK_CLASSROOMS.find(item => item.id === classroomId) ?? MOCK_CLASSROOMS[0];
  }, [classroomId]);

  const [linkedGroups, setLinkedGroups] = useState<string[]>(classroom?.linkedGroups ?? []);
  const [selectedGroups, setSelectedGroups] = useState<string[]>(classroom?.linkedGroups ?? []);
  const [searchTerm, setSearchTerm] = useState('');
  const [shiftFilter, setShiftFilter] = useState<'all' | 'morning' | 'afternoon' | 'evening'>('all');
  const [manageModalOpen, setManageModalOpen] = useState(false);

  useEffect(() => {
    setLinkedGroups(classroom?.linkedGroups ?? []);
  }, [classroom]);

  useEffect(() => {
    if (manageModalOpen) {
      setSelectedGroups(linkedGroups);
    }
  }, [manageModalOpen, linkedGroups]);

  if (!classroom) {
    return (
      <section className='mx-auto flex flex-col items-center gap-4 px-6 py-12 text-center'>
        <p className='text-lg font-semibold text-destructive'>{tClassroom('emptyState')}</p>
        <Link
          href='/estructura_institucion/classroom'
          className={cn(buttonVariants({variant: 'default'}), 'text-center')}
        >
          {tActions('saveClassroom')}
        </Link>
      </section>
    );
  }

  const filteredGroups = useMemo(() => {
    const normalized = searchTerm.trim().toLowerCase();
    return MOCK_GROUPS.filter(group => {
      const matchesShift = shiftFilter === 'all' ? true : group.shift === shiftFilter;
      const matchesSearch = normalized.length
        ? `${group.name} ${group.grade_id} ${group.tutor}`.toLowerCase().includes(normalized)
        : true;
      return matchesShift && matchesSearch;
    });
  }, [searchTerm, shiftFilter]);

  const selectedGroupEntities = useMemo(
    () => selectedGroups.map(id => MOCK_GROUPS.find(group => group.id === id)).filter((group): group is IGroupRow => Boolean(group)),
    [selectedGroups]
  );

  const activeGroups = useMemo(() => {
    if (!linkedGroups.length) return [];
    return linkedGroups
      .map(id => MOCK_GROUPS.find(group => group.id === id))
      .filter((group): group is IGroupRow => Boolean(group) //&& group.status === 'active'
    );
  }, [linkedGroups]);

  const metrics = useMemo(() => {
    const total = activeGroups.length;
    const totalCapacity = activeGroups.reduce((acc, group) => acc + Number(group.max_students ?? 0), 0);
    const shifts = new Set(activeGroups.map(group => group.shift)).size;
    return {total, totalCapacity, shifts};
  }, [activeGroups]);

  const selectionMetrics = useMemo(() => {
    const total = selectedGroupEntities.length;
    const totalCapacity = selectedGroupEntities.reduce((acc, group) => acc + Number(group.max_students ?? 0), 0);
    const shifts = new Set(selectedGroupEntities.map(group => group.shift)).size;
    return {total, totalCapacity, shifts};
  }, [selectedGroupEntities]);

  const toggleGroupSelection = (groupId: string) => {
    setSelectedGroups(prev => (prev.includes(groupId) ? prev.filter(id => id !== groupId) : [...prev, groupId]));
  };

  const handleSelectionSave = () => {
    console.log('linking groups to classroom', classroom.id, selectedGroups);
    setLinkedGroups(selectedGroups);
    setManageModalOpen(false);
  };

  const handleModalChange = (open: boolean) => {
    if (!open) {
      setSelectedGroups(linkedGroups);
      setSearchTerm('');
      setShiftFilter('all');
    }
    setManageModalOpen(open);
  };

  return (
    <section className='mx-auto flex w-full flex-col gap-8 px-6 py-8'>
      <header className='space-y-4 rounded-3xl border border-border/40 bg-card/60 p-6 shadow-sm'>
        <div className='flex flex-col gap-2'>
          <p className='text-xs uppercase tracking-[0.35em] text-muted-foreground'>{tClassroom('linkedGroupsLabel')}</p>
          <h1 className='text-3xl font-semibold text-foreground'>{classroom.name}</h1>
          <p className='text-sm text-muted-foreground'>
            {classroom.building} · {tClassroom('fields.floor')} {classroom.floor} · {classroom.code}
          </p>
          <p className='text-sm text-muted-foreground'>{tClassroom('linkedGroupsDescription')}</p>
        </div>
        <div className='flex flex-wrap gap-3 text-xs text-muted-foreground'>
          <Badge variant='outline'>{classroom.capacity} {tClassroom('fields.capacity')}</Badge>
          <Badge variant='outline'>{classroom.resources}</Badge>
        </div>
        <div className='flex flex-wrap gap-3 text-xs text-muted-foreground'>
          <Link href='/estructura_institucion/classroom' className='text-primary underline'>
            {tActions('cancel')}
          </Link>
        </div>
      </header>

      <div className='rounded-3xl border border-border/40 bg-card/60 p-6 shadow-sm'>
        <div className='flex items-center justify-between'>
          <div>
            <p className='text-xs uppercase tracking-[0.3em] text-muted-foreground'>{tClassroom('linkedGroupsLabel')}</p>
            <h2 className='text-lg font-semibold text-foreground'>{tGroup('title')}</h2>
          </div>
          <Badge variant='outline' className='text-xs'>
            {tClassroom('selectionSummary', {count: activeGroups.length})}
          </Badge>
        </div>

        {activeGroups.length === 0 ? (
          <p className='mt-4 text-sm text-muted-foreground'>{tClassroom('noGroupsAttached')}</p>
        ) : (
          <ul className='mt-4 space-y-3'>
            {activeGroups.map(group => (
              <li key={group.id} className='rounded-2xl border border-border/40 p-4'>
                <div className='flex items-start justify-between'>
                  <div>
                    <p className='text-base font-semibold text-foreground'>{group.name}</p>
                    <p className='text-xs text-muted-foreground'>
                      {tGroup('fields.tutor')}: {group.tutor}
                    </p>
                  </div>
                  <Badge variant='outline' className='gap-1 text-xs'>
                    <HiOutlineUserGroup className='h-4 w-4' />
                    {tOptions(`shift.${group.shift}`)}
                  </Badge>
                </div>
                <div className='mt-3 grid grid-cols-3 gap-2 text-xs text-muted-foreground'>
                  <span>
                    <p className='font-semibold text-foreground'>{group.grade_id}</p>
                    {tGroup('fields.grade_id')}
                  </span>
                  <span>
                    <p className='font-semibold text-foreground'>{group.max_students}</p>
                    {tGroup('fields.max_students')}
                  </span>
                  <span>
                    <p className='font-semibold text-foreground'>{group.students_assigned}</p>
                    Students assigned
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}

        <div className='mt-6 flex flex-wrap gap-3'>
          <Buttons className='flex-1 min-w-[140px]' onClick={() => handleModalChange(true)}>
            {tActions('manageGroups')}
          </Buttons>
          <Link
            href='/estructura_institucion/classroom'
            className={cn(buttonVariants({variant: 'outline'}), 'flex-1 min-w-[140px] text-center')}
          >
            {tActions('cancel')}
          </Link>
        </div>
      </div>

      <Modal size='lg' title={tActions('manageGroups')} open={manageModalOpen} onOpenChange={handleModalChange}>
        <div className='space-y-6'>
          <div>
            <p className='text-xs uppercase tracking-[0.35em] text-muted-foreground'>{tClassroom('linkedGroupsLabel')}</p>
            <h3 className='text-2xl font-semibold text-foreground'>{classroom.name}</h3>
            <p className='text-sm text-muted-foreground'>{tClassroom('linkedGroupsDescription')}</p>
          </div>

          <div className='flex flex-col gap-3 rounded-2xl border border-border/30 bg-background/60 p-4 lg:flex-row'>
            <div className='flex-1'>
              <p className='text-xs uppercase tracking-[0.3em] text-muted-foreground'>{tGroup('insights.totalGroups')}</p>
              <p className='text-2xl font-semibold text-foreground'>{selectionMetrics.total}</p>
            </div>
            <div className='flex-1'>
              <p className='text-xs uppercase tracking-[0.3em] text-muted-foreground'>{tGroup('insights.capacity')}</p>
              <p className='text-2xl font-semibold text-foreground'>{selectionMetrics.totalCapacity || '0'}</p>
            </div>
            <div className='flex-1'>
              <p className='text-xs uppercase tracking-[0.3em] text-muted-foreground'>{tGroup('insights.shifts')}</p>
              <p className='text-2xl font-semibold text-foreground'>{selectionMetrics.shifts}</p>
            </div>
          </div>

          <div className='flex flex-col gap-3 md:flex-row md:items-center md:justify-between'>
            <Input
              value={searchTerm}
              onChange={event => setSearchTerm(event.target.value)}
              placeholder={tGroup('searchPlaceholder')}
              className='md:max-w-sm'
            />
            <div className='flex flex-wrap items-center gap-2'>
              {(['all', 'morning', 'afternoon', 'evening'] as const).map(option => (
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
          </div>

          {filteredGroups.length === 0 ? (
            <div className='rounded-2xl border border-dashed border-border/40 bg-background/40 p-6 text-sm text-muted-foreground'>
              {tGroup('emptyState')}
            </div>
          ) : (
            <div className='grid gap-4 md:grid-cols-2'>
              {filteredGroups.map(group => {
                const isSelected = selectedGroups.includes(group.id);
                return (
                  <button
                    key={group.id}
                    type='button'
                    onClick={() => toggleGroupSelection(group.id)}
                    className={cn(
                      'flex h-full flex-col gap-3 rounded-2xl border border-border/50 bg-background/80 p-4 text-left transition hover:border-primary/60 hover:shadow-md',
                      isSelected && 'border-primary bg-primary/5 shadow-lg'
                    )}
                  >
                    <div className='flex items-start justify-between'>
                      <div className='space-y-1'>
                        <p className='text-base font-semibold text-foreground'>{group.name}</p>
                        <p className='text-xs text-muted-foreground'>{group.tutor}</p>
                      </div>
                      <Badge variant={isSelected ? 'default' : 'outline'} className='flex items-center gap-1 text-[11px] uppercase tracking-[0.25em]'>
                        <HiOutlineUserGroup className='size-3.5' />
                        {tOptions(`shift.${group.shift}`)}
                      </Badge>
                    </div>
                    <div className='grid grid-cols-3 gap-2 text-xs text-muted-foreground'>
                      <div>
                        <p className='font-semibold text-foreground'>{group.grade_id}</p>
                        <p>{tGroup('fields.grade_id')}</p>
                      </div>
                      <div>
                        <p className='font-semibold text-foreground'>{group.max_students}</p>
                        <p>{tGroup('fields.max_students')}</p>
                      </div>
                      <div>
                        <p className='font-semibold text-foreground'>{group.start_date}</p>
                        <p>{tGroup('fields.start_date')}</p>
                      </div>
                    </div>
                    <div className='flex items-center justify-between text-sm'>
                      <span className='text-muted-foreground'>{group.classroom}</span>
                      {isSelected ? (
                        <span className='inline-flex items-center gap-1 text-primary'>
                          <HiOutlineCheckCircle className='size-4' />
                          {tActions('selected')}
                        </span>
                      ) : (
                        <span className='text-xs uppercase tracking-[0.3em] text-muted-foreground'>
                          {tActions('attach')}
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {selectedGroupEntities.length ? (
            <div className='rounded-2xl border border-primary/20 bg-primary/5 p-4 text-sm text-primary'>
              <p className='font-semibold'>{tClassroom('selectionSummary', {count: selectedGroupEntities.length})}</p>
              <div className='mt-2 flex flex-wrap gap-2'>
                {selectedGroupEntities.map(group => (
                  <Badge key={group.id} variant='outline' className='border-primary/40 text-primary'>
                    {group.name}
                  </Badge>
                ))}
              </div>
            </div>
          ) : null}

          <div className='flex flex-wrap gap-3 pt-2'>
            <Buttons variant='outline' className='flex-1 min-w-[140px]' onClick={() => handleModalChange(false)}>
              {tActions('cancel')}
            </Buttons>
            <Buttons className='flex-1 min-w-[180px]' onClick={handleSelectionSave}>
              {tActions('saveGroup')}
            </Buttons>
          </div>
        </div>
      </Modal>
    </section>
  );
};
