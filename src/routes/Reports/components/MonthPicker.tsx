import { CalendarTodayOutlined, KeyboardArrowDownOutlined } from '@mui/icons-material'
import { Button } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers-pro'
import { DatePickerProps } from '@mui/x-date-pickers/DatePicker/DatePicker'
import { Moment } from 'moment'
import * as React from 'react'
import { FC, useState } from 'react'

const MonthPicker: FC<Omit<DatePickerProps<Moment> & React.RefAttributes<HTMLDivElement>, 'renderInput'>> = (props) => {
  const [datepickerOpen, setDatepickerOpen] = useState(false)
  return (
    <DatePicker<Moment>
      openTo="month"
      views={['year', 'month']}
      open={datepickerOpen}
      onOpen={() => setDatepickerOpen(true)}
      onClose={() => setDatepickerOpen(false)}
      inputFormat="MMM YYYY"
      PopperProps={{
        placement: 'bottom-end'
      }}
      {...props}
      renderInput={({ inputProps, inputRef }) => (
        <Button
          onClick={() => setDatepickerOpen(true)}
          ref={inputRef}
          startIcon={<CalendarTodayOutlined sx={{ mr: 0.5, width: 18 }} />}
          endIcon={<KeyboardArrowDownOutlined />}
          variant="outlined"
          sx={{ backgroundColor: (theme) => theme.palette.background.paper }}
        >
          {inputProps?.value}
        </Button>
      )}
    />
  )
}

export default MonthPicker
