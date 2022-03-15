import { CheckBoxOutlined, IndeterminateCheckBoxOutlined } from '@mui/icons-material'
import { Paper, styled } from '@mui/material'
import { DataGridPro } from '@mui/x-data-grid-pro'
import { DataGridProProps } from '@mui/x-data-grid-pro/models'
import { forwardRef, ForwardRefExoticComponent, RefAttributes } from 'react'

const StyledDataGrid = styled(DataGridPro)({
  border: 'none'
})

const TableGrid: ForwardRefExoticComponent<DataGridProProps & RefAttributes<HTMLDivElement>> = forwardRef(
  (props, ref) => (
    <Paper>
      <StyledDataGrid
        initialState={{
          pagination: {
            pageSize: 10
          }
        }}
        componentsProps={{
          baseCheckbox: {
            indeterminateIcon: <IndeterminateCheckBoxOutlined />,
            checkedIcon: <CheckBoxOutlined />
          }
        }}
        pagination
        autoHeight
        rowsPerPageOptions={[5, 10, 25, 50, 100]}
        // checkboxSelection
        disableSelectionOnClick
        disableColumnFilter
        disableColumnMenu
        disableColumnSelector
        {...props}
        ref={ref}
      />
    </Paper>
  )
)

export default TableGrid
