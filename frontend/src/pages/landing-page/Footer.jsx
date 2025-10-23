export const Footer = () => {
  return (
    <footer className="bg-gray-800 py-12 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Logo + mô tả */}
          <div>
            <div className="mb-4 text-2xl font-bold">
              <span className="text-purple-400">Luxury</span> Residence
            </div>
            <p className="mb-4 text-gray-300">
              Dự án chung cư cao cấp hàng đầu với thiết kế hiện đại và tiện ích
              đẳng cấp 5 sao.
            </p>
          </div>

          {/* Liên kết nhanh */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Liên Kết Nhanh</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a href="#gioi-thieu" className="hover:text-purple-400">
                  Giới thiệu
                </a>
              </li>
              <li>
                <a href="#can-ho" className="hover:text-purple-400">
                  Căn hộ
                </a>
              </li>
              <li>
                <a href="#bang-gia" className="hover:text-purple-400">
                  Bảng giá
                </a>
              </li>
              <li>
                <a href="#tien-ich" className="hover:text-purple-400">
                  Tiện ích
                </a>
              </li>
            </ul>
          </div>

          {/* Hỗ trợ */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Hỗ Trợ</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a href="#" className="hover:text-purple-400">
                  Chính sách bán hàng
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-400">
                  Hướng dẫn thanh toán
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-400">
                  Câu hỏi thường gặp
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-400">
                  Liên hệ hỗ trợ
                </a>
              </li>
            </ul>
          </div>

          {/* Thông tin liên hệ */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Thông Tin Liên Hệ</h3>
            <div className="space-y-2 text-gray-300">
              <p>📞 Hotline: 1900 1234</p>
              <p>✉️ Email: info@luxuryresidence.vn</p>
              <p>📍 123 Đường ABC, Quận 1, TP.HCM</p>
              <p>🕒 8:00 - 22:00 (Hàng ngày)</p>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-700 pt-8 text-center text-gray-300">
          <p>&copy; 2025 Luxury Residence. Tất cả quyền được bảo lưu.</p>
        </div>
      </div>
    </footer>
  )
}
