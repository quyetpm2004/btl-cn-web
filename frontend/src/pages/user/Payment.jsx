import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from '@/components/ui/select'
import { Clock, Mail, Phone } from 'lucide-react'

const Payment = () => {
  const viewBillDetail = (id) => alert(`Xem chi tiết hóa đơn: ${id}`)
  const openPaymentModal = (amount, name) =>
    alert(`Thanh toán ${name} (${amount} VNĐ)`)
  const downloadBill = (id) => alert(`Tải hóa đơn ${id}`)
  const filterPaymentHistory = (value) => alert(`Lọc lịch sử: ${value}`)
  const exportPaymentHistory = () => alert('Xuất lịch sử thanh toán ra Excel')
  const viewReceipt = (id) => alert(`Xem biên lai: ${id}`)
  const downloadReceipt = (id) => alert(`Tải biên lai: ${id}`)

  return (
    <div className="space-y-6 text-black">
      {/* Header */}
      <div className="mb-6">
        <h2 className="mb-2 text-2xl font-bold text-gray-800">
          Thanh toán trực tuyến
        </h2>
        <p className="text-gray-600">Thanh toán nhanh chóng và tiện lợi</p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left Column */}
        <div className="space-y-6 lg:col-span-2">
          {/* Outstanding Bills */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                Hóa đơn chưa thanh toán
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Bill 1 */}
              <Card className="border border-red-300 bg-red-50">
                <CardContent className="space-y-3 p-4">
                  <div className="flex justify-between">
                    <div>
                      <p className="font-semibold text-red-700">
                        Hóa đơn tháng 12/2024
                      </p>
                      <p className="text-sm text-red-600">Hạn: 15/12/2024</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">Chưa hết hạn</Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => viewBillDetail('202412')}>
                        Chi tiết
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Phí quản lý</span>
                      <span>1,125,000 VNĐ</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Phí gửi xe</span>
                      <span>100,000 VNĐ</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Internet</span>
                      <span>200,000 VNĐ</span>
                    </div>
                    <hr className="border-red-200" />
                    <div className="flex justify-between font-semibold text-red-700">
                      <span>Tổng</span>
                      <span>1,496,250 VNĐ</span>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button
                      className="flex-1 bg-red-600 text-white hover:bg-red-700"
                      onClick={() =>
                        openPaymentModal('1496250', 'Hóa đơn tháng 12/2024')
                      }>
                      Thanh toán
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={() => downloadBill('202412')}>
                      Tải
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>

          
        </div>

        <div className="space-y-6 lg:col-span-1">
          <Card>
            <CardContent>
              <h2 className="mb-2 text-lg font-semibold">
                Hỗ trợ giao dịch & thanh toán
              </h2>
              <p className="text-sm leading-relaxed text-gray-600">
                Nếu bạn gặp bất kỳ vấn đề nào liên quan đến hóa đơn hoặc thanh
                toán, vui lòng liên hệ đội ngũ hỗ trợ của chúng tôi ở thông tin
                bên dưới. Chúng tôi luôn sẵn sàng đồng hành và hỗ trợ bạn.
              </p>
              <SupportItem icon={Phone} title="Hotline" content="1900-xxxx" />
              <SupportItem
                icon={Mail}
                title="Email"
                content="support@chungcu.vn"
              />
              <SupportItem
                icon={Clock}
                title="Giờ làm việc"
                content="8:00 - 17:00 (T2-T6)"
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

const SupportItem = ({ icon: Icon, title, content }) => (
  <div className="my-3 flex cursor-pointer items-center space-x-4 rounded-lg border border-gray-100 bg-gray-50 p-4 transition-colors hover:bg-gray-100">
    <div className="rounded-full border border-gray-200 bg-white p-3 shadow-sm">
      <Icon className="h-5 w-5 text-blue-500" />
    </div>
    <div>
      <p className="text-sm font-semibold text-gray-700">{title}</p>
      <p className="text-base font-medium">{content}</p>
    </div>
  </div>
)

export default Payment
