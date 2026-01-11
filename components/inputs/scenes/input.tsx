import * as React from 'react'

import { cn } from '@/lib/utils'

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<'input'>>(
  ({ className, type, children: _children, ...props }, ref) => {
    if (process.env.NODE_ENV !== 'production' && _children != null) {
      console.warn(
        'Input component received children, which are not supported and will be ignored.',
      )
    }
    return (
      <input
        ref={ref}
        type={type}
        data-slot="input"
        className={cn(
          'file:text-foreground placeholder:text-muted-foreground/70 selection:bg-primary selection:text-primary-foreground border-input h-10 w-full min-w-0 rounded-[0.9rem] border border-border/70 bg-card/70 px-4 py-2 text-base shadow-[0_8px_20px_-15px_hsl(var(--ring))] transition-[color,box-shadow,transform] outline-none file:inline-flex file:h-8 file:border-0 file:bg-transparent file:px-3 file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          'focus-visible:-translate-y-[1px] focus-visible:border-ring/70 focus-visible:ring-ring/25 focus-visible:ring-[3px] focus-visible:shadow-[0_20px_40px_-25px_hsl(var(--ring))]',
          'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
          className,
        )}
        {...props}
      />
    )
  },
)

Input.displayName = 'Input'

export { Input }
