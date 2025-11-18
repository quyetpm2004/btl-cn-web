import { useResidentStore } from '@/stores/useResidentStore'
import {
  Bath,
  Bed,
  CalendarDays,
  ChartArea,
  CircleDollarSign,
  ReceiptText
} from 'lucide-react'
import React from 'react'

const Apartment = () => {
  const { resident } = useResidentStore()

  const apartmentCode = resident?.apartments?.[0]?.apartmentCode ?? ''
  const building = resident?.apartments?.[0]?.building ?? ''
  const area = resident?.apartments?.[0]?.area ?? ''
  const startDate = resident?.apartments?.[0]?.startDate ?? ''
  const floor = resident?.apartments?.[0]?.floor ?? ''
  return (
    <section id="apartment" className="content-section">
      <div className="mb-6">
        <h2 className="mb-2 text-2xl font-bold text-gray-800">
          Thông tin căn hộ
        </h2>
        <p className="text-gray-600">Chi tiết về căn hộ và hợp đồng của bạn</p>
      </div>

      <div className="rounded-xl bg-white p-6 shadow-sm">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold">Căn hộ {apartmentCode}</h3>
            <p className="text-gray-600">
              Tòa {building} - Tầng {floor} - Luxury Residence
            </p>
          </div>
          <span className="rounded-full bg-amber-100 px-3 py-1 text-sm font-medium text-amber-800">
            Đang sở hữu
          </span>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Apartment Info */}
          <div>
            <h4 className="mb-4 font-semibold text-gray-800">
              Thông số căn hộ
            </h4>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 rounded-lg bg-gray-50 p-3">
                <ChartArea />
                <div>
                  <p className="text-sm text-gray-600">Diện tích</p>
                  <p className="font-medium">{area} m²</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 rounded-lg bg-gray-50 p-3">
                <Bed />
                <div>
                  <p className="text-sm text-gray-600">Phòng ngủ</p>
                  <p className="font-medium">2 phòng</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 rounded-lg bg-gray-50 p-3">
                <Bath />
                <div>
                  <p className="text-sm text-gray-600">Phòng tắm</p>
                  <p className="font-medium">2 phòng</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contract Info */}
          <div>
            <h4 className="mb-4 font-semibold text-gray-800">
              Thông tin hợp đồng
            </h4>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 rounded-lg bg-gray-50 p-3">
                <CalendarDays />
                <div>
                  <p className="text-sm text-gray-600">Ngày mua</p>
                  <p className="font-medium">{startDate}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 rounded-lg bg-gray-50 p-3">
                <CircleDollarSign />
                <div>
                  <p className="text-sm text-gray-600">Giá mua</p>
                  <p className="font-medium">2.5 tỷ VNĐ</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 rounded-lg bg-gray-50 p-3">
                <ReceiptText />
                <div>
                  <p className="text-sm text-gray-600">Số hợp đồng</p>
                  <p className="font-medium">HD2020001205</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Apartment
