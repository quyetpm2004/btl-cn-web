import { useState } from 'react'
// 1. Import component bản đồ
import MapComponent from './MapComponent'
import { sendContactForm } from '../../services/contact.api'
import { toast } from 'sonner'

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    apartmentType: '',
    message: ''
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  // Validate từng field
  const validateField = (name, value) => {
    let error = ''

    switch (name) {
      case 'name':
        if (!value.trim()) {
          error = 'Vui lòng nhập họ tên'
        } else if (value.trim().length < 2) {
          error = 'Họ tên phải có ít nhất 2 ký tự'
        } else if (!/^[a-zA-ZÀ-ỹ\s]+$/.test(value)) {
          error = 'Họ tên chỉ được chứa chữ cái'
        }
        break

      case 'phone': {
        const cleanPhone = value.replace(/[\s.-]/g, '')
        if (!value.trim()) {
          error = 'Vui lòng nhập số điện thoại'
        } else if (!/^(0|84|\+84)[0-9]{9,10}$/.test(cleanPhone)) {
          error = 'Số điện thoại không hợp lệ (phải có 10-11 số)'
        }
        break
      }

      case 'email':
        if (!value.trim()) {
          error = 'Vui lòng nhập email'
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = 'Email không đúng định dạng'
        }
        break
    }

    return error
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))

    // Clear error khi người dùng bắt đầu nhập
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handleBlur = (e) => {
    const { name, value } = e.target
    const error = validateField(name, value)

    if (error) {
      setErrors((prev) => ({
        ...prev,
        [name]: error
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validate tất cả fields
    const newErrors = {}
    Object.keys(formData).forEach((key) => {
      if (['name', 'phone', 'email'].includes(key)) {
        const error = validateField(key, formData[key])
        if (error) {
          newErrors[key] = error
        }
      }
    })

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      toast.error('Vui lòng kiểm tra lại thông tin')
      return
    }

    setLoading(true)
    try {
      const response = await sendContactForm(formData)

      if (response.data.success) {
        const thankYouMessage = `Cảm ơn ${formData.name}! Chúng tôi đã nhận được thông tin của bạn. Đội ngũ tư vấn sẽ liên hệ với bạn sớm nhất có thể.`
        toast.success(thankYouMessage)

        // Reset form
        setFormData({
          name: '',
          phone: '',
          email: '',
          apartmentType: '',
          message: ''
        })
        setErrors({})
      }
    } catch (error) {
      console.error('Error sending contact:', error)
      toast.error(
        error.response?.data?.message ||
          'Có lỗi xảy ra. Vui lòng thử lại sau hoặc liên hệ trực tiếp qua hotline.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="lien-he" className="bg-gray-50 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ... (phần tiêu đề không đổi) ... */}
        <div className="fade-in mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-800 md:text-4xl">
            Liên Hệ Với Chúng Tôi
          </h2>
          <p className="text-xl text-gray-600">
            Đội ngũ tư vấn chuyên nghiệp sẵn sàng hỗ trợ bạn 24/7
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* ... (phần form liên hệ không đổi) ... */}
          <div className="fade-in">
            <div className="rounded-xl bg-white p-8 shadow-lg">
              {/* Form content */}
              <h3 className="mb-6 text-2xl font-bold">Gửi Thông Tin Liên Hệ</h3>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Họ và tên *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full rounded-lg border px-4 py-3 outline-none focus:ring-2 ${
                      errors.name
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
                        : 'border-gray-300 focus:border-transparent focus:ring-purple-500'
                    }`}
                    placeholder="Nguyễn Văn A"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Số điện thoại *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full rounded-lg border px-4 py-3 outline-none focus:ring-2 ${
                      errors.phone
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
                        : 'border-gray-300 focus:border-transparent focus:ring-purple-500'
                    }`}
                    placeholder="0987654321"
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                  )}
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full rounded-lg border px-4 py-3 outline-none focus:ring-2 ${
                      errors.email
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
                        : 'border-gray-300 focus:border-transparent focus:ring-purple-500'
                    }`}
                    placeholder="example@email.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Loại căn hộ quan tâm
                  </label>
                  <select
                    name="apartmentType"
                    value={formData.apartmentType}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-transparent focus:ring-2 focus:ring-purple-500">
                    <option value="">Chọn loại căn hộ</option>
                    <option>Studio - 35m²</option>
                    <option>1 Phòng ngủ - 55m²</option>
                    <option>2 Phòng ngủ - 75m²</option>
                    <option>3 Phòng ngủ - 95m²</option>
                    <option>Penthouse - 150m²</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Tin nhắn
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="4"
                    placeholder="Để lại lời nhắn của bạn..."
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-transparent focus:ring-2 focus:ring-purple-500"></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-lg bg-purple-600 py-3 font-semibold text-white transition duration-300 hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-50">
                  {loading ? 'Đang gửi...' : 'Gửi Thông Tin'}
                </button>
              </form>
            </div>
          </div>

          {/* Thông tin liên hệ */}
          <div className="fade-in space-y-8">
            <div className="rounded-xl bg-white p-8 shadow-lg">
              <h3 className="mb-6 text-2xl font-bold">Thông Tin Liên Hệ</h3>
              <div className="space-y-4 text-gray-700">
                <p>📞 Hotline: 1900 1234</p>
                <p>✉️ Email: info@luxuryresidence.vn</p>
                <p>📍 P. Linh Đường, Hoàng Liệt, Hoàng Mai, Hà Nội 100000</p>
                <p>🕒 8:00 - 22:00 (Hàng ngày)</p>
              </div>
            </div>

            {/* 2. Cập nhật khối Vị Trí Dự Án */}
            <div className="rounded-xl bg-white p-8 shadow-lg">
              <h3 className="mb-4 text-center text-2xl font-bold">
                Vị Trí Dự Án
              </h3>
              {/* Đặt chiều cao cho container chứa bản đồ */}
              <div className="h-64 w-full overflow-hidden rounded-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.6628313295893!2d105.82386517601684!3d20.964739580661283!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135adc08c5f3b31%3A0xa9df86b5c4e8eddc!2sHH1C%20Linh%20%C4%90%C3%A0m!5e0!3m2!1sen!2s!4v1733976000000!5m2!1sen!2s"
                  width="100%"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"></iframe>
              </div>
              <p className="mt-4 text-center text-sm text-gray-500">
                P. Linh Đường, Hoàng Liệt, Hoàng Mai, Hà Nội 100000
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
