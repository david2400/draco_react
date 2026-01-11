import type * as SelectPrimitive from '@radix-ui/react-select';
import type {UseFormRegisterReturn} from 'react-hook-form';
import {ComponentProps, InputHTMLAttributes, ReactNode} from 'react';

export interface ITextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  type?: string;
  label?: string;
  error?: unknown;
  className?: string;
  classNameInput?: string;
  size?: 'sm' | 'md' | 'lg';
}

export interface ISelectOption {
  id?: string;
  value: string;
  label?: ReactNode;
  disabled?: boolean;
}

export interface ISelectProps<TOption = ISelectOption>
  extends Partial<UseFormRegisterReturn> {
  id?: string;
  data: TOption[];
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  label?: ReactNode;
  error?: unknown;
  onValueChange?: (value: string) => void;
  className?: string;
  triggerClassName?: string;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  required?: boolean;
  selectProps?: Omit<ComponentProps<typeof SelectPrimitive.Root>, 'value' | 'defaultValue' | 'onValueChange' | 'disabled'>;
}

export interface IInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: ReactNode;
  error?: unknown;
  icon?: React.ReactNode;
  className?: string;
  classNameInput?: string;
  size?: 'sm' | 'md' | 'lg';
  color?: string;
}

export interface IRadioItem {
  id: string;
  label: ReactNode;
  description?: ReactNode;
  icon?: ReactNode;
  value?: string;
  disabled?: boolean;
}

export interface IRadioProps extends Partial<UseFormRegisterReturn> {
  id?: string;
  label?: ReactNode;
  items: IRadioItem[];
  value?: string;
  defaultValue?: string;
  error?: unknown;
  onValueChange?: (value: string) => void;
  className?: string;
}

export interface ICheckboxItem {
  id: string;
  label: ReactNode;
  description?: ReactNode;
  icon?: ReactNode;
  value?: string;
  disabled?: boolean;
}

export interface ICheckboxProps extends Partial<UseFormRegisterReturn> {
  id?: string;
  label?: ReactNode;
  items: ICheckboxItem[];
  value?: string[];
  defaultValue?: string[];
  error?: unknown;
  onValueChange?: (value: string[]) => void;
  className?: string;
}
