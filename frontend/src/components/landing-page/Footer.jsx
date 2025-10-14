import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo + mô tả */}
          <div>
            <div className="text-2xl font-bold mb-4">
              <span className="text-purple-400">Luxury</span> Residence
            </div>
            <p className="text-gray-300 mb-4">
              Dự án chung cư cao cấp hàng đầu với thiết kế hiện đại và tiện ích
              đẳng cấp 5 sao.
            </p>
          </div>

          {/* Liên kết nhanh */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Liên Kết Nhanh</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#gioi-thieu" className="hover:text-purple-400">Giới thiệu</a></li>
              <li><a href="#can-ho" className="hover:text-purple-400">Căn hộ</a></li>
              <li><a href="#bang-gia" className="hover:text-purple-400">Bảng giá</a></li>
              <li><a href="#tien-ich" className="hover:text-purple-400">Tiện ích</a></li>
            </ul>
          </div>

          {/* Hỗ trợ */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Hỗ Trợ</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-purple-400">Chính sách bán hàng</a></li>
              <li><a href="#" className="hover:text-purple-400">Hướng dẫn thanh toán</a></li>
              <li><a href="#" className="hover:text-purple-400">Câu hỏi thường gặp</a></li>
              <li><a href="#" className="hover:text-purple-400">Liên hệ hỗ trợ</a></li>
            </ul>
          </div>

          {/* Thông tin liên hệ */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Thông Tin Liên Hệ</h3>
            <div className="space-y-2 text-gray-300">
              <p>📞 Hotline: 1900 1234</p>
              <p>✉️ Email: info@luxuryresidence.vn</p>
              <p>📍 123 Đường ABC, Quận 1, TP.HCM</p>
              <p>🕒 8:00 - 22:00 (Hàng ngày)</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; 2025 Luxury Residence. Tất cả quyền được bảo lưu.</p>
        </div>
      </div>
    </footer>
  );
}
