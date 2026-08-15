import { Paginator } from '@components/ui/paginator'
import { useClients } from '@hooks/use-clients'
import { useEffect, useRef } from 'react'
import { ClientsTable } from './clients-table'
import { ClientsSkeleton } from './skeleton'

export function Clients() {
  const { clients, isLoading, pagination } = useClients()

  const tableCaptionRef = useRef<null | HTMLTableCaptionElement>(null)

  useEffect(() => {
    if (!tableCaptionRef.current || isLoading) {
      return
    }

    const observer = new IntersectionObserver((entries) => {
      const { isIntersecting } = entries[0]

      if (isIntersecting) {
        console.log('O usuário chegou ao fim da tela!')
      }
    })

    observer.observe(tableCaptionRef.current)

    return () => {
      observer.disconnect()
    }
  }, [isLoading])

  return (
    <div className="container mx-auto space-y-10 p-10">
      <header>
        <h1 className="font-bold text-4xl">Clientes</h1>
      </header>

      {isLoading && <ClientsSkeleton perPage={pagination.perPage} />}

      {!isLoading && (
        <ClientsTable clients={clients} tableCaptionRef={tableCaptionRef} />
      )}

      <Paginator {...pagination} />
    </div>
  )
}
