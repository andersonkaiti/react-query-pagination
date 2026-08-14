import { Skeleton } from '@components/ui/skeleton'

interface IClientsSkeletonProps {
  perPage: number
}

export function ClientsSkeleton({ perPage = 10 }: IClientsSkeletonProps) {
  return (
    <div className="space-y-1">
      <Skeleton className="h-10 w-full" />
      {Array.from({ length: perPage }, (_, index: number) => index).map(
        (index) => (
          <Skeleton key={index} className="h-12 w-full" />
        ),
      )}
    </div>
  )
}
