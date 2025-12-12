import { getAccountStatsApi } from '@/services/stat.api.js'
import {
  keepPreviousData,
  useQuery,
  useMutation,
  useQueryClient
} from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { PaginationControls } from '@/components/pagination-controls.jsx'
import { usePagination } from '@/hooks/use-pagination'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select.jsx'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { useState, useMemo, useEffect } from 'react'
import { getAllAccountsApi, deleteAccountApi } from '@/services/account.api'
import { AccountDialog } from '@/components/accounts/accounts-dialog'
import { toast } from 'sonner'
import { ConfirmDialog } from '@/components/confirm-dialog'
import { useAuthStore } from '@/stores/useAuthStore'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { Edit, Eye, Lock } from 'lucide-react'

const roles = {
  1: 'Quản trị viên',
  2: 'Cư dân',
  3: 'Quản lý',
  4: 'Kế toán',
  5: 'Kỹ thuật viên'
}

const StatsCard = ({ role, value, icon, color }) => (
  <div className="rounded-xl bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-xl">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500">{roles[role]}</p>
        <p className={`text-2xl font-bold ${color}`}>{value}</p>
      </div>
      <i className={`fas fa-${icon} text-2xl ${color}`}></i>
    </div>
  </div>
)

export const Accounts = () => {
  const user = useAuthStore()
  const queryClient = useQueryClient()
  const [searchQuery, setSearchQuery] = useState('')
  const [query, setQuery] = useState('')
  const [roleFilter, setRoleFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')

  const [dialogOpen, setDialogOpen] = useState(false)
  const [dialogMode, setDialogMode] = useState('create')
  const [selectedAccount, setSelectedAccount] = useState(null)
  const [deleteDialog, setDeleteDialog] = useState({
    open: false,
    account: null
  })

  const pagination = usePagination(1, 10)

  const filters = useMemo(
    () => ({
      page: pagination.page,
      limit: pagination.limit,
      query: query,
      role_id: roleFilter,
      status: statusFilter
    }),
    [pagination.page, pagination.limit, query, roleFilter, statusFilter]
  )

  const {
    data: accountStatsData,
    isLoading,
    isError
  } = useQuery({
    queryKey: ['dashboardStats'],
    queryFn: () => getAccountStatsApi(),
    placeholderData: keepPreviousData
  })

  const accountStats = accountStatsData?.accountStats || {}

  const { data: accountsData, isLoading: isAccountsLoading } = useQuery({
    queryKey: ['accounts', filters],
    queryFn: () => getAllAccountsApi(filters),
    placeholderData: keepPreviousData
  })

  const accounts = accountsData?.items || []

  // Sync total items for pagination
  useEffect(() => {
    if (accountsData?.total) {
      pagination.setTotal(accountsData.total)
    }
  }, [accountsData?.total, pagination])

  const deleteMutation = useMutation({
    mutationFn: deleteAccountApi,
    onSuccess: () => {
      toast.success('Khóa tài khoản thành công')
      queryClient.invalidateQueries(['accounts'])
      setDeleteDialog({ open: false, account: null })
    },
    onError: () => {
      toast.error('Lỗi khi khóa tài khoản')
    }
  })

  const handleSearch = () => {
    setQuery(searchQuery)
    pagination.setPage(1)
  }

  const handleReset = () => {
    setSearchQuery('')
    setQuery('')
    setRoleFilter('')
    setStatusFilter('')
    pagination.setPage(1)
  }

  const handleFilterChange = (filterKey) => (e) => {
    const value = e.target.value
    pagination.setPage(1)

    switch (filterKey) {
      case 'role_id':
        setRoleFilter(value)
        break
      case 'status':
        setStatusFilter(value)
        break
      default:
        break
    }
  }

  const handleOpenDialog = (account, mode) => {
    setSelectedAccount(account)
    setDialogMode(mode)
    setDialogOpen(true)
  }

  const handleDeleteAccount = (account) => {
    setDeleteDialog({ open: true, account })
  }

  if (isLoading) return <div>Đang tải...</div>
  if (isError) return <div>Lỗi tải dữ liệu</div>

  return (
    <>
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="mb-2 text-2xl font-bold text-gray-800">
            Quản lý Tài khoản
          </h2>
          <p className="text-gray-600">Quản lý tài khoản và phân quyền</p>
        </div>
        <Button onClick={() => handleOpenDialog(null, 'create')} variant="blue">
          <i className="fas fa-plus"></i>
          Tạo tài khoản
        </Button>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-4">
        <StatsCard
          role="1"
          value={accountStats?.adminCount ?? '-'}
          icon="user-shield"
          color="text-blue-500"
        />
        <StatsCard
          role="3"
          value={accountStats?.managerCount ?? '-'}
          icon="user-tie"
          color="text-green-500"
        />
        <StatsCard
          role="4"
          value={accountStats?.accountantCount ?? '-'}
          icon="calculator"
          color="text-purple-500"
        />
        <StatsCard
          role="5"
          value={accountStats?.technicianCount ?? '-'}
          icon="user-gear"
          color="text-orange-500"
        />
      </div>

      <div className="mb-6 rounded-xl bg-white p-4 shadow-sm">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-10">
          <div className="relative md:col-span-3">
            <Input
              name="search"
              type="text"
              placeholder="Tìm kiếm tài khoản..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            <Button
              variant="icon"
              onClick={handleSearch}
              size="icon"
              className="absolute right-0.5 cursor-pointer text-gray-500 hover:text-blue-500">
              <i className="fas fa-search"></i>
            </Button>
          </div>

          <div className="md:col-span-2 md:col-start-6">
            <Select
              value={roleFilter || '-1'}
              onValueChange={(value) =>
                handleFilterChange('role_id')({
                  target: { value: value === '-1' ? '' : value }
                })
              }>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Tất cả vai trò" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="-1">Tất cả vai trò</SelectItem>
                <SelectItem value="1">Quản trị viên</SelectItem>
                <SelectItem value="2">Cư dân</SelectItem>
                <SelectItem value="3">Quản lý</SelectItem>
                <SelectItem value="4">Kế toán</SelectItem>
                <SelectItem value="5">Kỹ thuật viên</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="md:col-span-2 md:col-start-8">
            <Select
              value={statusFilter || '-1'}
              onValueChange={(value) =>
                handleFilterChange('status')({
                  target: { value: value === '-1' ? '' : value }
                })
              }>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Tất cả trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="-1">Tất cả trạng thái</SelectItem>
                <SelectItem value="1">Hoạt động</SelectItem>
                <SelectItem value="0">Bị khóa</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button onClick={handleReset} variant="outline">
            Đặt lại
          </Button>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow className="hover:bg-transparent">
              <TableHead className="py-4 pl-6 font-medium text-gray-500 lg:min-w-42">
                Người dùng
              </TableHead>
              <TableHead className="py-4 font-medium text-gray-500 lg:min-w-30">
                Vai trò
              </TableHead>
              <TableHead className="py-4 font-medium text-gray-500">
                Số điện thoại
              </TableHead>
              <TableHead className="py-4 font-medium text-gray-500">
                Trạng thái
              </TableHead>
              <TableHead className="py-4 pr-6 text-right font-medium text-gray-500">
                Thao tác
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isAccountsLoading && (!accounts || accounts.length === 0) && (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-gray-500">
                  Đang tải danh sách...
                </TableCell>
              </TableRow>
            )}

            {!isAccountsLoading && (!accounts || accounts.length === 0) && (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-gray-500">
                  Không có dữ liệu
                </TableCell>
              </TableRow>
            )}

            {accounts.map((account) => (
              <TableRow key={account?.id} className="group h-14">
                <TableCell className="pl-6">
                  <div className="flex items-center">
                    <div className="flex size-9 items-center justify-center rounded-full bg-blue-500">
                      <i className="fas fa-user text-white"></i>
                    </div>
                    <div className="ml-4">
                      <div className="font-medium">
                        {account?.resident?.full_name ||
                          account?.staff?.full_name ||
                          '—'}
                      </div>
                      <div className="text-xs text-gray-500">
                        {account?.username || '—'}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  {account?.role_id ? roles[account.role_id] : '—'}
                </TableCell>
                <TableCell>
                  {account?.resident?.phone || account?.staff?.phone || '—'}
                </TableCell>
                <TableCell className="w-44">
                  <span
                    className={`rounded-full px-2 py-1 text-xs font-semibold ${account?.status ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {account?.status ? 'Hoạt động' : 'Bị khóa'}
                  </span>
                </TableCell>
                <TableCell className="w-40 space-x-2 pr-6 text-right opacity-0 transition-opacity group-hover:opacity-100">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="icon"
                          size="icon-sm"
                          onClick={() => handleOpenDialog(account, 'view')}
                          className="text-gray-600 hover:bg-gray-100">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Xem chi tiết</p>
                      </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="icon"
                          size="icon-sm"
                          onClick={() => handleOpenDialog(account, 'edit')}
                          className="text-blue-600 hover:bg-blue-50">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Chỉnh sửa</p>
                      </TooltipContent>
                    </Tooltip>

                    {account.id === user.user.id ? null : (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="icon"
                            size="icon-sm"
                            onClick={() => handleDeleteAccount(account)}
                            className="text-red-600 hover:bg-red-50">
                            <Lock className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Khóa tài khoản</p>
                        </TooltipContent>
                      </Tooltip>
                    )}
                  </TooltipProvider>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <PaginationControls pagination={pagination} />
      </div>

      <AccountDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        account={selectedAccount}
        mode={dialogMode}
      />

      <ConfirmDialog
        open={deleteDialog.open}
        onOpenChange={(open) => setDeleteDialog({ ...deleteDialog, open })}
        title="Xác nhận khóa tài khoản"
        description={`Bạn có chắc chắn muốn khóa tài khoản ${deleteDialog.account?.username}?`}
        onConfirm={() => deleteMutation.mutate(deleteDialog.account.id)}
        isLoading={deleteMutation.isPending}
      />
    </>
  )
}
