'use client';

import React, {useMemo, useState} from 'react';
import {useTranslations} from 'next-intl';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';

import {Buttons} from '@repo/ui/buttons/scenes';
import {FormField} from '@repo/ui/form/scenes/form-field';
import {FormSelectField} from '@repo/ui/form/scenes/form-select';

type StudentOption = {
  id: string;
  label: string;
};

type GroupOption = {
  id: string;
  label: string;
};

const schema = z.object({
  group_id: z.string().min(1),
  enrollment_date: z.string().min(1),
  status: z.enum(['active', 'suspended', 'graduated']),
  notes: z.string().optional(),
  student_ids: z.array(z.string()).min(1),
});

type BulkAssignInputs = z.infer<typeof schema>;

export type BulkAssignGroupStudentsPayload = BulkAssignInputs;

export const BulkAssignGroupStudents = ({
  onSubmit,
  groups,
  students,
  submitting,
  initialGroupId,
  lockGroup,
}: {
  onSubmit: (payload: BulkAssignGroupStudentsPayload) => void | Promise<void>;
  groups: GroupOption[];
  students: StudentOption[];
  submitting?: boolean;
  initialGroupId?: string;
  lockGroup?: boolean;
}) => {
  const intl = useTranslations('EstructuraInstitucion.groupStudent');
  const intlOptions = useTranslations('EstructuraInstitucion.options');
  const intlActions = useTranslations('EstructuraInstitucion.actions');

  const [studentQuery, setStudentQuery] = useState('');

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: {errors},
  } = useForm<BulkAssignInputs>({
    resolver: zodResolver(schema),
    defaultValues: {
      group_id: initialGroupId ?? '',
      enrollment_date: '',
      status: 'active',
      notes: '',
      student_ids: [],
    },
  });

  const selectedStudentIds = watch('student_ids');

  const selectedStudents = useMemo(() => {
    if (selectedStudentIds.length === 0) {
      return [];
    }
    const index = new Map(students.map(student => [student.id, student] as const));
    return selectedStudentIds.map(id => index.get(id)).filter(Boolean) as StudentOption[];
  }, [selectedStudentIds, students]);

  const filteredStudents = useMemo(() => {
    const normalized = studentQuery.trim().toLowerCase();
    if (!normalized.length) {
      return students;
    }

    return students.filter(student => student.label.toLowerCase().includes(normalized));
  }, [studentQuery, students]);

  const allFilteredSelected =
    filteredStudents.length > 0 && filteredStudents.every(s => selectedStudentIds.includes(s.id));

  const toggleStudent = (id: string) => {
    if (selectedStudentIds.includes(id)) {
      setValue(
        'student_ids',
        selectedStudentIds.filter(item => item !== id),
        {shouldValidate: true}
      );
      return;
    }

    setValue('student_ids', [...selectedStudentIds, id], {shouldValidate: true});
  };

  const handleToggleAllFiltered = () => {
    if (filteredStudents.length === 0) {
      return;
    }

    if (allFilteredSelected) {
      const filteredIds = new Set(filteredStudents.map(s => s.id));
      setValue(
        'student_ids',
        selectedStudentIds.filter(id => !filteredIds.has(id)),
        {shouldValidate: true}
      );
      return;
    }

    const union = new Set([...selectedStudentIds, ...filteredStudents.map(s => s.id)]);
    setValue('student_ids', Array.from(union), {shouldValidate: true});
  };

  const groupOptions = useMemo(
    () => groups.map(option => ({id: option.id, value: option.id, label: option.label})),
    [groups]
  );

  const statusOptions = [
    {id: 'active', value: 'active', label: intlOptions('status.active')},
    {id: 'suspended', value: 'suspended', label: intlOptions('status.suspended')},
    {id: 'graduated', value: 'graduated', label: intlOptions('status.graduated')},
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
      <div className='rounded-3xl border border-border/40 bg-card/40 p-5 shadow-sm'>
        <div className='grid grid-cols-12 gap-6'>
          <div className='col-span-12 lg:col-span-5'>
            <div className='space-y-4'>
              <div className='space-y-1'>
                <p className='text-sm font-semibold text-foreground'>Configuración</p>
                <p className='text-xs text-muted-foreground'>Define el grupo y los parámetros de matrícula.</p>
              </div>

              <FormSelectField
                id='bulk-group-id'
                label={intl('fields.group_id')}
                className='w-full'
                data={groupOptions}
                error={errors.group_id?.message}
                disabled={lockGroup}
                {...register('group_id')}
              />

              <FormField
                id='bulk-enrollment-date'
                type='date'
                label={intl('fields.enrollment_date')}
                className='w-full'
                error={errors.enrollment_date?.message}
                {...register('enrollment_date')}
              />

              <FormSelectField
                id='bulk-status'
                label={intl('fields.status')}
                className='w-full'
                data={statusOptions}
                error={errors.status?.message}
                {...register('status')}
              />

              <FormField
                id='bulk-notes'
                label={intl('fields.notes')}
                className='w-full'
                error={errors.notes?.message}
                {...register('notes')}
              />
            </div>
          </div>

          <div className='col-span-12 lg:col-span-7'>
            <div className='space-y-4'>
              <div className='flex flex-col gap-3 md:flex-row md:items-end md:justify-between'>
                <div className='space-y-1'>
                  <div className='flex items-center gap-2'>
                    <p className='text-sm font-semibold text-foreground'>Selecciona estudiantes</p>
                    <span className='rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary'>
                      {selectedStudentIds.length} seleccionados
                    </span>
                  </div>
                  <p className='text-xs text-muted-foreground'>Usa el buscador y marca los estudiantes a asignar.</p>
                </div>

                <div className='flex flex-wrap gap-2'>
                  <Buttons type='button' variant='outline' onClick={handleToggleAllFiltered}>
                    {allFilteredSelected ? 'Deseleccionar todos' : 'Seleccionar todos'}
                  </Buttons>
                  <Buttons
                    type='button'
                    variant='ghost'
                    onClick={() => setValue('student_ids', [], {shouldValidate: true})}
                    disabled={selectedStudentIds.length === 0}
                  >
                    Limpiar
                  </Buttons>
                </div>
              </div>

              <FormField
                id='bulk-student-search'
                value={studentQuery}
                onChange={e => setStudentQuery(e.target.value)}
                placeholder='Buscar estudiante'
                className='w-full'
              />

              {selectedStudents.length ? (
                <div className='flex flex-wrap gap-2 rounded-2xl border border-border/40 bg-background/40 p-3'>
                  {selectedStudents.slice(0, 10).map(student => (
                    <button
                      key={student.id}
                      type='button'
                      onClick={() => toggleStudent(student.id)}
                      className='inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary transition hover:bg-primary/15'
                    >
                      <span className='max-w-[14rem] truncate'>{student.label}</span>
                      <span className='text-primary/70'>×</span>
                    </button>
                  ))}
                  {selectedStudents.length > 10 ? (
                    <span className='rounded-full bg-muted px-3 py-1 text-xs font-semibold text-muted-foreground'>
                      +{selectedStudents.length - 10}
                    </span>
                  ) : null}
                </div>
              ) : (
                <div className='rounded-2xl border border-dashed border-border/50 bg-background/30 p-4 text-sm text-muted-foreground'>
                  Selecciona uno o más estudiantes para habilitar el guardado.
                </div>
              )}

              <div className='max-h-80 overflow-auto rounded-2xl border border-border/40 bg-card/40 p-3'>
                <div className='grid grid-cols-1 gap-2 md:grid-cols-2'>
                  {filteredStudents.map(student => {
                    const checked = selectedStudentIds.includes(student.id);
                    return (
                      <button
                        key={student.id}
                        type='button'
                        onClick={() => toggleStudent(student.id)}
                        className={`flex items-center justify-between gap-3 rounded-xl border px-3 py-2 text-left text-sm transition ${
                          checked
                            ? 'border-primary/40 bg-primary/10'
                            : 'border-border/40 bg-background/40 hover:bg-background/60'
                        }`}
                      >
                        <div className='min-w-0'>
                          <p className='truncate font-medium text-foreground'>{student.label}</p>
                          <p className='text-xs text-muted-foreground'>{student.id}</p>
                        </div>
                        <input
                          type='checkbox'
                          checked={checked}
                          onChange={() => toggleStudent(student.id)}
                          aria-label={`Seleccionar ${student.label}`}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>

              {errors.student_ids?.message ? (
                <p className='text-sm font-medium text-destructive'>{errors.student_ids.message}</p>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      <Buttons type='submit' loading={Boolean(submitting)} className='w-full'>
        {intlActions('saveGroupStudent')}
      </Buttons>
    </form>
  );
};
