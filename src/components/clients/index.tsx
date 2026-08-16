import { useClients } from '@hooks/use-clients'
import { useEffect, useRef } from 'react'
import { ClientsTable } from './clients-table'
import { ClientsSkeleton } from './skeleton'

export function Clients() {
  const { clients, fetchNextPage, isLoading } = useClients()

  const tableCaptionRef = useRef<null | HTMLTableCaptionElement>(null)

  useEffect(() => {
    if (!tableCaptionRef.current || isLoading) {
      return
    }

    const observer = new IntersectionObserver((entries) => {
      const { isIntersecting } = entries[0]

      if (isIntersecting) {
        fetchNextPage()
      }
    })

    observer.observe(tableCaptionRef.current)

    return () => {
      observer.disconnect()
    }
  }, [isLoading, fetchNextPage])

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
