import { Outlet } from 'react-router'
import Header from './Header'
import AppSidebar from './AppSidebar'
import { useResidentStore } from '@/stores/useResidentStore'
import { fetchResidentInfoApi } from '@/services/user.api.js'
import { useEffect } from 'react'
import { SidebarProvider, useSidebar } from '@/components/ui/sidebar'

export const UserLayout = () => {
  const { setResident } = useResidentStore()

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
    fetchResident()
  }, [])

  return (
    <SidebarProvider>
      <UserLayoutContent />
    </SidebarProvider>
  )
}

const UserLayoutContent = () => {
  const { state } = useSidebar()

  return (
    <div className="min-h-screen w-full bg-gray-50">
      <Header />
      <div className="mt-20 flex transition-all duration-300">
        <AppSidebar />
        <main
          className={`flex-10 p-6 transition-all duration-300 md:ml-0 ${
            state === 'collapsed' ? 'ml-16' : 'ml-0'
          }`}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
