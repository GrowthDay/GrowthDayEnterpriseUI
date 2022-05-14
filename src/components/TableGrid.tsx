import { CheckBoxOutlined, IndeterminateCheckBoxOutlined } from '@mui/icons-material'
import { LinearProgress, Paper, PaperProps, styled } from '@mui/material'
import { DataGridPro } from '@mui/x-data-grid-pro'
import { DataGridProProps } from '@mui/x-data-grid-pro/models'
import { forwardRef, ForwardRefExoticComponent, RefAttributes } from 'react'
import coerceArray from '../utils/coerceArray'

const StyledDataGrid = styled(DataGridPro)({
  border: 'none'
})

const TableGrid: ForwardRefExoticComponent<
  DataGridProProps & { PaperProps?: PaperProps } & RefAttributes<HTMLDivElement>
> = forwardRef(({ PaperProps, loading, sx, ...props }, ref) => (
  <Paper {...PaperProps} sx={[{ position: 'relative' }, ...coerceArray(PaperProps?.sx)]}>
    {loading && (
      <LinearProgress
        sx={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 1, borderRadius: '4px 4px 0 0' }}
      />
    )}
    <StyledDataGrid
      sx={[
        {
          '.MuiDataGrid-columnHeader[data-field="action"] .MuiDataGrid-columnSeparator': { display: 'none' },
          '.MuiDataGrid-virtualScroller': { ...(loading ? { opacity: 0.5 } : {}) },
          '.MuiDataGrid-cell, .MuiDataGrid-columnHeader': { outline: 'none!important' },
          '.MuiDataGrid-row': {
            '.table-row-action': {
              opacity: 0
            },
            '&:hover': {
              '.table-row-action': {
                opacity: 1
              }
            }
          }
        },
        ...coerceArray(sx)
      ]}
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
      disableSelectionOnClick
      disableColumnFilter
      disableColumnMenu
      disableColumnSelector
      {...props}
      ref={ref}
    />
  </Paper>
))

export default TableGrid
