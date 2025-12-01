import { Outlet } from 'react-router'
import Header from './Header'
import Sidebar from './Sidebar'
import { useResidentStore } from '@/stores/useResidentStore'
import { fetchResidentInfoApi } from '@/services/user.api.js'
import { useEffect } from 'react'

export const UserLayout = () => {
  const { resident, setResident } = useResidentStore()

  useEffect(() => {
    const fetchResident = async () => {
      try {
        const res = await fetchResidentInfoApi()
        if (res.error) throw new Error('Không thể lấy dữ liệu cư dân')
        setResident(res.data.user)
      } catch (error) {
        console.error(error)
      }
    }

    // Chỉ fetch khi chưa có dữ liệu
    if (!resident) {
      fetchResident()
    }
  }, [resident, setResident])

  return (
    <div className="bg-gray-50 font-sans">
      <Header />
      <div className="flex min-h-screen">
        <Sidebar />
        <main className="flex-1 p-6 md:ml-0">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
