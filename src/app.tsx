import { Clients } from '@components/clients/index'
import { queryClient } from '@lib/query-client'
import { QueryClientProvider } from '@tanstack/react-query'

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Clients />
    </QueryClientProvider>
  )
}
