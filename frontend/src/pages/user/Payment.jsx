import React from 'react'

const Payment = () => {
  // Các hàm xử lý giả lập (thay bằng logic thật của bạn sau này)
  const viewBillDetail = (id) => alert(`Xem chi tiết hóa đơn: ${id}`)
  const openPaymentModal = (amount, name) =>
    alert(`Thanh toán ${name} (${amount} VNĐ)`)
  const downloadBill = (id) => alert(`Tải hóa đơn ${id}`)
  const filterPaymentHistory = (value) =>
    alert(`Lọc lịch sử thanh toán theo: ${value}`)
  const exportPaymentHistory = () => alert('Xuất lịch sử thanh toán ra Excel')
  const viewReceipt = (id) => alert(`Xem biên lai: ${id}`)
  const downloadReceipt = (id) => alert(`Tải biên lai: ${id}`)
  const selectPaymentMethod = (method) => alert(`Chọn phương thức: ${method}`)
  const managePaymentMethods = () => alert('Quản lý phương thức thanh toán')
  const toggleAutoPayment = (e) =>
    alert(`Tự động thanh toán: ${e.target.checked ? 'Bật' : 'Tắt'}`)
  const viewDetailedReport = () => alert('Xem báo cáo chi tiết')

  return (
    <div id="payment" className="content-section">
      {/* Header */}
      <div className="mb-6">
        <h2 className="mb-2 text-2xl font-bold text-gray-800">
          Thanh toán trực tuyến
        </h2>
        <p className="text-gray-600">
          Thanh toán các khoản phí một cách nhanh chóng và tiện lợi
        </p>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left Column */}
        <div className="lg:col-span-2">
          {/* Outstanding Bills */}
          <div className="mb-6 rounded-xl bg-white p-6 shadow-sm">
            <h3 className="mb-4 flex items-center text-lg font-semibold">
              <i className="fas fa-exclamation-triangle mr-2 text-red-500"></i>
              Hóa đơn chưa thanh toán
            </h3>

            <div className="space-y-4">
              {/* Overdue Bill */}
              <div className="rounded-lg border-2 border-red-200 bg-red-50 p-4">
                <div className="mb-3 flex items-start justify-between">
                  <div>
                    <h4 className="font-medium text-red-700">
                      Hóa đơn tháng 12/2024
                    </h4>
                    <p className="text-sm text-red-600">
                      Hạn thanh toán: 15/12/2024
                    </p>
                    <p className="text-xs text-red-500">⚠️ Quá hạn 5 ngày</p>
                  </div>
                  <div className="flex space-x-2">
                    <span className="rounded-full bg-red-100 px-2 py-1 text-xs font-semibold text-red-800">
                      Quá hạn
                    </span>
                    <button
                      className="text-xs text-blue-600 hover:text-blue-800"
                      onClick={() => viewBillDetail('202412')}>
                      <i className="fas fa-eye"></i> Chi tiết
                    </button>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Phí quản lý (75m²)</span>
                    <span>1,125,000 VNĐ</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Phí gửi xe máy</span>
                    <span>100,000 VNĐ</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Phí internet</span>
                    <span>200,000 VNĐ</span>
                  </div>
                  <div className="flex justify-between text-red-600">
                    <span>Phí chậm thanh toán (5%)</span>
                    <span>71,250 VNĐ</span>
                  </div>
                  <hr className="my-2 border-red-200" />
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Tổng cộng</span>
                    <span className="text-red-600">1,496,250 VNĐ</span>
                  </div>
                </div>

                <div className="mt-4 flex space-x-2">
                  <button
                    className="flex-1 rounded-lg bg-red-500 py-3 font-medium text-white transition-colors hover:bg-red-600"
                    onClick={() =>
                      openPaymentModal('1496250', 'Hóa đơn tháng 12/2024')
                    }>
                    <i className="fas fa-credit-card mr-2"></i>Thanh toán ngay
                  </button>
                  <button
                    className="rounded-lg bg-gray-500 px-4 py-3 text-white transition-colors hover:bg-gray-600"
                    onClick={() => downloadBill('202412')}>
                    <i className="fas fa-download"></i>
                  </button>
                </div>
              </div>

              {/* Upcoming Bill */}
              <div className="rounded-lg border-2 border-yellow-200 bg-yellow-50 p-4">
                <div className="mb-3 flex items-start justify-between">
                  <div>
                    <h4 className="font-medium text-yellow-700">
                      Hóa đơn tháng 1/2025
                    </h4>
                    <p className="text-sm text-yellow-600">
                      Hạn thanh toán: 15/01/2025
                    </p>
                    <p className="text-xs text-yellow-500">⏰ Còn 20 ngày</p>
                  </div>
                  <div className="flex space-x-2">
                    <span className="rounded-full bg-yellow-100 px-2 py-1 text-xs font-semibold text-yellow-800">
                      Sắp đến hạn
                    </span>
                    <button
                      className="text-xs text-blue-600 hover:text-blue-800"
                      onClick={() => viewBillDetail('202501')}>
                      <i className="fas fa-eye"></i> Chi tiết
                    </button>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Phí quản lý (75m²)</span>
                    <span>1,125,000 VNĐ</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Phí gửi xe máy</span>
                    <span>100,000 VNĐ</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Phí internet</span>
                    <span>200,000 VNĐ</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Phí gym</span>
                    <span>300,000 VNĐ</span>
                  </div>
                  <hr className="my-2 border-yellow-200" />
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Tổng cộng</span>
                    <span>1,725,000 VNĐ</span>
                  </div>
                </div>

                <div className="mt-4 flex space-x-2">
                  <button
                    className="flex-1 rounded-lg bg-yellow-500 py-3 font-medium text-white transition-colors hover:bg-yellow-600"
                    onClick={() =>
                      openPaymentModal('1725000', 'Hóa đơn tháng 1/2025')
                    }>
                    <i className="fas fa-credit-card mr-2"></i>Thanh toán
                  </button>
                  <button
                    className="rounded-lg bg-gray-500 px-4 py-3 text-white transition-colors hover:bg-gray-600"
                    onClick={() => downloadBill('202501')}>
                    <i className="fas fa-download"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Payment History */}
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold">Lịch sử thanh toán</h3>
              <div className="flex space-x-2">
                <select
                  className="rounded border border-gray-300 px-3 py-1 text-sm"
                  onChange={(e) => filterPaymentHistory(e.target.value)}>
                  <option value="2024">Năm 2024</option>
                  <option value="2023">Năm 2023</option>
                  <option value="all">Tất cả</option>
                </select>
                <button
                  className="rounded bg-green-500 px-3 py-1 text-sm text-white transition-colors hover:bg-green-600"
                  onClick={exportPaymentHistory}>
                  <i className="fas fa-file-excel mr-1"></i>Xuất Excel
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    {[
                      'Tháng',
                      'Số tiền',
                      'Ngày thanh toán',
                      'Phương thức',
                      'Trạng thái',
                      'Thao tác'
                    ].map((col) => (
                      <th
                        key={col}
                        className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {[
                    {
                      month: '11/2024',
                      amount: '1,425,000 VNĐ',
                      date: '12/11/2024',
                      method: { name: 'VNPay', color: 'blue' }
                    },
                    {
                      month: '10/2024',
                      amount: '1,425,000 VNĐ',
                      date: '10/10/2024',
                      method: { name: 'MoMo', color: 'green' }
                    },
                    {
                      month: '09/2024',
                      amount: '1,425,000 VNĐ',
                      date: '08/09/2024',
                      method: { name: 'ZaloPay', color: 'purple' }
                    }
                  ].map((row, i) => (
                    <tr key={i}>
                      <td className="px-4 py-3 text-sm font-medium">
                        {row.month}
                      </td>
                      <td className="px-4 py-3 text-sm">{row.amount}</td>
                      <td className="px-4 py-3 text-sm">{row.date}</td>
                      <td className="px-4 py-3 text-sm">
                        <span
                          className={`rounded-full px-2 py-1 text-xs font-semibold bg-${row.method.color}-100 text-${row.method.color}-800`}>
                          {row.method.name}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-800">
                          Thành công
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <button
                          className="mr-2 text-blue-600 hover:text-blue-800"
                          onClick={() => viewReceipt(row.month)}>
                          <i className="fas fa-receipt"></i>
                        </button>
                        <button
                          className="text-green-600 hover:text-green-800"
                          onClick={() => downloadReceipt(row.month)}>
                          <i className="fas fa-download"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column (Phương thức + Auto payment + Summary) */}
        {/* --- Giữ nguyên bố cục tương tự HTML --- */}
        <div className="space-y-6">
          {/* Payment Methods */}
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <h4 className="mb-4 font-semibold">Phương thức thanh toán</h4>
            <div className="space-y-3">
              <div
                className="payment-method cursor-pointer rounded-lg border-2 border-blue-200 bg-blue-50 p-4"
                onClick={() => console.log('VNPay selected')}>
                <div className="flex items-center space-x-3">
                  <i className="fab fa-cc-visa text-2xl text-blue-600"></i>
                  <div>
                    <p className="font-medium text-blue-700">VNPay</p>
                    <p className="text-sm text-blue-600">
                      Thanh toán qua ngân hàng
                    </p>
                    <p className="text-xs text-blue-500">
                      Phí: 0% - Nhanh chóng
                    </p>
                  </div>
                </div>
              </div>

              <div
                className="payment-method cursor-pointer rounded-lg border-2 border-green-200 bg-green-50 p-4"
                onClick={() => console.log('MoMo selected')}>
                <div className="flex items-center space-x-3">
                  <i className="fas fa-mobile-alt text-2xl text-green-600"></i>
                  <div>
                    <p className="font-medium text-green-700">MoMo</p>
                    <p className="text-sm text-green-600">Ví điện tử MoMo</p>
                    <p className="text-xs text-green-500">Phí: 0% - Tiện lợi</p>
                  </div>
                </div>
              </div>

              <div
                className="payment-method cursor-pointer rounded-lg border-2 border-purple-200 bg-purple-50 p-4"
                onClick={() => console.log('ZaloPay selected')}>
                <div className="flex items-center space-x-3">
                  <i className="fas fa-wallet text-2xl text-purple-600"></i>
                  <div>
                    <p className="font-medium text-purple-700">ZaloPay</p>
                    <p className="text-sm text-purple-600">
                      Ví điện tử ZaloPay
                    </p>
                    <p className="text-xs text-purple-500">Phí: 0% - An toàn</p>
                  </div>
                </div>
              </div>
            </div>

            <button
              className="mt-4 w-full rounded-lg bg-gray-500 py-2 text-sm text-white transition-colors hover:bg-gray-600"
              onClick={() => console.log('Manage payment methods')}>
              <i className="fas fa-cog mr-2"></i>Quản lý phương thức
            </button>
          </div>

          {/* Auto Payment */}
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <h4 className="mb-4 font-semibold">Thanh toán tự động</h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between rounded-lg bg-gray-50 p-3">
                <div>
                  <p className="font-medium">Kích hoạt thanh toán tự động</p>
                  <p className="text-sm text-gray-600">
                    Tự động thanh toán vào ngày 10 hàng tháng
                  </p>
                </div>
                <label className="relative inline-flex cursor-pointer items-center">
                  <input
                    type="checkbox"
                    className="peer sr-only"
                    onChange={(e) =>
                      console.log('Auto payment toggled:', e.target.checked)
                    }
                  />
                  <div className="peer h-6 w-11 rounded-full bg-gray-200 peer-checked:bg-blue-600 peer-focus:ring-4 peer-focus:ring-blue-300 peer-focus:outline-none after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
                </label>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Ngày thanh toán hàng tháng
                  </label>
                  <select className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm">
                    <option value="5">Ngày 5</option>
                    <option value="10" selected>
                      Ngày 10
                    </option>
                    <option value="15">Ngày 15</option>
                    <option value="20">Ngày 20</option>
                  </select>
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Phương thức mặc định
                  </label>
                  <select className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm">
                    <option value="vnpay" selected>
                      VNPay
                    </option>
                    <option value="momo">MoMo</option>
                    <option value="zalopay">ZaloPay</option>
                  </select>
                </div>
              </div>

              <div className="rounded-lg bg-blue-50 p-3 text-sm text-gray-600">
                <p className="mb-1 font-medium text-blue-700">
                  Lợi ích thanh toán tự động:
                </p>
                <ul className="space-y-1 text-blue-600">
                  <li>• Không bao giờ quên thanh toán</li>
                  <li>• Tránh phí chậm thanh toán</li>
                  <li>• Tiết kiệm thời gian</li>
                  <li>• Nhận thông báo trước 3 ngày</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Payment Summary */}
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <h4 className="mb-4 font-semibold">Tóm tắt tài chính</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">
                  Tổng đã thanh toán năm 2024
                </span>
                <span className="font-semibold text-green-600">
                  15,675,000 VNĐ
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Còn nợ</span>
                <span className="font-semibold text-red-600">
                  3,221,250 VNĐ
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">
                  Phí trung bình/tháng
                </span>
                <span className="font-semibold">1,425,000 VNĐ</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">
                  Tiết kiệm được (thanh toán đúng hạn)
                </span>
                <span className="font-semibold text-green-600">
                  285,000 VNĐ
                </span>
              </div>
              <hr className="my-2" />
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Dự kiến tháng tới</span>
                <span className="font-semibold text-blue-600">
                  1,725,000 VNĐ
                </span>
              </div>
            </div>
            <button
              className="mt-4 w-full rounded-lg bg-blue-500 py-2 text-sm text-white transition-colors hover:bg-blue-600"
              onClick={() => console.log('View detailed report')}>
              <i className="fas fa-chart-line mr-2"></i>Xem báo cáo chi tiết
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Payment
