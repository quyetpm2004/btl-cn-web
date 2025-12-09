import React, { useState, useEffect, useMemo } from 'react'
import {
  Search,
  Filter,
  Download,
  Eye,
  CheckCircle,
  Calendar,
  Plus,
  Clock,
  AlertCircle,
  FileText,
  X,
  CreditCard,
  Loader2
} from 'lucide-react'
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient
} from '@tanstack/react-query'
import { toast } from 'sonner'
import { getInvoicesApi, getInvoiceStatsApi } from '@/services/invoice.api'
import { getAllCollectionPeriodsApi } from '@/services/collectionPeriod.api'
import { usePagination } from '@/hooks/use-pagination'
import { PaginationControls } from '@/components/pagination-controls'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'

// --- HELPERS ---
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(amount)
}

const StatsCard = ({ title, value, icon: Icon, color, subValue }) => (
  <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <h3 className="mt-2 text-2xl font-bold text-gray-900">{value}</h3>
        {subValue && <p className="mt-1 text-xs text-gray-500">{subValue}</p>}
      </div>
      <div className={`rounded-full p-3 ${color}`}>
        <Icon />
      </div>
    </div>
  </div>
)

const StatusBadge = ({ status }) => {
  const configs = {
    0: {
      color: 'bg-yellow-50 text-yellow-700 border-yellow-200',
      label: 'Chờ thanh toán',
      icon: Clock
    },
    1: {
      color: 'bg-green-50 text-green-700 border-green-200',
      label: 'Đã thanh toán',
      icon: CheckCircle
    },
    2: {
      color: 'bg-red-50 text-red-700 border-red-200',
      label: 'Quá hạn',
      icon: AlertCircle
    }
  }
  const config = configs[status] || configs[0]
  const Icon = config.icon

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs font-medium ${config.color}`}>
      <Icon className="h-3.5 w-3.5" />
      {config.label}
    </span>
  )
}

const InvoiceDetailModal = ({ invoice, onClose, onPay }) => {
  if (!invoice) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="animate-in fade-in zoom-in w-full max-w-lg overflow-hidden rounded-xl bg-white shadow-xl duration-200">
        <div className="flex items-center justify-between border-b border-gray-100 p-5">
          <div>
            <h3 className="text-lg font-bold text-gray-900">
              Chi tiết hóa đơn
            </h3>
            <p className="text-sm text-gray-500">
              #{invoice.id} - {invoice.period?.name}
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-1 transition-colors hover:bg-gray-100">
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <div className="space-y-6 p-6">
          {/* Info Card */}
          <div className="flex items-start justify-between rounded-lg border border-blue-100 bg-blue-50 p-4">
            <div>
              <p className="text-xs font-semibold tracking-wide text-blue-600 uppercase">
                Căn hộ
              </p>
              <p className="text-xl font-bold text-gray-900">
                {invoice.apartment?.apartment_code}
              </p>
              <p className="text-sm text-gray-600">
                {invoice.apartment?.residents?.[0]?.full_name || '---'}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs font-semibold tracking-wide text-blue-600 uppercase">
                Tổng cộng
              </p>
              <p className="text-xl font-bold text-blue-700">
                {formatCurrency(invoice.total_amount)}
              </p>
              <div className="mt-1">
                <StatusBadge status={invoice.status} />
              </div>
            </div>
          </div>

          {/* Details List */}
          <div>
            <h4 className="mb-3 flex items-center gap-2 text-sm font-medium text-gray-700">
              <FileText className="h-4 w-4" /> Các khoản phí
            </h4>
            <ul className="space-y-3">
              {invoice.items?.map((item, idx) => (
                <li
                  key={idx}
                  className="flex justify-between border-b border-gray-50 py-2 text-sm last:border-0">
                  <span className="text-gray-600">
                    {item.service?.name || 'Dịch vụ'} (x{item.quantity})
                  </span>
                  <span className="font-medium text-gray-900">
                    {formatCurrency(item.amount)}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Payment Info if Paid */}
          {invoice.status === 1 && (
            <div className="flex items-start gap-2 rounded border border-green-100 bg-green-50 p-3 text-sm text-green-800">
              <CheckCircle className="mt-0.5 h-4 w-4" />
              <div>
                <span className="font-semibold">Đã thanh toán</span>
                {/* Add payment date if available */}
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-3 border-t border-gray-100 bg-gray-50 p-5">
          <button
            onClick={onClose}
            className="rounded-lg border border-transparent px-4 py-2 text-sm font-medium text-gray-600 transition-all hover:border-gray-200 hover:bg-white">
            Đóng
          </button>
          {invoice.status !== 1 && (
            <button
              onClick={() => onPay(invoice)}
              className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-all hover:bg-blue-700">
              <CreditCard className="h-4 w-4" /> Xác nhận thanh toán
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export const Invoices = () => {
  const queryClient = useQueryClient()
  const pagination = usePagination(1, 10)

  const [search, setSearch] = useState('')
  const [queryInput, setQueryInput] = useState('')
  const [periodId, setPeriodId] = useState('all')
  const [status, setStatus] = useState('all')
  const [selectedInvoice, setSelectedInvoice] = useState(null)

  const filters = useMemo(
    () => ({
      page: pagination.page,
      limit: pagination.limit,
      status: status === 'all' ? undefined : status,
      period_id: periodId === 'all' ? undefined : periodId,
      query: search
    }),
    [pagination.page, pagination.limit, status, periodId, search]
  )

  // Queries
  const { data: periodsData } = useQuery({
    queryKey: ['periods'],
    queryFn: getAllCollectionPeriodsApi
  })
  const periods = periodsData?.collectionPeriods || []

  const { data: statsData } = useQuery({
    queryKey: ['invoice-stats', periodId, status, search],
    queryFn: () =>
      getInvoiceStatsApi({
        period_id: periodId === 'all' ? undefined : periodId,
        status: status === 'all' ? undefined : status,
        search
      })
  })
  const stats = statsData?.data || {
    total_amount: 0,
    paid_amount: 0,
    unpaid_amount: 0,
    count: 0
  }

  const { data: invoicesData, isLoading } = useQuery({
    queryKey: ['invoices', filters],
    queryFn: () => getInvoicesApi(filters),
    placeholderData: keepPreviousData
  })

  const invoices = invoicesData?.data?.items || []
  const total = invoicesData?.data?.total || 0

  useEffect(() => {
    pagination.setTotal(total)
  }, [total, pagination])

  const handleSearch = () => {
    pagination.setPage(1)
    setSearch(queryInput)
  }

  const handleReset = () => {
    setQueryInput('')
    setSearch('')
    setPeriodId('all')
    setStatus('all')
    pagination.setPage(1)
  }

  // Mock pay function (replace with real API later)
  const handlePayInvoice = (invoice) => {
    toast.info('Chức năng thanh toán đang phát triển')
  }

  return (
    <div className="animate-in fade-in space-y-6 duration-300">
      <div className="mb-6">
        <h2 className="mb-2 text-2xl font-bold text-gray-800">
          Quản lý Hóa đơn
        </h2>
        <p className="text-gray-600">
          Theo dõi và quản lý hóa đơn thu phí của cư dân
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Tổng doanh thu"
          value={formatCurrency(stats.total_amount || 0)}
          icon={CreditCard}
          color="bg-blue-500"
          subValue="Dự kiến thu"
        />
        <StatsCard
          title="Đã thu"
          value={formatCurrency(stats.paid_amount || 0)}
          icon={CheckCircle}
          color="bg-green-500"
          subValue={`${stats.total_amount ? Math.round((stats.paid_amount / stats.total_amount) * 100) : 0}% hoàn thành`}
        />
        <StatsCard
          title="Chưa thu"
          value={formatCurrency(stats.unpaid_amount || 0)}
          icon={Clock}
          color="bg-yellow-500"
          subValue="Cần thu hồi"
        />
        <StatsCard
          title="Tổng hóa đơn"
          value={stats.count || 0}
          icon={FileText}
          color="bg-purple-500"
          subValue="Số lượng hóa đơn"
        />
      </div>

      {/* Toolbar */}
      <div className="flex flex-col justify-between gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm lg:flex-row">
        <div className="flex flex-1 flex-col gap-3 md:flex-row">
          <div className="relative w-full md:w-64">
            <Input
              placeholder="Tìm căn hộ..."
              value={queryInput}
              onChange={(e) => setQueryInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            <Button
              onClick={handleSearch}
              className="absolute top-0.5 right-0.5 h-9 w-9 text-gray-500 hover:text-blue-600"
              variant="ghost"
              size="icon">
              <Search className="h-4 w-4" />
            </Button>
          </div>

          <Select value={periodId} onValueChange={setPeriodId}>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="Chọn đợt thu" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả đợt thu</SelectItem>
              {periods.map((p) => (
                <SelectItem key={p.id} value={String(p.id)}>
                  {p.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Trạng thái" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả trạng thái</SelectItem>
              <SelectItem value="0">Chờ thanh toán</SelectItem>
              <SelectItem value="1">Đã thanh toán</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="ghost" onClick={handleReset}>
            Đặt lại
          </Button>
        </div>
      </div>

      {/* Data Table */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-gray-200 bg-gray-50 text-gray-500">
              <tr>
                <th className="px-6 py-4 font-medium whitespace-nowrap">
                  Thông tin căn hộ
                </th>
                <th className="px-6 py-4 font-medium whitespace-nowrap">
                  Đợt thu
                </th>
                <th className="px-6 py-4 text-right font-medium whitespace-nowrap">
                  Tổng tiền
                </th>
                <th className="px-6 py-4 font-medium whitespace-nowrap">
                  Trạng thái
                </th>
                <th className="sticky right-0 bg-gray-50 px-6 py-4 text-right font-medium whitespace-nowrap">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-gray-500">
                    <Loader2 className="mx-auto h-6 w-6 animate-spin" />
                    <p className="mt-2">Đang tải dữ liệu...</p>
                  </td>
                </tr>
              ) : invoices.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-gray-500">
                    Không có hóa đơn nào
                  </td>
                </tr>
              ) : (
                invoices.map((invoice) => (
                  <tr
                    key={invoice.id}
                    className="group transition-colors hover:bg-blue-50/30">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-xs font-bold text-gray-600">
                          {invoice.apartment?.apartment_code?.substring(0, 1)}
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">
                            {invoice.apartment?.apartment_code}
                          </div>
                          <div className="text-xs text-gray-500">
                            {invoice.apartment?.residents?.[0]?.full_name ||
                              '---'}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5 text-gray-400" />
                        {invoice.period?.name}
                      </div>
                      <div className="mt-0.5 text-xs text-gray-400">
                        Hạn: {invoice.period?.end_date}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right font-bold whitespace-nowrap text-gray-900">
                      {formatCurrency(invoice.total_amount)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={invoice.status} />
                    </td>
                    <td className="sticky right-0 bg-white px-6 py-4 text-right whitespace-nowrap group-hover:bg-blue-50/30">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => setSelectedInvoice(invoice)}
                          className="rounded-lg border border-transparent p-2 text-gray-400 shadow-sm transition-colors hover:border-gray-200 hover:bg-white hover:text-blue-600"
                          title="Xem chi tiết">
                          <Eye className="h-4 w-4" />
                        </button>
                        {invoice.status !== 1 && (
                          <button
                            onClick={() => handlePayInvoice(invoice)}
                            className="rounded-lg border border-green-200 bg-green-50 p-2 font-medium text-green-600 transition-colors hover:bg-green-100"
                            title="Xác nhận thanh toán">
                            <CheckCircle className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <PaginationControls pagination={pagination} />
      </div>

      {selectedInvoice && (
        <InvoiceDetailModal
          invoice={selectedInvoice}
          onClose={() => setSelectedInvoice(null)}
          onPay={handlePayInvoice}
        />
      )}
    </div>
  )
}
