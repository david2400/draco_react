// import React from 'react';

// import {cn} from '@/lib/utils';
// import {ITimeline} from '../models/timeline.interfaces';

// export const Timelines = ({data, className}: ITimeline) => {
//   return (
//     <ol
//       className={cn(
//         'relative mx-auto flex w-full max-w-3xl flex-col gap-8 border-l border-border/60 pl-8',
//         'before:absolute before:left-3 before:top-0 before:h-full before:w-[1px] before:bg-border/50 before:content-[]',
//         className,
//       )}
//     >
//       {data.map((item, index) => (
//         <li key={item.value ?? index} className='relative flex flex-col gap-3'>
//           <span className='absolute -left-[1.4rem] top-1 flex size-6 items-center justify-center rounded-full border border-border/70 bg-background text-xs font-semibold text-muted-foreground shadow-sm shadow-primary/10'>
//             {item.label}
//           </span>
//           <div className='rounded-2xl border border-border/70 bg-card/80 p-5 shadow-[0_20px_50px_-40px_hsl(var(--ring))] backdrop-blur-sm'>
//             <div className='text-sm text-muted-foreground/90'>{item.children}</div>
//           </div>
//         </li>
//       ))}
//     </ol>
//   );
// };
