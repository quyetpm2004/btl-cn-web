import React, { useState, useEffect } from "react";

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
      "Khám phá không gian sống hiện đại với thiết kế sang trọng, tiện ích đầy đủ và vị trí đắc địa",
    bgGradient: "from-blue-600 via-purple-600 to-purple-800",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80", // căn hộ
    primaryBtn: { text: "Xem Căn Hộ", href: "#can-ho", color: "text-purple-600" },
    secondaryBtn: { text: "Liên Hệ Ngay", href: "#lien-he", color: "hover:text-purple-600" },
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
      "Hồ bơi vô cực, phòng gym hiện đại, spa cao cấp và hơn 20 tiện ích khác",
    bgGradient: "from-green-500 via-teal-600 to-blue-700",
    image:
      "https://vuonannam.com/wp-content/uploads/2023/03/ho-boi-tphcm-dep-va-sang-chanh-11.jpg", // hồ bơi
    primaryBtn: { text: "Khám Phá Tiện Ích", href: "#tien-ich", color: "text-green-600" },
    secondaryBtn: { text: "Đặt Lịch Tham Quan", href: "#lien-he", color: "hover:text-green-600" },
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
      "Cơ hội sở hữu căn hộ cao cấp với chính sách thanh toán linh hoạt 0% lãi suất",
    bgGradient: "from-orange-500 via-red-500 to-pink-600",
    image:
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1920&q=80", // ưu đãi
    primaryBtn: { text: "Xem Bảng Giá", href: "#bang-gia", color: "text-red-600" },
    secondaryBtn: { text: "Nhận Ưu Đãi", href: "#lien-he", color: "hover:text-red-600" },
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  // Tự động chuyển slide sau 6 giây
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index) => setCurrent(index);
  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section className="relative pt-16 overflow-hidden">
      <div className="slideshow-container relative h-screen">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`slide absolute inset-0 h-full w-full flex items-center justify-center transition-opacity duration-1000 ${
              index === current ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            {/* Ảnh nền */}
            <img
              src={slide.image}
              alt="slide background"
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Lớp phủ gradient & mờ đen */}
            {/* <div
              className={`absolute inset-0 bg-gradient-to-br ${slide.bgGradient} opacity-60`}
            ></div> */}
            {/* <div className="absolute inset-0 bg-black bg-opacity-40"></div> */}

            {/* Nội dung */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                {slide.title}
              </h1>
              <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
                {slide.description}
              </p>
              <div className="space-x-4">
                <a
                  href={slide.primaryBtn.href}
                  className={`bg-white ${slide.primaryBtn.color} px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition duration-300 inline-block`}
                >
                  {slide.primaryBtn.text}
                </a>
                <a
                  href={slide.secondaryBtn.href}
                  className={`border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white ${slide.secondaryBtn.color} transition duration-300 inline-block`}
                >
                  {slide.secondaryBtn.text}
                </a>
              </div>
            </div>
          </div>
        ))}

        {/* Nút điều hướng */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-full transition duration-300 z-20 cursor-pointer"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            color="#000"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            ></path>
          </svg>
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-full transition duration-300 z-20 cursor-pointer"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            color="#000"

          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            ></path>
          </svg>
        </button>

        {/* Dấu chấm chỉ báo */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 bg-white rounded-full transition duration-300 ${
                index === current
                  ? "opacity-100"
                  : "opacity-50 hover:opacity-100"
              }`}
            ></button>
          ))}
        </div>
      </div>
    </section>
  );
}
