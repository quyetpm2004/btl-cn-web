import React from 'react'
import {
  X,
  FileText,
  CheckCircle,
  CreditCard,
  Clock,
  AlertCircle
} from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
  DialogFooter
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { format } from 'date-fns'

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(amount)
}

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

export const InvoiceDetailDialog = ({ invoice, open, onOpenChange, onPay }) => {
  if (!invoice) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg overflow-hidden p-0">
        <DialogHeader className="border-b border-gray-100 p-5">
          <DialogTitle className="text-lg font-bold text-gray-900">
            Chi tiết hóa đơn
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-500">
            {invoice.period?.name}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 px-6">
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
                    {item.service?.name || 'Dịch vụ'} - {item.quantity}{' '}
                    {item.service?.unit || ''}
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
                {invoice.payments?.[0] && (
                  <p className="text-xs opacity-80">
                    {format(
                      new Date(invoice.payments[0].paid_at),
                      'dd/MM/yyyy HH:mm'
                    )}
                    , phương thức:{' '}
                    <strong>
                      {invoice.payments[0].method === 'cash'
                        ? 'Tiền mặt'
                        : invoice.payments[0].method === 'credit_card'
                          ? 'Chuyển khoản'
                          : invoice.payments[0].method}
                    </strong>
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="border-t border-gray-100 bg-gray-50 p-5">
          <DialogClose asChild>
            <Button variant="outline">Đóng</Button>
          </DialogClose>
          {invoice.status !== 1 && (
            <Button onClick={() => onPay(invoice)} variant="blue">
              Xác nhận thanh toán
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
