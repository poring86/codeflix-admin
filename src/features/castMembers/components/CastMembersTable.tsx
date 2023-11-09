import { GridColDef, GridFilterModel, GridRenderCellParams, DataGrid, GridToolbar } from "@mui/x-data-grid"
import { Box, IconButton, Typography } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete'
import { Link } from 'react-router-dom'
import { Results } from "../../../types/CastMembers"

type Props = {
  data: Results | undefined
  perPage: number
  isFetching: boolean
  rowsPerPage?: number[];

  handleOnPageChange: (page: number) => void
  handleFilterChange: (filterModel: GridFilterModel) => void
  handleOnPageSizeChange: (perPage: number) => void
  handleDelete: (id: string) => Promise<void>
}

export function CastMembersTable({
  data,
  perPage,
  isFetching,
  rowsPerPage,
  handleOnPageChange,
  handleFilterChange,
  handleOnPageSizeChange,
  handleDelete
}: Props) {
  const componentsProps = {
    toolbar: {
      showQuickFilter: true,
      quickFilterProps: { debounceMs: 500 },
    }
  }

  const columns: GridColDef[] = [
    { field: 'name', headerName: "Name", flex: 1, renderCell: renderNameCell },
    {
      field: 'type', headerName: "Active", flex: 1, type: "boolean", renderCell: renderTypeCell
    },
    {
      field: 'id', headerName: "Actions", flex: 1, renderCell: renderActionCell, type: "string"
    },
  ]

  function mapDataToGridRows(data: Results) {
    const { data: castMembers } = data
    return castMembers.map((castMember) => ({
      id: castMember.id,
      name: castMember.name,
      type: castMember.type,
      create_at: new Date(castMember.created_at).toLocaleDateString('pt-BR')
    }))
  }

  function renderNameCell(rowData: GridRenderCellParams) {
    return (
      <Link style={{ textDecoration: "none" }} to={`/cast-members/edit/${rowData.id}`}>
        <Typography color="primary">{rowData.value}</Typography>
      </Link>
    )
  }

  function renderActionCell(params: GridRenderCellParams) {
    return (
      <IconButton color="secondary" onClick={() => handleDelete(params.value)}>
        <DeleteIcon />
      </IconButton>
    )
  }

  function renderTypeCell(rowData: GridRenderCellParams) {
    return (
      <Typography>
        {rowData.value === 1 ? "Director" : "Actor"}
      </Typography>
    )
  }

  const rows = data ? mapDataToGridRows(data) : []
  const rowCount = data?.meta.total ?? 0

  return (
    <Box sx={{ display: "flex", height: 600 }}>
      <DataGrid
        rows={rows}
        pagination={true}
        columns={columns}
        pageSize={perPage}
        filterMode="server"
        rowCount={rowCount}
        loading={isFetching}
        paginationMode="server"
        checkboxSelection={false}
        disableColumnFilter={true}
        disableColumnSelector={true}
        disableDensitySelector={true}
        rowsPerPageOptions={rowsPerPage}
        componentsProps={componentsProps}
        onPageChange={handleOnPageChange}
        components={{ Toolbar: GridToolbar }}
        onFilterModelChange={handleFilterChange}
        onPageSizeChange={handleOnPageSizeChange}
      />
    </Box>
  )
}

