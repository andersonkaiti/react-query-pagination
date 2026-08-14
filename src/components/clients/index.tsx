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
  TableCaption,
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
          {!isLoading &&
            clients?.map(
              ({
                avatar,
                createdAt,
                email,
                id,
                name,
                vehicleManufacturer,
                vehicleModel,
                vehicleType,
              }) => (
                <TableRow key={id}>
                  <TableCell className="flex items-center gap-2">
                    <Avatar>
                      <AvatarImage src={avatar} className="size-10" />
                      <AvatarFallback>{name.split('')[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <strong>{name}</strong>
                      <small className="block text-muted-foreground">
                        {email}
                      </small>
                    </div>
                  </TableCell>
                  <TableCell>
                    {Intl.DateTimeFormat('pt-BR').format(new Date(createdAt))}
                  </TableCell>
                  <TableCell>{vehicleType}</TableCell>
                  <TableCell>{vehicleManufacturer}</TableCell>
                  <TableCell>{vehicleModel}</TableCell>
                </TableRow>
              ),
            )}
        </TableBody>

        <TableCaption>
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
                  <PaginationLink
                    isActive={pagination.currentPage === index + 1}
                  >
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
        </TableCaption>
      </Table>
    </div>
  )
}
