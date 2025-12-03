import React from 'react'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

const BillDetailDrawer = ({ isOpen, onClose, billData, handlePaid }) => {
  if (!billData) return null

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-2xl">Chi tiết hóa đơn</SheetTitle>
          <SheetDescription>
            Xem thông tin chi tiết hóa đơn của bạn
          </SheetDescription>
        </SheetHeader>

        <div className=" space-y-6">
          {/* Bill Header */}
          <div className="space-y-4 rounded-lg bg-gray-50 p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Số hóa đơn</p>
                <p className="text-lg font-bold text-gray-900">{billData.id}</p>
              </div>
              <Badge
                variant={
                  billData.status === 0 ? 'destructive' : 'success'
                }
                className="text-sm">
                {billData.status === 0 ? 'Chưa thanh toán' : 'Đã thanh toán'}
              </Badge>
            </div>

            <Separator />

            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2">
                <p className="text-sm font-medium text-gray-600">Tên hóa đơn</p>
                <p className="text-base font-semibold text-gray-900">
                  {billData.name}
                </p>
              </div>
              <div className="col-span-1">
                <p className="text-sm font-medium text-gray-600">Hạn thanh toán</p>
                <p className="text-base font-semibold text-gray-900">
                  {new Date(billData.end_date).toLocaleDateString('vi-VN')}
                </p>
              </div>
            </div>
            {billData.paid_at && (
              <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-600">Ngày thanh toán</p>
                <p className="text-base font-semibold text-gray-900">
                  {new Date(billData.paid_at).toLocaleDateString('vi-VN')}
                </p>
              </div>
            </div>
            )}
            
          </div>

          {/* Bill Items */}
          <div className="space-y-3">
            <h3 className="font-semibold text-gray-900 ml-4">Chi tiết dịch vụ</h3>
            <div className="space-y-2 rounded-lg border border-gray-200 p-4">
              {billData.items && billData.items.length > 0 ? (
                billData.items.map((item, index) => (
                  <div key={index}>
                    <div className="flex justify-between pb-2">
                      <div>
                                <div className="flex items-center gap-2">
                                  <p className="font-medium text-gray-900">
                                    {item.service?.name}
                                  </p>
                                  {/* Nếu là tiền thuê nhà, hiển thị badge để nổi bật */}
                                  {item.service?.name?.toLowerCase().includes('thuê') && (
                                    <span className="inline-flex items-center rounded-full bg-yellow-100 px-2 py-0.5 text-xs font-medium text-yellow-800">
                                      Tiền thuê
                                    </span>
                                  )}
                                </div>
                        {item.quantity && (
                          <p className="text-sm text-gray-600">
                            Số lượng: {item.quantity}
                          </p>
                        )}
                        {item.unit_price && (
                          <p className="text-sm text-gray-600">
                            Đơn giá: {item.unit_price.toLocaleString('vi', {
                              style: 'currency',
                              currency: 'VND',
                            })}
                          </p>
                        )}
                      </div>
                      <p className="font-semibold text-gray-900">
                        {item.amount?.toLocaleString('vi', {
                          style: 'currency',
                          currency: 'VND',
                        })}
                      </p>
                    </div>
                    {index < billData.items.length - 1 && (
                      <Separator className="my-2" />
                    )}
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-600">Không có dữ liệu dịch vụ</p>
              )}
            </div>
          </div>

          {/* Summary */}
          <div className="space-y-3 rounded-lg bg-blue-50 p-4">
        

            <div className="flex justify-between pt-2">
              <span className="text-lg font-bold text-gray-900">Tổng cộng</span>
              <span className="text-lg font-bold text-blue-600">
                {billData.total_amount?.toLocaleString('vi', {
                  style: 'currency',
                  currency: 'VND',
                })}
              </span>
            </div>
          </div>

          {/* Notes */}
          {billData.notes && (
            <div className="space-y-2 rounded-lg border border-gray-200 p-4">
              <p className="font-medium text-gray-900">Ghi chú</p>
              <p className="text-sm text-gray-700">{billData.notes}</p>
            </div>
          )}

        

          {billData.status === 0 && (
            <Button onClick={() => handlePaid(billData.id)} className="w-full bg-red-600 text-white hover:bg-red-700 mb-2">
              Thanh toán ngay
            </Button>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default BillDetailDrawer
