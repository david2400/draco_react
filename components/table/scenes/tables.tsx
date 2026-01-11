// 'use client';

// import * as React from 'react';
// import {
//   FilterFn,
//   ColumnDef,
//   flexRender,
//   useReactTable,
//   getCoreRowModel,
//   getSortedRowModel,
//   getFacetedRowModel,
//   getFilteredRowModel,
//   getPaginationRowModel,
//   getFacetedMinMaxValues,
//   getFacetedUniqueValues,
//   Column,
//   Table,
//   ColumnFiltersState,
//   SortingState,
// } from '@tanstack/react-table';
// import {IconButton, Input, Menu, Typography} from '@material-tailwind/react';

// import {faker} from '@faker-js/faker';
// import {twMerge} from 'tailwind-merge';
// import {rankItem, RankingInfo} from '@tanstack/match-sorter-utils';
// import {BsArrowDown, BsArrowUp} from 'react-icons/bs';
// import {BiEdit, BiNews, BiSearch} from 'react-icons/bi';
// import {LiaEyeSolid} from 'react-icons/lia';
// import {Buttons} from '../../buttons/scenes';
// import {FormSelectField} from '@/components/form/scenes/form-select';
// import {FormField} from '@/components/form/scenes/form-field';
// import {ITable, ITablePaginable} from '../models';

// declare module '@tanstack/react-table' {
//   interface FilterFns {
//     fuzzy: FilterFn<unknown>;
//   }
//   interface FilterMeta {
//     itemRank: RankingInfo;
//   }
// }

// interface Person {
//   name: string;
//   job: string;
//   salary: number;
// }

// function fuzzyFilter(row: any, columnId: any, value: any, addMeta: any) {
//   const itemRank = rankItem(row.getValue(columnId), value);

//   addMeta({itemRank});

//   return itemRank.passed;
// }

// // function range(len: number) {
// //   const arr: number[] = [];

// //   for (let i = 0; i < len; i++) {
// //     arr.push(i);
// //   }

// //   return arr;
// // }

// // function newPerson(): Person {
// //   return {
// //     name: faker.person.fullName(),
// //     job: faker.person.jobType(),
// //     salary: faker.number.int(200000),
// //   };
// // }

// // function makeData(...lens: number[]) {
// //   const makeDataLevel = (depth = 0): Person[] => {
// //     const len = lens[depth]!;

// //     return range(len).map((d): Person => {
// //       return {
// //         ...newPerson(),
// //       };
// //     });
// //   };

// //   return makeDataLevel();
// // }

// export const Checkbox = ({
//   indeterminate,
//   className = '',
//   ...rest
// }: {indeterminate?: boolean} & React.HTMLProps<HTMLInputElement>) => {
//   const ref = React.useRef<HTMLInputElement>(null!);

//   React.useEffect(() => {
//     if (typeof indeterminate === 'boolean') {
//       ref.current.indeterminate = !rest.checked && indeterminate;
//     }
//   }, [ref, indeterminate]);

//   return <input type='checkbox' ref={ref} className={className + ' cursor-pointer'} {...rest} />;
// };

// const Filter = ({column, table}: {column: Column<any, any>; table: Table<any>}) => {
//   const firstValue = table.getPreFilteredRowModel().flatRows[0]?.getValue(column.id);

//   const columnFilterValue = column.getFilterValue();

//   return typeof firstValue === 'number' ? (
//     <div className='flex gap-2 mx-2' onClick={e => e.stopPropagation()}>
//       <Input
//         type='number'
//         value={(columnFilterValue as [number, number])?.[0] ?? ''}
//         placeholder={`Min`}
//         size='sm'
//         className='px-2'
//         onChange={e => column.setFilterValue((old: [number, number]) => [e.target.value, old?.[1]])}
//       />
//       <Input
//         type='number'
//         placeholder={`Max`}
//         value={(columnFilterValue as [number, number])?.[1] ?? ''}
//         size='sm'
//         className='px-2'
//         // label='Input Large'
//         onChange={e => column.setFilterValue((old: [number, number]) => [old?.[0], e.target.value])}
//       />
//     </div>
//   ) : (
//     <Input
//       onChange={(e: any) => column.setFilterValue(e.target.value)}
//       onClick={e => e.stopPropagation()}
//       placeholder='Buscar'
//       size='sm'
//       className='p-2 m-2'
//       value={(columnFilterValue ?? '') as string}
//     />
//   );
// };

// export function TableComponent(
//   {data, columns, headerTable, serverMode, totalRows, onQueryChange}: ITablePaginable<any>,
//   ref: React.Ref<any>
// ) {
//   const [globalFilter, setGlobalFilter] = React.useState('');
//   const [sorting, setSorting] = React.useState<SortingState>([]);
//   const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
//   const [pagination, setPagination] = React.useState({
//     pageIndex: 0,
//     pageSize: 10,
//   });

//   const [pageSize, setPageSize] = React.useState([10, 20, 30, 40, 50]);

//   const table = useReactTable({
//     data,
//     columns: columns as ColumnDef<any, any>[],
//     filterFns: {fuzzy: fuzzyFilter},
//     state: {
//       globalFilter,
//       sorting,
//       columnFilters,
//       pagination,
//     },
//     onGlobalFilterChange: setGlobalFilter,
//     onSortingChange: setSorting,
//     onColumnFiltersChange: setColumnFilters,
//     onPaginationChange: setPagination,
//     globalFilterFn: fuzzyFilter,
//     getCoreRowModel: getCoreRowModel(),
//     getFilteredRowModel: getFilteredRowModel(),
//     getSortedRowModel: getSortedRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//     getFacetedRowModel: getFacetedRowModel(),
//     getFacetedUniqueValues: getFacetedUniqueValues(),
//     getFacetedMinMaxValues: getFacetedMinMaxValues(),
//     manualPagination: Boolean(serverMode),
//     manualSorting: Boolean(serverMode),
//     manualFiltering: Boolean(serverMode),
//     pageCount:
//       serverMode && totalRows != null
//         ? Math.max(1, Math.ceil(totalRows / pagination.pageSize))
//         : undefined,
//     debugTable: false,
//     debugHeaders: false,
//     debugColumns: false,
//   });

//   React.useEffect(() => {
//     if (!serverMode || !onQueryChange) return;
//     onQueryChange({
//       pageIndex: pagination.pageIndex,
//       pageSize: pagination.pageSize,
//       sorting: sorting.map(s => ({id: s.id, desc: s.desc ?? false})),
//       globalFilter,
//       columnFilters: columnFilters.map(cf => ({id: cf.id, value: cf.value})),
//     });
//   }, [serverMode, onQueryChange, pagination, sorting, globalFilter, columnFilters]);

//   React.useImperativeHandle(ref, () => ({
//     table,
//   }));

//   return (
//     <div className='w-full'>
//       <div className='w-full'>{headerTable ? headerTable() : null}</div>
//       <DebouncedInput
//         value={globalFilter ?? ''}
//         onChange={value => setGlobalFilter(String(value))}
//       />
//       <div className='w-full overflow-hidden rounded-lg my-4 border border-surface'>
//         <table className='w-full'>
//           <thead className='border-b border-surface bg-surface-light text-sm font-medium text-foreground dark:bg-surface-dark'>
//             {table.getHeaderGroups().map(headerGroup => (
//               <tr key={headerGroup.id}>
//                 {headerGroup.headers.map(header => (
//                   <th
//                     key={header.id}
//                     colSpan={header.colSpan}
//                     className='px-2 py-2 text-start font-medium'
//                   >
//                     <div
//                       {...{
//                         className: header.column.getCanSort()
//                           ? 'cursor-pointer select-none flex flex-row justify-center items-center'
//                           : 'flex justify-center items-start h-auto',
//                         onClick: header.column.getToggleSortingHandler(),
//                       }}
//                     >
//                       {flexRender(header.column.columnDef.header, header.getContext())}
//                       {{
//                         asc: <BsArrowUp className='h-4 w-4 stroke-2' />,
//                         desc: <BsArrowDown className='h-4 w-4 stroke-2' />,
//                       }[header.column.getIsSorted() as string] ?? null}
//                     </div>
//                     {header.column.getCanFilter() && (
//                       <div className='w-100'>
//                         <Filter column={header.column} table={table} />
//                       </div>
//                     )}
//                   </th>
//                 ))}
//               </tr>
//             ))}
//           </thead>
//           <tbody className='group text-sm text-black dark:text-white'>
//             {table.getRowModel().rows.map((row, key) => (
//               <tr key={key} className='border-b border-surface last:border-0'>
//                 {row.getVisibleCells().map((cell, idx) => (
//                   <td key={idx} className='p-2'>
//                     {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                   </td>
//                 ))}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       <div className='flex flex-wrap justify-between'>
//         <span className='flex w-full flex-wrap justify-between '>
//           <div className='flex gap-2'>
//             <Typography type='small' className='text-foreground'>
//               Page
//             </Typography>
//             <Typography type='small' color='default'>
//               {table.getState().pagination.pageIndex + 1} of {table.getPageCount().toLocaleString()}
//             </Typography>
//           </div>
//           <FormSelectField
//             data={pageSize}
//             onValueChange={selectedValue => {
//               table.setPageSize(Number(selectedValue));
//             }}
//             size='sm'
//             value={table.getState().pagination.pageSize.toString()}
//           ></FormSelectField>
//         </span>
//         <div className='flex flex-wrap gap-2'>
//           <Buttons
//             variant='outline'
//             color='secondary'
//             size='sm'
//             className='p-2'
//             onClick={() => table.previousPage()}
//             disabled={!table.getCanPreviousPage()}
//           >
//             Previous
//           </Buttons>
//           <Buttons
//             variant='outline'
//             color='secondary'
//             size='sm'
//             className='p-2'
//             onClick={() => table.nextPage()}
//             disabled={!table.getCanNextPage()}
//           >
//             Next
//           </Buttons>
//         </div>
//       </div>
//     </div>
//   );
// }

// function DebouncedInput({
//   onChange,
//   debounce = 500,
//   value: initialValue,
//   ...props
// }: {
//   debounce?: number;
//   value: string | number;
//   onChange: (value: string | number) => void;
// } & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>) {
//   const [value, setValue] = React.useState(initialValue);

//   React.useEffect(() => {
//     setValue(initialValue);
//   }, [initialValue]);

//   React.useEffect(() => {
//     const timeout = setTimeout(() => {
//       onChange(value);
//     }, debounce);

//     return () => clearTimeout(timeout);
//   }, [value]);

//   return (
//     <div className='w-60 z-10'>
//       <FormField
//         value={value}
//         onChange={e => setValue(e.target.value)}
//         placeholder='Search'
//         {...props}
//         size={'sm'}
//         color='primary'
//       >
//         <Input.Icon>
//           <BiSearch className='h-full w-full' />
//         </Input.Icon>
//       </FormField>
//     </div>
//   );
// }

// export const DataTable = React.forwardRef(TableComponent);
