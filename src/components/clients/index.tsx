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
  const { data: clients = [], isLoading } = useClients()

  return (
    <div className="container mx-auto space-y-10 p-10">
      <header>
        <h1 className="font-bold text-4xl">Clientes</h1>
      </header>

      {isLoading && <ClientsSkeleton />}

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
                <PaginationPrevious />
              </PaginationItem>

              <PaginationItem>
                <PaginationLink isActive>1</PaginationLink>
              </PaginationItem>

              <PaginationItem>
                <PaginationLink>2</PaginationLink>
              </PaginationItem>

              <PaginationItem>
                <PaginationNext />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </TableCaption>
      </Table>
    </div>
  )
}
