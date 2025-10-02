import React from 'react'

export const Fees = () => {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Quản lý Phí & Thu chi
        </h2>
        <p className="text-gray-600">
          Quản lý các khoản phí và theo dõi thanh toán
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Thu nhập tháng
              </p>
              <p className="text-2xl font-bold text-green-600">2.4B</p>
            </div>
            <i className="fas fa-arrow-up text-green-500 text-xl"></i>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Đã thanh toán</p>
              <p className="text-2xl font-bold text-blue-600">89%</p>
            </div>
            <i className="fas fa-check-circle text-blue-500 text-xl"></i>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Chưa thanh toán
              </p>
              <p className="text-2xl font-bold text-yellow-600">27</p>
            </div>
            <i className="fas fa-clock text-yellow-500 text-xl"></i>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Quá hạn</p>
              <p className="text-2xl font-bold text-red-600">8</p>
            </div>
            <i className="fas fa-exclamation-triangle text-red-500 text-xl"></i>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold">Bảng phí dịch vụ</h3>
          </div>
          <div className="p-6">
            <div className="flex flex-col gap-y-4">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">Phí quản lý</p>
                  <p className="text-sm text-gray-600">15,000 VNĐ/m²</p>
                </div>
                <button className="text-blue-600 hover:text-blue-800">
                  <i className="fas fa-edit"></i>
                </button>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">Phí gửi xe máy</p>
                  <p className="text-sm text-gray-600">100,000 VNĐ/tháng</p>
                </div>
                <button className="text-blue-600 hover:text-blue-800">
                  <i className="fas fa-edit"></i>
                </button>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">Phí gửi ô tô</p>
                  <p className="text-sm text-gray-600">1,200,000 VNĐ/tháng</p>
                </div>
                <button className="text-blue-600 hover:text-blue-800">
                  <i className="fas fa-edit"></i>
                </button>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">Phí internet</p>
                  <p className="text-sm text-gray-600">200,000 VNĐ/tháng</p>
                </div>
                <button className="text-blue-600 hover:text-blue-800">
                  <i className="fas fa-edit"></i>
                </button>
              </div>
            </div>
            <button className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition-colors">
              <i className="fas fa-plus mr-2"></i>
              Thêm loại phí
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold">Công nợ cần theo dõi</h3>
          </div>
          <div className="p-6">
            <div className="flex flex-col gap-y-4">
              <div className="flex items-center justify-between p-3 border-l-4 border-red-500 bg-red-50 rounded">
                <div>
                  <p className="font-medium text-red-700">
                    A1205 - Nguyễn Văn An
                  </p>
                  <p className="text-sm text-red-600">
                    Quá hạn 15 ngày - 2,500,000 VNĐ
                  </p>
                </div>
                <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm transition-colors">
                  Nhắc nhở
                </button>
              </div>
              <div className="flex items-center justify-between p-3 border-l-4 border-yellow-500 bg-yellow-50 rounded">
                <div>
                  <p className="font-medium text-yellow-700">
                    B0801 - Lê Thị Bình
                  </p>
                  <p className="text-sm text-yellow-600">
                    Sắp đến hạn - 1,800,000 VNĐ
                  </p>
                </div>
                <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm transition-colors">
                  Thông báo
                </button>
              </div>
              <div className="flex items-center justify-between p-3 border-l-4 border-blue-500 bg-blue-50 rounded">
                <div>
                  <p className="font-medium text-blue-700">
                    C1501 - Trần Văn Cường
                  </p>
                  <p className="text-sm text-blue-600">
                    Đã thanh toán - 2,200,000 VNĐ
                  </p>
                </div>
                <span className="text-green-600">
                  <i className="fas fa-check-circle"></i>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
