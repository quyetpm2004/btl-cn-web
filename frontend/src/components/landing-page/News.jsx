import React from "react";

const newsList = [
  {
    date: "15/12/2024",
    title: "Khai Trương Phòng Gym Mới",
    desc: "Phòng gym với trang thiết bị hiện đại nhất chính thức khai trương, miễn phí cho cư dân trong tháng đầu.",
    color: "from-blue-400 to-purple-500",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
      />
    ),
  },
  {
    date: "20/12/2024",
    title: "Lễ Hội Giáng Sinh 2024",
    desc: "Tham gia lễ hội Giáng sinh tại sảnh chính với nhiều hoạt động thú vị dành cho cả gia đình.",
    color: "from-green-400 to-blue-500",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    ),
  },
  {
    date: "10/01/2025",
    title: "Ưu Đãi Đặc Biệt Tết 2025",
    desc: "Chương trình ưu đãi lớn nhất trong năm với nhiều quà tặng hấp dẫn cho khách hàng mua căn hộ.",
    color: "from-orange-400 to-red-500",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
      />
    ),
  },
];

export default function News() {
  return (
    <section id="tin-tuc" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Tin Tức & Sự Kiện
          </h2>
          <p className="text-xl text-gray-600">
            Cập nhật thông tin mới nhất về dự án và cộng đồng cư dân
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {newsList.map((news, index) => (
            <article
              key={index}
              className="bg-gray-50 rounded-xl overflow-hidden card-hover fade-in"
            >
              <div
                className={`h-48 bg-gradient-to-br ${news.color} flex items-center justify-center`}
              >
                <svg
                  className="w-16 h-16 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {news.icon}
                </svg>
              </div>
              <div className="p-6">
                <div className="text-sm text-purple-600 mb-2">{news.date}</div>
                <h3 className="text-xl font-semibold mb-3">{news.title}</h3>
                <p className="text-gray-600 mb-4">{news.desc}</p>
                <a
                  href="#"
                  className="text-purple-600 font-medium hover:text-purple-700"
                >
                  Đọc thêm →
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
