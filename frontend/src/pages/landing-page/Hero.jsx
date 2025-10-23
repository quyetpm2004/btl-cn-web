import { useState, useEffect } from 'react'

const slides = [
  {
    id: 0,
    title: (
      <>
        Cuộc Sống Đẳng Cấp
        <br />
        <span className="text-yellow-300">Luxury Residence</span>
      </>
    ),
    description:
      'Khám phá không gian sống hiện đại với thiết kế sang trọng, tiện ích đầy đủ và vị trí đắc địa',
    bgGradient: 'from-blue-600 via-purple-600 to-purple-800',
    image:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80', // căn hộ
    primaryBtn: {
      text: 'Xem Căn Hộ',
      href: '#can-ho',
      color: 'text-purple-600'
    },
    secondaryBtn: {
      text: 'Liên Hệ Ngay',
      href: '#lien-he',
      color: 'hover:text-purple-600'
    }
  },
  {
    id: 1,
    title: (
      <>
        Tiện Ích Đẳng Cấp
        <br />
        <span className="text-yellow-300">5 Sao</span>
      </>
    ),
    description:
      'Hồ bơi vô cực, phòng gym hiện đại, spa cao cấp và hơn 20 tiện ích khác',
    bgGradient: 'from-green-500 via-teal-600 to-blue-700',
    image:
      'https://vuonannam.com/wp-content/uploads/2023/03/ho-boi-tphcm-dep-va-sang-chanh-11.jpg', // hồ bơi
    primaryBtn: {
      text: 'Khám Phá Tiện Ích',
      href: '#tien-ich',
      color: 'text-green-600'
    },
    secondaryBtn: {
      text: 'Đặt Lịch Tham Quan',
      href: '#lien-he',
      color: 'hover:text-green-600'
    }
  },
  {
    id: 2,
    title: (
      <>
        Ưu Đãi Đặc Biệt
        <br />
        <span className="text-yellow-300">Chỉ Từ 1.2 Tỷ</span>
      </>
    ),
    description:
      'Cơ hội sở hữu căn hộ cao cấp với chính sách thanh toán linh hoạt 0% lãi suất',
    bgGradient: 'from-orange-500 via-red-500 to-pink-600',
    image:
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1920&q=80', // ưu đãi
    primaryBtn: {
      text: 'Xem Bảng Giá',
      href: '#bang-gia',
      color: 'text-red-600'
    },
    secondaryBtn: {
      text: 'Nhận Ưu Đãi',
      href: '#lien-he',
      color: 'hover:text-red-600'
    }
  }
]

export const Hero = () => {
  const [current, setCurrent] = useState(0)

  // Tự động chuyển slide sau 6 giây
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  const goToSlide = (index) => setCurrent(index)
  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length)
  const prevSlide = () =>
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length)

  return (
    <section className="relative overflow-hidden pt-16">
      <div className="slideshow-container relative h-screen">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`slide absolute inset-0 flex h-full w-full items-center justify-center transition-opacity duration-1000 ${
              index === current ? 'z-10 opacity-100' : 'z-0 opacity-0'
            }`}>
            {/* Ảnh nền */}
            <img
              src={slide.image}
              alt="slide background"
              className="absolute inset-0 h-full w-full object-cover"
            />
            {/* Lớp phủ gradient & mờ đen */}
            {/* <div
              className={`absolute inset-0 bg-gradient-to-br ${slide.bgGradient} opacity-60`}
            ></div> */}
            {/* <div className="absolute inset-0 bg-black bg-opacity-40"></div> */}

            {/* Nội dung */}
            <div className="relative z-10 mx-auto max-w-7xl px-4 text-center text-white sm:px-6 lg:px-8">
              <h1 className="mb-6 text-4xl font-bold md:text-6xl">
                {slide.title}
              </h1>
              <p className="mx-auto mb-8 max-w-3xl text-xl md:text-2xl">
                {slide.description}
              </p>
              <div className="space-x-4">
                <a
                  href={slide.primaryBtn.href}
                  className={`bg-white ${slide.primaryBtn.color} inline-block rounded-full px-8 py-3 font-semibold transition duration-300 hover:bg-gray-100`}>
                  {slide.primaryBtn.text}
                </a>
                <a
                  href={slide.secondaryBtn.href}
                  className={`rounded-full border-2 border-white px-8 py-3 font-semibold text-white hover:bg-white ${slide.secondaryBtn.color} inline-block transition duration-300`}>
                  {slide.secondaryBtn.text}
                </a>
              </div>
            </div>
          </div>
        ))}

        {/* Nút điều hướng */}
        <button
          onClick={prevSlide}
          className="bg-opacity-20 hover:bg-opacity-30 absolute top-1/2 left-4 z-20 -translate-y-1/2 transform cursor-pointer rounded-full bg-white p-3 text-white transition duration-300">
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            color="#000">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"></path>
          </svg>
        </button>
        <button
          onClick={nextSlide}
          className="bg-opacity-20 hover:bg-opacity-30 absolute top-1/2 right-4 z-20 -translate-y-1/2 transform cursor-pointer rounded-full bg-white p-3 text-white transition duration-300">
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            color="#000">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"></path>
          </svg>
        </button>

        {/* Dấu chấm chỉ báo */}
        <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 transform space-x-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-3 w-3 rounded-full bg-white transition duration-300 ${
                index === current
                  ? 'opacity-100'
                  : 'opacity-50 hover:opacity-100'
              }`}></button>
          ))}
        </div>
      </div>
    </section>
  )
}
