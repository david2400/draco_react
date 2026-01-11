import React from 'react';

export interface ListItemData {
  label: string;
  icon?: React.ComponentType<{className?: string}> | React.ReactNode;
  href?: string;
  options?: ListItemData[];
  itemClassName?: string;
  triggerClassName?: string;
  contentClassName?: string;
}

export interface CollapseProps {
  title?: React.ReactNode;
  items: ListItemData[];
  className?: string;
  listClassName?: string;
  itemClassName?: string;
  triggerClassName?: string;
  contentClassName?: string;
}
