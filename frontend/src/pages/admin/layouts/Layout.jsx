import { Outlet } from 'react-router'
import { Header } from './Header'
import { Sidebar } from './Sidebar'

export const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Sidebar />
      <main className="ml-64 overflow-y-auto p-6">
        <Outlet />
      </main>
    </div>
  )
}
