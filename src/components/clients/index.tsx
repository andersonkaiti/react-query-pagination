import { useClients } from '@hooks/use-clients'
import { useEffect, useRef } from 'react'
import { ClientsTable } from './clients-table'
import { ClientsSkeleton } from './skeleton'

export function Clients() {
  const { clients, fetchNextPage, hasNextPage, isLoading } = useClients()

  const tableCaptionRef = useRef<null | HTMLTableCaptionElement>(null)

  useEffect(() => {
    if (!tableCaptionRef.current || isLoading) {
      return
    }

    const observer = new IntersectionObserver((entries, internalObserver) => {
      const { isIntersecting } = entries[0]

      if (!hasNextPage) {
        internalObserver.disconnect()
        return
      }

      if (isIntersecting && hasNextPage) {
        fetchNextPage()
      }
    })

    observer.observe(tableCaptionRef.current)

    return () => {
      observer.disconnect()
    }
  }, [isLoading, fetchNextPage, hasNextPage])

  return (
    <div className="container mx-auto space-y-10 p-10">
      <header>
        <h1 className="font-bold text-4xl">Clientes</h1>
      </header>

      {isLoading && <ClientsSkeleton />}

      {!isLoading && (
        <ClientsTable clients={clients} tableCaptionRef={tableCaptionRef} />
      )}
    </div>
  )
}
