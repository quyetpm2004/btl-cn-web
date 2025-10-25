// src/components/ApartmentTypes.js

import React, { useState } from 'react'
import ImageGallery from 'react-image-gallery'

// Đừng quên import file CSS của thư viện!
import 'react-image-gallery/styles/css/image-gallery.css'

// 1. Dữ liệu được cấu trúc lại
// Thay thế bằng các đường dẫn ảnh thực tế của bạn
const apartmentData = [
  {
    id: 'studio',
    title: 'Studio - 35m²',
    description:
      'Căn hộ studio hiện đại, tối ưu không gian, phù hợp cho người độc thân hoặc cặp đôi trẻ.',
    price: 'Từ 1.2 tỷ VNĐ',
    coverImage: '/images/studio1.jpg',
    galleryImages: [
      {
        original: '/images/studio1.jpg',
        thumbnail: '/images/studio1.jpg'
      },
      {
        original: '/images/studio2.jpg',
        thumbnail: '/images/studio2.jpg'
      },
      {
        original: '/images/studio3.jpg',
        thumbnail: '/images/studio3.jpg'
      }
    ]
  },
  {
    id: '1br',
    title: '1 Phòng Ngủ - 55m²',
    description:
      'Căn hộ 1 phòng ngủ rộng rãi với phòng khách riêng biệt, ban công thoáng mát.',
    price: 'Từ 1.8 tỷ VNĐ',
    coverImage: '/images/phong-don-1.jpg',
    galleryImages: [
      {
        original: '/images/phong-don-1.jpg',
        thumbnail: '/images/phong-don-1.jpg'
      },
      {
        original: '/images/phong-don-2.jpg',
        thumbnail: '/images/phong-don-2.jpg'
      },
      {
        original: '/images/phong-don-3.jpg',
        thumbnail: '/images/phong-don-3.jpg'
      },
      {
        original: '/images/phong-don-4.jpg',
        thumbnail: '/images/phong-don-4.jpg'
      }
    ]
  },
  {
    id: '1br',
    title: '1 Phòng Ngủ - Full đồ - 75m²',
    description:
      'Căn hộ 1 phòng ngủ đầy đủ đồ đặc rộng rãi với phòng khách riêng biệt, ban công thoáng mát.',
    price: 'Từ 2 tỷ VNĐ',
    coverImage: '/images/phong-1-full-1.jpg',
    galleryImages: [
      {
        original: '/images/phong-1-full-1.jpg',
        thumbnail: '/images/phong-1-full-1.jpg'
      },
      {
        original: '/images/phong-1-full-2.jpg',
        thumbnail: '/images/phong-1-full-2.jpg'
      },
      {
        original: '/images/phong-1-full-3.jpg',
        thumbnail: '/images/phong-1-full-3.jpg'
      },
      {
        original: '/images/phong-1-full-4.jpg',
        thumbnail: '/images/phong-1-full-4.jpg'
      }
    ]
  },
  {
    id: '2br',
    title: '2 Phòng Ngủ - 75m²',
    description:
      'Căn hộ 2 phòng ngủ lý tưởng cho gia đình nhỏ, thiết kế thông minh và tiện nghi.',
    price: 'Từ 2.5 tỷ VNĐ',
    coverImage: '/images/phong-doi-1.jpg',
    galleryImages: [
      {
        original: '/images/phong-doi-1.jpg',
        thumbnail: '/images/phong-doi-1.jpg'
      },
      {
        original: '/images/phong-doi-2.jpg',
        thumbnail: '/images/phong-doi-2.jpg'
      },
      {
        original: '/images/phong-doi-3.jpg',
        thumbnail: '/images/phong-doi-3.jpg'
      },
      {
        original: '/images/phong-doi-4.jpg',
        thumbnail: '/images/phong-doi-4.jpg'
      }
    ]
  },
  {
    id: '3br',
    title: '3 Phòng Ngủ - 75m²',
    description:
      ' Căn hộ 3 phòng ngủ rộng rãi cho gia đình đông thành viên, có phòng làm việc riêng.',
    price: 'Từ 3.2 tỷ VNĐ',
    coverImage: '/images/phong-ba-1.jpg',
    galleryImages: [
      {
        original: '/images/phong-ba-1.jpg',
        thumbnail: '/images/phong-ba-1.jpg'
      },
      {
        original: '/images/phong-ba-2.jpg',
        thumbnail: '/images/phong-ba-2.jpg'
      },
      {
        original: '/images/phong-ba-3.jpg',
        thumbnail: '/images/phong-ba-3.jpg'
      },
      {
        original: '/images/phong-ba-4.jpg',
        thumbnail: '/images/phong-ba-4.jpg'
      },
      {
        original: '/images/phong-ba-5.jpg',
        thumbnail: '/images/phong-ba-5.jpg'
      },
      {
        original: '/images/phong-ba-6.jpg',
        thumbnail: '/images/phong-ba-6.jpg'
      }
    ]
  },
  {
    id: '3br',
    title: 'Căn Hộ Studio Full Đồ Tonkin - 28m²',
    description:
      ' Deco với màu sắc hồng nữ tính theo chủ nghĩa ghét màu hồng thích sự giả dối.',
    price: 'Từ 1.5 tỷ VNĐ',
    coverImage: '/images/studio-tunki-1.jpg',
    galleryImages: [
      {
        original: '/images/studio-tunki-1.jpg',
        thumbnail: '/images/studio-tunki-1.jpg'
      },
      {
        original: '/images/studio-tunki-2.jpg',
        thumbnail: '/images/studio-tunki-2.jpg'
      },
      {
        original: '/images/studio-tunki-4.jpg',
        thumbnail: '/images/studio-tunki-4.jpg'
      }
    ]
  }

  // ... Thêm các căn hộ còn lại vào đây theo cấu trúc tương tự
]

export const ApartmentTypes = () => {
  // 2. State để quản lý modal gallery
  const [isGalleryOpen, setIsGalleryOpen] = useState(false)
  const [galleryImages, setGalleryImages] = useState([])

  // Hàm để mở gallery với bộ ảnh tương ứng
  const openGallery = (images) => {
    setGalleryImages(images)
    setIsGalleryOpen(true)
  }

  // Hàm để đóng gallery
  const closeGallery = () => {
    setIsGalleryOpen(false)
  }

  return (
    <>
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

          {/* 3. Grid các căn hộ được render tự động */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {apartmentData.map((apartment) => (
              <div
                key={apartment.id}
                className="card-hover fade-in cursor-pointer overflow-hidden rounded-xl bg-white shadow-lg"
                onClick={() => openGallery(apartment.galleryImages)} // <-- Sự kiện click
              >
                <img
                  className="h-48 w-full object-cover"
                  src={apartment.coverImage}
                  alt={`Hình ảnh bìa cho căn hộ ${apartment.title}`}
                />
                <div className="p-6">
                  <h3 className="mb-2 text-xl font-semibold">
                    {apartment.title}
                  </h3>
                  <p className="mb-4 text-gray-600">{apartment.description}</p>
                  <div className="font-semibold text-purple-600">
                    {apartment.price}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Modal chứa Gallery */}
      {isGalleryOpen && (
        <div className="gallery-modal">
          <button className="close-button" onClick={closeGallery}>
            &times;
          </button>
          <div className="gallery-content">
            <ImageGallery
              items={galleryImages}
              showPlayButton={false}
              showFullscreenButton={true}
              showThumbnails={true}
              slideOnThumbnailOver={true}
              showNav={true}
            />
          </div>
        </div>
      )}
    </>
  )
}
