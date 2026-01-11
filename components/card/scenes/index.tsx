import React from 'react';

import {ICard} from '@/components/card/models/card.interface';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/card/scenes/card';
import {cn} from '@/lib/utils';

export const Cards = ({
  className,
  title,
  description,
  action,
  footer,
  headerClassName,
  contentClassName,
  footerClassName,
  disableContentWrapper,
  tooltipTitle,
  children,
  ...props
}: ICard) => {
  const hasHeader = Boolean(title ?? description ?? action);

  return (
    <Card className={cn('h-full', className)} {...props}>
      {hasHeader ? (
        <CardHeader className={cn('gap-2', headerClassName)}>
          {action ? <CardAction>{action}</CardAction> : null}
          {title ? (
            <CardTitle title={tooltipTitle}>{title}</CardTitle>
          ) : null}
          {description ? <CardDescription>{description}</CardDescription> : null}
        </CardHeader>
      ) : null}

      {disableContentWrapper ? (
        contentClassName ? (
          <div className={cn(contentClassName)}>{children}</div>
        ) : (
          <>{children}</>
        )
      ) : (
        <CardContent className={cn(contentClassName)}>{children}</CardContent>
      )}

      {footer ? (
        <CardFooter className={cn('gap-2', footerClassName)}>{footer}</CardFooter>
      ) : null}
    </Card>
  );
};
