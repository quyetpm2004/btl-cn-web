export const Staffs = () => {
  return (
    <div>
      <div className="mb-6">
        <h2 className="mb-1 text-2xl font-bold text-gray-800">
          Quản lý Nhân sự
        </h2>
        <p className="text-gray-600">Quản lý nhân viên và phân ca làm việc</p>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-4">
        <div className="rounded-2xl bg-white p-5 shadow transition hover:shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Tổng nhân viên</p>
              <p className="text-2xl font-bold text-blue-600">24</p>
            </div>
            <i className="fas fa-users text-2xl text-blue-500"></i>
          </div>
        </div>
        <div className="rounded-2xl bg-white p-5 shadow transition hover:shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Bảo vệ</p>
              <p className="text-2xl font-bold text-green-600">8</p>
            </div>
            <i className="fas fa-shield-halved text-2xl text-green-500"></i>
          </div>
        </div>
        <div className="rounded-2xl bg-white p-5 shadow transition hover:shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Vệ sinh</p>
              <p className="text-2xl font-bold text-purple-600">12</p>
            </div>
            <i className="fas fa-broom text-2xl text-purple-500"></i>
          </div>
        </div>
        <div className="rounded-2xl bg-white p-5 shadow transition hover:shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Kỹ thuật</p>
              <p className="text-2xl font-bold text-orange-600">4</p>
            </div>
            <i className="fas fa-wrench text-2xl text-orange-500"></i>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-2xl bg-white shadow">
          <div className="flex items-center justify-between border-b border-gray-200 p-5">
            <h3 className="text-lg font-semibold">Danh sách nhân viên</h3>
            <button className="flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-sm text-white transition hover:bg-blue-600">
              <i className="fas fa-plus"></i> Thêm
            </button>
          </div>
          <div className="space-y-4 p-5">
            <div className="flex items-center gap-4 rounded-xl border border-gray-200 p-4 transition hover:bg-gray-50">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500 font-semibold text-white">
                TV
              </div>
              <div className="flex-1">
                <p className="font-medium">Trần Văn Dũng</p>
                <p className="text-sm text-gray-600">Trưởng ca bảo vệ</p>
                <p className="text-xs text-gray-500">Ca: 6:00 - 18:00</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                  Đang làm
                </span>
                <button className="text-blue-600 hover:text-blue-800">
                  <i className="fas fa-edit"></i>
                </button>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-xl border border-gray-200 p-4 transition hover:bg-gray-50">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-500 font-semibold text-white">
                NM
              </div>
              <div className="flex-1">
                <p className="font-medium">Nguyễn Thị Mai</p>
                <p className="text-sm text-gray-600">Nhân viên vệ sinh</p>
                <p className="text-xs text-gray-500">Ca: 5:00 - 13:00</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                  Đang làm
                </span>
                <button className="text-blue-600 hover:text-blue-800">
                  <i className="fas fa-edit"></i>
                </button>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-xl border border-gray-200 p-4 transition hover:bg-gray-50">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-500 font-semibold text-white">
                LH
              </div>
              <div className="flex-1">
                <p className="font-medium">Lê Văn Hùng</p>
                <p className="text-sm text-gray-600">Kỹ thuật viên</p>
                <p className="text-xs text-gray-500">Ca: 8:00 - 17:00</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-700">
                  Nghỉ phép
                </span>
                <button className="text-blue-600 hover:text-blue-800">
                  <i className="fas fa-edit"></i>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-white shadow">
          <div className="border-b border-gray-200 p-5">
            <h3 className="text-lg font-semibold">Lịch làm việc hôm nay</h3>
          </div>
          <div className="space-y-4 p-5">
            <div className="rounded-xl bg-blue-50 p-4">
              <div className="mb-2 flex items-center justify-between">
                <h4 className="font-medium text-blue-700">
                  Ca sáng (6:00 - 14:00)
                </h4>
                <span className="text-sm text-blue-600">4 người</span>
              </div>
              <ul className="space-y-1 text-sm text-blue-600">
                <li>• Trần Văn Dũng (Bảo vệ)</li>
                <li>• Nguyễn Thị Mai (Vệ sinh)</li>
                <li>• Phạm Văn Tú (Bảo vệ)</li>
                <li>• Lê Thị Hoa (Vệ sinh)</li>
              </ul>
            </div>

            <div className="rounded-xl bg-green-50 p-4">
              <div className="mb-2 flex items-center justify-between">
                <h4 className="font-medium text-green-700">
                  Ca chiều (14:00 - 22:00)
                </h4>
                <span className="text-sm text-green-600">4 người</span>
              </div>
              <ul className="space-y-1 text-sm text-green-600">
                <li>• Hoàng Văn Nam (Bảo vệ)</li>
                <li>• Trần Thị Lan (Vệ sinh)</li>
                <li>• Nguyễn Văn Quang (Bảo vệ)</li>
                <li>• Lê Văn Hùng (Kỹ thuật)</li>
              </ul>
            </div>

            <div className="rounded-xl bg-purple-50 p-4">
              <div className="mb-2 flex items-center justify-between">
                <h4 className="font-medium text-purple-700">
                  Ca đêm (22:00 - 6:00)
                </h4>
                <span className="text-sm text-purple-600">2 người</span>
              </div>
              <ul className="space-y-1 text-sm text-purple-600">
                <li>• Vũ Văn Đức (Bảo vệ)</li>
                <li>• Phạm Thị Nga (Bảo vệ)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
