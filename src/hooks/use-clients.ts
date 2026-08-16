import { getClients } from '@http/get-clients'
import { useInfiniteQuery } from '@tanstack/react-query'

export function useClients(perPage = 20) {
  const { data: paginatedData, ...rest } = useInfiniteQuery({
    queryKey: ['clients'],
    initialPageParam: 1,
    queryFn: ({ pageParam }) => getClients(pageParam, perPage),
    getNextPageParam: (_lastPage, _allPages, lastPageParam) =>
      lastPageParam + 1,
  })

  return {
    ...rest,
    clients: paginatedData?.pages.flatMap((page) => page.data) ?? [],
  }
}
