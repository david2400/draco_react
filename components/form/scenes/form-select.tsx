import React from 'react';

import {ISelectOption, ISelectProps} from '@/components/form/models';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/inputs/scenes/select';
import {Label} from '@/components/label/scenes/label';
import {cn} from '@/lib/utils';
import {resolveErrorMessage, useFieldIds} from '../utils';

type RegisterOnChange = NonNullable<ISelectProps['onChange']>;
type RegisterOnBlur = NonNullable<ISelectProps['onBlur']>;

const getOptionValue = (option: ISelectOption, index: number) => {
  if (typeof option.value === 'string' && option.value.length > 0) {
    return option.value;
  }

  if (option.id) {
    return option.id;
  }

  return String(index);
};

const mapSizeToTriggerSize = (size: NonNullable<ISelectProps['size']>) =>
  size === 'sm' ? 'sm' : 'default';

export const FormSelectField = ({
  id,
  label,
  className,
  triggerClassName,
  data,
  placeholder,
  error,
  onValueChange,
  size = 'md',
  value,
  defaultValue,
  disabled,
  required,
  selectProps,
  ...registerRest
}: ISelectProps) => {
  const registerName = registerRest.name ?? id;
  const registerRef = registerRest.ref;
  const registerOnChange = registerRest.onChange as RegisterOnChange | undefined;
  const registerOnBlur = registerRest.onBlur as RegisterOnBlur | undefined;

  const {inputId, errorId} = useFieldIds({id, name: registerName});

  const errorMessage =
    resolveErrorMessage(error, registerName) ?? resolveErrorMessage(error, id);

  const hasError = Boolean(errorMessage);

  const hiddenInputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (!registerRef) {
      return;
    }

    const node = hiddenInputRef.current;

    if (typeof registerRef === 'function') {
      registerRef(node);
    } else if (typeof registerRef === 'object' && 'current' in registerRef) {
      (registerRef as React.MutableRefObject<HTMLInputElement | null>).current = node;
    }
  }, [registerRef]);

  const [internalValue, setInternalValue] = React.useState<string | undefined>(
    value ?? defaultValue ?? undefined,
  );

  React.useEffect(() => {
    if (value !== undefined) {
      setInternalValue(value);
    }
  }, [value]);

  const normalizedOptions = React.useMemo(
    () =>
      data.map((option, index) => {
        const optionValue = getOptionValue(option, index);
        return {
          key: option.id ?? optionValue ?? index,
          value: optionValue,
          label: option.label ?? option.value ?? option.id ?? optionValue,
          disabled: option.disabled ?? false,
        };
      }),
    [data],
  );

  const currentValue = value ?? internalValue;

  const handleValueChange = (nextValue: string) => {
    if (value === undefined) {
      setInternalValue(nextValue);
    }

    if (hiddenInputRef.current) {
      hiddenInputRef.current.value = nextValue;
    }

    onValueChange?.(nextValue);

    if (registerOnChange && registerName) {
      registerOnChange({
        target: {name: registerName, value: nextValue},
        type: 'change',
      } as unknown as React.ChangeEvent<HTMLInputElement>);
    }
  };

  const handleBlur = () => {
    if (registerOnBlur && registerName) {
      registerOnBlur({
        target: {name: registerName},
        type: 'blur',
      } as unknown as React.FocusEvent<HTMLInputElement>);
    }
  };

  React.useEffect(() => {
    if (hiddenInputRef.current && currentValue !== undefined) {
      hiddenInputRef.current.value = currentValue;
    }
  }, [currentValue]);

  return (
    <div className={cn('flex w-full flex-col gap-2', className)}>
      {label ? (
        <Label htmlFor={inputId} className='text-sm font-semibold'>
          {label}
        </Label>
      ) : null}

      <Select
        value={currentValue ?? undefined}
        defaultValue={defaultValue}
        onValueChange={handleValueChange}
        disabled={disabled}
        {...selectProps}
      >
        <SelectTrigger
          id={inputId}
          data-size={mapSizeToTriggerSize(size)}
          className={cn(triggerClassName)}
          aria-invalid={hasError || undefined}
          aria-describedby={hasError ? errorId : undefined}
          onBlur={handleBlur}
          data-invalid={hasError || undefined}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {normalizedOptions.map(option => (
            <SelectItem key={option.key} value={option.value} disabled={option.disabled}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <input
        ref={hiddenInputRef}
        type='hidden'
        id={`${inputId}-input`}
        name={registerName}
        defaultValue={defaultValue}
        required={required}
        disabled={disabled}
      />

      {hasError ? (
        <span id={errorId} className='text-destructive text-sm font-medium'>
          {errorMessage}
        </span>
      ) : null}
    </div>
  );
};
