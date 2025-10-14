export default function Pricing() {
  return (
    <section id="bang-gia" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Tiêu đề */}
        <div className="text-center mb-16 fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Bảng Giá &amp; Phí Dịch Vụ
          </h2>
          <p className="text-xl text-gray-600">
            Giá cả minh bạch, chính sách thanh toán linh hoạt
          </p>
        </div>

        {/* Hai bảng giá */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Bảng giá căn hộ */}
          <div className="price-card rounded-xl p-8 fade-in bg-gray-50 shadow-md hover:shadow-lg transition duration-300">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              Bảng Giá Căn Hộ
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-gray-200">
                <span className="font-medium">Studio (35m²)</span>
                <span className="text-purple-600 font-semibold">
                  1.2 - 1.5 tỷ
                </span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-200">
                <span className="font-medium">1PN (55m²)</span>
                <span className="text-purple-600 font-semibold">
                  1.8 - 2.2 tỷ
                </span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-200">
                <span className="font-medium">2PN (75m²)</span>
                <span className="text-purple-600 font-semibold">
                  2.5 - 3.0 tỷ
                </span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-200">
                <span className="font-medium">3PN (95m²)</span>
                <span className="text-purple-600 font-semibold">
                  3.2 - 3.8 tỷ
                </span>
              </div>
              <div className="flex justify-between items-center py-3">
                <span className="font-medium">Penthouse (150m²)</span>
                <span className="text-purple-600 font-semibold">
                  6.5 - 8.0 tỷ
                </span>
              </div>
            </div>
          </div>

          {/* Phí dịch vụ hàng tháng */}
          <div className="price-card rounded-xl p-8 fade-in bg-gray-50 shadow-md hover:shadow-lg transition duration-300">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              Phí Dịch Vụ Hàng Tháng
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-gray-200">
                <span className="font-medium">Phí quản lý</span>
                <span className="text-gray-700">15,000đ/m²</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-200">
                <span className="font-medium">Gửi xe máy</span>
                <span className="text-gray-700">150,000đ/tháng</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-200">
                <span className="font-medium">Gửi ô tô</span>
                <span className="text-gray-700">1,200,000đ/tháng</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-200">
                <span className="font-medium">Điện</span>
                <span className="text-gray-700">3,500đ/kWh</span>
              </div>
              <div className="flex justify-between items-center py-3">
                <span className="font-medium">Nước</span>
                <span className="text-gray-700">25,000đ/m³</span>
              </div>
            </div>
          </div>
        </div>

        {/* Nút nhận báo giá */}
        <div className="text-center fade-in">
          <a
            href="#lien-he"
            className="bg-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-purple-700 transition duration-300 inline-block"
          >
            Nhận Báo Giá Chi Tiết
          </a>
        </div>
      </div>
    </section>
  );
}
