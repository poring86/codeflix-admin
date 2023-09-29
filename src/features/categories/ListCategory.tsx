import React from 'react'
import { useAppSelector } from '../../app/hooks'
import { selectCategories } from './categorySlice'
import { Box, Button, IconButton, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { DataGrid, GridColDef, GridRenderCellParams, GridRowsProp } from '@mui/x-data-grid'

export const ListCategory = () => {
  const categories = useAppSelector(selectCategories)

  const rows: GridRowsProp = categories.map((category) => ({
    id: category.id,
    name: category.name,
    description: category.description,
    isActive: category.is_active,
    createdAt: new Date(category.created_at).toLocaleDateString('pt-BR')
  }))

  const columns: GridColDef[] = [
    { field: 'name', headerName: "Name", flex: 1 },
    {
      field: 'isActive', headerName: "Active", flex: 1, type: "boolean", renderCell: renderIsActiveCell
    },
    { field: 'description', headerName: "Description", flex: 1 },
    {
      field: 'createdAt', headerName: "Created At", flex: 1
    },
    {
      field: 'id', headerName: "Actions", flex: 1, renderCell: renderActionCell
    },
  ]

  function renderActionCell(params: GridRenderCellParams) {
    return (
      <IconButton color="secondary" onClick={() => console.log("isActiveCell")}>
        <DeleteIcon />
      </IconButton>
    )
  }

  function renderIsActiveCell(rowData: GridRenderCellParams) {
    return (
      <Typography color={rowData.value ? "primary" : "secondary"}>
        {rowData.value ? "Active" : "Inactive"}
      </Typography>
    )
  }

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
