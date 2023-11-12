import '@testing-library/jest-dom/extend-expect'
import { DataGridProps } from '@mui/x-data-grid'
import React from 'react'

jest.mock('@mui/x-data-grid', () => {
  const { DataGrid } = jest.requireActual('@mui/x-data-grid')
  return {
    ...jest.requireActual('@mui/x-data-grid'),
    DataGrid: (props: DataGridProps) => {
      return <DataGrid {...props} disableVirtualization />
    },
  }
})
