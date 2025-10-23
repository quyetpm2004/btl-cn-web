export const ApartmentTypes = () => {
  return (
    <section id="can-ho" className="bg-gray-50 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Tiêu đề */}
        <div className="fade-in mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-800 md:text-4xl">
            Loại Căn Hộ &amp; Mặt Bằng
          </h2>
          <p className="text-xl text-gray-600">
            Đa dạng các loại căn hộ từ 1-4 phòng ngủ phù hợp mọi nhu cầu
          </p>
        </div>

        {/* Grid các căn hộ */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Studio */}
          <div className="card-hover fade-in overflow-hidden rounded-xl bg-white shadow-lg">
            <div className="flex h-48 items-center justify-center bg-gradient-to-br from-blue-400 to-blue-600">
              <svg
                className="h-20 w-20 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
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
              <h3 className="mb-2 text-xl font-semibold">Studio - 35m²</h3>
              <p className="mb-4 text-gray-600">
                Căn hộ studio hiện đại, tối ưu không gian, phù hợp cho người độc
                thân hoặc cặp đôi trẻ
              </p>
              <div className="font-semibold text-purple-600">Từ 1.2 tỷ VNĐ</div>
            </div>
          </div>

          {/* 1 Phòng Ngủ */}
          <div className="card-hover fade-in overflow-hidden rounded-xl bg-white shadow-lg">
            <div className="flex h-48 items-center justify-center bg-gradient-to-br from-green-400 to-green-600">
              <svg
                className="h-20 w-20 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
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
              <h3 className="mb-2 text-xl font-semibold">1 Phòng Ngủ - 55m²</h3>
              <p className="mb-4 text-gray-600">
                Căn hộ 1 phòng ngủ rộng rãi với phòng khách riêng biệt, ban công
                thoáng mát
              </p>
              <div className="font-semibold text-purple-600">Từ 1.8 tỷ VNĐ</div>
            </div>
          </div>

          {/* 2 Phòng Ngủ */}
          <div className="card-hover fade-in overflow-hidden rounded-xl bg-white shadow-lg">
            <div className="flex h-48 items-center justify-center bg-gradient-to-br from-orange-400 to-orange-600">
              <svg
                className="h-20 w-20 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
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
              <h3 className="mb-2 text-xl font-semibold">2 Phòng Ngủ - 75m²</h3>
              <p className="mb-4 text-gray-600">
                Căn hộ 2 phòng ngủ lý tưởng cho gia đình nhỏ, thiết kế thông
                minh và tiện nghi
              </p>
              <div className="font-semibold text-purple-600">Từ 2.5 tỷ VNĐ</div>
            </div>
          </div>

          {/* 3 Phòng Ngủ */}
          <div className="card-hover fade-in overflow-hidden rounded-xl bg-white shadow-lg">
            <div className="flex h-48 items-center justify-center bg-gradient-to-br from-purple-400 to-purple-600">
              <svg
                className="h-20 w-20 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
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
              <h3 className="mb-2 text-xl font-semibold">3 Phòng Ngủ - 95m²</h3>
              <p className="mb-4 text-gray-600">
                Căn hộ 3 phòng ngủ rộng rãi cho gia đình đông thành viên, có
                phòng làm việc riêng
              </p>
              <div className="font-semibold text-purple-600">Từ 3.2 tỷ VNĐ</div>
            </div>
          </div>

          {/* Penthouse */}
          <div className="card-hover fade-in overflow-hidden rounded-xl bg-white shadow-lg">
            <div className="flex h-48 items-center justify-center bg-gradient-to-br from-red-400 to-red-600">
              <svg
                className="h-20 w-20 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
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
              <h3 className="mb-2 text-xl font-semibold">Penthouse - 150m²</h3>
              <p className="mb-4 text-gray-600">
                Căn hộ penthouse sang trọng với sân vườn riêng, view toàn cảnh
                thành phố
              </p>
              <div className="font-semibold text-purple-600">Từ 6.5 tỷ VNĐ</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
