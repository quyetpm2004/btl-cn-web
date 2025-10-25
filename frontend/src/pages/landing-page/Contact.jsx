import React from 'react'
// 1. Import component bản đồ
import MapComponent from './MapComponent'

export const Contact = () => {
  return (
    <section id="lien-he" className="bg-gray-50 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ... (phần tiêu đề không đổi) ... */}
        <div className="fade-in mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-800 md:text-4xl">
            Liên Hệ Với Chúng Tôi
          </h2>
          <p className="text-xl text-gray-600">
            Đội ngũ tư vấn chuyên nghiệp sẵn sàng hỗ trợ bạn 24/7
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* ... (phần form liên hệ không đổi) ... */}
          <div className="fade-in">
            <div className="rounded-xl bg-white p-8 shadow-lg">
              {/* Form content */}
              <h3 className="mb-6 text-2xl font-bold">Gửi Thông Tin Liên Hệ</h3>
              <form className="space-y-6">
                {[
                  { label: 'Họ và tên *', type: 'text', required: true },
                  { label: 'Số điện thoại *', type: 'tel', required: true },
                  { label: 'Email', type: 'email' }
                ].map((field, i) => (
                  <div key={i}>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      required={field.required}
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-transparent focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                ))}

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Loại căn hộ quan tâm
                  </label>
                  <select className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-transparent focus:ring-2 focus:ring-purple-500">
                    <option>Chọn loại căn hộ</option>
                    <option>Studio - 35m²</option>
                    <option>1 Phòng ngủ - 55m²</option>
                    <option>2 Phòng ngủ - 75m²</option>
                    <option>3 Phòng ngủ - 95m²</option>
                    <option>Penthouse - 150m²</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Tin nhắn
                  </label>
                  <textarea
                    rows="4"
                    placeholder="Để lại lời nhắn của bạn..."
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-transparent focus:ring-2 focus:ring-purple-500"></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full rounded-lg bg-purple-600 py-3 font-semibold text-white transition duration-300 hover:bg-purple-700">
                  Gửi Thông Tin
                </button>
              </form>
            </div>
          </div>

          {/* Thông tin liên hệ */}
          <div className="fade-in space-y-8">
            <div className="rounded-xl bg-white p-8 shadow-lg">
              <h3 className="mb-6 text-2xl font-bold">Thông Tin Liên Hệ</h3>
              <div className="space-y-4 text-gray-700">
                <p>📞 Hotline: 1900 1234</p>
                <p>✉️ Email: info@luxuryresidence.vn</p>
                <p>📍 123 Đường ABC, Quận 1, TP.HCM</p>
                <p>🕒 8:00 - 22:00 (Hàng ngày)</p>
              </div>
            </div>

            {/* 2. Cập nhật khối Vị Trí Dự Án */}
            <div className="rounded-xl bg-white p-8 shadow-lg">
              <h3 className="mb-4 text-center text-2xl font-bold">
                Vị Trí Dự Án
              </h3>
              {/* Đặt chiều cao cho container chứa bản đồ */}
              <div className="h-64 w-full overflow-hidden rounded-lg">
                <iframe
                  // 4. Sửa lại src cho đúng
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.995185951214!2d106.72960681475013!3d10.81439249229699!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175261993315007%3A0x272a35639a3f3a5e!2s28%20Th%E1%BA%A3o%20%C4%90i%E1%BB%81n%2C%20Th%E1%BA%A3o%20%C4%90i%E1%BB%81n%2C%20Qu%E1%BA%ADn%202%2C%20Th%C3%A0nh%20ph%E1%BB%91%20H%E1%BB%93%20Ch%C3%AD%20Minh%2C%20Vietnam!5e0!3m2!1sen!2s!4v1668583482834!5m2!1sen!2s"
                  width="100%"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"></iframe>
              </div>
              <p className="mt-4 text-center text-sm text-gray-500">
                123 Đường ABC, Quận 1, TP.HCM
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
