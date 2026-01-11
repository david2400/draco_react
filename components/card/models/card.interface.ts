import {HTMLAttributes, ReactNode} from 'react';

export interface ICard extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  title?: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  footer?: ReactNode;
  headerClassName?: string;
  contentClassName?: string;
  footerClassName?: string;
  disableContentWrapper?: boolean;
  tooltipTitle?: string;
}
