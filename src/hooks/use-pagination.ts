import { useEffect, useState } from 'react'

interface IGetPaginationOptions {
  totalItems: number
  perPage: number
}

export function usePagination(initialPage = 1) {
  const [currentPage, setCurrentPage] = useState(() => {
    const searchParams = new URLSearchParams(window.location.search)

    return Math.max(1, Number(searchParams.get('page') ?? initialPage))
  })

  function nextPage() {
    setCurrentPage((prevState) => prevState + 1)
  }

  function previousPage() {
    setCurrentPage((prevState) => prevState - 1)
  }

  function setPage(page: number) {
    setCurrentPage(page)
  }

  useEffect(() => {
    const url = new URL(window.location.href)

    url.searchParams.set('page', String(currentPage))

    window.history.replaceState({}, '', url)
  }, [currentPage])

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
