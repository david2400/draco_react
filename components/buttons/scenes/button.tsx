import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[0.9rem] border border-transparent text-sm font-medium tracking-tight transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          'border-[hsl(var(--primary-border))] bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] shadow-sm shadow-[0_8px_24px_-12px_hsl(var(--primary))] hover:-translate-y-[1px] hover:border-[hsl(var(--primary-border)/0.9)] hover:bg-[hsl(var(--primary)/0.92)] hover:shadow-[0_18px_35px_-20px_hsl(var(--primary))]',
        danger:
          'border-[hsl(var(--destructive-border))] bg-[hsl(var(--destructive))] text-[hsl(var(--destructive-foreground))] shadow-sm shadow-[0_8px_20px_-14px_hsl(var(--destructive))] hover:-translate-y-[1px] hover:border-[hsl(var(--destructive-border)/0.9)] hover:bg-[hsl(var(--destructive)/0.92)] focus-visible:ring-[hsl(var(--destructive-border)/0.6)] dark:bg-[hsl(var(--destructive)/0.75)]',
        outline:
          'border-[hsl(var(--border)/0.7)] bg-[hsl(var(--background)/0.6)] text-[hsl(var(--foreground))] shadow-sm hover:-translate-y-[1px] hover:border-[hsl(var(--border)/0.9)] hover:bg-[hsl(var(--accent)/0.8)] hover:text-[hsl(var(--accent-foreground))] dark:border-[hsl(var(--border)/0.5)] dark:bg-[hsl(var(--input)/0.2)] dark:hover:bg-[hsl(var(--input)/0.4)]',
        secondary:
          'border-[hsl(var(--secondary-border))] bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))] shadow-sm shadow-[0_8px_20px_-16px_hsl(var(--foreground))] hover:-translate-y-[1px] hover:border-[hsl(var(--secondary-border)/0.9)] hover:bg-[hsl(var(--secondary)/0.85)]',
        ghost:
          'border border-[hsl(var(--border)/0.6)] bg-[hsl(var(--background)/0.7)] text-[hsl(var(--muted-foreground))] shadow-[0_18px_45px_-32px_hsl(var(--ring))] hover:-translate-y-[1px] hover:border-[hsl(var(--border)/0.9)] hover:bg-[hsl(var(--background)/0.8)] hover:text-[hsl(var(--foreground))] dark:border-[hsl(var(--border)/0.4)] dark:bg-[hsl(var(--background)/0.4)]',
        link: 'border-transparent text-[hsl(var(--primary))] underline-offset-4 hover:underline hover:text-[hsl(var(--primary)/0.8)]',
      },
      size: {
        default: 'h-10 px-5 py-2 has-[>svg]:px-4',
        sm: 'h-9 rounded-[0.8rem] gap-1.5 px-3.5 has-[>svg]:px-3',
        lg: 'h-11 rounded-[1rem] px-7 has-[>svg]:px-5',
        icon: 'size-10 rounded-full',
        'icon-sm': 'size-9 rounded-full',
        'icon-lg': 'size-11 rounded-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
