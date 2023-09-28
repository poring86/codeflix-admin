import React from 'react'
import { useAppSelector } from '../../app/hooks'
import { selectCategories } from './categorySlice'
import { Box, Button, Typography } from '@mui/material'
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid'

export const ListCategory = () => {
  const categories = useAppSelector(selectCategories)

  const rows: GridRowsProp = categories.map((category) => ({
    id: category.id,
    name: category.name,
    description: category.description,
  }))

  const columns: GridColDef[] = [
    { field: 'id', headerName: "Id", width: 150 },
    { field: 'name', headerName: "Name", width: 150 },
    { field: 'description', headerName: "Description", width: 150 },
  ]

  return (
    <Box maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box display="flex" justifyContent="flex-end">
        <Button>New category</Button>
      </Box>
      <Typography variant='h3' component='h1'>
        Category page list
      </Typography>


      <div style={{ height: 500, width: "100%" }}>
        <DataGrid columns={columns} rows={rows} />
      </div>


    </Box>
  )
}
