import { Skeleton } from '@components/ui/skeleton'

export function ClientsSkeleton() {
  return (
    <div className="space-y-1">
      <Skeleton className="h-10 w-full" />
      {Array.from({ length: 20 }, (_, index: number) => index).map((index) => (
        <Skeleton key={index} className="h-12 w-full" />
      ))}
    </div>
  )
}
