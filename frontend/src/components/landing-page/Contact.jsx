import React from "react";

export default function Contact() {
  return (
    <section id="lien-he" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Liên Hệ Với Chúng Tôi
          </h2>
          <p className="text-xl text-gray-600">
            Đội ngũ tư vấn chuyên nghiệp sẵn sàng hỗ trợ bạn 24/7
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Form liên hệ */}
          <div className="fade-in">
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold mb-6">Gửi Thông Tin Liên Hệ</h3>
              <form className="space-y-6">
                {[
                  { label: "Họ và tên *", type: "text", required: true },
                  { label: "Số điện thoại *", type: "tel", required: true },
                  { label: "Email", type: "email" },
                ].map((field, i) => (
                  <div key={i}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      required={field.required}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                ))}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Loại căn hộ quan tâm
                  </label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                    <option>Chọn loại căn hộ</option>
                    <option>Studio - 35m²</option>
                    <option>1 Phòng ngủ - 55m²</option>
                    <option>2 Phòng ngủ - 75m²</option>
                    <option>3 Phòng ngủ - 95m²</option>
                    <option>Penthouse - 150m²</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tin nhắn
                  </label>
                  <textarea
                    rows="4"
                    placeholder="Để lại lời nhắn của bạn..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition duration-300"
                >
                  Gửi Thông Tin
                </button>
              </form>
            </div>
          </div>

          {/* Thông tin liên hệ */}
          <div className="space-y-8 fade-in">
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold mb-6">Thông Tin Liên Hệ</h3>
              <div className="space-y-4 text-gray-700">
                <p>📞 Hotline: 1900 1234</p>
                <p>✉️ Email: info@luxuryresidence.vn</p>
                <p>📍 123 Đường ABC, Quận 1, TP.HCM</p>
                <p>🕒 8:00 - 22:00 (Hàng ngày)</p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg text-center">
              <h3 className="text-2xl font-bold mb-4">Vị Trí Dự Án</h3>
              <div className="h-64 bg-gray-200 rounded-lg flex flex-col items-center justify-center">
                <svg
                  className="w-16 h-16 text-gray-400 mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <p className="text-gray-600">Bản đồ vị trí dự án</p>
                <p className="text-sm text-gray-500">
                  123 Đường ABC, Quận 1, TP.HCM
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
