import { usePagination } from '@hooks/use-pagination'
import { getClients } from '@http/get-clients'
import { useQuery } from '@tanstack/react-query'

export function useClients(perPage = 20) {
  const { currentPage, getPagination } = usePagination()

  const { data: paginatedData, ...rest } = useQuery({
    queryKey: ['clients', { currentPage, perPage }],
    queryFn: () => getClients(currentPage, perPage),
  })

  const pagination = getPagination({
    totalItems: Number(paginatedData?.items),
    perPage,
  })

  return {
    ...rest,
    clients: paginatedData?.data ?? [],
    pagination,
  }
}
