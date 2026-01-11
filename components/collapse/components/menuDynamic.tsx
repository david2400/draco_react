'use client';
import React from 'react';
import {BiCloset} from 'react-icons/bi';
import {useTranslations} from 'next-intl';
import {Lists} from '../scenes';
import {ListItemData} from '../models/collapse.interfaces';

export const MenuDynamic = ({data}: {data: ListItemData[]}) => {
  const t = useTranslations('Menu');

  return <Lists title='Menu' items={data}></Lists>;
};
