import { useResidentStore } from '@/stores/useResidentStore'
import { useAuthStore } from '@/stores/useAuthStore'
import React from 'react'
import { useNavigate } from 'react-router'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Building2 } from 'lucide-react'

const Header = () => {
  const navigate = useNavigate()
  const { resident, clearResident } = useResidentStore()
  const { logout } = useAuthStore()

  const fullName = resident?.fullName ?? ''
  const apartmentCode = resident?.apartments?.[0]?.apartmentCode ?? ''

  const handleLogout = () => {
    logout()
    clearResident()
    navigate('/auth/login')
  }

  const baseURL =
    import.meta.env.VITE_BASE_URL_BACKEND || 'http://localhost:8000'

  return (
    <header className="z-index-10000 fixed top-0 w-full bg-white text-black shadow-sm">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        {/* Left */}
        <div className="flex items-center space-x-4">
          <button id="menuToggle" className="md:hidden">
            <i className="fas fa-bars text-xl"></i>
          </button>

          <div className="flex items-center space-x-3">
            <Building2 />
            <div>
              <h1 className="text-lg font-semibold">Luxury Residence</h1>
              <p className="text-sm opacity-80">Cổng thông tin cư dân</p>
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center space-x-4">
          <div className="hidden items-center space-x-2 md:flex">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={`${baseURL}/images/avatar/${resident?.avatar_url}`}
                    alt="Avatar"
                  />
                  <AvatarFallback>
                    <i className="fas fa-user text-black"></i>
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                sideOffset={10}
                align="start"
                className="w-40">
                <DropdownMenuItem onClick={handleLogout}>
                  Đăng xuất
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <div>
              <p className="text-sm font-medium">{fullName}</p>
              <p className="text-xs opacity-75">Căn hộ {apartmentCode}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
