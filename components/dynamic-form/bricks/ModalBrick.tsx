// 'use client';

// import {useState} from 'react';
// import classNames from 'classnames';
// import {ModalBrick, ModalFooterAction} from '@/types/formSchema';
// import {BrickComponentProps} from '../BrickRenderer';
// import {useApiRequest} from '@/hooks/useApiRequest';

// const sizeClassMap: Record<NonNullable<ModalBrick['data']['size']>, string> = {
//   sm: 'max-w-md',
//   md: 'max-w-lg',
//   lg: 'max-w-3xl',
//   xl: 'max-w-5xl',
//   full: 'max-w-[90vw]',
// };

// const variantClassMap: Record<NonNullable<ModalFooterAction['variant']>, string> = {
//   primary: 'bg-indigo-600 text-white hover:bg-indigo-500',
//   secondary: 'bg-slate-200 text-slate-700 hover:bg-slate-300',
//   danger: 'bg-red-600 text-white hover:bg-red-500',
//   ghost: 'bg-transparent text-slate-700 hover:bg-slate-100',
// };

// const resolveVariantClasses = (variant?: ModalFooterAction['variant']) => {
//   if (!variant) return variantClassMap.primary;
//   return variantClassMap[variant] ?? variantClassMap.primary;
// };

// const buildActions = (brick: ModalBrick): ModalFooterAction[] => {
//   if (brick.data.footerActions?.length) return brick.data.footerActions;

//   const actions: ModalFooterAction[] = [];

//   if (brick.data.cancelLabel) {
//     actions.push({label: brick.data.cancelLabel, variant: 'ghost'});
//   }

//   actions.push({label: brick.data.confirmLabel ?? 'Aceptar', variant: 'primary'});

//   return actions;
// };

// export const ModalBrickRenderer = ({brick, renderChildren}: BrickComponentProps<ModalBrick>) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [activeAction, setActiveAction] = useState<string | null>(null);
//   const {execute, isLoading, hasError, error, hasSuccess, reset} = useApiRequest();

//   const sizeClass = brick.data.size ? sizeClassMap[brick.data.size] ?? sizeClassMap.md : 'max-w-3xl';
//   const actions = buildActions(brick);

//   const handleClose = () => {
//     setIsOpen(false);
//     setActiveAction(null);
//     reset();
//   };

//   const handleAction = async (action: ModalFooterAction) => {
//     if (!action.event) {
//       handleClose();
//       return;
//     }

//     try {
//       setActiveAction(action.label);
//       await execute(action.event.data);
//       handleClose();
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setActiveAction(null);
//     }
//   };

//   return (
//     <div className='flex flex-col gap-3'>
//       <button
//         type='button'
//         className='inline-flex w-fit items-center justify-center rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500'
//         onClick={() => setIsOpen(true)}
//       >
//         {brick.data.triggerLabel ?? brick.data.title}
//       </button>

//       {isOpen ? (
//         <div className='fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 p-4 backdrop-blur-sm'>
//           <div
//             className={classNames(
//               'relative w-full rounded-3xl bg-white shadow-2xl ring-1 ring-black/10',
//               sizeClass,
//             )}
//             role='dialog'
//             aria-modal='true'
//           >
//             <header className='flex items-start justify-between gap-4 border-b border-slate-200 px-6 py-4'>
//               <div className='space-y-1 m-4'>
//                 <h2 className='text-xl font-semibold text-slate-900'>{brick.data.title}</h2>
//                 {brick.data.description ? (
//                   <p className='text-sm text-slate-600'>{brick.data.description}</p>
//                 ) : null}
//               </div>
//               <button
//                 type='button'
//                 className='rounded-full bg-slate-100 p-2 text-slate-500 transition hover:bg-slate-200 hover:text-slate-700'
//                 onClick={handleClose}
//                 aria-label='Cerrar'
//               >
//                 ×
//               </button>
//             </header>

//             <div className='max-h-[70vh] overflow-y-auto px-6 py-6'>
//               {renderChildren(brick.bricks)}
//             </div>

//             {hasError ? (
//               <div className='mx-6 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-600'>
//                 {error ?? 'Ocurrió un error inesperado.'}
//               </div>
//             ) : null}

//             {hasSuccess ? (
//               <div className='mx-6 mt-3 rounded-xl border border-green-200 bg-green-50 p-3 text-sm text-green-600'>
//                 Acción completada correctamente.
//               </div>
//             ) : null}

//             <footer className='flex flex-col gap-2 border-t border-slate-200 px-6 py-5 sm:flex-row sm:justify-end'>
//               {actions.map(action => {
//                 const isActionLoading = activeAction === action.label || isLoading;
//                 return (
//                   <button
//                     key={action.label}
//                     type='button'
//                     className={classNames(
//                       'inline-flex items-center justify-center rounded-full px-5 py-2 text-sm font-semibold shadow-sm transition disabled:cursor-not-allowed disabled:opacity-60',
//                       resolveVariantClasses(action.variant),
//                     )}
//                     onClick={() => handleAction(action)}
//                     disabled={isActionLoading}
//                   >
//                     {isActionLoading ? (
//                       <span className='flex items-center gap-2'>
//                         <span className='h-4 w-4 animate-spin rounded-full border-2 border-white/70 border-t-transparent'></span>
//                         Procesando
//                       </span>
//                     ) : (
//                       action.label
//                     )}
//                   </button>
//                 );
//               })}
//             </footer>
//           </div>
//         </div>
//       ) : null}
//     </div>
//   );
// };
