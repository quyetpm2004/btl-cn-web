import { fetchResidentInfoApi } from '@/services/api'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useResidentStore = create(
  persist(
    (set) => ({
      resident: null,
      setResident: (data) => set({ resident: data }),
      clearResident: () => {
        set({ resident: null })
        localStorage.removeItem('resident-storage')
      },
      refreshResident: async () => {
        try {
          const res = await fetchResidentInfoApi()
          if (!res.error) set({ resident: res.data.user })
        } catch (err) {
          console.error('Không thể làm mới thông tin cư dân:', err)
        }
      }
    }),
    {
      name: 'resident-storage' // <--- tên key trong localStorage
    }
  )
)
