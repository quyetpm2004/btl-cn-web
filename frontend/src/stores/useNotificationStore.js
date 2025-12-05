import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { getNotification, markNotification } from '@/services/api'

export const useNotificationStore = create(
  persist(
    (set) => ({
      notifications: [],
      unreadCount: 0,
      loading: false,

      fetchNotifications: async (residentId, filter = 'all') => {
        set({ loading: true })
        try {
          const res = await getNotification(residentId, filter)

          const list = res.data.notification || []

          set({
            notifications: list,
            unreadCount: list.filter((n) => !n.is_read).length,
            loading: false
          })
        } catch (err) {
          console.error('Fetch notifications error:', err)
          set({ loading: false })
        }
      },

      markAsRead: async (notificationReceiverId, isRead) => {
        try {
          await markNotification(notificationReceiverId, isRead)

          set((state) => {
            const updated = state.notifications.map((n) =>
              n.id === notificationReceiverId ? { ...n, is_read: isRead } : n
            )

            return {
              notifications: updated,
              unreadCount: updated.filter((n) => !n.is_read).length
            }
          })
        } catch (err) {
          console.error('Mark read error:', err)
        }
      }
    }),
    {
      name: 'notification-store', // key lưu trong localStorage
      partialize: (state) => ({
        unreadCount: state.unreadCount,
        notifications: state.notifications
      })
    }
  )
)
