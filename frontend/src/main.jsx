import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter } from 'react-router'
import { RouterProvider } from 'react-router/dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './index.css'
import { Layout } from './pages/admin/layouts/Layout.jsx'
import { Dashboard } from './pages/admin/Dashboard.jsx'
import { Residents } from './pages/admin/Residents.jsx'
import { Apartments } from './pages/admin/Apartments.jsx'
import { Fees } from './pages/admin/Fees.jsx'
import { Facilities } from './pages/admin/Facilities.jsx'
import { Staffs } from './pages/admin/Staffs.jsx'
import { Notifications } from './pages/admin/Notifications.jsx'
import { LandingPage } from './pages/landing-page/layout/LandingPage.jsx'
import { AuthLayout } from './pages/auth/AuthLayout.jsx'
import { Login } from './pages/auth/Login.jsx'
import { Register } from './pages/auth/Register.jsx'
import { Toaster } from 'sonner'
import { ProtectedRoute } from './routes/ProtectedRoute.jsx'
import { UserLayout } from './pages/user/layout/Layout'
import UserDashboard from './pages/user/Dashboard'
import ProfileSection from './pages/user/Profile'
import Apartment from './pages/user/Apartment'
import Payment from './pages/user/Payment'
import Notification from './pages/user/Notification'
import Maintenance from './pages/user/Maintenance'

const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    element: <ProtectedRoute />, // chỉ bọc route cần bảo vệ
    children: [
      {
        path: '/admin',
        Component: Layout,
        children: [
          { index: true, Component: Dashboard },
          { path: 'residents', Component: Residents },
          { path: 'apartments', Component: Apartments },
          { path: 'fees', Component: Fees },
          { path: 'facilities', Component: Facilities },
          { path: 'staffs', Component: Staffs },
          { path: 'notifications', Component: Notifications }
        ]
      }
    ]
  },
  {
    element: <ProtectedRoute />, // chỉ bọc route cần bảo vệ
    children: [
      {
        path: '/user',
        Component: UserLayout,
        children: [
          { index: true, Component: UserDashboard },
          { path: 'profile', Component: ProfileSection },
          { path: 'apartment', Component: Apartment },
          { path: 'payment', Component: Payment },
          { path: 'notification', Component: Notification },
          { path: 'maintenance', Component: Maintenance }
        ]
      }
    ]
  },
  {
    path: '/',
    Component: LandingPage
    // children: [
    //   { index: true, Component: HomePage }
    // ]
  },
  {
    path: '/auth',
    Component: AuthLayout,
    children: [
      { path: 'login', Component: Login },
      { path: 'register', Component: Register }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster position="top-center" richColors />
    </QueryClientProvider>
  </StrictMode>
)
