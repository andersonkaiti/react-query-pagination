import type { IClient } from '@app-types/client'
import type { IPaginatedResponse } from '@app-types/paginated-response'
import { httpClient } from '@http/http-client'

export async function getClients(page: number = 1, perPage: number = 10) {
  const { data } = await httpClient.get<IPaginatedResponse<IClient>>(
    '/clients',
    {
      params: {
        _page: page,
        _per_page: perPage,
      },
    },
  )

  return data
}
