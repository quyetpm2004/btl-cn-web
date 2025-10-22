export const Notifications = () => {
  return (
    <div>
      <div className="mb-6">
        <h2 className="mb-1 text-2xl font-bold text-gray-800">
          Thông báo & Tin tức
        </h2>
        <p className="text-gray-600">
          Cập nhật thông tin mới nhất từ Ban quản lý
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <div className="rounded-2xl bg-white p-6 shadow transition hover:shadow-md">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-red-100">
                <i className="fas fa-exclamation-triangle text-xl text-red-600"></i>
              </div>
              <div className="flex-1">
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="font-semibold text-red-700">
                    Thông báo bảo trì hệ thống điện
                  </h3>
                  <span className="text-xs text-gray-500">2 giờ trước</span>
                </div>
                <p className="mb-3 text-gray-600">
                  Chung cư sẽ tiến hành bảo trì hệ thống điện tầng 15 vào ngày
                  <strong>15/12/2024</strong> từ <strong>8:00 - 12:00</strong>.
                  Trong thời gian này, thang máy số 3 sẽ tạm ngưng hoạt động.
                </p>
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <i className="fas fa-calendar"></i> 15/12/2024
                  </span>
                  <span className="flex items-center gap-1">
                    <i className="fas fa-clock"></i> 8:00 - 12:00
                  </span>
                  <span className="rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-700">
                    Quan trọng
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow transition hover:shadow-md">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                <i className="fas fa-users text-xl text-blue-600"></i>
              </div>
              <div className="flex-1">
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="font-semibold text-blue-700">
                    Họp cư dân định kỳ tháng 12
                  </h3>
                  <span className="text-xs text-gray-500">1 ngày trước</span>
                </div>
                <p className="text-gray-600">
                  Ban quản lý trân trọng kính mời toàn thể cư dân tham dự cuộc
                  họp định kỳ tháng 12 để thảo luận về hoạt động bảo trì, an
                  ninh và kế hoạch năm mới.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl bg-white p-6 shadow">
            <h3 className="mb-3 text-lg font-semibold">Tin tức nhanh</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Giảm giá dịch vụ giữ xe tháng 12</li>
              <li>• Khai trương phòng gym mới tại tầng 3</li>
              <li>• Lễ Giáng sinh tổ chức ngày 24/12</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
