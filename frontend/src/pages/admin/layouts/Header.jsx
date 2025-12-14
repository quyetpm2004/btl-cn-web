import { Link, useNavigate } from 'react-router'
import { useAuthStore } from '@/stores/useAuthStore'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Building2 } from 'lucide-react'
import { useSidebar } from '@/components/ui/sidebar'

export const Header = () => {
  const navigate = useNavigate()
  const { logout, user } = useAuthStore()
  const { setOpenMobile } = useSidebar()

  const handleLogout = async () => {
    logout()
    navigate('/auth/login')
  }

  const baseURL =
    import.meta.env.VITE_BASE_URL_BACKEND || 'http://localhost:8000'

  return (
    <header className="fixed top-0 z-20 w-full bg-white text-black shadow-sm">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        {/* Left */}
        <div className="flex items-center space-x-4">
          <button
            id="menuToggle"
            className="md:hidden"
            onClick={() => setOpenMobile(true)}>
            <i className="fas fa-bars text-xl"></i>
          </button>

          <Link to="/admin" className="flex items-center space-x-3">
            <Building2 />
            <div>
              <h1 className="text-lg font-semibold">Luxury Residence</h1>
              <p className="text-sm opacity-80">Trang quản trị</p>
            </div>
          </Link>
        </div>

        {/* Right */}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex cursor-pointer items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src={`${baseURL}/images/avatar/${user?.avatar_url}`}
                  alt="Avatar"
                />
                <AvatarFallback>
                  <i className="fas fa-user text-black"></i>
                </AvatarFallback>
              </Avatar>

              <div className="hidden flex-col md:flex">
                <p className="text-sm leading-none font-medium">
                  {user?.display_name}
                </p>
                <p className="mt-2 text-xs leading-none opacity-75">
                  {user?.role_name}
                </p>
              </div>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent sideOffset={10} align="center">
            <DropdownMenuItem onClick={() => navigate('/admin/profile')}>
              Hồ sơ cá nhân
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogout}>
              Đăng xuất
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
