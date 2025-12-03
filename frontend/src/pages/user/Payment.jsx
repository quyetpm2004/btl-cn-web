import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Clock, Mail, Phone } from 'lucide-react'
import { createQrApi, getUnpaidApi } from '@/services/api'
import { getPaymentHistoryApi } from '@/services/api'
import BillDetailDrawer from '@/components/bill-detail-drawer'

const Payment = () => {
  const [selectedBill, setSelectedBill] = useState(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const viewBillDetail = (billData) => {
    setSelectedBill(billData)
    setIsDrawerOpen(true)
  }

  const [bill, setBill] = useState([])
  const [history, setHistory] = useState([])


  const fetchDataUnpaid = async () => {
    const res = await getUnpaidApi()
    if(res && res.data) {
      setBill(res.data.data)
    }
  }

  const handlePaid = async (invoiceId) => {
    const res = await createQrApi(invoiceId)
    if (res?.data?.data) {
    window.location.href = res.data.data;
  }
  }

  useEffect(() => {
    fetchDataUnpaid()
    fetchDataHistory()
  }, [])

  const fetchDataHistory = async () => {
    try {
      const res = await getPaymentHistoryApi()
      if (res && res.data) setHistory(res.data.data || [])
    } catch (error) {
      console.error('Error fetching payment history:', error)
    }
  }

  return (
    <div className="space-y-6 text-black">
      {/* Header */}
      <div className="mb-6">
        <h2 className="mb-2 text-2xl font-bold text-gray-800">
          Thanh toán trực tuyến
        </h2>
        <p className="text-gray-600">Thanh toán nhanh chóng và tiện lợi</p>
      </div>

      <BillDetailDrawer 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)} 
        billData={selectedBill} 
        handlePaid={handlePaid}
      />

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
              {
                bill?.length > 0 ? bill?.map((item, index) => ( 
                   <Card className="border border-red-300 bg-red-50" key={index}>
                <CardContent className="space-y-3 p-4">
                  <div className="flex justify-between">
                    <div>
                      <p className="font-semibold text-red-700">
                        {item?.name}
                      </p>
                      <p className="text-sm text-red-600">
                        Hạn: {new Date(item.end_date).toLocaleDateString("vi-VN")}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => viewBillDetail(item)}>
                        Chi tiết
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-1 text-sm">
                    {item?.items?.map((billItem, idx) => (
                      <div
                        key={idx}
                        className="flex justify-between">
                        <span>{billItem?.service?.name}</span>
                        <span>
                          {billItem?.amount?.toLocaleString('vi', {style : 'currency', currency : 'VND'})} 
                        </span>
                      </div>
                    ))}
                    <hr className="border-red-200" />
                    <div className="flex justify-between font-semibold text-red-700">
                      <span>Tổng</span>
                      <span>{item.total_amount.toLocaleString('vi', {style : 'currency', currency : 'VND'})}</span>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button
                      className="flex-1 bg-red-600 text-white hover:bg-red-700"
                      onClick={() =>
                        handlePaid(item.id)
                      }>
                      Thanh toán
                    </Button>
                  </div>
                </CardContent>
              </Card>
                )) : <p>Không có hóa đơn chưa thanh toán!</p>
              }
            </CardContent>
          </Card>
          {/* Lịch sử thanh toán */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Lịch sử thanh toán</CardTitle>
            </CardHeader>
            <CardContent>
              {history.length === 0 ? (
                <p className="text-sm text-gray-500">Chưa có lịch sử thanh toán</p>
              ) : (
                <div className="space-y-3">
                  {history.map((h) => (
                    <div
                      key={h.id}
                      className="cursor-pointer rounded-lg border p-3 hover:bg-gray-50"
                      onClick={() => viewBillDetail(h)}>
                      <div className="flex justify-between">
                        <div>
                          <p className="font-medium">{h.name}</p>
                          <p className="text-sm text-gray-600">Hóa đơn #{h.id}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">{h.total_amount?.toLocaleString('vi', {style : 'currency', currency : 'VND'})}</p>
                          <p className="text-sm text-gray-500">
                            {h.paid_at ? new Date(h.paid_at).toLocaleString('vi-VN', { hour12: false }) : "-"}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
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
              <SupportItem icon={Phone} title="Hotline" content="1900-1000" />
              
              <SupportItem
                icon={Clock}
                title="Giờ làm việc"
                content="8:00 - 17:00 (T2-T6)"
              />
              <p className="text-sm leading-relaxed text-gray-600">
                Nếu bạn muốn thanh toán tiền mặt, vui lòng đến văn phòng của chúng tôi tại phòng 1011, Tòa nhà Luxury Residence, 219 Trung Kính, Cầu Giấy, Hà Nội.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

// eslint-disable-next-line no-unused-vars
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
