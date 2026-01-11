import {ColumnDef} from '@tanstack/react-table';
import {ReactNode} from 'react';

export interface ITable<T> {
  data: T[];
  columns: ColumnDef<T>[];
  className?: string;
  bordered?: boolean;
  paginations?: boolean;
  headerTable?: () => ReactNode;
}


export interface ITablePaginable<T> {
  data: T[];
  columns: ColumnDef<T>[];
  className?: string;
  bordered?: boolean;
  paginations?: boolean;
  headerTable?: () => ReactNode;
  serverMode?: boolean;
  totalRows?: number;
  onQueryChange?: (params: {
    pageIndex: number;
    pageSize: number;
    sorting: { id: string; desc: boolean }[];
    globalFilter: string;
    columnFilters: { id: string; value: unknown }[];
  }) => void;
}