import { getClients } from '@http/get-clients'
import { useQuery } from '@tanstack/react-query'

export function useClients() {
  return useQuery({
    queryKey: ['clients'],
    queryFn: getClients,
  })
}
