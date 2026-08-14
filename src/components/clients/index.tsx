import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@components/ui/pagination'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@components/ui/table'
import { useClients } from '@hooks/use-clients'
import { ClientsSkeleton } from './skeleton'

export function Clients() {
  const { clients, isLoading, pagination } = useClients()

  return (
    <div className="container mx-auto space-y-10 p-10">
      <header>
        <h1 className="font-bold text-4xl">Clientes</h1>
      </header>

      {isLoading && <ClientsSkeleton perPage={pagination.perPage} />}

      {!isLoading && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Usuário</TableHead>
              <TableHead>Data de entrada</TableHead>
              <TableHead>Tipo de veículo</TableHead>
              <TableHead>Marca</TableHead>
              <TableHead>Modelo</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {clients?.map((client) => (
              <TableRow key={client.id}>
                <TableCell className="flex items-center gap-2">
                  <Avatar>
                    <AvatarImage src={client.avatar} className="size-10" />
                    <AvatarFallback>{client.name.split('')[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <strong>{client.name}</strong>
                    <small className="block text-muted-foreground">
                      {client.email}
                    </small>
                  </div>
                </TableCell>
                <TableCell>
                  {Intl.DateTimeFormat('pt-BR').format(
                    new Date(client.createdAt),
                  )}
                </TableCell>
                <TableCell>{client.vehicleType}</TableCell>
                <TableCell>{client.vehicleManufacturer}</TableCell>
                <TableCell>{client.vehicleModel}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={pagination.handlePreviousPage}
              disabled={!pagination.hasPreviousPage}
            />
          </PaginationItem>

          {Array.from(
            { length: pagination.totalPages },
            (_, index: number) => index,
          ).map((index: number) => (
            <PaginationItem
              key={index}
              onClick={() => pagination.handleSetPage(index + 1)}
            >
              <PaginationLink isActive={pagination.currentPage === index + 1}>
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              onClick={pagination.handleNextPage}
              disabled={!pagination.hasNextPage}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}
