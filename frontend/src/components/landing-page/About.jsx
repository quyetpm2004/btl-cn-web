export default function About() {
  const items = [
    {
      id: 1,
      title: "Mô Tả Dự Án",
      description:
        "30 tầng với 500 căn hộ cao cấp, thiết kế hiện đại theo tiêu chuẩn quốc tế, vị trí đắc địa tại trung tâm thành phố",
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
        />
      ),
    },
    {
      id: 2,
      title: "Ban Quản Lý",
      description:
        "Đội ngũ quản lý chuyên nghiệp 24/7, bảo trì kỹ thuật định kỳ, dịch vụ khách hàng tận tâm",
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
        />
      ),
    },
    {
      id: 3,
      title: "Cư Dân Mẫu",
      description:
        "Cộng đồng cư dân văn minh, các gia đình trẻ năng động, doanh nhân thành đạt và chuyên gia đầu ngành",
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
        />
      ),
    },
  ];

  return (
    <section id="gioi-thieu" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Tiêu đề */}
        <div className="text-center mb-16 fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Giới Thiệu Dự Án
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Luxury Residence là dự án chung cư cao cấp với 30 tầng, 500 căn hộ
            được thiết kế theo tiêu chuẩn quốc tế
          </p>
        </div>

        {/* Danh sách 3 khối giới thiệu */}
        <div className="grid md:grid-cols-3 gap-8">
          {items.map((item) => (
            <div
              key={item.id}
              className="text-center card-hover bg-gray-50 p-8 rounded-xl fade-in transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg"
            >
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {item.icon}
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
