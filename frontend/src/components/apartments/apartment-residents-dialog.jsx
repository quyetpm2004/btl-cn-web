import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import {
  getApartmentDetailApi,
  addResidentToApartmentApi,
  removeResidentFromApartmentApi
} from '@/services/apartment.api'
import { createResidentApi } from '@/services/resident.api'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { ResidentListDialog } from '@/components/residents/resident-list-dialog'
import { ResidentsDialog } from '@/components/residents/residents-dialog'
import { toast } from 'sonner'
import { format } from 'date-fns'
import { ConfirmDialog } from '@/components/confirm-dialog'

export const ApartmentResidentsDialog = ({
  open,
  onOpenChange,
  apartmentId
}) => {
  const queryClient = useQueryClient()
  const [addResidentOpen, setAddResidentOpen] = useState(false)
  const [createResidentOpen, setCreateResidentOpen] = useState(false)
  const [viewResident, setViewResident] = useState(null)
  const [viewResidentOpen, setViewResidentOpen] = useState(false)
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
  const [residentToDelete, setResidentToDelete] = useState(null)

  const { data, isLoading } = useQuery({
    queryKey: ['apartment-residents', apartmentId],
    queryFn: () => getApartmentDetailApi(apartmentId),
    enabled: !!apartmentId && open
  })

  const residents = data?.apartment?.residents || []

  const addMutation = useMutation({
    mutationFn: (residentId) =>
      addResidentToApartmentApi(apartmentId, residentId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['apartment-residents', apartmentId]
      })
      toast.success('Thêm cư dân vào căn hộ thành công')
    },
    onError: () => {
      toast.error('Thêm cư dân thất bại')
    }
  })

  const removeMutation = useMutation({
    mutationFn: (residentId) =>
      removeResidentFromApartmentApi(apartmentId, residentId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['apartment-residents', apartmentId]
      })
      toast.success('Xóa cư dân khỏi căn hộ thành công')
      setDeleteConfirmOpen(false)
    },
    onError: () => {
      toast.error('Xóa cư dân thất bại')
    }
  })

  const handleAddResident = (resident) => {
    addMutation.mutate(resident.id)
  }

  const handleDeleteClick = (resident) => {
    setResidentToDelete(resident)
    setDeleteConfirmOpen(true)
  }

  const handleConfirmDelete = () => {
    if (residentToDelete) {
      removeMutation.mutate(residentToDelete.id)
    }
  }

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="md:max-w-2xl lg:max-w-3xl">
          <DialogHeader>
            <DialogTitle>Danh sách cư dân trong căn hộ</DialogTitle>
            <DialogDescription>
              Quản lý cư dân đang sinh sống tại căn hộ này
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="flex justify-end">
              <Button onClick={() => setAddResidentOpen(true)} variant="blue">
                <i className="fas fa-plus"></i>
                Thêm cư dân
              </Button>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Họ tên</TableHead>
                    <TableHead>Quan hệ</TableHead>
                    <TableHead>SĐT</TableHead>
                    <TableHead>Ngày sinh</TableHead>
                    <TableHead>Thao tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    <TableRow>
                      <TableCell colSpan={5} className="py-4 text-center">
                        Đang tải...
                      </TableCell>
                    </TableRow>
                  ) : residents.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="py-4 text-center">
                        Chưa có cư dân nào
                      </TableCell>
                    </TableRow>
                  ) : (
                    residents.map((resident) => (
                      <TableRow key={resident.id}>
                        <TableCell className="font-medium">
                          {resident.full_name}
                        </TableCell>
                        <TableCell>
                          {resident.ResidentApartment?.relationship === 'owner'
                            ? 'Chủ hộ'
                            : 'Thành viên'}
                        </TableCell>
                        <TableCell>{resident.phone || '—'}</TableCell>
                        <TableCell>
                          {resident.dob
                            ? format(new Date(resident.dob), 'dd/MM/yyyy')
                            : '—'}
                        </TableCell>
                        <TableCell>
                          <div className="flex w-16 gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                setViewResident(resident)
                                setViewResidentOpen(true)
                              }}>
                              Xem
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleDeleteClick(resident)}>
                              Xóa
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <ResidentListDialog
        open={addResidentOpen}
        onOpenChange={setAddResidentOpen}
        onSelect={handleAddResident}
        onCreate={() => setCreateResidentOpen(true)}
      />

      <ResidentsDialog
        mode="create"
        open={createResidentOpen}
        onOpenChange={setCreateResidentOpen}
        onSave={async (data) => {
          try {
            const payload = {
              full_name: data.full_name,
              gender: data.gender ? parseInt(data.gender) : null,
              dob: data.dob,
              place_of_birth: data.place_of_birth,
              ethnicity: data.ethnicity,
              occupation: data.occupation,
              hometown: data.hometown,
              id_card: data.id_card,
              household_no: data.household_no,
              status: parseInt(data.status),
              registered_at: new Date().toISOString().split('T')[0]
            }
            await createResidentApi(payload)
            queryClient.invalidateQueries({ queryKey: ['residents'] })
            toast.success('Thêm cư dân thành công')
            setCreateResidentOpen(false)
          } catch (e) {
            console.error(e)
            toast.error('Thêm cư dân thất bại')
          }
        }}
      />

      <ResidentsDialog
        mode="view"
        open={viewResidentOpen}
        onOpenChange={setViewResidentOpen}
        resident={viewResident}
      />

      <ConfirmDialog
        open={deleteConfirmOpen}
        onOpenChange={setDeleteConfirmOpen}
        title="Xác nhận xóa"
        description={`Bạn có chắc muốn xóa cư dân ${residentToDelete?.full_name} khỏi căn hộ này?`}
        onConfirm={handleConfirmDelete}
        isLoading={removeMutation.isPending}
      />
    </>
  )
}
