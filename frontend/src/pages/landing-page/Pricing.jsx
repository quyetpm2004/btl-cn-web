export const Pricing = () => {
  return (
    <section id="bang-gia" className="bg-about py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Tiêu đề */}
        <div className="fade-in mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-800 md:text-4xl">
            Bảng Giá &amp; Phí Dịch Vụ
          </h2>
          <p className="text-xl text-gray-600">
            Giá cả minh bạch, chính sách thanh toán linh hoạt
          </p>
        </div>

        {/* Hai bảng giá */}
        <div className="mb-12 grid gap-8 md:grid-cols-2">
          {/* Bảng giá căn hộ */}
          <div className="price-card fade-in rounded-xl bg-gray-50 p-8 shadow-md transition duration-300 hover:shadow-lg">
            <h3 className="mb-6 text-2xl font-bold text-gray-800">
              Bảng Giá Căn Hộ
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-gray-200 py-3">
                <span className="font-medium">Studio (35m²)</span>
                <span className="font-semibold text-purple-600">
                  1.2 - 1.5 tỷ
                </span>
              </div>
              <div className="flex items-center justify-between border-b border-gray-200 py-3">
                <span className="font-medium">1PN (55m²)</span>
                <span className="font-semibold text-purple-600">
                  1.8 - 2.2 tỷ
                </span>
              </div>
              <div className="flex items-center justify-between border-b border-gray-200 py-3">
                <span className="font-medium">2PN (75m²)</span>
                <span className="font-semibold text-purple-600">
                  2.5 - 3.0 tỷ
                </span>
              </div>
              <div className="flex items-center justify-between border-b border-gray-200 py-3">
                <span className="font-medium">3PN (95m²)</span>
                <span className="font-semibold text-purple-600">
                  3.2 - 3.8 tỷ
                </span>
              </div>
              <div className="flex items-center justify-between py-3">
                <span className="font-medium">Penthouse (150m²)</span>
                <span className="font-semibold text-purple-600">
                  6.5 - 8.0 tỷ
                </span>
              </div>
            </div>
          </div>

          {/* Phí dịch vụ hàng tháng */}
          <div className="price-card fade-in rounded-xl bg-gray-50 p-8 shadow-md transition duration-300 hover:shadow-lg">
            <h3 className="mb-6 text-2xl font-bold text-gray-800">
              Phí Dịch Vụ Hàng Tháng
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-gray-200 py-3">
                <span className="font-medium">Phí quản lý</span>
                <span className="text-gray-700">15,000đ/m²</span>
              </div>
              <div className="flex items-center justify-between border-b border-gray-200 py-3">
                <span className="font-medium">Gửi xe máy</span>
                <span className="text-gray-700">150,000đ/tháng</span>
              </div>
              <div className="flex items-center justify-between border-b border-gray-200 py-3">
                <span className="font-medium">Gửi ô tô</span>
                <span className="text-gray-700">1,200,000đ/tháng</span>
              </div>
              <div className="flex items-center justify-between border-b border-gray-200 py-3">
                <span className="font-medium">Điện</span>
                <span className="text-gray-700">3,500đ/kWh</span>
              </div>
              <div className="flex items-center justify-between py-3">
                <span className="font-medium">Nước</span>
                <span className="text-gray-700">25,000đ/m³</span>
              </div>
            </div>
          </div>
        </div>

        {/* Nút nhận báo giá */}
        <div className="fade-in text-center">
          <a
            href="#lien-he"
            className="inline-block rounded-full bg-purple-600 px-8 py-3 font-semibold text-white transition duration-300 hover:bg-purple-700">
            Nhận Báo Giá Chi Tiết
          </a>
        </div>
      </div>
    </section>
  )
}
