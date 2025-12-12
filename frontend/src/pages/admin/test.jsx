import React, { useState } from 'react'
import {
  CreditCard,
  Search,
  Plus,
  Filter,
  MoreVertical,
  FileText,
  Zap,
  Droplet,
  ShieldCheck,
  CheckCircle,
  Clock,
  AlertCircle,
  Eye,
  Edit,
  Trash2,
  Calendar,
  User,
  Home,
  Download,
  X,
  Save,
  Users,
  Bike,
  Car
} from 'lucide-react'

// --- MOCK DATA ---

const INITIAL_PERIODS = [
  {
    id: 1,
    name: 'Tháng 12/2025',
    status: 1,
    start_date: '2025-12-01',
    end_date: '2025-12-31',
    type: 'monthly'
  },
  {
    id: 2,
    name: 'Tháng 11/2025',
    status: 0,
    start_date: '2025-11-01',
    end_date: '2025-11-30',
    type: 'monthly'
  },
  {
    id: 3,
    name: 'Quý 4/2025',
    status: 0,
    start_date: '2025-10-01',
    end_date: '2025-12-31',
    type: 'quarterly'
  }
]

const INITIAL_SERVICES = [
  {
    id: 1,
    name: 'Phí quản lý',
    price: 15000,
    unit: 'm²',
    description: 'Phí vận hành tòa nhà',
    iconType: 'shield'
  },
  {
    id: 2,
    name: 'Điện sinh hoạt',
    price: 3500,
    unit: 'kWh',
    description: 'Theo chỉ số công tơ',
    iconType: 'zap'
  },
  {
    id: 3,
    name: 'Nước sạch',
    price: 12000,
    unit: 'm³',
    description: 'Theo khối nước tiêu thụ',
    iconType: 'droplet'
  },
  {
    id: 4,
    name: 'Gửi xe máy',
    price: 120000,
    unit: 'xe/tháng',
    description: 'Phí gửi xe tầng hầm',
    iconType: 'bike'
  },
  {
    id: 5,
    name: 'Gửi ô tô',
    price: 1200000,
    unit: 'xe/tháng',
    description: 'Phí gửi xe ô tô cố định',
    iconType: 'car'
  }
]

const INITIAL_APARTMENTS = [
  {
    id: 'A1205',
    owner: 'Nguyễn Văn An',
    phone: '0912345678',
    area: 105.5,
    members: 4,
    registrations: [
      { serviceId: 1, quantity: 105.5 }, // Phí QL
      { serviceId: 4, quantity: 2 } // 2 Xe máy
    ]
  },
  {
    id: 'B0801',
    owner: 'Lê Thị Bình',
    phone: '0987654321',
    area: 82.0,
    members: 2,
    registrations: [
      { serviceId: 1, quantity: 82.0 },
      { serviceId: 5, quantity: 1 } // 1 Ô tô
    ]
  },
  {
    id: 'C1501',
    owner: 'Trần Văn Cường',
    phone: '0909090909',
    area: 95.0,
    members: 3,
    registrations: [
      { serviceId: 1, quantity: 95.0 },
      { serviceId: 4, quantity: 1 },
      { serviceId: 5, quantity: 1 }
    ]
  }
]

const INITIAL_INVOICES = [
  {
    id: 'HD2512001',
    apartment: 'A1205',
    resident: 'Nguyễn Văn An',
    period_id: 1,
    period_name: 'Tháng 12/2025',
    amount: 2500000,
    deadline: '2025-12-20',
    status: 0, // 0: unpaid
    details: [
      { name: 'Phí quản lý', amount: 1200000 },
      { name: 'Điện (300kWh)', amount: 1050000 },
      { name: 'Nước (10m3)', amount: 120000 },
      { name: 'Gửi xe máy (1)', amount: 130000 }
    ]
  },
  {
    id: 'HD2512002',
    apartment: 'B0801',
    resident: 'Lê Thị Bình',
    period_id: 1,
    period_name: 'Tháng 12/2025',
    amount: 1800000,
    deadline: '2025-12-20',
    status: 1, // 1: paid
    paid_at: '2025-12-05',
    details: [
      { name: 'Phí quản lý', amount: 1000000 },
      { name: 'Gửi xe ô tô (1)', amount: 800000 }
    ]
  },
  {
    id: 'HD2511055',
    apartment: 'C1501',
    resident: 'Trần Văn Cường',
    period_id: 2,
    period_name: 'Tháng 11/2025',
    amount: 2200000,
    deadline: '2025-11-20',
    status: 2, // 2: overdue
    details: [
      { name: 'Phí quản lý', amount: 1200000 },
      { name: 'Điện', amount: 1000000 }
    ]
  }
]

// --- HELPER COMPONENTS ---

const StatusBadge = ({ status }) => {
  const configs = {
    0: {
      color: 'bg-yellow-50 text-yellow-700 border-yellow-200',
      label: 'Chờ thanh toán',
      icon: Clock
    },
    1: {
      color: 'bg-green-50 text-green-700 border-green-200',
      label: 'Đã thanh toán',
      icon: CheckCircle
    },
    2: {
      color: 'bg-red-50 text-red-700 border-red-200',
      label: 'Quá hạn',
      icon: AlertCircle
    }
  }
  const config = configs[status] || configs[0]
  const Icon = config.icon

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs font-medium ${config.color}`}>
      <Icon className="h-3.5 w-3.5" />
      {config.label}
    </span>
  )
}

const ServiceIcon = ({ type }) => {
  switch (type) {
    case 'shield':
      return <ShieldCheck className="h-5 w-5 text-blue-500" />
    case 'zap':
      return <Zap className="h-5 w-5 text-yellow-500" />
    case 'droplet':
      return <Droplet className="h-5 w-5 text-cyan-500" />
    case 'bike':
      return <Bike className="h-5 w-5 text-purple-500" />
    case 'car':
      return <Car className="h-5 w-5 text-orange-500" />
    default:
      return <CreditCard className="h-5 w-5 text-gray-500" />
  }
}

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(amount)
}

// --- MODALS ---

const ServiceRegistrationModal = ({
  apartment,
  allServices,
  onClose,
  onSave
}) => {
  // Initialize state with apartment's current registrations or empty defaults
  const [registrations, setRegistrations] = useState(() => {
    return allServices.map((service) => {
      const existing = apartment.registrations.find(
        (r) => r.serviceId === service.id
      )
      return {
        serviceId: service.id,
        isSelected: !!existing,
        quantity: existing
          ? existing.quantity
          : service.unit === 'm²'
            ? apartment.area
            : 1
      }
    })
  })

  const handleToggle = (index) => {
    const newRegs = [...registrations]
    newRegs[index].isSelected = !newRegs[index].isSelected
    setRegistrations(newRegs)
  }

  const handleQuantityChange = (index, val) => {
    const newRegs = [...registrations]
    newRegs[index].quantity = Number(val)
    setRegistrations(newRegs)
  }

  const handleSubmit = () => {
    const finalRegistrations = registrations
      .filter((r) => r.isSelected)
      .map((r) => ({ serviceId: r.serviceId, quantity: r.quantity }))

    onSave(apartment.id, finalRegistrations)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="animate-in fade-in zoom-in flex max-h-[90vh] w-full max-w-2xl flex-col rounded-xl bg-white shadow-xl duration-200">
        <div className="flex items-center justify-between border-b border-gray-100 p-5">
          <div>
            <h3 className="text-lg font-bold text-gray-900">Đăng ký dịch vụ</h3>
            <p className="text-sm text-gray-500">
              Căn hộ:{' '}
              <span className="font-semibold text-blue-600">
                {apartment.id}
              </span>{' '}
              - {apartment.owner}
            </p>
          </div>
          <button onClick={onClose}>
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <div className="custom-scroll overflow-y-auto p-6">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 font-medium text-gray-500">
              <tr>
                <th className="w-10 px-4 py-3">#</th>
                <th className="px-4 py-3">Dịch vụ</th>
                <th className="px-4 py-3">Đơn giá</th>
                <th className="w-32 px-4 py-3">Số lượng / Diện tích</th>
                <th className="px-4 py-3 text-right">Thành tiền (Dự kiến)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {allServices.map((service, idx) => {
                const reg = registrations[idx]
                const amount = reg.isSelected ? reg.quantity * service.price : 0
                return (
                  <tr
                    key={service.id}
                    className={`hover:bg-gray-50 ${reg.isSelected ? 'bg-blue-50/30' : ''}`}>
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={reg.isSelected}
                        onChange={() => handleToggle(idx)}
                        className="h-4 w-4 cursor-pointer rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <ServiceIcon type={service.iconType} />
                        <span
                          className={
                            reg.isSelected
                              ? 'font-medium text-gray-900'
                              : 'text-gray-500'
                          }>
                          {service.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {formatCurrency(service.price)} / {service.unit}
                    </td>
                    <td className="px-4 py-3">
                      <input
                        type="number"
                        disabled={!reg.isSelected}
                        value={reg.quantity}
                        onChange={(e) =>
                          handleQuantityChange(idx, e.target.value)
                        }
                        className="w-24 rounded border border-gray-300 px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:bg-gray-100 disabled:text-gray-400"
                      />
                    </td>
                    <td className="px-4 py-3 text-right font-medium text-gray-900">
                      {reg.isSelected ? formatCurrency(amount) : '-'}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end gap-3 rounded-b-xl border-t border-gray-100 bg-gray-50 p-5">
          <button
            onClick={onClose}
            className="rounded-lg border border-transparent px-4 py-2 text-sm font-medium text-gray-600 transition-all hover:border-gray-200 hover:bg-white">
            Hủy
          </button>
          <button
            onClick={handleSubmit}
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-all hover:bg-blue-700">
            <Save className="h-4 w-4" /> Lưu thay đổi
          </button>
        </div>
      </div>
    </div>
  )
}

const InvoiceDetailModal = ({ invoice, onClose, onPay }) => {
  if (!invoice) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="animate-in fade-in zoom-in w-full max-w-lg overflow-hidden rounded-xl bg-white shadow-xl duration-200">
        <div className="flex items-center justify-between border-b border-gray-100 p-5">
          <div>
            <h3 className="text-lg font-bold text-gray-900">
              Chi tiết hóa đơn
            </h3>
            <p className="text-sm text-gray-500">
              {invoice.id} - {invoice.period_name}
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-1 transition-colors hover:bg-gray-100">
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <div className="space-y-6 p-6">
          {/* Info Card */}
          <div className="flex items-start justify-between rounded-lg border border-blue-100 bg-blue-50 p-4">
            <div>
              <p className="text-xs font-semibold tracking-wide text-blue-600 uppercase">
                Căn hộ
              </p>
              <p className="text-xl font-bold text-gray-900">
                {invoice.apartment}
              </p>
              <p className="text-sm text-gray-600">{invoice.resident}</p>
            </div>
            <div className="text-right">
              <p className="text-xs font-semibold tracking-wide text-blue-600 uppercase">
                Tổng cộng
              </p>
              <p className="text-xl font-bold text-blue-700">
                {formatCurrency(invoice.amount)}
              </p>
              <div className="mt-1">
                <StatusBadge status={invoice.status} />
              </div>
            </div>
          </div>

          {/* Details List */}
          <div>
            <h4 className="mb-3 flex items-center gap-2 text-sm font-medium text-gray-700">
              <FileText className="h-4 w-4" /> Các khoản phí
            </h4>
            <ul className="space-y-3">
              {invoice.details.map((item, idx) => (
                <li
                  key={idx}
                  className="flex justify-between border-b border-gray-50 py-2 text-sm last:border-0">
                  <span className="text-gray-600">{item.name}</span>
                  <span className="font-medium text-gray-900">
                    {formatCurrency(item.amount)}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Payment Info if Paid */}
          {invoice.status === 1 && (
            <div className="flex items-start gap-2 rounded border border-green-100 bg-green-50 p-3 text-sm text-green-800">
              <CheckCircle className="mt-0.5 h-4 w-4" />
              <div>
                <span className="font-semibold">Đã thanh toán:</span>{' '}
                {invoice.paid_at} <br />
                <span className="text-xs opacity-80">
                  Phương thức: Chuyển khoản
                </span>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-3 border-t border-gray-100 bg-gray-50 p-5">
          <button
            onClick={onClose}
            className="rounded-lg border border-transparent px-4 py-2 text-sm font-medium text-gray-600 transition-all hover:border-gray-200 hover:bg-white">
            Đóng
          </button>
          {invoice.status !== 1 && (
            <button
              onClick={() => onPay(invoice)}
              className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-all hover:bg-blue-700">
              <CreditCard className="h-4 w-4" /> Xác nhận thanh toán
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

const AddServiceModal = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    unit: '',
    description: '',
    iconType: 'shield'
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave({ ...formData, id: Date.now() })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="animate-in fade-in zoom-in w-full max-w-md rounded-xl bg-white shadow-xl duration-200">
        <div className="flex items-center justify-between border-b border-gray-100 p-5">
          <h3 className="text-lg font-bold text-gray-900">Thêm dịch vụ mới</h3>
          <button onClick={onClose}>
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4 p-6">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Tên dịch vụ
            </label>
            <input
              required
              className="w-full rounded-lg border border-gray-300 p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Ví dụ: Phí Gym"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Đơn giá (VND)
              </label>
              <input
                required
                type="number"
                className="w-full rounded-lg border border-gray-300 p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: Number(e.target.value) })
                }
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Đơn vị tính
              </label>
              <input
                required
                className="w-full rounded-lg border border-gray-300 p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                value={formData.unit}
                onChange={(e) =>
                  setFormData({ ...formData, unit: e.target.value })
                }
                placeholder="tháng, m3..."
              />
            </div>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Mô tả
            </label>
            <textarea
              className="w-full rounded-lg border border-gray-300 p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows={2}
            />
          </div>
          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 py-2 font-medium text-white transition-colors hover:bg-blue-700">
            <Save className="h-4 w-4" /> Lưu dịch vụ
          </button>
        </form>
      </div>
    </div>
  )
}

const AddPeriodModal = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    start_date: '',
    end_date: '',
    type: 'monthly',
    status: 1
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave({ ...formData, id: Date.now() })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="animate-in fade-in zoom-in w-full max-w-md rounded-xl bg-white shadow-xl duration-200">
        <div className="flex items-center justify-between border-b border-gray-100 p-5">
          <h3 className="text-lg font-bold text-gray-900">Mở đợt thu mới</h3>
          <button onClick={onClose}>
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4 p-6">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Tên đợt thu
            </label>
            <input
              required
              className="w-full rounded-lg border border-gray-300 p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Ví dụ: Tháng 01/2026"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Loại kỳ thu
            </label>
            <select
              className="w-full rounded-lg border border-gray-300 p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={formData.type}
              onChange={(e) =>
                setFormData({ ...formData, type: e.target.value })
              }>
              <option value="monthly">Hàng tháng</option>
              <option value="quarterly">Hàng quý</option>
              <option value="yearly">Hàng năm</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Từ ngày
              </label>
              <input
                required
                type="date"
                className="w-full rounded-lg border border-gray-300 p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                value={formData.start_date}
                onChange={(e) =>
                  setFormData({ ...formData, start_date: e.target.value })
                }
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Đến ngày
              </label>
              <input
                required
                type="date"
                className="w-full rounded-lg border border-gray-300 p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                value={formData.end_date}
                onChange={(e) =>
                  setFormData({ ...formData, end_date: e.target.value })
                }
              />
            </div>
          </div>
          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 py-2 font-medium text-white transition-colors hover:bg-blue-700">
            <Plus className="h-4 w-4" /> Tạo đợt thu
          </button>
        </form>
      </div>
    </div>
  )
}

// --- MAIN APP COMPONENT ---

export default function App() {
  const [activeTab, setActiveTab] = useState('invoices')
  const [invoices, setInvoices] = useState(INITIAL_INVOICES)
  const [selectedInvoice, setSelectedInvoice] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  // State for Service & Period Management
  const [services, setServices] = useState(INITIAL_SERVICES)
  const [periods, setPeriods] = useState(INITIAL_PERIODS)

  // Apartments State
  const [apartments, setApartments] = useState(INITIAL_APARTMENTS)
  const [editingApartment, setEditingApartment] = useState(null)

  // Modal Visibility State
  const [showServiceModal, setShowServiceModal] = useState(false)
  const [showPeriodModal, setShowPeriodModal] = useState(false)

  // --- HANDLERS ---

  const handlePayInvoice = (invoice) => {
    const updatedInvoices = invoices.map((inv) =>
      inv.id === invoice.id
        ? { ...inv, status: 1, paid_at: new Date().toLocaleDateString('vi-VN') }
        : inv
    )
    setInvoices(updatedInvoices)
    if (selectedInvoice && selectedInvoice.id === invoice.id) {
      setSelectedInvoice({
        ...invoice,
        status: 1,
        paid_at: new Date().toLocaleDateString('vi-VN')
      })
    }
  }

  const handleAddService = (newService) => {
    setServices([...services, newService])
    setShowServiceModal(false)
  }

  const handleDeleteService = (id) => {
    if (confirm('Bạn có chắc chắn muốn xóa dịch vụ này?')) {
      setServices(services.filter((s) => s.id !== id))
    }
  }

  const handleAddPeriod = (newPeriod) => {
    setPeriods([newPeriod, ...periods])
    setShowPeriodModal(false)
  }

  const handleDeletePeriod = (id) => {
    setPeriods(periods.filter((p) => p.id !== id))
  }

  const handleSaveApartmentServices = (apartmentId, newRegistrations) => {
    const updatedApartments = apartments.map((apt) =>
      apt.id === apartmentId ? { ...apt, registrations: newRegistrations } : apt
    )
    setApartments(updatedApartments)
    setEditingApartment(null)
  }

  // Filter Logic
  const filteredInvoices = invoices.filter(
    (inv) =>
      inv.apartment.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.resident.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.id.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const stats = {
    total: filteredInvoices.reduce((sum, inv) => sum + inv.amount, 0),
    paid: filteredInvoices
      .filter((i) => i.status === 1)
      .reduce((sum, inv) => sum + inv.amount, 0),
    unpaid: filteredInvoices
      .filter((i) => i.status === 0)
      .reduce((sum, inv) => sum + inv.amount, 0),
    countUnpaid: filteredInvoices.filter((i) => i.status === 0).length
  }

  // --- TAB CONTENTS ---

  const renderInvoices = () => (
    <div className="animate-in fade-in space-y-6 duration-300">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <p className="mb-1 text-sm text-gray-500">Doanh thu dự kiến</p>
          <p className="text-2xl font-bold text-gray-900">
            {formatCurrency(stats.total)}
          </p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <p className="mb-1 text-sm text-gray-500">Thực thu</p>
          <p className="text-2xl font-bold text-green-600">
            {formatCurrency(stats.paid)}
          </p>
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
            <div
              className="h-full bg-green-500"
              style={{
                width: `${(stats.paid / stats.total) * 100 || 0}%`
              }}></div>
          </div>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <p className="mb-1 text-sm text-gray-500">Chưa thu</p>
          <p className="text-2xl font-bold text-yellow-600">
            {formatCurrency(stats.unpaid)}
          </p>
          <p className="mt-1 text-xs text-gray-400">
            {stats.countUnpaid} căn hộ
          </p>
        </div>
        <button
          onClick={() => setActiveTab('periods')}
          className="group flex cursor-pointer flex-col items-center justify-center rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-all hover:border-blue-200 hover:bg-blue-50">
          <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 transition-colors group-hover:bg-blue-200">
            <Plus className="h-5 w-5 text-blue-600" />
          </div>
          <span className="text-sm font-medium text-blue-600">
            Tạo đợt thu mới
          </span>
        </button>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col justify-between gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:flex-row">
        <div className="flex w-full gap-3 sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm căn hộ, tên, mã HĐ..."
              className="w-full rounded-lg border border-gray-200 py-2 pr-4 pl-9 text-sm transition-all focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900">
            <Filter className="h-4 w-4" />{' '}
            <span className="hidden sm:inline">Bộ lọc</span>
          </button>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-600 transition-colors hover:bg-gray-50">
            <Download className="h-4 w-4" /> Xuất Excel
          </button>
        </div>
      </div>

      {/* Data Table */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-gray-200 bg-gray-50 text-gray-500">
              <tr>
                <th className="px-6 py-4 font-medium whitespace-nowrap">
                  Mã HĐ
                </th>
                <th className="px-6 py-4 font-medium whitespace-nowrap">
                  Thông tin căn hộ
                </th>
                <th className="px-6 py-4 font-medium whitespace-nowrap">
                  Đợt thu
                </th>
                <th className="px-6 py-4 text-right font-medium whitespace-nowrap">
                  Tổng tiền
                </th>
                <th className="px-6 py-4 font-medium whitespace-nowrap">
                  Trạng thái
                </th>
                <th className="sticky right-0 bg-gray-50 px-6 py-4 text-right font-medium whitespace-nowrap">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredInvoices.map((invoice) => (
                <tr
                  key={invoice.id}
                  className="group transition-colors hover:bg-blue-50/30">
                  <td className="px-6 py-4 font-medium whitespace-nowrap text-blue-600">
                    #{invoice.id}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-xs font-bold text-gray-600">
                        {invoice.apartment.substring(0, 1)}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">
                          {invoice.apartment}
                        </div>
                        <div className="text-xs text-gray-500">
                          {invoice.resident}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5 text-gray-400" />
                      {invoice.period_name}
                    </div>
                    <div className="mt-0.5 text-xs text-gray-400">
                      Hạn: {invoice.deadline}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right font-bold whitespace-nowrap text-gray-900">
                    {formatCurrency(invoice.amount)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge status={invoice.status} />
                  </td>
                  <td className="sticky right-0 bg-white px-6 py-4 text-right whitespace-nowrap group-hover:bg-blue-50/30">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setSelectedInvoice(invoice)}
                        className="rounded-lg border border-transparent p-2 text-gray-400 shadow-sm transition-colors hover:border-gray-200 hover:bg-white hover:text-blue-600"
                        title="Xem chi tiết">
                        <Eye className="h-4 w-4" />
                      </button>
                      {invoice.status !== 1 && (
                        <button
                          onClick={() => handlePayInvoice(invoice)}
                          className="rounded-lg border border-green-200 bg-green-50 p-2 font-medium text-green-600 transition-colors hover:bg-green-100"
                          title="Xác nhận thanh toán">
                          <CheckCircle className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-gray-200 px-6 py-4 text-sm text-gray-500 sm:flex-row">
          <span>
            Hiển thị {filteredInvoices.length} trên {invoices.length} hóa đơn
          </span>
          <div className="flex gap-2">
            <button
              className="rounded-lg border border-gray-200 px-3 py-1.5 hover:bg-gray-50 disabled:opacity-50"
              disabled>
              Trước
            </button>
            <button className="rounded-lg border border-gray-200 px-3 py-1.5 hover:bg-gray-50">
              Sau
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  const renderServices = () => (
    <div className="animate-in fade-in space-y-6 duration-300">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-gray-800">Danh mục dịch vụ</h3>
        <button
          onClick={() => setShowServiceModal(true)}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-700">
          <Plus className="h-4 w-4" /> Thêm dịch vụ
        </button>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <div
            key={service.id}
            className="group relative rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
            <div className="absolute top-4 right-4 flex gap-2 opacity-0 transition-opacity group-hover:opacity-100">
              <button className="rounded-md p-1.5 text-gray-500 transition-colors hover:bg-gray-100 hover:text-blue-600">
                <Edit className="h-4 w-4" />
              </button>
              <button
                onClick={() => handleDeleteService(service.id)}
                className="rounded-md p-1.5 text-gray-500 transition-colors hover:bg-red-50 hover:text-red-600">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
            <div className="mb-4 flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-gray-100 bg-gray-50 shadow-sm">
                <ServiceIcon type={service.iconType} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">{service.name}</h3>
                <p className="mt-1 line-clamp-2 text-xs text-gray-500">
                  {service.description}
                </p>
              </div>
            </div>
            <div className="mt-2 flex items-end justify-between border-t border-gray-50 pt-4">
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase">
                  Đơn giá
                </p>
                <p className="text-lg font-bold text-gray-900">
                  {service.price.toLocaleString('vi-VN')}{' '}
                  <span className="text-sm font-normal text-gray-500">
                    / {service.unit}
                  </span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderPeriods = () => (
    <div className="animate-in fade-in space-y-6 duration-300">
      <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <div>
          <h3 className="text-lg font-bold text-gray-800">Đợt thu phí</h3>
          <p className="text-sm text-gray-500">
            Quản lý các kỳ chốt sổ và phát hành hóa đơn
          </p>
        </div>
        <button
          onClick={() => setShowPeriodModal(true)}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-700">
          <Plus className="h-4 w-4" /> Mở đợt thu mới
        </button>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-gray-200 bg-gray-50 text-gray-500">
            <tr>
              <th className="px-6 py-4 font-medium">Tên đợt</th>
              <th className="px-6 py-4 font-medium">Loại</th>
              <th className="px-6 py-4 font-medium">Thời gian</th>
              <th className="px-6 py-4 font-medium">Trạng thái</th>
              <th className="px-6 py-4 text-right font-medium">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {periods.map((period) => (
              <tr key={period.id} className="group hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900">
                  {period.name}
                </td>
                <td className="px-6 py-4 text-gray-500">
                  {period.type === 'monthly'
                    ? 'Hàng tháng'
                    : period.type === 'quarterly'
                      ? 'Hàng quý'
                      : 'Hàng năm'}
                </td>
                <td className="px-6 py-4 text-gray-600">
                  {period.start_date} - {period.end_date}
                </td>
                <td className="px-6 py-4">
                  {period.status === 1 ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-2.5 py-1 text-xs font-medium text-green-700">
                      <CheckCircle className="h-3 w-3" /> Đang mở
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600">
                      <Clock className="h-3 w-3" /> Đã khóa
                    </span>
                  )}
                </td>
                <td className="flex justify-end gap-2 px-6 py-4 text-right opacity-0 transition-opacity group-hover:opacity-100">
                  <button className="rounded-lg p-2 text-xs font-medium text-blue-600 hover:bg-blue-50">
                    Chi tiết
                  </button>
                  <button
                    onClick={() => handleDeletePeriod(period.id)}
                    className="rounded-lg p-2 text-xs font-medium text-red-600 hover:bg-red-50">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )

  const renderApartments = () => (
    <div className="animate-in fade-in space-y-6 duration-300">
      <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <div>
          <h3 className="text-lg font-bold text-gray-800">
            Cư dân & Đăng ký dịch vụ
          </h3>
          <p className="text-sm text-gray-500">
            Quản lý thông tin căn hộ và các dịch vụ đã đăng ký
          </p>
        </div>
        <button className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50">
          <Download className="h-4 w-4" /> Xuất danh sách
        </button>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-gray-200 bg-gray-50 text-gray-500">
            <tr>
              <th className="px-6 py-4 font-medium">Căn hộ</th>
              <th className="px-6 py-4 font-medium">Chủ hộ</th>
              <th className="px-6 py-4 font-medium">Diện tích</th>
              <th className="px-6 py-4 font-medium">Dịch vụ đang dùng</th>
              <th className="px-6 py-4 text-right font-medium">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {apartments.map((apt) => (
              <tr key={apt.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-bold text-gray-900">{apt.id}</td>
                <td className="px-6 py-4">
                  <div className="font-medium text-gray-900">{apt.owner}</div>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <User className="h-3 w-3" /> {apt.phone}
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-600">{apt.area} m²</td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-2">
                    {apt.registrations.map((reg, idx) => {
                      const service = services.find(
                        (s) => s.id === reg.serviceId
                      )
                      if (!service) return null
                      return (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1 rounded border border-blue-100 bg-blue-50 px-2 py-1 text-xs text-blue-700">
                          <ServiceIcon type={service.iconType} /> {service.name}
                          {(service.unit === 'xe/tháng' ||
                            service.unit === 'người') && (
                            <b className="ml-1">x{reg.quantity}</b>
                          )}
                        </span>
                      )
                    })}
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => setEditingApartment(apt)}
                    className="rounded-lg border border-transparent px-3 py-1.5 text-sm font-medium text-blue-600 transition-colors hover:border-blue-100 hover:bg-blue-50">
                    <Edit className="mr-1 inline h-4 w-4" /> Sửa dịch vụ
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50 pb-20 font-sans text-gray-900">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-30 border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-blue-600 p-2">
                <Home className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg leading-tight font-bold text-gray-900">
                  Luxury Residence
                </h1>
                <p className="text-xs text-gray-500">Ban quản trị</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden items-center gap-2 rounded-full bg-gray-100 px-3 py-1.5 sm:flex">
                <div className="h-2 w-2 animate-pulse rounded-full bg-green-500"></div>
                <span className="text-xs font-medium text-gray-600">
                  Hệ thống online
                </span>
              </div>
              <div className="h-8 w-8 overflow-hidden rounded-full border border-gray-300 bg-gray-200">
                <img
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=admin"
                  alt="Admin"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="no-scrollbar -mb-px flex space-x-1 overflow-x-auto pt-2">
            {[
              { id: 'invoices', label: 'Hóa đơn & Thu chi', icon: FileText },
              { id: 'apartments', label: 'Cư dân & Đăng ký', icon: Users },
              { id: 'services', label: 'Dịch vụ & Bảng giá', icon: Zap },
              { id: 'periods', label: 'Cấu hình Đợt thu', icon: Calendar }
            ].map((tab) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-medium whitespace-nowrap transition-all ${
                    isActive
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  } `}>
                  <Icon
                    className={`h-4 w-4 ${isActive ? 'text-blue-600' : 'text-gray-400'}`}
                  />
                  {tab.label}
                </button>
              )
            })}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {activeTab === 'invoices' && renderInvoices()}
        {activeTab === 'services' && renderServices()}
        {activeTab === 'periods' && renderPeriods()}
        {activeTab === 'apartments' && renderApartments()}
      </main>

      {/* Modals */}
      {selectedInvoice && (
        <InvoiceDetailModal
          invoice={selectedInvoice}
          onClose={() => setSelectedInvoice(null)}
          onPay={handlePayInvoice}
        />
      )}

      {showServiceModal && (
        <AddServiceModal
          onClose={() => setShowServiceModal(false)}
          onSave={handleAddService}
        />
      )}

      {showPeriodModal && (
        <AddPeriodModal
          onClose={() => setShowPeriodModal(false)}
          onSave={handleAddPeriod}
        />
      )}

      {editingApartment && (
        <ServiceRegistrationModal
          apartment={editingApartment}
          allServices={services}
          onClose={() => setEditingApartment(null)}
          onSave={handleSaveApartmentServices}
        />
      )}
    </div>
  )
}
