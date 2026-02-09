'use client';

import {useTranslations} from 'next-intl';
import React from 'react';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';
import {FormField} from '@repo/ui/form/scenes/form-field';
import {FormTextAreaField} from '@repo/ui/form/scenes/form-area';
import {Buttons} from '@repo/ui/buttons/scenes/index';
import {IFormProps} from '@repo/ui/form/models/form.interface';
import {QuestionBankPicker} from '../components/question-bank-picker';
import {CriteriaPicker} from '../components/criteria-picker';

export const FormExam = ({initialValues, validationSchema, onSubmit}: IFormProps<any>) => {
  const intl = useTranslations('ControlAcademico.exams');
  const intlActions = useTranslations('ControlAcademico.actions');
  type ExamInputs = z.infer<typeof validationSchema>;

  const steps = [
    {id: 'basic', title: 'Datos básicos'},
    {id: 'associations', title: 'Preguntas y criterios'},
    {id: 'review', title: 'Revisión'},
  ] as const;

  const [activeStep, setActiveStep] = React.useState(0);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    trigger,
    formState: {errors, isSubmitting},
  } = useForm<ExamInputs>({
    resolver: zodResolver(validationSchema),
    defaultValues: initialValues,
  });

  const selectedQuestionIds = watch('question_ids') ?? [];
  const selectedCriteriaIds = watch('criteria_ids') ?? [];

  const values = watch();

  const validateStep = React.useCallback(async () => {
    if (activeStep === 0) {
      return trigger(['nombre', 'code', 'subject', 'grade_level', 'scheduled_date', 'duration', 'instructions'] as any);
    }

    if (activeStep === 1) {
      return trigger(['question_ids', 'criteria_ids'] as any);
    }

    return true;
  }, [activeStep, trigger]);

  const handleNext = React.useCallback(async () => {
    const ok = await validateStep();
    if (!ok) return;
    setActiveStep(prev => Math.min(prev + 1, steps.length - 1));
  }, [steps.length, validateStep]);

  const handleBack = React.useCallback(() => {
    setActiveStep(prev => Math.max(prev - 1, 0));
  }, []);

  const StepHeader = (
    <div className='col-span-12 rounded-2xl border border-border/60 bg-muted/10 px-4 py-3'>
      <p className='text-sm font-semibold text-foreground'>{intl('title')}</p>
      <p className='text-xs text-muted-foreground'>{intl('description')}</p>
      <div className='mt-3 flex flex-wrap gap-2'>
        {steps.map((step, idx) => {
          const isActive = idx === activeStep;
          const isDone = idx < activeStep;
          return (
            <span
              key={step.id}
              className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : isDone
                    ? 'border border-border bg-background text-foreground'
                    : 'border border-border text-muted-foreground'
              }`}
            >
              {idx + 1}. {step.title}
            </span>
          );
        })}
      </div>
    </div>
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
      <div className='grid grid-cols-12 gap-4'>
        {StepHeader}

        {activeStep === 0 ? (
          <>
            <FormField
              id='nombre'
              label={intl('fields.name')}
              className='col-span-12 md:col-span-6'
              error={errors.nombre?.message}
              {...register('nombre')}
            />
            <FormField
              id='code'
              label={intl('fields.code')}
              className='col-span-12 md:col-span-6'
              error={errors.code?.message}
              {...register('code')}
            />
            <FormField
              id='subject'
              label={intl('fields.subject')}
              className='col-span-12 md:col-span-6'
              error={errors.subject?.message}
              {...register('subject')}
            />
            <FormField
              id='grade_level'
              label={intl('fields.grade_level')}
              className='col-span-12 md:col-span-6'
              error={errors.grade_level?.message}
              {...register('grade_level')}
            />
            <FormField
              id='scheduled_date'
              type='date'
              label={intl('fields.scheduled_date')}
              className='col-span-12 md:col-span-6'
              error={errors.scheduled_date?.message}
              {...register('scheduled_date')}
            />
            <FormField
              id='duration'
              label={intl('fields.duration')}
              className='col-span-12 md:col-span-6'
              error={errors.duration?.message}
              {...register('duration')}
            />
            <FormTextAreaField
              id='instructions'
              label={intl('fields.instructions')}
              className='col-span-12'
              error={errors.instructions?.message}
              {...register('instructions')}
            />
          </>
        ) : null}

        {activeStep === 1 ? (
          <>
            <div className='col-span-12'>
              <QuestionBankPicker
                title={intl('fields.question_ids')}
                description='Selecciona preguntas del banco y valida la respuesta esperada antes de guardar.'
                value={selectedQuestionIds}
                onChange={next => {
                  setValue('question_ids', next as any, {shouldDirty: true, shouldValidate: true});
                }}
              />
              {errors.question_ids?.message ? (
                <p className='mt-2 text-sm font-medium text-destructive'>{String(errors.question_ids.message)}</p>
              ) : null}
            </div>

            <div className='col-span-12'>
              <CriteriaPicker
                title='Criterios de evaluación'
                description='Asocia uno o varios criterios para calificar este examen.'
                value={selectedCriteriaIds}
                onChange={next => {
                  setValue('criteria_ids', next as any, {shouldDirty: true, shouldValidate: true});
                }}
              />
              {errors.criteria_ids?.message ? (
                <p className='mt-2 text-sm font-medium text-destructive'>{String(errors.criteria_ids.message)}</p>
              ) : null}
            </div>
          </>
        ) : null}

        {activeStep === 2 ? (
          <div className='col-span-12 space-y-3 rounded-2xl border border-border/60 bg-background px-5 py-4'>
            <p className='text-sm font-semibold text-foreground'>Revisión antes de guardar</p>
            <div className='grid grid-cols-12 gap-3 text-sm'>
              <div className='col-span-12 md:col-span-6'>
                <p className='text-xs font-semibold uppercase tracking-wide text-muted-foreground'>Nombre</p>
                <p className='font-semibold text-foreground'>{(values as any).nombre || '-'}</p>
              </div>
              <div className='col-span-12 md:col-span-6'>
                <p className='text-xs font-semibold uppercase tracking-wide text-muted-foreground'>Código</p>
                <p className='font-semibold text-foreground'>{(values as any).code || '-'}</p>
              </div>
              <div className='col-span-12 md:col-span-6'>
                <p className='text-xs font-semibold uppercase tracking-wide text-muted-foreground'>Asignatura</p>
                <p className='font-semibold text-foreground'>{(values as any).subject || '-'}</p>
              </div>
              <div className='col-span-12 md:col-span-6'>
                <p className='text-xs font-semibold uppercase tracking-wide text-muted-foreground'>Grado</p>
                <p className='font-semibold text-foreground'>{(values as any).grade_level || '-'}</p>
              </div>
              <div className='col-span-12 md:col-span-6'>
                <p className='text-xs font-semibold uppercase tracking-wide text-muted-foreground'>Fecha</p>
                <p className='font-semibold text-foreground'>{(values as any).scheduled_date || '-'}</p>
              </div>
              <div className='col-span-12 md:col-span-6'>
                <p className='text-xs font-semibold uppercase tracking-wide text-muted-foreground'>Duración</p>
                <p className='font-semibold text-foreground'>{(values as any).duration ? `${(values as any).duration} min` : '-'}</p>
              </div>
              <div className='col-span-12'>
                <p className='text-xs font-semibold uppercase tracking-wide text-muted-foreground'>Preguntas</p>
                <p className='font-semibold text-foreground'>{selectedQuestionIds.length}</p>
              </div>
              <div className='col-span-12'>
                <p className='text-xs font-semibold uppercase tracking-wide text-muted-foreground'>Criterios</p>
                <p className='font-semibold text-foreground'>{selectedCriteriaIds.length}</p>
              </div>
            </div>
          </div>
        ) : null}
      </div>

      <div className='flex flex-col gap-3 md:flex-row md:items-center md:justify-between'>
        <Buttons type='button' variant='outline' onClick={handleBack} disabled={activeStep === 0 || isSubmitting}>
          Atrás
        </Buttons>

        {activeStep < steps.length - 1 ? (
          <Buttons type='button' onClick={handleNext} disabled={isSubmitting}>
            Siguiente
          </Buttons>
        ) : (
          <Buttons type='submit' loading={isSubmitting} className='w-full md:w-auto'>
            {intlActions('saveExam')}
          </Buttons>
        )}
      </div>
    </form>
  );
};
