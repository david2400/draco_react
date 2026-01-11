import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center justify-center rounded-full border border-border/60 bg-background/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground/75 w-fit whitespace-nowrap shrink-0 gap-1.5 shadow-[0_12px_28px_-22px_hsl(var(--ring))] backdrop-blur-sm [&>svg]:size-3 [&>svg]:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-all duration-200',
  {
    variants: {
      variant: {
        default:
          'border-primary/40 bg-primary/15 text-primary [a&]:hover:bg-primary/20',
        secondary:
          'border-secondary/30 bg-secondary/15 text-secondary-foreground [a&]:hover:bg-secondary/25',
        destructive:
          'border-destructive/30 bg-destructive/15 text-destructive [a&]:hover:bg-destructive/20 focus-visible:ring-destructive/25 dark:focus-visible:ring-destructive/40 dark:bg-destructive/25',
        outline:
          'border-border/70 bg-transparent text-muted-foreground/80 [a&]:hover:bg-background/70 [a&]:hover:text-foreground',
        counter:
          'border-primary/40 bg-primary text-primary-foreground shadow-[0_18px_40px_-25px_hsl(var(--ring))] text-[11px] tracking-[0.18em]',
        'counter-secondary':
          'border-secondary/40 bg-secondary text-secondary-foreground shadow-[0_18px_40px_-25px_hsl(var(--ring))] text-[11px] tracking-[0.18em]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<'span'> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : 'span'

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
