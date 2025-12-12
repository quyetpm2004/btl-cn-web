import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { ConfirmDialog } from '@/components/confirm-dialog'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose
} from '@/components/ui/dialog'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(amount)
}

export const ServiceRegistrationModal = ({
  apartment,
  allServices,
  onClose,
  onSave
}) => {
  // Initialize state with apartment's current registrations or empty defaults
  const [registrations, setRegistrations] = useState(() => {
    return allServices.map((service) => {
      const existing = apartment.serviceRegistrations?.find(
        (r) => r.service_id === service.id
      )
      return {
        serviceId: service.id,
        isSelected: !!existing
      }
    })
  })

  const [confirmOpen, setConfirmOpen] = useState(false)
  const [pendingIndex, setPendingIndex] = useState(null)

  const areAllSelected =
    registrations.length > 0 && registrations.every((r) => r.isSelected)

  const handleToggleAll = () => {
    if (areAllSelected) {
      // Try to uncheck all
      const needsConfirmation = registrations.some((reg) => {
        if (!reg.isSelected) return false
        return apartment.serviceRegistrations?.some(
          (r) => r.service_id === reg.serviceId
        )
      })

      if (needsConfirmation) {
        setPendingIndex(-1) // -1 indicates "All"
        setConfirmOpen(true)
      } else {
        setRegistrations(
          registrations.map((r) => ({ ...r, isSelected: false }))
        )
      }
    } else {
      // Check all
      setRegistrations(registrations.map((r) => ({ ...r, isSelected: true })))
    }
  }

  const handleToggle = (index) => {
    const currentReg = registrations[index]

    // If trying to uncheck (currently true)
    if (currentReg.isSelected) {
      const isOriginallyRegistered = apartment.serviceRegistrations?.some(
        (r) => r.service_id === currentReg.serviceId
      )

      if (isOriginallyRegistered) {
        setPendingIndex(index)
        setConfirmOpen(true)
        return
      }
    }

    // If checking or unchecking a new service (not in DB yet), proceed immediately
    toggleRegistration(index)
  }

  const toggleRegistration = (index) => {
    const newRegs = [...registrations]
    newRegs[index].isSelected = !newRegs[index].isSelected
    setRegistrations(newRegs)
  }

  const handleConfirmToggle = () => {
    if (pendingIndex === -1) {
      setRegistrations(registrations.map((r) => ({ ...r, isSelected: false })))
      setPendingIndex(null)
    } else if (pendingIndex !== null) {
      toggleRegistration(pendingIndex)
      setPendingIndex(null)
    }
    setConfirmOpen(false)
  }

  const handleSubmit = () => {
    const finalRegistrations = registrations
      .filter((r) => r.isSelected)
      .map((r) => ({ serviceId: r.serviceId }))

    onSave(apartment.id, finalRegistrations)
  }

  return (
    <>
      <Dialog open={true} onOpenChange={onClose}>
        <DialogContent className="flex max-h-[90vh] max-w-2xl flex-col gap-0">
          <DialogHeader className="mb-4 border-b border-gray-100 pb-4">
            <DialogTitle className="text-lg font-bold text-gray-900">
              Đăng ký dịch vụ
            </DialogTitle>
            <DialogDescription className="text-sm text-gray-500">
              Căn hộ:{' '}
              <span className="font-semibold text-blue-600">
                {apartment.apartment_code}
              </span>{' '}
              - {apartment.residents?.[0]?.full_name || 'Chưa có chủ hộ'}
            </DialogDescription>
          </DialogHeader>

          <div className="max-h-[60vh] overflow-y-auto">
            <Table>
              <TableHeader className="sticky top-0 z-10 bg-gray-100">
                <TableRow className="hover:bg-gray-100">
                  <TableHead className="pl-4 font-bold text-gray-700">
                    Dịch vụ
                  </TableHead>
                  <TableHead className="font-bold text-gray-700">
                    Đơn giá
                  </TableHead>
                  <TableHead className="pr-4">
                    <Checkbox
                      checked={areAllSelected}
                      onCheckedChange={handleToggleAll}
                      className="border-gray-400 data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600"
                    />
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {allServices.map((service, idx) => {
                  const reg = registrations[idx]
                  return (
                    <TableRow
                      key={service.id}
                      className={`cursor-pointer transition-colors ${
                        reg.isSelected
                          ? 'bg-blue-50 hover:bg-blue-100'
                          : 'hover:bg-gray-50'
                      }`}
                      onClick={() => handleToggle(idx)}>
                      <TableCell className="pl-4 font-medium">
                        <span
                          className={
                            reg.isSelected
                              ? 'font-semibold text-blue-700'
                              : 'text-gray-700'
                          }>
                          {service.name}
                        </span>
                      </TableCell>
                      <TableCell className="text-gray-600">
                        <span
                          className={
                            reg.isSelected ? 'font-medium text-blue-600' : ''
                          }>
                          {formatCurrency(service.price)}
                        </span>
                        <span className="ml-1 text-xs text-gray-400">
                          / {service.unit}
                        </span>
                      </TableCell>
                      <TableCell className="pr-4">
                        <Checkbox
                          checked={reg.isSelected}
                          onCheckedChange={() => handleToggle(idx)}
                          onClick={(e) => e.stopPropagation()}
                          className="border-gray-300 data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600"
                        />
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>

          <DialogFooter className="mt-4 border-t border-gray-100 pt-4">
            <DialogClose asChild>
              <Button variant="outline" type="button">
                Hủy
              </Button>
            </DialogClose>
            <Button
              onClick={handleSubmit}
              className="bg-blue-600 hover:bg-blue-700">
              Lưu thay đổi
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <ConfirmDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title="Hủy đăng ký dịch vụ"
        description="Dịch vụ này đã được đăng ký trước đó. Bạn có chắc chắn muốn hủy không?"
        confirmText="Đồng ý hủy"
        cancelText="Giữ lại"
        onConfirm={handleConfirmToggle}
        variant="destructive"
      />
    </>
  )
}
