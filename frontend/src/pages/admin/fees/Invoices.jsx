import React, { useState, useEffect, useMemo, useRef } from 'react'
import {
  Download,
  Eye,
  CheckCircle,
  Calendar,
  Clock,
  AlertCircle,
  FileText,
  CreditCard,
  Upload,
  Bell,
  AlertTriangle
} from 'lucide-react'
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient
} from '@tanstack/react-query'
import { toast } from 'sonner'
import {
  getInvoicesApi,
  getInvoiceStatsApi,
  payInvoiceApi,
  bulkUpdateInvoicesApi,
  sendPeriodNotificationApi,
  sendOverdueNotificationApi
} from '@/services/invoice.api'
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { format } from 'date-fns'
import { InvoiceDetailDialog } from '@/components/fees/invoice-detail-dialog'
import { ConfirmDialog } from '@/components/confirm-dialog'
import * as XLSX from 'xlsx'
import { Spinner } from '@/components/ui/spinner'

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(amount)
}

// eslint-disable-next-line no-unused-vars
const StatsCard = ({ title, value, icon: Icon, color, subValue }) => (
  <div className="rounded-xl bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <h3 className="mt-2 text-2xl font-bold text-gray-900">{value}</h3>
        {subValue && <p className="mt-1 text-xs text-gray-500">{subValue}</p>}
      </div>
      <div className={`rounded-full p-3 ${color}`}>
        <Icon className="h-6 w-6 text-white" />
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

export const Invoices = () => {
  const queryClient = useQueryClient()
  const pagination = usePagination(1, 10)
  const fileInputRef = useRef(null)

  const [search, setSearch] = useState('')
  const [queryInput, setQueryInput] = useState('')
  const [periodId, setPeriodId] = useState('all')
  const [status, setStatus] = useState('all')
  const [selectedInvoice, setSelectedInvoice] = useState(null)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [invoiceToPay, setInvoiceToPay] = useState(null)

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

  // Mutations
  const payMutation = useMutation({
    mutationFn: payInvoiceApi,
    onSuccess: () => {
      toast.success('Thanh toán thành công')
      queryClient.invalidateQueries(['invoices'])
      queryClient.invalidateQueries(['invoice-stats'])
      setSelectedInvoice(null)
    },
    onError: (err) => {
      toast.error(
        'Lỗi thanh toán: ' + (err.response?.data?.message || err.message)
      )
    }
  })

  const bulkUpdateMutation = useMutation({
    mutationFn: bulkUpdateInvoicesApi,
    onSuccess: (data) => {
      toast.success(`Đã cập nhật hóa đơn`, {
        id: 'bulk-update'
      })
      if (data.data.errors?.length > 0) {
        toast.warning(`Có ${data.data.errors.length} lỗi xảy ra`, {
          id: 'bulk-update'
        })
        console.warn(data.data.errors)
      }
      queryClient.invalidateQueries(['invoices'])
      queryClient.invalidateQueries(['invoice-stats'])
    },
    onError: (err) => {
      toast.error(
        'Lỗi cập nhật: ' + (err.response?.data?.message || err.message)
      )
    }
  })

  const notifyPeriodMutation = useMutation({
    mutationFn: sendPeriodNotificationApi,
    onSuccess: (data) => {
      toast.success(data.data.message || 'Đã gửi thông báo đợt thu')
    },
    onError: (err) => {
      toast.error(
        'Lỗi gửi thông báo: ' + (err.response?.data?.message || err.message)
      )
    }
  })

  const notifyOverdueMutation = useMutation({
    mutationFn: sendOverdueNotificationApi,
    onSuccess: (data) => {
      toast.success(data.data.message || 'Đã gửi thông báo quá hạn')
    },
    onError: (err) => {
      toast.error(
        'Lỗi gửi thông báo: ' + (err.response?.data?.message || err.message)
      )
    }
  })

  // Handlers
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

  const handleFilterChange = (newFilters) => {
    if (newFilters.periodId !== undefined) setPeriodId(newFilters.periodId)
    if (newFilters.status !== undefined) setStatus(newFilters.status)
    pagination.setPage(1)
  }

  const handlePayInvoice = (invoice) => {
    setInvoiceToPay(invoice)
    setConfirmOpen(true)
  }

  const handleConfirmPay = () => {
    if (invoiceToPay) {
      payMutation.mutate(invoiceToPay.id)
      setConfirmOpen(false)
    }
  }

  const handleExport = async () => {
    if (periodId === 'all') {
      toast.error('Vui lòng chọn đợt thu để xuất báo cáo')
      return
    }

    try {
      toast.loading('Đang tải dữ liệu...', { id: 'export-loading' })
      const res = await getInvoicesApi({
        period_id: periodId,
        limit: 10000,
        page: 1
      })

      const allInvoices = res.data?.items || []

      if (allInvoices.length === 0) {
        toast.dismiss('export-loading')
        toast.info('Không có dữ liệu hóa đơn cho đợt này')
        return
      }

      const data = allInvoices.map((inv) => ({
        'Căn hộ': inv.apartment?.apartment_code,
        'Chủ hộ': inv.apartment?.residents?.[0]?.full_name || '',
        'Đợt thu': inv.period?.name,
        'Tổng tiền': inv.total_amount,
        'Trạng thái':
          inv.status === 1
            ? 'Đã thanh toán'
            : inv.status === 2
              ? 'Quá hạn'
              : 'Chờ thanh toán',
        'Ngày tạo': format(new Date(inv.createdAt), 'dd/MM/yyyy')
      }))

      const worksheet = XLSX.utils.json_to_sheet(data)
      const workbook = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Invoices')

      const periodName =
        periods.find((p) => String(p.id) === periodId)?.name || periodId
      XLSX.writeFile(
        workbook,
        `Báo cáo thu phí ${periodName}_${format(new Date(), 'yyyyMMdd')}.xlsx`
      )

      toast.success('Xuất báo cáo thành công', { id: 'export-loading' })
    } catch (error) {
      console.error(error)
      toast.error('Lỗi khi xuất báo cáo', { id: 'export-loading' })
    }
  }

  const handleImportClick = () => {
    if (periodId === 'all') {
      toast.error('Vui lòng chọn đợt thu cụ thể để nhập dữ liệu')
      return
    }
    fileInputRef.current?.click()
  }

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (evt) => {
      try {
        const bstr = evt.target.result
        const wb = XLSX.read(bstr, { type: 'binary' })
        const wsname = wb.SheetNames[0]
        const ws = wb.Sheets[wsname]
        const data = XLSX.utils.sheet_to_json(ws)

        const items = []
        data.forEach((row) => {
          const apartmentCode = row['Mã căn hộ'] || row['ApartmentCode']
          if (!apartmentCode) return

          const elecUsage = row['Số điện (kWh)'] || row['Electricity']
          if (elecUsage !== undefined) {
            items.push({
              apartment_code: apartmentCode,
              service_name: 'Điện',
              usage: elecUsage
            })
          }

          const waterUsage = row['Số nước (m3)'] || row['Water']
          if (waterUsage !== undefined) {
            items.push({
              apartment_code: apartmentCode,
              service_name: 'Nước',
              usage: waterUsage
            })
          }
        })

        if (items.length === 0) {
          toast.error('File không có dữ liệu hợp lệ')
          return
        }

        bulkUpdateMutation.mutate({ periodId, items })
      } catch (error) {
        console.error(error)
        toast.error('Lỗi đọc file Excel')
      }
    }
    reader.readAsBinaryString(file)
    e.target.value = null // Reset input
  }

  return (
    <div className="animate-in fade-in space-y-6 duration-300">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h2 className="mb-2 text-2xl font-bold text-gray-800">
            Quản lý Hóa đơn
          </h2>
          <p className="text-gray-600">
            Theo dõi và quản lý hóa đơn thu phí của cư dân
          </p>
        </div>

        <div className="flex gap-2">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            className="hidden"
            accept=".xlsx, .xls"
          />
          <Button
            variant="outline"
            onClick={() => notifyPeriodMutation.mutate(periodId)}
            disabled={periodId === 'all' || notifyPeriodMutation.isPending}
            className="gap-2">
            <Bell className="h-4 w-4" />
            Thông báo đợt thu
          </Button>
          <Button
            variant="destructive"
            onClick={() => notifyOverdueMutation.mutate()}
            disabled={notifyOverdueMutation.isPending}
            className="gap-2">
            <AlertTriangle className="h-4 w-4" />
            Thông báo quá hạn
          </Button>
          <Button variant="blue" onClick={handleImportClick} className="gap-2">
            <Upload className="h-4 w-4" />
            Nhập Excel
          </Button>
          <Button variant="blue" onClick={handleExport} className="gap-2">
            <Download className="h-4 w-4" />
            Xuất Excel
          </Button>
        </div>
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
          subValue="Cần thu"
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
      <div className="rounded-xl bg-white p-4 shadow-sm">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-10">
          <div className="relative md:col-span-3">
            <Input
              placeholder="Tìm kiếm căn hộ..."
              value={queryInput}
              onChange={(e) => setQueryInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            <Button
              variant="icon"
              onClick={handleSearch}
              size="icon"
              className="absolute right-0.5 cursor-pointer text-gray-500 hover:text-blue-500">
              <i className="fas fa-search"></i>
            </Button>
          </div>

          <div className="md:col-span-2 md:col-start-6">
            <Select
              value={periodId}
              onValueChange={(value) =>
                handleFilterChange({ periodId: value })
              }>
              <SelectTrigger className="w-full">
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
          </div>

          <div className="md:col-span-2 md:col-start-8">
            <Select
              value={status}
              onValueChange={(value) => handleFilterChange({ status: value })}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả trạng thái</SelectItem>
                <SelectItem value="0">Chờ thanh toán</SelectItem>
                <SelectItem value="1">Đã thanh toán</SelectItem>
                <SelectItem value="2">Quá hạn</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button variant="outline" onClick={handleReset}>
            Đặt lại
          </Button>
        </div>
      </div>

      {/* Data Table */}
      <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow className="hover:bg-transparent">
              <TableHead className="py-4 pl-6 font-medium text-gray-500">
                Thông tin căn hộ
              </TableHead>
              <TableHead className="py-4 font-medium text-gray-500">
                Đợt thu
              </TableHead>
              <TableHead className="py-4 text-right font-medium text-gray-500">
                Tổng tiền
              </TableHead>
              <TableHead className="py-4 text-right font-medium text-gray-500">
                Trạng thái
              </TableHead>
              <TableHead className="py-4 pr-6 text-right font-medium text-gray-500">
                Thao tác
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="h-24 text-center text-gray-500">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <Spinner />
                    <p>Đang tải dữ liệu...</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : invoices.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-gray-500">
                  Không có hóa đơn nào
                </TableCell>
              </TableRow>
            ) : (
              invoices.map((invoice) => (
                <TableRow key={invoice.id} className="group h-14">
                  <TableCell className="pl-6">
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
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5 text-gray-600">
                      <Calendar className="h-3.5 w-3.5 text-gray-400" />
                      {invoice.period?.name}
                    </div>
                    <div className="mt-0.5 text-xs text-gray-400">
                      Hạn:{' '}
                      {format(
                        new Date(invoice?.period?.end_date || Date.now()),
                        'dd/MM/yyyy'
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-bold text-gray-900">
                    {formatCurrency(invoice.total_amount)}
                  </TableCell>
                  <TableCell className="text-right">
                    <StatusBadge status={invoice.status} />
                  </TableCell>
                  <TableCell className="pr-6 text-right">
                    <div className="flex justify-end gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="icon"
                              size="icon-sm"
                              onClick={() => setSelectedInvoice(invoice)}
                              className="text-gray-600 hover:bg-gray-100">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Xem chi tiết</p>
                          </TooltipContent>
                        </Tooltip>

                        {invoice.status !== 1 && (
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="icon"
                                size="icon-sm"
                                onClick={() => handlePayInvoice(invoice)}
                                className="text-green-600 hover:bg-green-50">
                                <CheckCircle className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Xác nhận thanh toán</p>
                            </TooltipContent>
                          </Tooltip>
                        )}
                      </TooltipProvider>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        <PaginationControls pagination={pagination} />
      </div>

      {selectedInvoice && (
        <InvoiceDetailDialog
          invoice={selectedInvoice}
          open={!!selectedInvoice}
          onOpenChange={(open) => !open && setSelectedInvoice(null)}
          onPay={handlePayInvoice}
        />
      )}

      <ConfirmDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title="Xác nhận thanh toán"
        description={
          invoiceToPay ? (
            <span>
              Bạn có chắc muốn xác nhận thanh toán cho hóa đơn{' '}
              <strong>{invoiceToPay.period?.name}</strong> của căn hộ{' '}
              <strong>{invoiceToPay.apartment?.apartment_code}</strong>?
              <br />
              Tổng tiền:{' '}
              <strong>{formatCurrency(invoiceToPay.total_amount)}</strong>
            </span>
          ) : (
            'Bạn có chắc muốn thực hiện hành động này?'
          )
        }
        onConfirm={handleConfirmPay}
        isLoading={payMutation.isPending}
        color="blue"
      />
    </div>
  )
}
