import { generateEllipsisPagination } from '@lib/generate-ellipsis-pagination'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from './pagination'

interface IPaginatorProps {
  currentPage: number
  nextPage: () => void
  previousPage: () => void
  setPage: (page: number) => void
  perPage: number
  totalPages: number
  hasPreviousPage: boolean
  hasNextPage: boolean
}

export function Paginator({
  currentPage,
  hasNextPage,
  hasPreviousPage,
  nextPage,
  previousPage,
  setPage,
  totalPages,
}: IPaginatorProps) {
  const pages = generateEllipsisPagination(currentPage, totalPages)

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={previousPage}
            disabled={!hasPreviousPage}
          />
        </PaginationItem>

        {pages.map((page, index) => {
          if (page === 'ELLIPSIS') {
            return (
              <PaginationItem key={`ellipsis-${index}`}>
                <PaginationLink isActive={false}>
                  <PaginationEllipsis />
                </PaginationLink>
              </PaginationItem>
            )
          }

          return (
            <PaginationItem key={page} onClick={() => setPage(Number(page))}>
              <PaginationLink isActive={currentPage === Number(page)}>
                {page}
              </PaginationLink>
            </PaginationItem>
          )
        })}

        <PaginationItem>
          <PaginationNext onClick={nextPage} disabled={!hasNextPage} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
