import { useState } from 'react'

export const usePagination = (initialPage = 1, initialLimit = 9) => {
  const [page, setPage] = useState(initialPage)
  const [limit, setLimit] = useState(initialLimit)
  const [total, setTotal] = useState(0)

  const pageCount = Math.max(1, Math.ceil(total / (limit || 1)))
  const currentPage = Math.min(Math.max(1, page || 1), pageCount)

  const goToPage = (page) => {
    const validPage = Math.min(Math.max(1, page), pageCount)
    setPage(validPage)
  }

  const goPrev = () => {
    if (currentPage > 1) goToPage(currentPage - 1)
  }

  const goNext = () => {
    if (currentPage < pageCount) goToPage(currentPage + 1)
  }

  const buildPages = () => {
    const pages = []
    const firstPage = 1
    const lastPage = pageCount

    const start = Math.max(firstPage, currentPage - 1)
    const end = Math.min(lastPage, currentPage + 1)

    if (start > firstPage) {
      pages.push(firstPage)
      if (start > firstPage + 1) pages.push('ellipsis-start')
    }

    for (let p = start; p <= end; p++) pages.push(p)

    if (end < lastPage) {
      if (end < lastPage - 1) pages.push('ellipsis-end')
      pages.push(lastPage)
    }

    return pages
  }

  return {
    page,
    setPage,
    limit,
    setLimit,
    total,
    setTotal,
    pageCount,
    currentPage,
    goToPage,
    goPrev,
    goNext,
    buildPages
  }
}
