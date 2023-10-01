import React from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { deleteCategory, selectCategories } from './categorySlice'
import { Box, Button, IconButton, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { DataGrid, GridColDef, GridRenderCellParams, GridRowsProp, GridToolbar } from '@mui/x-data-grid'
import { Link } from 'react-router-dom'

export const ListCategory = () => {
  const categories = useAppSelector(selectCategories)
  const dispatch = useAppDispatch()

  const rows: GridRowsProp = categories.map((category) => ({
    id: category.id,
    name: category.name,
    description: category.description,
    isActive: category.is_active,
    createdAt: new Date(category.created_at).toLocaleDateString('pt-BR')
  }))

  const componentsProps = {
    toolbar: {
      showQuickFilter: true,
      quickFilterProps: { debounceMs: 500 },
    }
  }

  const columns: GridColDef[] = [
    { field: 'name', headerName: "Name", flex: 1, renderCell: renderNameCell },
    {
      field: 'isActive', headerName: "Active", flex: 1, type: "boolean", renderCell: renderIsActiveCell
    },
    { field: 'description', headerName: "Description", flex: 1 },
    {
      field: 'createdAt', headerName: "Created At", flex: 1
    },
    {
      field: 'id', headerName: "Actions", flex: 1, renderCell: renderActionCell, type: "string"
    },
  ]

  function handleDeleteCategory(id: string) {
    dispatch(deleteCategory(id))
  }

  function renderNameCell(rowData: GridRenderCellParams) {
    return (
      <Link style={{ textDecoration: "none" }} to={`/categories/edit/${rowData.id}`}>
        <Typography color="primary">{rowData.value}</Typography>
      </Link>
    )
  }

  function renderActionCell(params: GridRenderCellParams) {
    return (
      <IconButton color="secondary" onClick={() => handleDeleteCategory(params.value)}>
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
        <Button
          variant="contained"
          color="secondary"
          component={Link}
          to="/categories/create"
          style={{ marginBottom: "1rem" }}
        >New category</Button>
      </Box>

      <Box style={{ display: "flex", height: 600 }}>
        <DataGrid
          componentsProps={componentsProps}
          components={{ Toolbar: GridToolbar }}
          disableRowSelectionOnClick={true}
          columns={columns}
          rows={rows}
          disableColumnSelector={true}
          disableColumnFilter={true}
          disableDensitySelector={true}
          checkboxSelection={true}
          pageSizeOptions={[5, 10]}
        />
      </Box>


    </Box>
  )
}
