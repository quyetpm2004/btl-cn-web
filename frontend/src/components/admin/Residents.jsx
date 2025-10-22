export const Residents = () => {
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="mb-2 text-2xl font-bold text-gray-800">
            Quản lý Cư dân
          </h2>
          <p className="text-gray-600">Quản lý thông tin và hồ sơ cư dân</p>
        </div>
        <button className="rounded-lg bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600">
          <i className="fas fa-plus mr-2"></i>
          Thêm cư dân
        </button>
      </div>

      <div className="overflow-hidden rounded-xl bg-white shadow-sm">
        <div className="border-b border-gray-200 p-6">
          <div className="flex flex-col gap-y-4 md:flex-row md:items-center md:justify-between md:gap-y-0">
            <div className="max-w-md flex-1">
              <input
                type="text"
                placeholder="Tìm kiếm cư dân..."
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex gap-x-2">
              <select className="rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500">
                <option>Tất cả tòa</option>
                <option>Tòa A</option>
                <option>Tòa B</option>
                <option>Tòa C</option>
              </select>
              <select className="rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500">
                <option>Tất cả trạng thái</option>
                <option>Đang ở</option>
                <option>Đã chuyển đi</option>
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                  Cư dân
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                  Căn hộ
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                  Liên hệ
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                  Trạng thái
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500">
                      <span className="font-medium text-white">NV</span>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        Nguyễn Văn An
                      </div>
                      <div className="text-sm text-gray-500">Chủ hộ</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-900">
                  A1205
                </td>
                <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-900">
                  0901234567
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-800">
                    Đang ở
                  </span>
                </td>
                <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                  <button className="mr-3 text-blue-600 hover:text-blue-900">
                    Xem
                  </button>
                  <button className="mr-3 text-green-600 hover:text-green-900">
                    Sửa
                  </button>
                  <button className="text-red-600 hover:text-red-900">
                    Xóa
                  </button>
                </td>
              </tr>

              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-500">
                      <span className="font-medium text-white">LT</span>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        Lê Thị Bình
                      </div>
                      <div className="text-sm text-gray-500">Chủ hộ</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-900">
                  B0801
                </td>
                <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-900">
                  0987654321
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-800">
                    Đang ở
                  </span>
                </td>
                <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                  <button className="mr-3 text-blue-600 hover:text-blue-900">
                    Xem
                  </button>
                  <button className="mr-3 text-green-600 hover:text-green-900">
                    Sửa
                  </button>
                  <button className="text-red-600 hover:text-red-900">
                    Xóa
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="border-t border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Hiển thị <span className="font-medium">1</span> đến{' '}
              <span className="font-medium">10</span> của{' '}
              <span className="font-medium">97</span> kết quả
            </div>
            <div className="flex gap-x-2">
              <button className="rounded border border-gray-300 px-3 py-1 text-sm hover:bg-gray-50">
                Trước
              </button>
              <button className="rounded bg-blue-500 px-3 py-1 text-sm text-white">
                1
              </button>
              <button className="rounded border border-gray-300 px-3 py-1 text-sm hover:bg-gray-50">
                2
              </button>
              <button className="rounded border border-gray-300 px-3 py-1 text-sm hover:bg-gray-50">
                3
              </button>
              <button className="rounded border border-gray-300 px-3 py-1 text-sm hover:bg-gray-50">
                Sau
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
