import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { toast } from 'sonner'
import { loginApi, registerApi } from '../services/api'

export const useAuthStore = create(
  persist(
    (set) => ({
      accessToken: null,
      isAuthenticated: false,
      user: null,
      loading: false,

      // 🔹 Đăng ký
      register: async (
        username,
        password,
        full_name,
        email,
        phone,
        apartment_code
      ) => {
        try {
          set({ loading: true })
          console.log('Registering user:', {
            username,
            password,
            full_name,
            email,
            phone,
            apartment_code
          })
          await registerApi(
            username,
            password,
            full_name,
            email,
            phone,
            apartment_code
          )
          toast.success('Registration successful! Please log in.')
        } catch (error) {
          console.error('Registration error:', error)
          toast.error('Registration failed. Please try again.')
        } finally {
          set({ loading: false })
        }
      },

      // 🔹 Đăng nhập
      login: async (username, password) => {
        try {
          set({ loading: true })
          const res = await loginApi(username, password)

          console.log('Login response:', res.data)
          set({
            accessToken: res.data.token,
            isAuthenticated: true,
            user: res.data.user
          })

          toast.success('Đăng nhập thành công!')
        } catch (error) {
          console.error('Login error:', error)
          toast.error('Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.')
        } finally {
          set({ loading: false })
        }
      },

      // 🔹 Đăng xuất
      logout: () => {
        set({
          accessToken: null,
          isAuthenticated: false,
          user: null
        })
        localStorage.removeItem('auth_storage')
        toast.success('Đăng xuất thành công.')
      },

      setUser: (user) => set({ user })
    }),

    {
      name: 'auth_storage',
      partialize: (state) => ({
        accessToken: state.accessToken,
        isAuthenticated: state.isAuthenticated,
        user: state.user
      })
    }
  )
)
