'use client';

import React from 'react';

import {IAccordion} from '@/components/accordion/models';
import {
  Accordion as UIAccordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/accordion/scenes/accordion';
import {cn} from '@/lib/utils';

export const Accordions = ({
  items,
  className,
  itemClassName,
  triggerClassName,
  contentClassName,
  ...props
}: IAccordion) => {
  const {type, ...restAccordionProps} = props;
  const accordionType = type ?? 'single';
  const accordionProps = {
    ...restAccordionProps,
    type: accordionType,
  } as React.ComponentProps<typeof UIAccordion>;

  return (
    <UIAccordion className={className} {...accordionProps}>
      {items.map(item => (
        <AccordionItem
          key={item.value}
          value={item.value}
          className={cn('border-border', itemClassName, item.itemClassName)}
        >
          <AccordionTrigger
            className={cn('py-4 text-left text-sm font-semibold', triggerClassName, item.triggerClassName)}
          >
            {item.title}
          </AccordionTrigger>
          <AccordionContent className={cn(contentClassName, item.contentClassName)}>
            {item.content}
          </AccordionContent>
        </AccordionItem>
      ))}
    </UIAccordion>
  );
};
