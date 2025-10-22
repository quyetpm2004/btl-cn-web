const items = [
  {
    id: 1,
    title: 'Mô Tả Dự Án',
    description:
      '30 tầng với 500 căn hộ cao cấp, thiết kế hiện đại theo tiêu chuẩn quốc tế, vị trí đắc địa tại trung tâm thành phố',
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
      />
    )
  },
  {
    id: 2,
    title: 'Ban Quản Lý',
    description:
      'Đội ngũ quản lý chuyên nghiệp 24/7, bảo trì kỹ thuật định kỳ, dịch vụ khách hàng tận tâm',
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
      />
    )
  },
  {
    id: 3,
    title: 'Cư Dân Mẫu',
    description:
      'Cộng đồng cư dân văn minh, các gia đình trẻ năng động, doanh nhân thành đạt và chuyên gia đầu ngành',
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
      />
    )
  }
]

export const About = () => {
  return (
    <section id="gioi-thieu" className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Tiêu đề */}
        <div className="fade-in mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-800 md:text-4xl">
            Giới Thiệu Dự Án
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-gray-600">
            Luxury Residence là dự án chung cư cao cấp với 30 tầng, 500 căn hộ
            được thiết kế theo tiêu chuẩn quốc tế
          </p>
        </div>

        {/* Danh sách 3 khối giới thiệu */}
        <div className="grid gap-8 md:grid-cols-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="card-hover fade-in rounded-xl bg-gray-50 p-8 text-center transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-purple-100">
                <svg
                  className="h-8 w-8 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  {item.icon}
                </svg>
              </div>
              <h3 className="mb-3 text-xl font-semibold">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
