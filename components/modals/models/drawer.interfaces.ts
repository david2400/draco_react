import React from 'react';
import { Drawer } from '../scenes/drawer/drawer';


type BaseDrawerProps = Omit<React.ComponentProps<typeof Drawer>, 'children' | 'direction' | 'fadeFromIndex'>;

export interface IDrawer extends BaseDrawerProps {
  title?: React.ReactNode;
  description?: React.ReactNode;
  footer?: React.ReactNode;
  className?:string
  children?: React.ReactNode;
  placement?: 'left' | 'right' | 'top' | 'bottom';
  contentClassName?: string;
  headerClassName?: string;
  bodyClassName?: string;
  footerClassName?: string;
  showCloseButton?: boolean;
  closeButtonLabel?: string;
}
