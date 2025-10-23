export const Fees = () => {
  return (
    <div>
      <div className="mb-6">
        <h2 className="mb-2 text-2xl font-bold text-gray-800">
          Quản lý Phí & Thu chi
        </h2>
        <p className="text-gray-600">
          Quản lý các khoản phí và theo dõi thanh toán
        </p>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-4">
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Thu nhập tháng
              </p>
              <p className="text-2xl font-bold text-green-600">2.4B</p>
            </div>
            <i className="fas fa-arrow-up text-xl text-green-500"></i>
          </div>
        </div>
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Đã thanh toán</p>
              <p className="text-2xl font-bold text-blue-600">89%</p>
            </div>
            <i className="fas fa-check-circle text-xl text-blue-500"></i>
          </div>
        </div>
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Chưa thanh toán
              </p>
              <p className="text-2xl font-bold text-yellow-600">27</p>
            </div>
            <i className="fas fa-clock text-xl text-yellow-500"></i>
          </div>
        </div>
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Quá hạn</p>
              <p className="text-2xl font-bold text-red-600">8</p>
            </div>
            <i className="fas fa-exclamation-triangle text-xl text-red-500"></i>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-xl bg-white shadow-sm">
          <div className="border-b border-gray-200 p-6">
            <h3 className="text-lg font-semibold">Bảng phí dịch vụ</h3>
          </div>
          <div className="p-6">
            <div className="flex flex-col gap-y-4">
              <div className="flex items-center justify-between rounded-lg bg-gray-50 p-3">
                <div>
                  <p className="font-medium">Phí quản lý</p>
                  <p className="text-sm text-gray-600">15,000 VNĐ/m²</p>
                </div>
                <button className="text-blue-600 hover:text-blue-800">
                  <i className="fas fa-edit"></i>
                </button>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-gray-50 p-3">
                <div>
                  <p className="font-medium">Phí gửi xe máy</p>
                  <p className="text-sm text-gray-600">100,000 VNĐ/tháng</p>
                </div>
                <button className="text-blue-600 hover:text-blue-800">
                  <i className="fas fa-edit"></i>
                </button>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-gray-50 p-3">
                <div>
                  <p className="font-medium">Phí gửi ô tô</p>
                  <p className="text-sm text-gray-600">1,200,000 VNĐ/tháng</p>
                </div>
                <button className="text-blue-600 hover:text-blue-800">
                  <i className="fas fa-edit"></i>
                </button>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-gray-50 p-3">
                <div>
                  <p className="font-medium">Phí internet</p>
                  <p className="text-sm text-gray-600">200,000 VNĐ/tháng</p>
                </div>
                <button className="text-blue-600 hover:text-blue-800">
                  <i className="fas fa-edit"></i>
                </button>
              </div>
            </div>
            <button className="mt-4 w-full rounded-lg bg-blue-500 py-2 text-white transition-colors hover:bg-blue-600">
              <i className="fas fa-plus mr-2"></i>
              Thêm loại phí
            </button>
          </div>
        </div>

        <div className="rounded-xl bg-white shadow-sm">
          <div className="border-b border-gray-200 p-6">
            <h3 className="text-lg font-semibold">Công nợ cần theo dõi</h3>
          </div>
          <div className="p-6">
            <div className="flex flex-col gap-y-4">
              <div className="flex items-center justify-between rounded border-l-4 border-red-500 bg-red-50 p-3">
                <div>
                  <p className="font-medium text-red-700">
                    A1205 - Nguyễn Văn An
                  </p>
                  <p className="text-sm text-red-600">
                    Quá hạn 15 ngày - 2,500,000 VNĐ
                  </p>
                </div>
                <button className="rounded bg-red-500 px-3 py-1 text-sm text-white transition-colors hover:bg-red-600">
                  Nhắc nhở
                </button>
              </div>
              <div className="flex items-center justify-between rounded border-l-4 border-yellow-500 bg-yellow-50 p-3">
                <div>
                  <p className="font-medium text-yellow-700">
                    B0801 - Lê Thị Bình
                  </p>
                  <p className="text-sm text-yellow-600">
                    Sắp đến hạn - 1,800,000 VNĐ
                  </p>
                </div>
                <button className="rounded bg-yellow-500 px-3 py-1 text-sm text-white transition-colors hover:bg-yellow-600">
                  Thông báo
                </button>
              </div>
              <div className="flex items-center justify-between rounded border-l-4 border-blue-500 bg-blue-50 p-3">
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
