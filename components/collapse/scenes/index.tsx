'use client';

import React from 'react';

import {CollapseProps, ListItemData} from '../models/collapse.interfaces';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/collapse/scenes/collapsible';
import {cn} from '@/lib/utils';
import {MdOutlineKeyboardArrowDown} from 'react-icons/md';

const renderIcon = (icon: ListItemData['icon']) => {
  if (!icon) return null;

  if (React.isValidElement(icon)) {
    const iconElement = icon as React.ReactElement<{className?: string}>;
    return React.cloneElement(iconElement, {
      className: cn('text-muted-foreground h-4 w-4', iconElement.props.className),
    });
  }

  if (typeof icon === 'function') {
    const IconComponent = icon as React.ComponentType<{className?: string}>;
    return <IconComponent className='text-muted-foreground h-4 w-4' />;
  }

  return icon;
};

const RecursiveList = ({
  item,
  itemClassName,
  triggerClassName,
  contentClassName,
}: {
  item: ListItemData;
  itemClassName?: string;
  triggerClassName?: string;
  contentClassName?: string;
}) => {
  const hasChildren = Boolean(item.options && item.options.length > 0);

  if (!hasChildren) {
    return (
      <li
        className={cn(
          'group flex items-center gap-2 rounded-xl border border-transparent px-4 py-3 text-sm font-medium text-muted-foreground transition-all duration-200 hover:-translate-y-[1px] hover:border-border/70 hover:bg-background/85 hover:text-foreground',
          item.itemClassName,
          itemClassName,
        )}
      >
        {renderIcon(item.icon)}
        {item.href ? (
          <a href={item.href} className='flex-1 transition-colors group-hover:text-foreground'>
            {item.label}
          </a>
        ) : (
          <span className='flex-1 group-hover:text-foreground'>{item.label}</span>
        )}
      </li>
    );
  }

  return (
    <li className={cn('w-full', item.itemClassName, itemClassName)}>
      <Collapsible>
        <CollapsibleTrigger
          className={cn(
            'flex w-full items-center justify-between gap-3 rounded-xl border border-transparent px-4 py-3 text-left text-sm font-medium text-muted-foreground transition-all duration-200 hover:-translate-y-[1px] hover:border-border/70 hover:bg-background/80 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background data-[state=open]:border-border/70 data-[state=open]:bg-background/90 data-[state=open]:text-foreground',
            '[&[data-state=open]>svg]:rotate-180',
            triggerClassName,
            item.triggerClassName,
          )}
        >
          <span className='flex items-center gap-2'>
            {renderIcon(item.icon)}
            {item.label}
          </span>
          <MdOutlineKeyboardArrowDown className='text-muted-foreground h-4 w-4 transition-transform duration-200' />
        </CollapsibleTrigger>
        <CollapsibleContent className={cn('pl-4', contentClassName, item.contentClassName)}>
          <ul className='mt-3 grid gap-2 border-l border-border/50 pl-4'>
            {item.options?.map((subItem, index) => (
              <RecursiveList
                key={`${item.label}-${index}`}
                item={subItem}
                itemClassName={itemClassName}
                triggerClassName={triggerClassName}
                contentClassName={contentClassName}
              />
            ))}
          </ul>
        </CollapsibleContent>
      </Collapsible>
    </li>
  );
};

export const Lists = ({items, className, listClassName, itemClassName, triggerClassName, contentClassName}: CollapseProps) => {
  return (
    <ul className={cn('grid gap-1', className, listClassName)}>
      {items.map((item, index) => (
        <RecursiveList
          key={`menu-${item.label}-${index}`}
          item={item}
          itemClassName={itemClassName}
          triggerClassName={triggerClassName}
          contentClassName={contentClassName}
        />
      ))}
    </ul>
  );
};
