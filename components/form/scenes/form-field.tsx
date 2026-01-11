import React from 'react';

import {IInputProps} from '@/components/form/models';
import {Input} from '@/components/inputs/scenes/input';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/inputs/scenes/input-group';
import {Label} from '@/components/label/scenes/label';
import {cn} from '@/lib/utils';
import {resolveErrorMessage, useFieldIds} from '../utils';

const inputSizeVariants: Record<NonNullable<IInputProps['size']>, string> = {
  sm: 'h-8 text-sm',
  md: 'h-9 text-base md:text-sm',
  lg: 'h-11 text-base',
};

export const FormField = ({
  id,
  label,
  className,
  classNameInput,
  error,
  icon,
  size = 'md',
  color: _color,
  ...props
}: IInputProps) => {
  const registerName = typeof props.name === 'string' ? props.name : undefined;
  const {inputId, errorId} = useFieldIds({id, name: registerName});

  const errorMessage =
    resolveErrorMessage(error, registerName) ?? resolveErrorMessage(error, id);

  const hasError = Boolean(errorMessage);
  const describedBy = hasError ? errorId : undefined;

  const inputClassName = cn(
    size ? inputSizeVariants[size] : inputSizeVariants.md,
    classNameInput,
  );

  const inputSharedProps = {
    ...props,
    id: inputId,
    'aria-invalid': hasError || undefined,
    'aria-describedby': describedBy,
    className: inputClassName,
  } as const;

  return (
    <div className={cn('flex w-full flex-col gap-2', className)}>
      {label ? (
        <Label htmlFor={inputId} className='text-sm font-semibold'>
          {label}
        </Label>
      ) : null}

      {icon ? (
        <InputGroup data-invalid={hasError}>
          <InputGroupAddon className='text-muted-foreground'>
            {icon}
          </InputGroupAddon>
          <InputGroupInput {...inputSharedProps} />
        </InputGroup>
      ) : (
        <Input {...inputSharedProps} />
      )}

      {hasError ? (
        <span id={describedBy} className='text-destructive text-sm font-medium'>
          {errorMessage}
        </span>
      ) : null}
    </div>
  );
};
