import { Paginator } from '@components/ui/paginator'
import { useClients } from '@hooks/use-clients'
import { ClientsTable } from './clients-table'
import { ClientsSkeleton } from './skeleton'

export function Clients() {
  const { clients, isLoading, pagination } = useClients()

  return (
    <div className="container mx-auto space-y-10 p-10">
      <header>
        <h1 className="font-bold text-4xl">Clientes</h1>
      </header>

      {isLoading && <ClientsSkeleton perPage={pagination.perPage} />}

      {!isLoading && <ClientsTable clients={clients} />}

      <Paginator {...pagination} />
    </div>
  )
}
