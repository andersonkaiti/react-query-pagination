import { useClients } from '@hooks/use-clients'
import { useEffect, useRef } from 'react'
import { ClientsTable } from './clients-table'
import { ClientsSkeleton } from './skeleton'

const PER_PAGE = 20

export function Clients() {
  const { clients, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage } =
    useClients(PER_PAGE)

  const tableCaptionRef = useRef<null | HTMLTableCaptionElement>(null)

  useEffect(() => {
    if (!tableCaptionRef.current || isLoading) {
      return
    }

    const observer = new IntersectionObserver(
      (entries, internalObserver) => {
        const { isIntersecting } = entries[0]

        if (!hasNextPage) {
          internalObserver.disconnect()
          return
        }

        if (isIntersecting && hasNextPage) {
          fetchNextPage()
        }
      },
      {
        rootMargin: '20%',
      },
    )

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

      {isLoading && <ClientsSkeleton perPage={PER_PAGE} />}

      {!isLoading && (
        <ClientsTable
          clients={clients}
          tableCaptionRef={tableCaptionRef}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
        />
      )}
    </div>
  )
}
