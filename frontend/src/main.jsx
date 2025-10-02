import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter } from 'react-router'
import { RouterProvider } from 'react-router/dom'
import './index.css'
import { Layout } from './components/admin/layouts/Layout.jsx'
import { Dashboard } from './components/admin/Dashboard.jsx'
import { Residents } from './components/admin/Residents.jsx'
import { Apartments } from './components/admin/Apartments.jsx'
import { Fees } from './components/admin/Fees.jsx'
import { Facilities } from './components/admin/Facilities.jsx'
import { Staffs } from './components/admin/Staffs.jsx'
import { Notifications } from './components/admin/Notifications.jsx'

const router = createBrowserRouter([
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
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
