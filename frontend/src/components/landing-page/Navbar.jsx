import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-white shadow-lg fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="text-2xl font-bold text-gray-800">
            <span className="text-purple-600">Luxury</span> Residence
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex space-x-8">
              {["Giới thiệu", "Căn hộ", "Bảng giá", "Tiện ích", "Tin tức", "Liên hệ"].map((item, i) => (
                <a
                  key={i}
                  href={"#" + item.toLowerCase().replaceAll(" ", "-")}
                  className="nav-link text-gray-700 hover:text-purple-600 px-3 py-2 text-sm font-medium"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-gray-700 hover:text-purple-600">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {["Giới thiệu", "Căn hộ", "Bảng giá", "Tiện ích", "Tin tức", "Liên hệ"].map((item, i) => (
              <a
                key={i}
                href={"#" + item.toLowerCase().replaceAll(" ", "-")}
                className="block px-3 py-2 text-gray-700 hover:text-purple-600"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
