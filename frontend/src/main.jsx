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
import { Invoices } from './pages/admin/fees/Invoices.jsx'
import { Services } from './pages/admin/fees/Services.jsx'
import { Registrations } from './pages/admin/fees/Registrations.jsx'
import { AdminMaintenance } from './pages/admin/Maintenance.jsx'
import { Accounts } from './pages/admin/Accounts.jsx'
import { Notifications } from './pages/admin/Notifications.jsx'
import { LandingPage } from './pages/landing-page/layout/LandingPage.jsx'
import { Login } from './pages/auth/Login.jsx'
import { Toaster } from 'sonner'
import { ProtectedRoute } from './routes/ProtectedRoute.jsx'
import { UserLayout } from './pages/user/layout/Layout'
import UserDashboard from './pages/user/Dashboard'
import ProfileSection from './pages/user/Profile'
import Payment from './pages/user/Payment'
import Notification from './pages/user/Notification'
import Maintenance from './pages/user/Maintenance'
import { Profile } from './pages/admin/Profile'
import PaymentResult from './pages/user/PaymentResult'
import ForgotPassword from './pages/auth/ForgotPassword'
import ResetPassword from './pages/auth/ResetPassword'

const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    element: (
      <ProtectedRoute
        allowedRoles={['Admin', 'Manager', 'Accountant', 'Technician']}
      />
    ),
    children: [
      {
        path: '/admin',
        Component: Layout,
        children: [
          { index: true, Component: Dashboard },
          { path: 'residents', Component: Residents },
          { path: 'apartments', Component: Apartments },
          {
            path: 'fees',
            children: [
              { path: 'invoices', Component: Invoices },
              { path: 'services', Component: Services },
              { path: 'registrations', Component: Registrations }
            ]
          },
          { path: 'maintenance', Component: AdminMaintenance },
          { path: 'accounts', Component: Accounts },
          { path: 'notifications', Component: Notifications },
          { path: 'profile', Component: Profile }
        ]
      }
    ]
  },
  {
    element: <ProtectedRoute allowedRoles={['Resident']} />,
    children: [
      {
        path: '/user',
        Component: UserLayout,
        children: [
          { index: true, Component: UserDashboard },
          { path: 'profile', Component: ProfileSection },
          { path: 'payment', Component: Payment },
          { path: 'payment/result', Component: PaymentResult },
          { path: 'notification', Component: Notification },
          { path: 'maintenance', Component: Maintenance }
        ]
      }
    ]
  },
  {
    path: '/',
    Component: LandingPage
  },
  {
    path: '/auth/login',
    Component: Login
  },
  {
    path: '/forgot-password',
    Component: ForgotPassword
  },
  {
    path: '/reset-password',
    Component: ResetPassword
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
