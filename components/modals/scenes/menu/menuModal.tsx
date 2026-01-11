'use client';

import React from 'react';

import {IDrawer} from '@/components/modals/models/drawer.interfaces';
import {Buttons} from '@/components/buttons/scenes';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerTitle,
} from '@/components/modals/scenes/drawer/drawer';
import {cn} from '@/lib/utils';
import {IoClose} from 'react-icons/io5';

const placementToDirection: Record<
  NonNullable<IDrawer['placement']>,
  'left' | 'right' | 'top' | 'bottom'
> = {
  left: 'left',
  right: 'right',
  top: 'top',
  bottom: 'bottom',
};

export function MenuModal({
  title,
  description,
  footer,
  children,
  placement = 'right',
  contentClassName,
  headerClassName,
  bodyClassName,
  footerClassName,
  showCloseButton = true,
  closeButtonLabel = 'Cerrar',
  className,
  ...drawerProps
}: IDrawer) {
  const direction = placementToDirection[placement] ?? 'right';
  const contentClasses = cn(
    'z-[9999] will-change-transform border-border/70 bg-white dark:bg-[hsl(var(--card))] shadow-[0_25px_60px_-38px_hsl(var(--ring))]',
    className,
    contentClassName,
  );

  return (
    <Drawer direction={direction} {...drawerProps}>
      <DrawerContent className={contentClasses}>
        {title || description || showCloseButton ? (
          <DrawerHeader className={cn('border-b border-border/60 px-6 py-5', headerClassName)}>
            <div className='flex items-start justify-between gap-5'>
              <div className='flex flex-col gap-1.5'>
                {title ? <DrawerTitle className='text-lg font-semibold text-foreground'>{title}</DrawerTitle> : null}
                {description ? (
                  <DrawerDescription className='text-sm text-muted-foreground/90'>
                    {description}
                  </DrawerDescription>
                ) : null}
              </div>
              {showCloseButton ? (
                <DrawerClose asChild>
                  <Buttons
                    variant='ghost'
                    size='icon'
                    className='h-9 w-9 rounded-full border border-transparent transition-colors hover:border-border/70 hover:bg-background/80'
                    aria-label={typeof closeButtonLabel === 'string' ? closeButtonLabel : undefined}
                    title={typeof closeButtonLabel === 'string' ? closeButtonLabel : undefined}
                  >
                    <IoClose className='h-4 w-4' />
                    <span className='sr-only'>{closeButtonLabel}</span>
                  </Buttons>
                </DrawerClose>
              ) : null}
            </div>
          </DrawerHeader>
        ) : null}

        <div className={cn('flex flex-col gap-4 px-6 py-5', bodyClassName)}>{children}</div>

        {footer ? (
          <DrawerFooter className={cn('border-t border-border/60 px-6 py-5', footerClassName)}>
            {footer}
          </DrawerFooter>
        ) : null}
      </DrawerContent>
    </Drawer>
  );
}
