'use client';

import React from 'react';

import {IDialog} from '@/components/modals/models/dialog.interfaces';
import {Buttons} from '@/components/buttons/scenes';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from '@/components/modals/scenes/dialog/dialog';
import {cn} from '@/lib/utils';

const dialogSizeVariants: Record<NonNullable<IDialog['size']>, string> = {
  sm: 'sm:max-w-md',
  md: 'sm:max-w-lg',
  lg: 'sm:max-w-2xl',
  xl: 'sm:max-w-4xl',
  full: 'sm:max-w-[90vw] sm:max-h-[90vh]',
};

export function Modal({
  title,
  description,
  footer,
  children,
  size = 'md',
  contentClassName,
  headerClassName,
  bodyClassName,
  footerClassName,
  showCloseButton = true,
  hideDefaultFooter,
  cancelText = 'Cancelar',
  ...dialogProps
}: IDialog) {
  const sizeClassName = dialogSizeVariants[size];

  return (
    <Dialog {...dialogProps}>
      <DialogContent
        showCloseButton={showCloseButton}
        className={cn(sizeClassName, 'bg-white', contentClassName)}
      >
        {title || description ? (
          <DialogHeader className={cn(headerClassName)}>
            {title ? <DialogTitle>{title}</DialogTitle> : null}
            {description ? <DialogDescription>{description}</DialogDescription> : null}
          </DialogHeader>
        ) : null}

        <div className={cn('flex flex-col gap-4', bodyClassName)}>{children}</div>

        {footer ? (
          <DialogFooter className={cn(footerClassName)}>{footer}</DialogFooter>
        ) : hideDefaultFooter ? null : (
          <DialogFooter className={cn('justify-end', footerClassName)}>
            <DialogClose asChild>
              <Buttons variant='outline' type='button'>
                {cancelText ?? 'Cancelar'}
              </Buttons>
            </DialogClose>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
