import { useResidentStore } from '@/stores/useResidentStore'
import React from 'react'

const Header = () => {
  const { resident } = useResidentStore()
  const { fullName, apartments } = resident
  const { apartmentCode } = apartments[0]

  return (
    <header className="gradient-bg text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Left section */}
          <div className="flex items-center space-x-4">
            <button id="menuToggle" className="text-white md:hidden">
              <i className="fas fa-bars text-xl"></i>
            </button>

            <div className="flex items-center space-x-3">
              <i className="fas fa-building text-2xl"></i>
              <div>
                <h1 className="text-xl font-bold">Vinhomes Central Park</h1>
                <p className="text-sm opacity-90">Cổng thông tin cư dân</p>
              </div>
            </div>
          </div>

          {/* Right section */}
          <div className="flex items-center space-x-4">
            <div className="hidden items-center space-x-2 md:flex">
              <div className="bg-opacity-20 flex h-8 w-8 items-center justify-center rounded-full bg-white">
                <i className="fas fa-user text-sm"></i>
              </div>
              <div>
                <p className="text-sm font-medium">{fullName}</p>
                <p className="text-xs opacity-75">
                  Căn hộ {`${apartmentCode}`}
                </p>
              </div>
            </div>

            <button className="relative">
              <i className="fas fa-bell text-xl"></i>
              <span className="notification-badge absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs">
                3
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
