import React from 'react';

import {ITabviewsProps} from '../models/tabs.interfaces';
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/tabs/scenes/tabs';
import {cn} from '@/lib/utils';

export const TabViews = ({
  data,
  className,
  listClassName,
  triggerClassName,
  contentClassName,
  orientation = 'horizontal',
  ...props
}: ITabviewsProps) => {
  return (
    <Tabs
      orientation={orientation}
      className={cn('flex w-full flex-col gap-4', className)}
      {...props}
    >
      <TabsList
        className={cn(
          'rounded-none border-b border-border bg-transparent p-0 gap-1',
          orientation === 'vertical' && 'flex-col border-b-0 border-r',
          listClassName,
        )}
      >
        {data.map(item => (
          <TabsTrigger
            key={item.value}
            value={item.value}
            className={cn(
              'rounded-none border-b-2 border-transparent px-4 py-2 text-sm font-medium transition-colors data-[state=active]:border-primary data-[state=active]:text-foreground',
              triggerClassName,
            )}
          >
            {item.title}
          </TabsTrigger>
        ))}
      </TabsList>

      {data.map(item => (
        <TabsContent
          key={item.value}
          value={item.value}
          className={cn('mt-2', contentClassName)}
        >
          {item.children}
        </TabsContent>
      ))}
    </Tabs>
  );
};
