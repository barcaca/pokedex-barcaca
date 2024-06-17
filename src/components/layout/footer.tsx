import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '../ui/pagination'
interface FooterProps {
  page: number
  totalPage: number
  pokemon?: string
}
/**
 * Footer component for displaying pagination controls.
 *
 * @param page - The current page number.
 * @param totalPage - The total number of pages.
 * @param pokemon - Optional parameter for filtering pokemon.
 *
 * @returns - A React component for the footer.
 */
export function Footer({ page, totalPage, pokemon }: FooterProps) {
  /**
   * Calculates the pages to be displayed in the pagination component.
   *
   * @returns {number[]} - An array of page numbers to be displayed.
   *                      The array may contain special values (-1) to represent ellipses.
   * @example
   * const pagesToShow = calculatePagesToShow(); // Retorna [1, -1, 3, 4, 5, -1, 131] para page = 4 e totalPage = 15
   */
  function calculatePagesToShow(): number[] {
    const pages: number[] = []

    // If there is only one page or no pages, return an empty array
    if (totalPage <= 1) {
      return []
    }

    // Always show the first page
    pages.push(1)

    // Calculate the range of pages to display around the current page
    const start = Math.max(2, page - 1)
    const end = Math.min(page + 1, totalPage - 1)

    // Add an ellipsis if there is a gap between the first page and the start
    if (start > 2) {
      pages.push(-1)
    }

    // Add the pages within the calculated range
    for (let i = start; i <= end; i++) {
      pages.push(i)
    }

    // Add an ellipsis if there is a gap between the end and the last page
    if (end < totalPage - 1) {
      pages.push(-1)
    }

    // Always show the last page
    if (totalPage > 1) {
      pages.push(totalPage)
    }
    return pages
  }
  const pagesToShow = calculatePagesToShow()
  console.log(pagesToShow)

  return (
    <footer className="absolute bottom-0 flex w-full p-3 md:p-4">
      <Pagination>
        <PaginationContent>
          {/* Previous page button */}
          <PaginationItem>
            <PaginationPrevious
              href={{
                query: {
                  ...(pokemon ? { pokemon } : {}),
                  page: page > 1 ? page - 1 : 1,
                },
              }}
              className={page <= 1 ? 'pointer-events-none opacity-10' : ''}
              aria-disabled={page <= 1}
              tabIndex={page <= 1 ? -1 : undefined}
            >
              previous
            </PaginationPrevious>
          </PaginationItem>
          {/* Render page numbers or ellipses */}
          {pagesToShow.map((item, index) =>
            item === -1 ? (
              <PaginationItem key={index}>
                <PaginationEllipsis />
              </PaginationItem>
            ) : (
              <PaginationItem key={index}>
                {/* Page number link */}
                <PaginationLink
                  href={{
                    query: {
                      ...(pokemon ? { pokemon } : {}),
                      page: item,
                    },
                  }}
                  isActive={page === item}
                  className={page === item ? 'pointer-events-none' : undefined}
                  aria-disabled={page === item}
                  tabIndex={page === item ? -1 : undefined}
                >
                  {item}
                </PaginationLink>
              </PaginationItem>
            ),
          )}
          {/* Next page button */}
          <PaginationItem>
            <PaginationNext
              href={{
                query: {
                  ...(pokemon ? { pokemon } : {}),
                  page: page + 1,
                },
              }}
              className={
                page === totalPage
                  ? 'pointer-events-none opacity-10'
                  : undefined
              }
              aria-disabled={page === totalPage}
              tabIndex={page === totalPage ? -1 : undefined}
            >
              next
            </PaginationNext>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </footer>
  )
}
