import { useResidentStore } from '@/stores/useResidentStore'
import { Bath, Bed, CalendarDays, ChartArea, ReceiptText } from 'lucide-react'
import React from 'react'

const Apartment = () => {
  const { resident } = useResidentStore()

  const apartments = resident?.apartments ?? []

  return (
    <section id="apartment" className="content-section">
      <div className="mb-6">
        <h2 className="mb-2 text-2xl font-bold text-gray-800">
          Thông tin căn hộ
        </h2>
        <p className="text-gray-600">Chi tiết về căn hộ và hợp đồng của bạn</p>
      </div>

      {apartments.map((apt, index) => (
        <div key={index} className="mb-6 rounded-xl bg-white p-6 shadow-sm">
          {/* Header */}
          <div className="mb-6 flex flex-col items-start gap-2 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-xl font-semibold">
                Căn hộ {apt.apartmentCode}
              </h3>
              <p className="text-gray-600">
                Tòa {apt.building} - Tầng {apt.floor} - Luxury Residence
              </p>
            </div>
            <span className="rounded-full bg-amber-100 px-3 py-1 text-sm font-medium text-amber-800">
              Đang ở
            </span>
          </div>

          {/* Nội dung */}
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
                    <p className="font-medium">{apt.area} m²</p>
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
                    <p className="text-sm text-gray-600">
                      Ngày bắt đầu sử dụng
                    </p>
                    <p className="font-medium">{apt.startDate}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 rounded-lg bg-gray-50 p-3">
                  <ReceiptText />
                  <div>
                    <p className="text-sm text-gray-600">Số hợp đồng</p>
                    <p className="font-medium">HD123523423</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  )
}

export default Apartment
