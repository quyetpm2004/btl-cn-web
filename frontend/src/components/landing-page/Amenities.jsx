const amenities = [
  {
    title: 'Hồ Bơi Vô Cực',
    desc: 'Hồ bơi ngoài trời với view thành phố, mở cửa 24/7',
    img: 'https://images.unsplash.com/photo-1555992336-03a23c3bf4e6?auto=format&fit=crop&w=600&q=80'
  },
  {
    title: 'Phòng Gym Hiện Đại',
    desc: 'Trang thiết bị tập luyện cao cấp, huấn luyện viên chuyên nghiệp',
    img: 'https://images.unsplash.com/photo-1571019613914-85f342c45f6e?auto=format&fit=crop&w=600&q=80'
  },
  {
    title: 'Bãi Xe Thông Minh',
    desc: 'Hệ thống bãi xe tự động, camera an ninh 24/7',
    img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80'
  },
  {
    title: 'Thang Máy Cao Tốc',
    desc: '6 thang máy Mitsubishi, tốc độ 2.5m/s',
    img: 'https://images.unsplash.com/photo-1601646764402-0b6a7f32cf3a?auto=format&fit=crop&w=600&q=80'
  },
  {
    title: 'Thư Viện & Coworking',
    desc: 'Không gian học tập và làm việc yên tĩnh',
    img: 'https://images.unsplash.com/photo-1587614382346-4ec1f3e9c8f0?auto=format&fit=crop&w=600&q=80'
  },
  {
    title: 'Khu Vui Chơi Trẻ Em',
    desc: 'Sân chơi an toàn với thiết bị hiện đại',
    img: 'https://images.unsplash.com/photo-1565058528608-986e8d4b2c17?auto=format&fit=crop&w=600&q=80'
  },
  {
    title: 'Siêu Thị Mini',
    desc: 'Cửa hàng tiện lợi phục vụ 24/7',
    img: 'https://images.unsplash.com/photo-1588854337118-1f7b1e5a1a6e?auto=format&fit=crop&w=600&q=80'
  },
  {
    title: 'An Ninh 24/7',
    desc: 'Hệ thống bảo vệ chuyên nghiệp, camera AI',
    img: 'https://images.unsplash.com/photo-1590080875838-03a979a9d0ea?auto=format&fit=crop&w=600&q=80'
  }
]

export const Amenities = () => {
  return (
    <section id="tien-ich" className="bg-gray-50 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Tiêu đề */}
        <div className="fade-in mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-800 md:text-4xl">
            Tiện Ích Nội Khu
          </h2>
          <p className="text-xl text-gray-600">
            Hệ thống tiện ích đẳng cấp 5 sao phục vụ mọi nhu cầu sinh hoạt
          </p>
        </div>

        {/* Danh sách tiện ích */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {amenities.map((item, index) => (
            <div
              key={index}
              className="card-hover fade-in rounded-xl bg-white p-6 text-center transition-transform duration-300 hover:-translate-y-1">
              <img
                src={item.img}
                alt={item.title}
                className="mb-4 h-40 w-full rounded-lg object-cover transition-transform duration-300 hover:scale-105"
              />
              <h3 className="mb-2 font-semibold">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
