export default function ApartmentTypes() {
  return (
    <section id="can-ho" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Tiêu đề */}
        <div className="text-center mb-16 fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Loại Căn Hộ &amp; Mặt Bằng
          </h2>
          <p className="text-xl text-gray-600">
            Đa dạng các loại căn hộ từ 1-4 phòng ngủ phù hợp mọi nhu cầu
          </p>
        </div>

        {/* Grid các căn hộ */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Studio */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden card-hover fade-in">
            <div className="h-48 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
              <svg
                className="w-20 h-20 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1"
                  d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1"
                  d="M8 21l0-12 8 0 0 12"
                />
              </svg>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">Studio - 35m²</h3>
              <p className="text-gray-600 mb-4">
                Căn hộ studio hiện đại, tối ưu không gian, phù hợp cho người độc
                thân hoặc cặp đôi trẻ
              </p>
              <div className="text-purple-600 font-semibold">Từ 1.2 tỷ VNĐ</div>
            </div>
          </div>

          {/* 1 Phòng Ngủ */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden card-hover fade-in">
            <div className="h-48 bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
              <svg
                className="w-20 h-20 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1"
                  d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1"
                  d="M8 21l0-12 4 0 0 6 4 0 0 6"
                />
              </svg>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">1 Phòng Ngủ - 55m²</h3>
              <p className="text-gray-600 mb-4">
                Căn hộ 1 phòng ngủ rộng rãi với phòng khách riêng biệt, ban công
                thoáng mát
              </p>
              <div className="text-purple-600 font-semibold">Từ 1.8 tỷ VNĐ</div>
            </div>
          </div>

          {/* 2 Phòng Ngủ */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden card-hover fade-in">
            <div className="h-48 bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
              <svg
                className="w-20 h-20 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1"
                  d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1"
                  d="M8 21l0-12 3 0 0 6 3 0 0-6 3 0 0 12"
                />
              </svg>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">2 Phòng Ngủ - 75m²</h3>
              <p className="text-gray-600 mb-4">
                Căn hộ 2 phòng ngủ lý tưởng cho gia đình nhỏ, thiết kế thông
                minh và tiện nghi
              </p>
              <div className="text-purple-600 font-semibold">Từ 2.5 tỷ VNĐ</div>
            </div>
          </div>

          {/* 3 Phòng Ngủ */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden card-hover fade-in">
            <div className="h-48 bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center">
              <svg
                className="w-20 h-20 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1"
                  d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1"
                  d="M7 21l0-12 2.5 0 0 6 2.5 0 0-6 2.5 0 0 6 2.5 0 0 6"
                />
              </svg>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">3 Phòng Ngủ - 95m²</h3>
              <p className="text-gray-600 mb-4">
                Căn hộ 3 phòng ngủ rộng rãi cho gia đình đông thành viên, có
                phòng làm việc riêng
              </p>
              <div className="text-purple-600 font-semibold">Từ 3.2 tỷ VNĐ</div>
            </div>
          </div>

          {/* Penthouse */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden card-hover fade-in">
            <div className="h-48 bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center">
              <svg
                className="w-20 h-20 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1"
                  d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1"
                  d="M6 21l0-12 3 0 0 4 3 0 0-4 3 0 0 8 3 0 0 4"
                />
              </svg>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">Penthouse - 150m²</h3>
              <p className="text-gray-600 mb-4">
                Căn hộ penthouse sang trọng với sân vườn riêng, view toàn cảnh
                thành phố
              </p>
              <div className="text-purple-600 font-semibold">Từ 6.5 tỷ VNĐ</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
