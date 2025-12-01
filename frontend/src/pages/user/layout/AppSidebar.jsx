import * as React from 'react'
import { Link, useLocation } from 'react-router'
import {
  ChevronRight,
  Home,
  User,
  Building,
  CreditCard,
  Bell,
  ToolCase
} from 'lucide-react'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@/components/ui/collapsible'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail
} from '@/components/ui/sidebar'

const AppSidebar = () => {
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  const menuData = [
    {
      title: 'Tổng quan',
      items: [
        {
          title: 'Trang chủ',
          url: '/user',
          icon: <Home className="h-4 w-4" />,
          isActive: isActive('/user')
        }
      ]
    },
    {
      title: 'Thông tin cá nhân',
      items: [
        {
          title: 'Hồ sơ cá nhân',
          url: '/user/profile',
          icon: <User className="h-4 w-4" />,
          isActive: isActive('/user/profile')
        },
        {
          title: 'Thông tin căn hộ',
          url: '/user/apartment',
          icon: <Building className="h-4 w-4" />,
          isActive: isActive('/user/apartment')
        }
      ]
    },
    {
      title: 'Dịch vụ',
      items: [
        {
          title: 'Thanh toán',
          url: '/user/payment',
          icon: <CreditCard className="h-4 w-4" />,
          isActive: isActive('/user/payment')
        },
        {
          title: 'Thông báo',
          url: '/user/notification',
          icon: <Bell className="h-4 w-4" />,
          isActive: isActive('/user/notification')
        },
        {
          title: 'Phản ánh',
          url: '/user/maintenance',
          icon: <ToolCase className="h-4 w-4" />,
          isActive: isActive('/user/maintenance')
        }
      ]
    }
  ]

  return (
    <Sidebar className="fixed top-20">
      <SidebarHeader />
      <SidebarContent>
        {menuData.map((group) => (
          <Collapsible
            key={group.title}
            defaultOpen
            className="group/collapsible">
            <SidebarGroup>
              <SidebarGroupLabel
                asChild
                className="group/label text-sm text-black hover:bg-gray-100 hover:text-black">
                <CollapsibleTrigger>
                  {group.title}
                  <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {group.items.map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton
                          asChild
                          isActive={item.isActive}
                          className="flex items-center gap-2">
                          <Link to={item.url}>
                            {item.icon}
                            <span>{item.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}

export default AppSidebar
