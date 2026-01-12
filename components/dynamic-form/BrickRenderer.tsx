// 'use client';

// import {Fragment, memo, ReactNode} from 'react';
// // import {Brick} from '@/types/formSchema';
// import {PageDesktopBrickRenderer} from './bricks/PageDesktopBrick';
// import {ContainerBrickRenderer} from './bricks/ContainerBrick';
// import {PageHeaderBrickRenderer} from './bricks/PageHeaderBrick';
// import {TaskContainerBrickRenderer} from './bricks/TaskContainerBrick';
// // import {SearchHubBrickRenderer} from './bricks/SearchHubBrick';
// import {ModalBrickRenderer} from './bricks/ModalBrick';
// import {StepperBrickRenderer} from './bricks/StepperBrick';
// import {SummaryBrickRenderer} from './bricks/SummaryBrick';

// export interface BrickComponentProps<T extends Brick = Brick> {
//   brick: T;
//   renderChildren: (bricks?: Brick[]) => ReactNode;
// }

// type BrickComponent = (props: BrickComponentProps) => ReactNode;

// const rendererMap: Record<string, BrickComponent> = {
//   page_desktop: PageDesktopBrickRenderer as BrickComponent,
//   container: ContainerBrickRenderer as BrickComponent,
//   page_header: PageHeaderBrickRenderer as BrickComponent,
//   task_container: TaskContainerBrickRenderer as BrickComponent,
//   // search_hub: SearchHubBrickRenderer as BrickComponent,
//   modal: ModalBrickRenderer as BrickComponent,
//   stepper: StepperBrickRenderer as BrickComponent,
//   summary: SummaryBrickRenderer as BrickComponent,
// };

// const UnknownBrick = ({brick}: {brick: Brick}) => {
//   return (
//     <div className='rounded-xl border border-dashed border-slate-300 bg-slate-50/60 p-6 text-sm text-slate-500'>
//       <p className='font-semibold text-slate-600'>Componente no soportado</p>
//       <p className='mt-1'>ui_type: {brick.ui_type}</p>
//       {brick.bricks?.length ? (
//         <div className='mt-4 space-y-4'>
//           {brick.bricks.map(child => (
//             <Fragment key={child.id}>
//               <BrickRenderer brick={child} />
//             </Fragment>
//           ))}
//         </div>
//       ) : null}
//     </div>
//   );
// };

// export interface BrickRendererProps {
//   brick: Brick;
// }

// export const BrickRenderer = memo(({brick}: BrickRendererProps) => {
//   const renderChildren = (bricks?: Brick[]) => {
//     if (!bricks?.length) return null;

//     return bricks.map(child => <BrickRenderer key={child.id} brick={child} />);
//   };

//   const renderer =
//     rendererMap[brick.ui_type] ??
//     ((props: BrickComponentProps) => <UnknownBrick brick={props.brick} />);

//   return renderer({brick, renderChildren});
// });

// BrickRenderer.displayName = 'BrickRenderer';
