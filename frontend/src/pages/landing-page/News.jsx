// Thay thế các đường dẫn ảnh bằng ảnh thực tế của bạn
const newsList = [
  {
    date: '15/12/2024',
    title: 'Khai Trương Phòng Gym Mới',
    desc: 'Phòng gym với trang thiết bị hiện đại nhất chính thức khai trương, miễn phí cho cư dân trong tháng đầu.',
    image: '/images/gym-khai-truong.jpg' // <-- Đổi icon thành image
  },
  {
    date: '20/12/2024',
    title: 'Lễ Hội Giáng Sinh 2024',
    desc: 'Tham gia lễ hội Giáng sinh tại sảnh chính với nhiều hoạt động thú vị dành cho cả gia đình.',
    image: '/images/christmas.jpg' // <-- Đổi icon thành image
  },
  {
    date: '10/01/2025',
    title: 'Ưu Đãi Đặc Biệt Tết 2025',
    desc: 'Chương trình ưu đãi lớn nhất trong năm với nhiều quà tặng hấp dẫn cho khách hàng mua căn hộ.',
    image: '/images/uu-dai-tet.jpg' // <-- Đổi icon thành image
  }
]

export const News = () => {
  return (
    <section id="tin-tuc" className="bg-about py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="fade-in mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-800 md:text-4xl">
            Tin Tức & Sự Kiện
          </h2>
          <p className="text-xl text-gray-600">
            Cập nhật thông tin mới nhất về dự án và cộng đồng cư dân
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {newsList.map((news, index) => (
            <article
              key={index}
              className="card-hover fade-in flex flex-col overflow-hidden rounded-xl bg-gray-50 shadow-lg">
              {/* Thay thế khối div và svg bằng thẻ img */}
              <img
                className="h-48 w-full object-cover"
                src={news.image}
                alt={news.title} // Thêm alt text để tốt cho SEO và khả năng truy cập
              />
              <div className="flex flex-1 flex-col p-6">
                <div className="mb-2 text-sm text-purple-600">{news.date}</div>
                <h3 className="mb-3 text-xl font-semibold">{news.title}</h3>
                <p className="mb-4 flex-1 text-gray-600">{news.desc}</p>
                <a
                  href="#"
                  className="mt-auto font-medium text-purple-600 hover:text-purple-700">
                  Đọc thêm →
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
