import { Outlet } from 'react-router'
import { Header } from './Header'
import { Sidebar } from './Sidebar'
import { SidebarProvider, useSidebar } from '@/components/ui/sidebar'

export const Layout = () => {
  return (
    <SidebarProvider>
      <AdminLayoutContent />
    </SidebarProvider>
  )
}

const AdminLayoutContent = () => {
  const { state } = useSidebar()

  return (
    <div className="min-h-screen w-full bg-gray-50">
      <Header />
      <div className="mt-20 flex transition-all duration-300">
        <Sidebar />
        <main
          className={`flex-10 overflow-hidden p-6 transition-all duration-300 ${
            state === 'collapsed' ? 'ml-16' : 'ml-0'
          }`}>
          <Outlet className="animate-in fade-in space-y-6 duration-300" />
        </main>
      </div>
    </div>
  )
}
