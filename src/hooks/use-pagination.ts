import { useState } from 'react'

interface IGetPaginationOptions {
  totalItems: number
  perPage: number
}

export function usePagination(initialPage = 1) {
  const [currentPage, setCurrentPage] = useState(initialPage)

  function nextPage() {
    setCurrentPage((prevState) => prevState + 1)
  }

  function previousPage() {
    setCurrentPage((prevState) => prevState - 1)
  }

  function setPage(page: number) {
    setCurrentPage(page)
  }

  function getPagination({ totalItems, perPage }: IGetPaginationOptions) {
    const totalPages = Math.ceil(totalItems / perPage)
    const hasPreviousPage = currentPage > 1
    const hasNextPage = currentPage < totalPages

    return {
      currentPage,
      nextPage,
      previousPage,
      setPage,
      perPage,
      totalPages,
      hasPreviousPage,
      hasNextPage,
    }
  }

  return {
    getPagination,
    currentPage,
  }
}
