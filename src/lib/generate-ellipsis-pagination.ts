export function generateEllipsisPagination(
  currentPage: number,
  totalPages: number,
  surroundingPages: number = 2,
): string[] {
  const pages: string[] = []

  for (let index = 1; index <= totalPages; index++) {
    const isFirstPage = index === 1
    const isLastPage = index === totalPages
    const isWithinLowerBound = index >= currentPage - surroundingPages
    const isWithinUpperBound = index <= currentPage + surroundingPages
    const isEllipsisPosition =
      index === currentPage - surroundingPages - 1 ||
      index === currentPage + surroundingPages + 1

    if (isEllipsisPosition && !isFirstPage && !isLastPage) {
      pages.push('ELLIPSIS')
      continue
    }

    if (
      isFirstPage ||
      isLastPage ||
      (isWithinLowerBound && isWithinUpperBound)
    ) {
      pages.push(String(index))
    }
  }

  return pages
}
