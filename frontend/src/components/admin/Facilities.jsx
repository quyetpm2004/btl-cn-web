export const Facilities = () => {
  return (
    <div>
      <div className="mb-6">
        <h2 className="mb-2 text-2xl font-bold text-gray-800">
          Quản lý Thiết bị & Tài sản
        </h2>
        <p className="text-gray-600">Theo dõi và bảo trì các thiết bị chung</p>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Thang máy</p>
              <p className="text-2xl font-bold text-green-600">8/8</p>
              <p className="text-xs text-green-600">Hoạt động tốt</p>
            </div>
            <i className="fas fa-elevator text-2xl text-green-500"></i>
          </div>
        </div>
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Camera an ninh
              </p>
              <p className="text-2xl font-bold text-blue-600">45/48</p>
              <p className="text-xs text-yellow-600">3 camera lỗi</p>
            </div>
            <i className="fas fa-video text-2xl text-blue-500"></i>
          </div>
        </div>
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Hệ thống PCCC</p>
              <p className="text-2xl font-bold text-green-600">OK</p>
              <p className="text-xs text-green-600">Kiểm tra gần nhất: 01/12</p>
            </div>
            <i className="fas fa-fire-extinguisher text-2xl text-red-500"></i>
          </div>
        </div>
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Hệ thống điện</p>
              <p className="text-2xl font-bold text-yellow-600">Cảnh báo</p>
              <p className="text-xs text-yellow-600">Cần bảo trì tầng 15</p>
            </div>
            <i className="fas fa-bolt text-2xl text-yellow-500"></i>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-xl bg-white shadow-sm">
          <div className="border-b border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Lịch bảo trì</h3>
              <button className="rounded-lg bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-600">
                <i className="fas fa-plus mr-2"></i>
                Thêm lịch
              </button>
            </div>
          </div>
          <div className="p-6">
            <div className="flex flex-col gap-y-4">
              <div className="flex items-center gap-x-4 rounded-lg border border-red-200 bg-red-50 p-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500">
                  <i className="fas fa-exclamation text-white"></i>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-red-700">
                    Bảo trì hệ thống điện tầng 15
                  </p>
                  <p className="text-sm text-red-600">Hôm nay - 14:00</p>
                </div>
                <button className="text-red-600 hover:text-red-800">
                  <i className="fas fa-arrow-right"></i>
                </button>
              </div>
              <div className="flex items-center gap-x-4 rounded-lg border border-yellow-200 bg-yellow-50 p-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-500">
                  <i className="fas fa-elevator text-white"></i>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-yellow-700">
                    Kiểm tra thang máy định kỳ
                  </p>
                  <p className="text-sm text-yellow-600">15/12 - 08:00</p>
                </div>
                <button className="text-yellow-600 hover:text-yellow-800">
                  <i className="fas fa-arrow-right"></i>
                </button>
              </div>
              <div className="flex items-center gap-x-4 rounded-lg border border-blue-200 bg-blue-50 p-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500">
                  <i className="fas fa-video text-white"></i>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-blue-700">
                    Bảo trì hệ thống camera
                  </p>
                  <p className="text-sm text-blue-600">20/12 - 09:00</p>
                </div>
                <button className="text-blue-600 hover:text-blue-800">
                  <i className="fas fa-arrow-right"></i>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-white shadow-sm">
          <div className="border-b border-gray-200 p-6">
            <h3 className="text-lg font-semibold">Báo cáo sự cố</h3>
          </div>
          <div className="p-6">
            <div className="flex flex-col gap-y-4">
              <div className="rounded border-l-4 border-red-500 bg-red-50 p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium text-red-700">
                      Thang máy tầng 15 bị kẹt
                    </p>
                    <p className="text-sm text-red-600">
                      Báo cáo bởi: Nguyễn Văn An (A1205)
                    </p>
                    <p className="text-xs text-gray-500">2 giờ trước</p>
                  </div>
                  <span className="rounded-full bg-red-100 px-2 py-1 text-xs font-semibold text-red-800">
                    Khẩn cấp
                  </span>
                </div>
                <div className="mt-3 flex gap-x-2">
                  <button className="rounded bg-red-500 px-3 py-1 text-sm text-white transition-colors hover:bg-red-600">
                    Xử lý ngay
                  </button>
                  <button className="rounded border border-red-500 px-3 py-1 text-sm text-red-500 transition-colors hover:bg-red-50">
                    Chi tiết
                  </button>
                </div>
              </div>
              <div className="rounded border-l-4 border-yellow-500 bg-yellow-50 p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium text-yellow-700">
                      Đèn hành lang tầng 8 hỏng
                    </p>
                    <p className="text-sm text-yellow-600">
                      Báo cáo bởi: Lê Thị Bình (B0801)
                    </p>
                    <p className="text-xs text-gray-500">1 ngày trước</p>
                  </div>
                  <span className="rounded-full bg-yellow-100 px-2 py-1 text-xs font-semibold text-yellow-800">
                    Trung bình
                  </span>
                </div>
                <div className="mt-3 flex gap-x-2">
                  <button className="rounded bg-yellow-500 px-3 py-1 text-sm text-white transition-colors hover:bg-yellow-600">
                    Lên lịch
                  </button>
                  <button className="rounded border border-yellow-500 px-3 py-1 text-sm text-yellow-500 transition-colors hover:bg-yellow-50">
                    Chi tiết
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
