export const Header = () => {
  return (
    <header className="fixed top-0 z-50 w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg">
      <div className="mx-auto px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-x-4">
            <div className="flex items-center gap-x-3">
              <i className="fas fa-building text-2xl"></i>
              <h1 className="text-xl font-bold">Vinhomes Central Park</h1>
            </div>
          </div>

          <div className="flex items-center gap-x-4">
            <div className="hidden items-center gap-x-2 md:flex">
              <i className="fas fa-user-circle text-xl"></i>
              <span>Nguyễn Văn An</span>
            </div>
            <button className="rounded-lg bg-white/20 px-4 py-2 transition-all hover:bg-white/30">
              <i className="fas fa-sign-out-alt mr-2"></i>Đăng xuất
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
