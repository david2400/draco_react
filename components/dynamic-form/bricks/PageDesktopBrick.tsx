'use client';

import {PageDesktopBrick} from '@/types/formSchema';
import {PageDesktop} from '@/components/dynamic-form/ui/PageDesktop';
import {BrickComponentProps} from '../BrickRenderer';

export const PageDesktopBrickRenderer = ({brick, renderChildren}: BrickComponentProps<PageDesktopBrick>) => {
  return <PageDesktop data={brick.data}>{renderChildren(brick.bricks)}</PageDesktop>;
};
