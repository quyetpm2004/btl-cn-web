import React from 'react'
import './LuxuryHero.css' // Giữ nguyên import file CSS

export const LuxuryHero = () => {
  return (
    <div className="h-screen overflow-x-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800">
      <main className="relative flex h-full min-h-full items-center justify-center">
        {/* === Background Elements (Không thay đổi) === */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="animate-float absolute top-20 left-10 h-72 w-72 rounded-full bg-blue-400 opacity-20 mix-blend-multiply blur-xl filter"></div>
          <div
            className="animate-float absolute top-40 right-20 h-96 w-96 rounded-full bg-purple-400 opacity-20 mix-blend-multiply blur-xl filter"
            style={{ animationDelay: '2s' }}></div>
          <div
            className="animate-float absolute bottom-20 left-1/3 h-80 w-80 rounded-full bg-pink-400 opacity-20 mix-blend-multiply blur-xl filter"
            style={{ animationDelay: '4s' }}></div>
          <div
            className="animate-float absolute top-1/4 left-1/4"
            style={{ animationDelay: '1s' }}>
            <svg
              className="h-8 w-8 text-white opacity-30"
              fill="currentColor"
              viewBox="0 0 20 20">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
          </div>
          <div
            className="animate-float absolute top-1/3 right-1/4"
            style={{ animationDelay: '3s' }}>
            <svg
              className="h-6 w-6 text-white opacity-30"
              fill="currentColor"
              viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>

        {/* === Main Content Container === */}
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Left Content (Không thay đổi) */}
            <div className="text-center lg:text-left">
              {/* Badge */}
              <div className="animate-slide-left">
                <span className="glass-effect mb-6 inline-flex items-center rounded-full bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-2 text-sm font-medium text-white">
                  <svg
                    className="mr-2 h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Dự án cao cấp 2025
                </span>
              </div>
              {/* Main Heading */}
              <h1 className="animate-slide-left mb-6 text-4xl font-bold md:text-6xl lg:text-7xl">
                <span className="block text-white">Luxury</span>
                <span className="gradient-text block">Residence</span>
                <span className="mt-2 block text-2xl font-light text-gray-300 md:text-3xl lg:text-4xl">
                  Nơi Cuộc Sống Thăng Hoa
                </span>
              </h1>
              {/* Description */}
              <p className="animate-fade-up mx-auto mb-8 max-w-2xl text-lg leading-relaxed text-gray-300 md:text-xl lg:mx-0">
                Khám phá không gian sống đẳng cấp với thiết kế hiện đại, tiện
                ích 5 sao và vị trí vàng tại trung tâm thành phố.
              </p>
              {/* CTA Buttons */}
              <div className="animate-fade-up flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
                <button className="group relative overflow-hidden rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                  <span className="relative z-10 flex items-center justify-center">
                    <svg
                      className="mr-2 h-5 w-5 transition-transform duration-300 group-hover:rotate-12"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                    Khám Phá Ngay
                  </span>
                  <div className="shimmer absolute inset-0"></div>
                </button>
                <button className="group glass-effect hover:bg-opacity-20 rounded-full px-8 py-4 font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-white">
                  <span className="flex items-center justify-center">
                    <svg
                      className="mr-2 h-5 w-5 transition-transform duration-300 group-hover:scale-110"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    Liên Hệ Tư Vấn
                  </span>
                </button>
              </div>
              {/* Stats */}
              <div className="animate-fade-up mt-12 grid grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="mb-2 text-3xl font-bold text-white md:text-4xl">
                    500+
                  </div>
                  <div className="text-sm text-gray-400">Căn Hộ Cao Cấp</div>
                </div>
                <div className="text-center">
                  <div className="mb-2 text-3xl font-bold text-white md:text-4xl">
                    50+
                  </div>
                  <div className="text-sm text-gray-400">Tiện Ích Đẳng Cấp</div>
                </div>
                <div className="text-center">
                  <div className="mb-2 text-3xl font-bold text-white md:text-4xl">
                    99%
                  </div>
                  <div className="text-sm text-gray-400">
                    Khách Hàng Hài Lòng
                  </div>
                </div>
              </div>
            </div>

            {/* --- THAY ĐỔI BẮT ĐẦU TỪ ĐÂY --- */}
            {/* Right Content - Real Image */}
            <div className="animate-slide-right relative hidden lg:block">
              {/* Container để căn giữa và giới hạn chiều rộng của ảnh */}
              <div className="relative mx-auto max-w-md">
                {/* Áp dụng hiệu ứng đổ bóng và nhấp nháy cho ảnh */}
                <div className="building-shadow animate-pulse-slow">
                  <img
                    src="/images/luxury-heights-building.jpg"
                    alt="Tòa nhà Luxury Heights"
                    className="h-auto w-full rounded-2xl object-cover"
                  />
                </div>
              </div>

              {/* Floating Feature Cards (giữ nguyên, vị trí tương đối với ảnh) */}
              <div
                className="glass-effect animate-float absolute top-1/4 -right-4 rounded-lg p-4"
                style={{ animationDelay: '1s' }}>
                <FeatureCard
                  icon={<SecurityIcon />}
                  title="Bảo Mật 24/7"
                  subtitle="An toàn tuyệt đối"
                  gradient="from-green-400 to-blue-500"
                />
              </div>
              <div
                className="glass-effect animate-float absolute top-2/3 -left-4 rounded-lg p-4"
                style={{ animationDelay: '2s' }}>
                <FeatureCard
                  icon={<StarIcon />}
                  title="Tiện Ích 5⭐"
                  subtitle="Đẳng cấp quốc tế"
                  gradient="from-purple-400 to-pink-500"
                />
              </div>
            </div>
            {/* --- KẾT THÚC THAY ĐỔI --- */}
          </div>
        </div>

        {/* Scroll Indicator (Không thay đổi) */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 transform animate-bounce">
          <div className="flex h-10 w-6 justify-center rounded-full border-2 border-white">
            <div className="mt-2 h-3 w-1 animate-pulse rounded-full bg-white"></div>
          </div>
        </div>
      </main>
    </div>
  )
}

// --- CÁC COMPONENT HỖ TRỢ (XÓA BuildingVisualization) ---

const FeatureCard = ({ icon, title, subtitle, gradient }) => (
  <div className="flex items-center space-x-3">
    <div
      className={`h-10 w-10 bg-gradient-to-r ${gradient} flex items-center justify-center rounded-full`}>
      {icon}
    </div>
    <div>
      <div className="text-sm font-semibold text-white">{title}</div>
      <div className="text-xs text-gray-300">{subtitle}</div>
    </div>
  </div>
)

const SecurityIcon = () => (
  <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 20 20">
    <path
      fillRule="evenodd"
      d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
      clipRule="evenodd"
    />
  </svg>
)

const StarIcon = () => (
  <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 20 20">
    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

export default LuxuryHero
