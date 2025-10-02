import React from 'react'

export const Apartments = () => {
  return (
    <div>
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Quản lý Căn hộ
          </h2>
          <p className="text-gray-600">Quản lý thông tin căn hộ và hợp đồng</p>
        </div>
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors">
          <i className="fas fa-plus mr-2"></i>
          Thêm căn hộ
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Đã bán</p>
              <p className="text-2xl font-bold text-green-600">186</p>
            </div>
            <i className="fas fa-check-circle text-green-500 text-2xl"></i>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Cho thuê</p>
              <p className="text-2xl font-bold text-blue-600">42</p>
            </div>
            <i className="fas fa-key text-blue-500 text-2xl"></i>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Trống</p>
              <p className="text-2xl font-bold text-yellow-600">20</p>
            </div>
            <i className="fas fa-home text-yellow-500 text-2xl"></i>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="Tìm kiếm căn hộ..."
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
              <option>Tất cả tòa</option>
              <option>Tòa A</option>
              <option>Tòa B</option>
              <option>Tòa C</option>
            </select>
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
              <option>Tất cả trạng thái</option>
              <option>Đã bán</option>
              <option>Cho thuê</option>
              <option>Trống</option>
            </select>
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
              <option>Tất cả diện tích</option>
              <option>&lt; 50m²</option>
              <option>50-80m²</option>
              <option>&gt; 80m²</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-lg font-semibold">A1205</h3>
              <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                Đã bán
              </span>
            </div>
            <div className="flex flex-col gap-y-2 text-sm text-gray-600">
              <p>
                <i className="fas fa-ruler-combined mr-2"></i>75m² - 2PN, 2WC
              </p>
              <p>
                <i className="fas fa-user mr-2"></i>Nguyễn Văn An
              </p>
              <p>
                <i className="fas fa-calendar mr-2"></i>Hợp đồng: 15/03/2020
              </p>
              <p>
                <i className="fas fa-money-bill mr-2"></i>2.5 tỷ VNĐ
              </p>
            </div>
            <div className="mt-4 flex gap-x-2">
              <button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-3 rounded text-sm transition-colors">
                Xem chi tiết
              </button>
              <button className="px-3 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors">
                <i className="fas fa-edit"></i>
              </button>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-lg font-semibold">B0801</h3>
              <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                Cho thuê
              </span>
            </div>
            <div className="flex flex-col gap-y-2 text-sm text-gray-600">
              <p>
                <i className="fas fa-ruler-combined mr-2"></i>65m² - 2PN, 1WC
              </p>
              <p>
                <i className="fas fa-user mr-2"></i>Lê Thị Bình
              </p>
              <p>
                <i className="fas fa-calendar mr-2"></i>Thuê từ: 01/06/2023
              </p>
              <p>
                <i className="fas fa-money-bill mr-2"></i>15 triệu/tháng
              </p>
            </div>
            <div className="mt-4 flex gap-x-2">
              <button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-3 rounded text-sm transition-colors">
                Xem chi tiết
              </button>
              <button className="px-3 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors">
                <i className="fas fa-edit"></i>
              </button>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-lg font-semibold">C1501</h3>
              <span className="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                Trống
              </span>
            </div>
            <div className="flex flex-col gap-y-2 text-sm text-gray-600">
              <p>
                <i className="fas fa-ruler-combined mr-2"></i>90m² - 3PN, 2WC
              </p>
              <p>
                <i className="fas fa-user mr-2"></i>Chưa có chủ
              </p>
              <p>
                <i className="fas fa-calendar mr-2"></i>Sẵn sàng bán/cho thuê
              </p>
              <p>
                <i className="fas fa-money-bill mr-2"></i>3.2 tỷ VNĐ
              </p>
            </div>
            <div className="mt-4 flex gap-x-2">
              <button className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 px-3 rounded text-sm transition-colors">
                Đăng bán
              </button>
              <button className="px-3 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors">
                <i className="fas fa-edit"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
