import React from 'react';

import {ICheckboxProps} from '@/components/form/models';
import {Checkbox} from '@/components/inputs/scenes/checkbox';
import {Label} from '@/components/label/scenes/label';
import {cn} from '@/lib/utils';
import {resolveErrorMessage, useFieldIds} from '../utils';

const getItemValue = (value: ICheckboxProps['items'][number], index: number) => {
  if (value?.value) {
    return value.value;
  }

  if (value?.id) {
    return value.id;
  }

  return String(index);
};

export const FormCheckboxField = ({
  className,
  id,
  label,
  items,
  value,
  defaultValue,
  error,
  onValueChange,
  ...registerRest
}: ICheckboxProps) => {
  const registerName = registerRest.name ?? id;
  const registerRef = registerRest.ref;
  const registerOnChange = registerRest.onChange;
  const registerOnBlur = registerRest.onBlur;

  const {inputId, errorId} = useFieldIds({id, name: registerName});

  const errorMessage =
    resolveErrorMessage(error, registerName) ?? resolveErrorMessage(error, id);

  const hasError = Boolean(errorMessage);

  const normalizedItems = React.useMemo(
    () =>
      items.map((item, index) => {
        const itemValue = getItemValue(item, index);
        const itemId = item.id ?? `${inputId}-option-${index}`;

        return {
          id: itemId,
          value: itemValue,
          label: item.label ?? itemValue,
          description: item.description,
          icon: item.icon,
          disabled: Boolean(item.disabled),
        };
      }),
    [items, inputId],
  );

  const [internalValue, setInternalValue] = React.useState<string[]>(() => {
    if (Array.isArray(value)) {
      return value;
    }

    if (Array.isArray(defaultValue)) {
      return defaultValue;
    }

    return [];
  });

  React.useEffect(() => {
    if (Array.isArray(value)) {
      setInternalValue(value);
    }
  }, [value?.join(',')]);

  const currentValues = React.useMemo(() => {
    if (Array.isArray(value)) {
      return value;
    }

    return internalValue;
  }, [value, internalValue]);

  const hiddenInputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (!registerRef) {
      return;
    }

    const node = hiddenInputRef.current;

    if (typeof registerRef === 'function') {
      registerRef(node);
    } else if (registerRef && 'current' in registerRef) {
      (registerRef as React.MutableRefObject<HTMLInputElement | null>).current = node;
    }
  }, [registerRef]);

  React.useEffect(() => {
    if (hiddenInputRef.current) {
      hiddenInputRef.current.value = JSON.stringify(currentValues);
    }
  }, [currentValues]);

  const emitChange = React.useCallback(
    (nextValues: string[]) => {
      onValueChange?.(nextValues);

      if (registerOnChange && registerName) {
        registerOnChange({
          target: {name: registerName, value: nextValues},
          type: 'change',
        } as unknown as React.ChangeEvent<HTMLInputElement>);
      }
    },
    [onValueChange, registerOnChange, registerName],
  );

  const handleItemChange = (itemValue: string, checked: boolean) => {
    const nextValues = checked
      ? Array.from(new Set([...currentValues, itemValue]))
      : currentValues.filter(valueItem => valueItem !== itemValue);

    if (!Array.isArray(value)) {
      setInternalValue(nextValues);
    }

    emitChange(nextValues);
  };

  const handleBlur = () => {
    if (registerOnBlur && registerName) {
      registerOnBlur({
        target: {name: registerName},
        type: 'blur',
      } as unknown as React.FocusEvent<HTMLInputElement>);
    }
  };

  return (
    <div className={cn('flex w-full flex-col gap-2', className)}>
      {label ? (
        <Label htmlFor={inputId} className='text-sm font-semibold'>
          {label}
        </Label>
      ) : null}

      <div
        role='group'
        aria-labelledby={label ? inputId : undefined}
        aria-invalid={hasError || undefined}
        aria-describedby={hasError ? errorId : undefined}
        className='flex flex-col gap-2'
        onBlur={handleBlur}
      >
        {normalizedItems.map(item => {
          const isChecked = currentValues.includes(item.value);

          return (
            <div
              key={item.id}
              className={cn(
                'flex items-start gap-3 rounded-lg border border-input/60 p-3 transition-shadow data-[checked=true]:border-primary data-[checked=true]:shadow-sm',
                item.disabled && 'opacity-50',
              )}
              data-checked={isChecked || undefined}
            >
              <Checkbox
                id={item.id}
                checked={isChecked}
                onCheckedChange={checked =>
                  handleItemChange(item.value, checked === true)
                }
                disabled={item.disabled}
                aria-describedby={item.description ? `${item.id}-description` : undefined}
                aria-invalid={hasError || undefined}
              />

              <div className='flex flex-1 flex-col gap-1'>
                <Label htmlFor={item.id} className='flex items-center gap-2 text-sm font-medium'>
                  {item.icon ? <span className='text-muted-foreground'>{item.icon}</span> : null}
                  <span>{item.label}</span>
                </Label>
                {item.description ? (
                  <span id={`${item.id}-description`} className='text-muted-foreground text-sm'>
                    {item.description}
                  </span>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>

      <input
        ref={hiddenInputRef}
        type='hidden'
        id={`${inputId}-values`}
        name={registerName}
        defaultValue={JSON.stringify(defaultValue ?? [])}
      />

      {hasError ? (
        <span id={errorId} className='text-destructive text-sm font-medium'>
          {errorMessage}
        </span>
      ) : null}
    </div>
  );
};
