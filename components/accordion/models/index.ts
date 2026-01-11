import React from 'react';

import type {
  AccordionMultipleProps,
  AccordionSingleProps,
} from '@radix-ui/react-accordion';

type SingleAccordionProps = Omit<AccordionSingleProps, 'type'> & {type?: 'single'};
type MultipleAccordionProps = Omit<AccordionMultipleProps, 'type'> & {type: 'multiple'};

type BaseAccordionProps = SingleAccordionProps | MultipleAccordionProps;

export type IAccordion = BaseAccordionProps & {
  items: Array<{
    value: string;
    title: React.ReactNode;
    content: React.ReactNode;
    triggerClassName?: string;
    contentClassName?: string;
    itemClassName?: string;
  }>;
  className?: string;
  itemClassName?: string;
  triggerClassName?: string;
  contentClassName?: string;
};
