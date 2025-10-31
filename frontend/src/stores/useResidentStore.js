import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useResidentStore = create(
  persist((set) => ({
    resident: null,
    setResident: (data) => set({ resident: data }),
    clearResident: () => set({ resident: null })
  }))
)
