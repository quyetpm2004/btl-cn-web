import { useState } from 'react'
import { ChevronDownIcon } from 'lucide-react'
import { format } from 'date-fns'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'

export const DateTimePicker = ({ value, onChange, disabled, className }) => {
  const [open, setOpen] = useState(false)

  const date = value ? new Date(value) : undefined

  const handleDateSelect = (newDate) => {
    if (!newDate) return
    const currentDate = date || new Date()
    // Preserve time if date exists, else default to current time
    if (date) {
      newDate.setHours(currentDate.getHours(), currentDate.getMinutes())
    } else {
      newDate.setHours(0, 0) // Default to 00:00 if picking date for first time
    }
    onChange(newDate.toISOString())
    setOpen(false)
  }

  const handleTimeChange = (e) => {
    if (!e.target.value) return
    const [hours, minutes] = e.target.value.split(':').map(Number)
    const newDate = date ? new Date(date) : new Date()
    newDate.setHours(hours, minutes)
    onChange(newDate.toISOString())
  }

  return (
    <div className={cn('flex gap-4', className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            disabled={disabled}
            className={cn(
              'flex-1 justify-between text-left font-normal',
              !date && 'text-muted-foreground'
            )}>
            {date ? format(date, 'dd/MM/yyyy') : <span>Chọn ngày</span>}
            <ChevronDownIcon className="h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            captionLayout="dropdown"
            selected={date}
            onSelect={handleDateSelect}
          />
        </PopoverContent>
      </Popover>
      <Input
        type="time"
        value={date ? format(date, 'HH:mm') : ''}
        onChange={handleTimeChange}
        disabled={disabled || !date}
        className="w-[120px] flex-1 shrink-0"
      />
    </div>
  )
}
