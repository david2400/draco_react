import React from 'react';

import {MenuItemData, MenusProps} from '../models/menu.interfaces';
import {Buttons} from '@/components/buttons/scenes';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/menu/scenes/dropdown-menu';
import {cn} from '@/lib/utils';

type SelectHandler = (item: MenuItemData) => void;

const MenuLeaf = ({item, onSelect}: {item: MenuItemData; onSelect?: SelectHandler}) => {
  const handleSelect = React.useCallback(() => {
    if (item.disabled) return;
    item.onSelect?.();
    onSelect?.(item);
  }, [item, onSelect]);

  const hasDescription = Boolean(item.description);

  const content = (
    <div className='flex w-full items-start justify-between gap-3'>
      <div className='flex items-start gap-3'>
        {item.icon ? <span className='mt-0.5 text-muted-foreground'>{item.icon}</span> : null}
        <div className='flex flex-col text-left'>
          <span className='text-sm font-medium leading-tight'>{item.label}</span>
          {hasDescription ? (
            <span className='text-xs leading-snug text-muted-foreground/80'>{item.description}</span>
          ) : null}
        </div>
      </div>
      {item.badge ? <span className='shrink-0'>{item.badge}</span> : null}
    </div>
  );

  return (
    <DropdownMenuItem
      asChild={Boolean(item.href)}
      disabled={item.disabled}
      onSelect={handleSelect}
      className={cn('items-start px-3 py-2', hasDescription ? 'gap-3' : 'gap-2')}
    >
      {item.href ? (
        <a href={item.href} className='flex w-full items-start gap-3 no-underline'>
          {content}
        </a>
      ) : (
        content
      )}
    </DropdownMenuItem>
  );
};

const RecursiveMenu = ({item, onSelect}: {item: MenuItemData; onSelect?: SelectHandler}) => {
  if (item.options && item.options.length > 0) {
    const hasDescription = Boolean(item.description);

    return (
      <DropdownMenuSub>
        <DropdownMenuSubTrigger
          disabled={item.disabled}
          className={cn(
            'flex items-center gap-3 px-3 py-2 text-left',
            hasDescription ? 'items-start' : 'items-center',
          )}
        >
          <div className='flex flex-1 items-start gap-3'>
            {item.icon ? <span className='mt-0.5 text-muted-foreground'>{item.icon}</span> : null}
            <div className='flex flex-col text-left'>
              <span className='text-sm font-medium leading-tight'>{item.label}</span>
              {hasDescription ? (
                <span className='text-xs leading-snug text-muted-foreground/80'>{item.description}</span>
              ) : null}
            </div>
          </div>
          {item.badge ? <span className='ml-2 shrink-0'>{item.badge}</span> : null}
        </DropdownMenuSubTrigger>
        <DropdownMenuSubContent className='min-w-[14rem] p-2'>
          {item.options.map((subItem, index) => (
            <RecursiveMenu key={`${subItem.label}-${index}`} item={subItem} onSelect={onSelect} />
          ))}
        </DropdownMenuSubContent>
      </DropdownMenuSub>
    );
  }

  return <MenuLeaf item={item} onSelect={onSelect} />;
};

export const Menus = ({
  title,
  items,
  trigger,
  triggerClassName,
  align = 'start',
  sideOffset = 8,
  onItemSelect,
}: MenusProps) => {
  const triggerLabel = items.label ?? title;

  const handleItemSelect = React.useCallback(
    (item: MenuItemData) => {
      onItemSelect?.(item);
    },
    [onItemSelect],
  );

  const defaultTrigger = (
    <Buttons
      variant='ghost'
      size='sm'
      aria-label={typeof title === 'string' ? title : undefined}
      className={cn(
        'inline-flex items-center gap-2 rounded-full border border-transparent px-4 py-2 text-sm font-medium text-muted-foreground transition-all hover:border-border/70 hover:bg-background/80 hover:text-foreground data-[state=open]:border-border/70 data-[state=open]:bg-background/80 data-[state=open]:text-foreground',
        triggerClassName,
      )}
    >
      <span className='flex items-center gap-2'>
        <span>{triggerLabel}</span>
        {items.options && items.options.length > 0 ? (
          <span className='text-muted-foreground/80'>▾</span>
        ) : null}
      </span>
    </Buttons>
  );

  let triggerElement: React.ReactElement;

  if (trigger && React.isValidElement(trigger)) {
    const triggerProps = trigger.props as {
      className?: string;
      children?: React.ReactNode;
      ['aria-label']?: string;
    };

    triggerElement = React.cloneElement(trigger, {
      className: cn(
        triggerProps?.className,
        'data-[state=open]:border-border/70 data-[state=open]:bg-background/80 data-[state=open]:text-foreground',
        triggerClassName,
      ),
      'aria-label': triggerProps?.['aria-label'] ?? (typeof title === 'string' ? title : undefined),
      children: triggerProps?.children ?? triggerLabel,
    } as Partial<typeof triggerProps>);
  } else {
    triggerElement = defaultTrigger;
  }

  const renderItems = items.options && items.options.length > 0
    ? items.options.map((item, index) => (
        <RecursiveMenu key={`${item.label}-${index}`} item={item} onSelect={handleItemSelect} />
      ))
    : [<MenuLeaf key={items.label} item={items} onSelect={handleItemSelect} />];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{triggerElement}</DropdownMenuTrigger>
      <DropdownMenuContent align={align} sideOffset={sideOffset} className='min-w-[14rem] p-2'>
        {renderItems}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
