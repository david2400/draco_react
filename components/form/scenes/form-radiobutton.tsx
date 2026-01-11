import React from 'react';

import {IRadioProps} from '@/components/form/models';
import {Label} from '@/components/label/scenes/label';
import {resolveErrorMessage, useFieldIds} from '../utils';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';

import {cn} from '@/lib/utils';
import { BiCircle } from 'react-icons/bi';

const getItemValue = (item: IRadioProps['items'][number], index: number) => {
  if (item.value) {
    return item.value;
  }

  if (item.id) {
    return item.id;
  }

  return String(index);
};

export const FormRadioButtonField = ({
  className,
  id,
  label,
  items,
  value,
  defaultValue,
  error,
  onValueChange,
  ...registerRest
}: IRadioProps) => {
  const registerName = registerRest.name ?? id;
  const registerRef = registerRest.ref;
  const registerOnChange = registerRest.onChange;
  const registerOnBlur = registerRest.onBlur;

  const {inputId, errorId} = useFieldIds({id, name: registerName});

  const errorMessage = resolveErrorMessage(error, registerName) ?? resolveErrorMessage(error, id);

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
    [items, inputId]
  );

  const [internalValue, setInternalValue] = React.useState<string | undefined>(() => {
    if (value !== undefined) {
      return value;
    }

    if (defaultValue !== undefined) {
      return defaultValue;
    }

    return undefined;
  });

  React.useEffect(() => {
    if (value !== undefined) {
      setInternalValue(value);
    }
  }, [value]);

  const currentValue = value ?? internalValue;

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
      hiddenInputRef.current.value = currentValue ?? '';
    }
  }, [currentValue]);

  const emitChange = React.useCallback(
    (nextValue: string) => {
      onValueChange?.(nextValue);

      if (registerOnChange && registerName) {
        registerOnChange({
          target: {name: registerName, value: nextValue},
          type: 'change',
        } as unknown as React.ChangeEvent<HTMLInputElement>);
      }
    },
    [onValueChange, registerOnChange, registerName]
  );

  const handleValueChange = (nextValue: string) => {
    if (value === undefined) {
      setInternalValue(nextValue);
    }

    emitChange(nextValue);
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

      <RadioGroup
        value={currentValue}
        defaultValue={defaultValue}
        onValueChange={handleValueChange}
        aria-labelledby={label ? inputId : undefined}
        aria-invalid={hasError || undefined}
        aria-describedby={hasError ? errorId : undefined}
        className='flex flex-col gap-2'
        onBlur={handleBlur}
      >
        {normalizedItems.map(item => {
          const descriptionId = item.description ? `${item.id}-description` : undefined;

          return (
            <div
              key={item.id}
              className={cn(
                'flex items-start gap-3 rounded-lg border border-input/60 p-3 transition-shadow data-[checked=true]:border-primary data-[checked=true]:shadow-sm',
                item.disabled && 'opacity-50'
              )}
              data-checked={currentValue === item.value || undefined}
            >
              <RadioGroupItem
                id={item.id}
                value={item.value}
                disabled={item.disabled}
                aria-describedby={descriptionId}
                aria-invalid={hasError || undefined}
              />

              <div className='flex flex-1 flex-col gap-1'>
                <Label htmlFor={item.id} className='flex items-center gap-2 text-sm font-medium'>
                  {item.icon ? <span className='text-muted-foreground'>{item.icon}</span> : null}
                  <span>{item.label}</span>
                </Label>
                {item.description ? (
                  <span id={descriptionId} className='text-muted-foreground text-sm'>
                    {item.description}
                  </span>
                ) : null}
              </div>
            </div>
          );
        })}
      </RadioGroup>

      <input
        ref={hiddenInputRef}
        type='hidden'
        id={`${inputId}-value`}
        name={registerName}
        defaultValue={defaultValue}
      />

      {hasError ? (
        <span id={errorId} className='text-destructive text-sm font-medium'>
          {errorMessage}
        </span>
      ) : null}
    </div>
  );
};

function RadioGroup({className, ...props}: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
  return (
    <RadioGroupPrimitive.Root
      data-slot='radio-group'
      className={cn('grid gap-3', className)}
      {...props}
    />
  );
}

function RadioGroupItem({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Item>) {
  return (
    <RadioGroupPrimitive.Item
      data-slot='radio-group-item'
      className={cn(
        'border-input text-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 aspect-square size-4 shrink-0 rounded-full border shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator
        data-slot='radio-group-indicator'
        className='relative flex items-center justify-center'
      >
        <BiCircle className='fill-primary absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2' />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
}

export {RadioGroup, RadioGroupItem};
