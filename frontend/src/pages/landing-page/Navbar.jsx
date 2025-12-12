import { useState } from 'react'
import { Link } from 'react-router'

const navItems = {
  'Giới thiệu': 'gioi-thieu',
  'Căn hộ': 'can-ho',
  'Bảng giá': 'bang-gia',
  'Tiện ích': 'tien-ich',
  'Tin tức': 'tin-tuc',
  'Liên hệ': 'lien-he',
  'Đăng nhập': 'auth/login'
}

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const toggleMenu = () => setIsOpen(!isOpen)

  return (
    <nav className="fixed top-0 z-50 w-full bg-white shadow-lg">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="text-2xl font-bold text-gray-800">
            <a href="/">
              <span className="text-purple-600">Luxury</span>
              Residence
            </a>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex space-x-8">
              {Object.keys(navItems).map((item, i) => (
                <a
                  key={i}
                  href={
                    navItems[item] === 'auth/login'
                      ? navItems[item]
                      : '#' + navItems[item]
                  }
                  className="nav-link px-3 py-2 text-sm font-medium text-gray-700 hover:text-purple-600">
                  {item}
                </a>
              ))}
            </div>
          </div>
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-purple-600">
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="border-t bg-white md:hidden">
          <div className="space-y-1 px-2 pt-2 pb-3">
            {Object.keys(navItems).map((item, i) => (
              <a
                key={i}
                href={'#' + navItems[item]}
                className="block px-3 py-2 text-gray-700 hover:text-purple-600">
                {item}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
