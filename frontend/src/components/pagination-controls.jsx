import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination.jsx'

export const PaginationControls = ({ pagination }) => {
  if (!pagination || pagination.total <= pagination.limit) {
    return null
  }

  return (
    <div className="flex items-center justify-center border-t border-gray-200 p-4">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault()
                pagination.goPrev()
              }}
              className={
                pagination.currentPage === 1
                  ? 'pointer-events-none opacity-50'
                  : ''
              }
            />
          </PaginationItem>

          {pagination.buildPages().map((p, idx) => (
            <PaginationItem key={`${p}-${idx}`}>
              {typeof p === 'number' ? (
                <PaginationLink
                  href="#"
                  isActive={p === pagination.currentPage}
                  onClick={(e) => {
                    e.preventDefault()
                    pagination.goToPage(p)
                  }}>
                  {p}
                </PaginationLink>
              ) : (
                <PaginationEllipsis />
              )}
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault()
                pagination.goNext()
              }}
              className={
                pagination.currentPage === pagination.pageCount
                  ? 'pointer-events-none opacity-50'
                  : ''
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}
