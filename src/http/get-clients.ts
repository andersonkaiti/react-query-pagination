import type { IClient } from '@app-types/client'
import { httpClient } from '@http/http-client'

export async function getClients(): Promise<IClient[]> {
  const { data } = await httpClient.get<IClient[]>('/clients')

  return data
}
