export const Apartments = () => {
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="mb-2 text-2xl font-bold text-gray-800">
            Quản lý Căn hộ
          </h2>
          <p className="text-gray-600">Quản lý thông tin căn hộ và hợp đồng</p>
        </div>
        <button className="rounded-lg bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600">
          <i className="fas fa-plus mr-2"></i>
          Thêm căn hộ
        </button>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Đã bán</p>
              <p className="text-2xl font-bold text-green-600">186</p>
            </div>
            <i className="fas fa-check-circle text-2xl text-green-500"></i>
          </div>
        </div>
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Cho thuê</p>
              <p className="text-2xl font-bold text-blue-600">42</p>
            </div>
            <i className="fas fa-key text-2xl text-blue-500"></i>
          </div>
        </div>
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Trống</p>
              <p className="text-2xl font-bold text-yellow-600">20</p>
            </div>
            <i className="fas fa-home text-2xl text-yellow-500"></i>
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl bg-white shadow-sm">
        <div className="border-b border-gray-200 p-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <input
              type="text"
              placeholder="Tìm kiếm căn hộ..."
              className="rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500"
            />
            <select className="rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500">
              <option>Tất cả tòa</option>
              <option>Tòa A</option>
              <option>Tòa B</option>
              <option>Tòa C</option>
            </select>
            <select className="rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500">
              <option>Tất cả trạng thái</option>
              <option>Đã bán</option>
              <option>Cho thuê</option>
              <option>Trống</option>
            </select>
            <select className="rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500">
              <option>Tất cả diện tích</option>
              <option>&lt; 50m²</option>
              <option>50-80m²</option>
              <option>&gt; 80m²</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg border border-gray-200 p-4 transition-shadow hover:shadow-md">
            <div className="mb-3 flex items-start justify-between">
              <h3 className="text-lg font-semibold">A1205</h3>
              <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-800">
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
              <button className="flex-1 rounded bg-blue-500 px-3 py-2 text-sm text-white transition-colors hover:bg-blue-600">
                Xem chi tiết
              </button>
              <button className="rounded border border-gray-300 px-3 py-2 transition-colors hover:bg-gray-50">
                <i className="fas fa-edit"></i>
              </button>
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 p-4 transition-shadow hover:shadow-md">
            <div className="mb-3 flex items-start justify-between">
              <h3 className="text-lg font-semibold">B0801</h3>
              <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-800">
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
              <button className="flex-1 rounded bg-blue-500 px-3 py-2 text-sm text-white transition-colors hover:bg-blue-600">
                Xem chi tiết
              </button>
              <button className="rounded border border-gray-300 px-3 py-2 transition-colors hover:bg-gray-50">
                <i className="fas fa-edit"></i>
              </button>
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 p-4 transition-shadow hover:shadow-md">
            <div className="mb-3 flex items-start justify-between">
              <h3 className="text-lg font-semibold">C1501</h3>
              <span className="rounded-full bg-yellow-100 px-2 py-1 text-xs font-semibold text-yellow-800">
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
              <button className="flex-1 rounded bg-green-500 px-3 py-2 text-sm text-white transition-colors hover:bg-green-600">
                Đăng bán
              </button>
              <button className="rounded border border-gray-300 px-3 py-2 transition-colors hover:bg-gray-50">
                <i className="fas fa-edit"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
