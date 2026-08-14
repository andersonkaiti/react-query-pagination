import { getClients } from '@http/get-clients'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

export function useClients(perPage = 20) {
  const [currentPage, setCurrentPage] = useState(1)

  const { data: pagination, ...rest } = useQuery({
    queryKey: ['clients', { currentPage, perPage }],
    queryFn: () => getClients(currentPage, perPage),
  })

  function handleNextPage() {
    setCurrentPage((prevState) => prevState + 1)
  }

  function handlePreviousPage() {
    setCurrentPage((prevState) => prevState - 1)
  }

  function handleSetPage(page: number) {
    setCurrentPage(page)
  }

  const totalPages = Math.ceil(Number(pagination?.items) / perPage)
  const hasPreviousPage = currentPage > 1
  const hasNextPage = currentPage < totalPages

  return {
    ...rest,
    clients: pagination?.data ?? [],
    pagination: {
      handleNextPage,
      handlePreviousPage,
      handleSetPage,
      currentPage,
      perPage,
      totalPages,
      hasPreviousPage,
      hasNextPage,
    },
  }
}
