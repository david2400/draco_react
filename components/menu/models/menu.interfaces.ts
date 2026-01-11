import type {ReactElement, ReactNode} from 'react';

export interface MenuItemData {
  label: string;
  icon?: ReactNode;
  href?: string;
  description?: string;
  badge?: ReactNode;
  disabled?: boolean;
  onSelect?: () => void;
  options?: MenuItemData[];
}

export interface MenusProps {
  title: string;
  items: MenuItemData;
  trigger?: ReactElement;
  triggerClassName?: string;
  align?: 'start' | 'center' | 'end';
  sideOffset?: number;
  onItemSelect?: (item: MenuItemData) => void;
}
