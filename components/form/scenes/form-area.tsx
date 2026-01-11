import React from 'react';

import {ITextAreaProps} from '@/components/form/models';
import {Label} from '@/components/label/scenes/label';
import {cn} from '@/lib/utils';
import {resolveErrorMessage, useFieldIds} from '../utils';

const textareaSizeVariants: Record<NonNullable<ITextAreaProps['size']>, string> = {
  sm: 'min-h-20 text-sm',
  md: 'min-h-28 text-base md:text-sm',
  lg: 'min-h-36 text-base',
};

export const FormTextAreaField = ({
  id,
  label,
  className,
  classNameInput,
  error,
  size = 'md',
  ...props
}: ITextAreaProps) => {
  const registerName = props.name ?? id;
  const {inputId, errorId} = useFieldIds({id, name: registerName});

  const errorMessage = resolveErrorMessage(error, registerName) ?? resolveErrorMessage(error, id);

  const hasError = Boolean(errorMessage);

  const textareaClassName = cn(textareaSizeVariants[size], classNameInput);

  return (
    <div className={cn('flex w-full flex-col gap-2', className)}>
      {label ? (
        <Label htmlFor={inputId} className='text-sm font-semibold'>
          {label}
        </Label>
      ) : null}

      <Textarea
        id={inputId}
        className={textareaClassName}
        aria-invalid={hasError || undefined}
        aria-describedby={hasError ? errorId : undefined}
        {...props}
      />

      {hasError ? (
        <span id={errorId} className='text-destructive text-sm font-medium'>
          {errorMessage}
        </span>
      ) : null}
    </div>
  );
};

const Textarea = React.forwardRef<HTMLTextAreaElement, React.ComponentProps<'textarea'>>(
  ({className, ...props}, ref) => {
    return (
      <textarea
        ref={ref}
        data-slot='textarea'
        className={cn(
          'border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          className
        )}
        {...props}
      />
    );
  }
);

Textarea.displayName = 'Textarea';

export {Textarea};
