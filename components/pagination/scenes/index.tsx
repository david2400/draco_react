import React from 'react';

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/pagination/scenes/pagination';
import {cn} from '@/lib/utils';

type BackendSort = {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
};

type BackendPageable = {
  page_number: number; // backend may be 1-based
  page_size: number;
  sort: BackendSort;
  offset: number;
  paged: boolean;
  unpaged: boolean;
};

// Minimal meta we need from backend response
export type BackendPaginationMeta = {
  pageable: BackendPageable;
  last: boolean;
  total_pages: number;
  total_elements: number;
  size: number; // page size
  number: number; // current page (backend provided index)
  sort: BackendSort;
  first: boolean;
  number_of_elements: number;
  empty: boolean;
};

type DirectProps = {
  currentPage: number; // 1-based
  totalPages: number;
  pageSize?: number;
  totalItems?: number;
};

type FromBackendProps = {
  fromBackend: BackendPaginationMeta;
};

type CommonProps = {
  onPageChange: (page: number) => void; // 1-based page number
  siblingCount?: number; // how many pages to show around current
  className?: string;
};

type PaginationProps = CommonProps & (DirectProps | FromBackendProps);

function useNormalizedProps(props: PaginationProps) {
  if ('fromBackend' in props) {
    const meta = props.fromBackend;
    // Backend might send page index as 0-based (Spring Data) or 1-based (your example shows 1).
    // We normalize to 1-based for the UI.
    const raw = meta.number;
    const currentPage = raw <= 0 ? raw + 1 : raw; // if 0-based convert to 1-based, if already 1-based keep
    return {
      currentPage,
      totalPages: meta.total_pages,
      pageSize: meta.size,
      totalItems: meta.total_elements,
      isFirst: meta.first,
      isLast: meta.last,
    };
  }
  return {
    currentPage: props.currentPage,
    totalPages: props.totalPages,
    pageSize: props.pageSize,
    totalItems: props.totalItems,
    isFirst: props.currentPage <= 1,
    isLast: props.currentPage >= props.totalPages,
  };
}

function getPageRange(current: number, total: number, siblingCount: number) {
  const totalNumbers = siblingCount * 2 + 5; // first, last, current, 2*siblings, and 2 dots potentially
  if (total <= totalNumbers) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const firstPage = 1;
  const lastPage = total;

  const leftSibling = Math.max(current - siblingCount, firstPage);
  const rightSibling = Math.min(current + siblingCount, lastPage);

  // Clamp the interior range to avoid duplicating first/last
  const start = Math.max(leftSibling, firstPage + 1);
  const end = Math.min(rightSibling, lastPage - 1);

  const showLeftDots = start > firstPage + 1;
  const showRightDots = end < lastPage - 1;

  const range: (number | 'dots')[] = [];

  // Always show first
  range.push(firstPage);

  if (showLeftDots) {
    range.push('dots');
  } else {
    for (let i = firstPage + 1; i < start; i++) range.push(i);
  }

  for (let i = start; i <= end; i++) range.push(i);

  if (showRightDots) {
    range.push('dots');
  } else {
    for (let i = end + 1; i < lastPage; i++) range.push(i);
  }

  // Always show last
  if (lastPage > firstPage) range.push(lastPage);

  return range;
}

export default function Paginations(props: PaginationProps) {
  const {onPageChange, siblingCount = 1, className} = props;
  const {currentPage, totalPages, isFirst, isLast} = useNormalizedProps(props);

  if (!totalPages) return null;

  const pages = getPageRange(currentPage, totalPages, siblingCount);

  return (
    <Pagination className={cn('justify-start', className)}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href='#'
            aria-disabled={isFirst}
            onClick={event => {
              event.preventDefault();
              if (!isFirst) {
                onPageChange(currentPage - 1);
              }
            }}
          />
        </PaginationItem>

        {pages.map((page, idx) => {
          if (page === 'dots') {
            return (
              <PaginationItem key={`dots-${idx}`}>
                <PaginationEllipsis />
              </PaginationItem>
            );
          }

          const pageNumber = page as number;

          return (
            <PaginationItem key={pageNumber}>
              <PaginationLink
                href='#'
                isActive={pageNumber === currentPage}
                onClick={event => {
                  event.preventDefault();
                  onPageChange(pageNumber);
                }}
              >
                {pageNumber}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        <PaginationItem>
          <PaginationNext
            href='#'
            aria-disabled={isLast}
            onClick={event => {
              event.preventDefault();
              if (!isLast) {
                onPageChange(currentPage + 1);
              }
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
