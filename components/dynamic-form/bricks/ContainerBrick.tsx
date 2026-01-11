'use client';

import classNames from 'classnames';
import {BrickComponentProps} from '../BrickRenderer';
import {ContainerBrick} from '@/types/formSchema';

export const ContainerBrickRenderer = ({brick, renderChildren}: BrickComponentProps<ContainerBrick>) => {
  const className = typeof brick.data.className === 'string' ? brick.data.className : undefined;

  return (
    <div
      className={classNames(
        'flex flex-col gap-8 rounded-[1.8rem] border border-border/70 bg-card/85 px-6 py-8 shadow-[0_32px_90px_-55px_hsl(var(--ring))] backdrop-blur-sm sm:px-10 sm:py-10',
        className,
      )}
    >
      {renderChildren(brick.bricks)}
    </div>
  );
};
