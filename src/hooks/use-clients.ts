import { usePagination } from '@hooks/use-pagination'
import { getClients } from '@http/get-clients'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'

export function useClients(perPage = 20) {
  const { currentPage, getPagination } = usePagination()

  const queryClient = useQueryClient()

  const { data: paginatedData, ...rest } = useQuery({
    queryKey: ['clients', { currentPage, perPage }],
    queryFn: () => getClients(currentPage, perPage),
  })

  const pagination = getPagination({
    totalItems: Number(paginatedData?.items),
    perPage,
  })

  useEffect(() => {
    if (pagination.hasNextPage) {
      const nextPage = currentPage + 1

      queryClient.prefetchQuery({
        queryKey: ['clients', { currentPage: nextPage, perPage }],
        queryFn: () => getClients(nextPage, perPage),
      })
    }
  }, [currentPage, pagination.hasNextPage, perPage, queryClient])

  return {
    ...rest,
    clients: paginatedData?.data ?? [],
    pagination,
  }
}
