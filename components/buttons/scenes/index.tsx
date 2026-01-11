import React from 'react';

import {IButtonProps} from '@/components/buttons/models';
import {Button} from '@/components/buttons/scenes/button';
import {Spinner} from '@repo/ui/spinners/scenes/spinner';
import {cn} from '@/lib/utils';

export const Buttons = ({
  className,
  loading,
  children,
  leftIcon,
  rightIcon,
  disabled,
  asChild,
  variant,
  size,
  ...rest
}: IButtonProps) => {
  const isDisabled = disabled || loading;

  return (
    <Button
      className={cn('gap-2', className)}
      disabled={isDisabled}
      asChild={asChild}
      variant={variant}
      size={size}
      aria-busy={loading || undefined}
      {...rest}
    >
      {leftIcon ? <span className='flex items-center'>{leftIcon}</span> : null}
      {loading ? <Spinner className='size-4' /> : null}
      {children ? <span className='flex items-center'>{children}</span> : null}
      {rightIcon ? <span className='flex items-center'>{rightIcon}</span> : null}
    </Button>
  );
};
