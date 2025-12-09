import * as React from 'react'
import { Link, useLocation } from 'react-router'
import {
  ChevronRight,
  LayoutDashboard,
  Users,
  Building,
  CreditCard,
  Wrench,
  UserCog,
  Bell,
  Receipt,
  Layers,
  ClipboardList
} from 'lucide-react'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@/components/ui/collapsible'
import {
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail
} from '@/components/ui/sidebar'
import { useAuthStore } from '@/stores/useAuthStore'

const ROLES = {
  ADMIN: 1,
  MANAGER: 3,
  ACCOUNTANT: 4,
  TECHNICIAN: 5
}

export const Sidebar = () => {
  const location = useLocation()
  const { user } = useAuthStore()
  const isActive = (path) => location.pathname === path

  const userRoleId = user?.role_id || 0

  const menuData = [
    {
      title: 'Tổng quan',
      items: [
        {
          title: 'Trang chủ',
          url: '/admin',
          icon: <LayoutDashboard className="h-4 w-4" />,
          isActive: isActive('/admin')
        }
      ]
    },
    {
      title: 'Quản lý',
      items: [
        {
          title: 'Cư dân',
          url: '/admin/residents',
          icon: <Users className="h-4 w-4" />,
          isActive: isActive('/admin/residents'),
          allowedRoles: [ROLES.ADMIN, ROLES.MANAGER]
        },
        {
          title: 'Căn hộ',
          url: '/admin/apartments',
          icon: <Building className="h-4 w-4" />,
          isActive: isActive('/admin/apartments'),
          allowedRoles: [ROLES.ADMIN, ROLES.MANAGER]
        },
        {
          title: 'Phí & Thu chi',
          url: '/admin/fees',
          icon: <CreditCard className="h-4 w-4" />,
          isActive: isActive('/admin/fees'),
          allowedRoles: [ROLES.ADMIN, ROLES.ACCOUNTANT],
          items: [
            {
              title: 'Hóa đơn',
              url: '/admin/fees/invoices',
              icon: <Receipt className="h-4 w-4" />,
              isActive: isActive('/admin/fees/invoices')
            },
            {
              title: 'Dịch vụ & đợt thu',
              url: '/admin/fees/services',
              icon: <Layers className="h-4 w-4" />,
              isActive: isActive('/admin/fees/services')
            },
            {
              title: 'Đăng ký dịch vụ',
              url: '/admin/fees/registrations',
              icon: <ClipboardList className="h-4 w-4" />,
              isActive: isActive('/admin/fees/registrations')
            }
          ]
        },
        {
          title: 'Phản ánh',
          url: '/admin/maintenance',
          icon: <Wrench className="h-4 w-4" />,
          isActive: isActive('/admin/maintenance'),
          allowedRoles: [ROLES.ADMIN, ROLES.MANAGER, ROLES.TECHNICIAN]
        },
        {
          title: 'Tài khoản',
          url: '/admin/accounts',
          icon: <UserCog className="h-4 w-4" />,
          isActive: isActive('/admin/accounts'),
          allowedRoles: [ROLES.ADMIN]
        },
        {
          title: 'Thông báo',
          url: '/admin/notifications',
          icon: <Bell className="h-4 w-4" />,
          isActive: isActive('/admin/notifications')
        }
      ]
    }
  ]

  // Filter menu items based on role
  const filteredMenuData = menuData
    .map((group) => ({
      ...group,
      items: group.items.filter(
        (item) => !item.allowedRoles || item.allowedRoles.includes(userRoleId)
      )
    }))
    .filter((group) => group.items.length > 0)

  return (
    <ShadcnSidebar className="fixed top-20">
      <SidebarHeader />
      <SidebarContent>
        {filteredMenuData.map((group) => (
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
                        {item.items ? (
                          <>
                            <SidebarMenuButton
                              asChild
                              isActive={item.isActive}
                              className="flex items-center gap-2">
                              {/* {item.icon}
                              <span>{item.title}</span> */}
                              <Link to={item.url}>
                                {item.icon}
                                <span>{item.title}</span>
                              </Link>
                            </SidebarMenuButton>
                            <SidebarMenuSub>
                              {item.items.map((subItem) => (
                                <SidebarMenuSubItem key={subItem.title}>
                                  <SidebarMenuSubButton
                                    asChild
                                    isActive={subItem.isActive}>
                                    <Link to={subItem.url}>
                                      {subItem.icon}
                                      <span>{subItem.title}</span>
                                    </Link>
                                  </SidebarMenuSubButton>
                                </SidebarMenuSubItem>
                              ))}
                            </SidebarMenuSub>
                          </>
                        ) : (
                          <SidebarMenuButton
                            asChild
                            isActive={item.isActive}
                            className="flex items-center gap-2">
                            <Link to={item.url}>
                              {item.icon}
                              <span>{item.title}</span>
                            </Link>
                          </SidebarMenuButton>
                        )}
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
    </ShadcnSidebar>
  )
}
