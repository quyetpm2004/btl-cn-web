import { useState, useEffect } from 'react'

// Dữ liệu slides vẫn giữ nguyên
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
      'Khám phá không gian sống hiện đại với thiết kế sang trọng, tiện ích đầy đủ và vị trí đắc địa.',
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
      'Hồ bơi vô cực, phòng gym hiện đại, spa cao cấp và hơn 20 tiện ích khác đang chờ đón bạn.',
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
      'Cơ hội sở hữu căn hộ cao cấp với chính sách thanh toán linh hoạt và chiết khấu lên đến 10%.',
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

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length)
    }, 6000) // Tự động chuyển slide sau 6 giây
    return () => clearInterval(timer)
  }, [])

  const goToSlide = (index) => setCurrent(index)

  return (
    <section className="relative h-screen w-full overflow-hidden text-white">
      {/* Container cho tất cả các slide */}
      <div className="relative h-full w-full">
        {/* Lặp qua các slide để render phần Text và Image riêng biệt */}
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === current ? 'opacity-100' : 'opacity-0'
            }`}>
            <div className="flex h-full w-full flex-col md:flex-row">
              {/* === PHẦN TEXT (BÊN TRÁI) === */}
              <div
                className={`flex w-full flex-col items-start justify-center bg-gradient-to-br p-12 text-left md:w-1/2 lg:p-24 ${slide.bgGradient}`}>
                {/* Container cho nội dung text để tạo hiệu ứng animation */}
                <div
                  className={`transition-all duration-700 ease-in-out ${
                    index === current
                      ? 'translate-y-0 opacity-100'
                      : 'translate-y-8 opacity-0'
                  }`}>
                  <h1 className="mb-4 text-4xl leading-tight font-extrabold md:text-5xl lg:text-6xl">
                    {slide.title}
                  </h1>
                  <p className="mb-8 max-w-lg text-lg text-gray-200 md:text-xl">
                    {slide.description}
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <a
                      href={slide.primaryBtn.href}
                      className={`transform rounded-full bg-white px-8 py-3 font-semibold ${slide.primaryBtn.color} shadow-lg transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-105`}>
                      {slide.primaryBtn.text}
                    </a>
                    <a
                      href={slide.secondaryBtn.href}
                      className={`transform rounded-full border-2 border-white px-8 py-3 font-semibold text-white transition duration-300 ease-in-out hover:-translate-y-1 hover:bg-white ${slide.secondaryBtn.color}`}>
                      {slide.secondaryBtn.text}
                    </a>
                  </div>
                </div>
              </div>

              {/* === PHẦN ẢNH (BÊN PHẢI) === */}
              <div className="relative hidden h-full w-1/2 md:block">
                <img
                  src={slide.image}
                  alt="slide image"
                  className={`h-full w-full object-cover transition-transform duration-[6000ms] ease-linear ${
                    index === current ? 'scale-110' : 'scale-100'
                  }`}
                />
                {/* Lớp phủ đen nhẹ để ảnh có chiều sâu */}
                <div className="absolute inset-0 bg-black/20"></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* === ĐIỀU HƯỚNG & DẤU CHẤM === */}
      <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 transform items-center gap-4">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2.5 w-2.5 rounded-full ring-white ring-offset-2 ring-offset-black/50 transition-all duration-300 ${
              index === current
                ? 'scale-125 bg-white ring-2'
                : 'bg-white/50 hover:bg-white/75'
            }`}></button>
        ))}
      </div>
    </section>
  )
}
