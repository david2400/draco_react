import React from 'react';

import {Button as UIButton} from '@/components/buttons/scenes/button';

type BaseButtonProps = React.ComponentProps<typeof UIButton>;

export interface IButtonProps extends Omit<BaseButtonProps, 'children'> {
  children?: React.ReactNode;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}
