import React from 'react';

import {Dialog} from '@/components/modals/scenes/dialog/dialog';

type BaseDialogProps = Omit<React.ComponentProps<typeof Dialog>, 'children'>;

export interface IDialog extends BaseDialogProps {
  title?: React.ReactNode;
  description?: React.ReactNode;
  footer?: React.ReactNode;
  children?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  contentClassName?: string;
  headerClassName?: string;
  bodyClassName?: string;
  footerClassName?: string;
  showCloseButton?: boolean;
  hideDefaultFooter?: boolean;
  cancelText?: React.ReactNode;
}
