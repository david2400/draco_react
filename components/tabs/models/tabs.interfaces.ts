import React from 'react';

import {Tabs as UITabs} from '@/components/tabs/scenes/tabs';

export interface ITabItemsProps {
  title: React.ReactNode;
  value: string;
  children: React.ReactNode;
}

type BaseTabsProps = Omit<React.ComponentProps<typeof UITabs>, 'children'>;

export interface ITabviewsProps extends BaseTabsProps {
  data: Array<ITabItemsProps>;
  listClassName?: string;
  triggerClassName?: string;
  contentClassName?: string;
}
