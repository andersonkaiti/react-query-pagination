import type { IClient } from '@app-types/client'
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@components/ui/table'

interface IClientsTableProps {
  clients: IClient[]
}

export function ClientsTable({ clients }: IClientsTableProps) {
  return (
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
              {Intl.DateTimeFormat('pt-BR').format(new Date(client.createdAt))}
            </TableCell>
            <TableCell>{client.vehicleType}</TableCell>
            <TableCell>{client.vehicleManufacturer}</TableCell>
            <TableCell>{client.vehicleModel}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
