import { useGetCategoriesQuery } from './categorySlice'
import { Box, Button, Typography } from '@mui/material'

import { useSnackbar } from 'notistack'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { CategoriesTable } from './components/CategoryTable'
import { GridFilterModel } from '@mui/x-data-grid'
import { useDeleteCastMembersMutation } from '../castMembers/castMembersSlice'

export const ListCategory = () => {
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(10)
  const [search, setSearch] = useState('')
  const [rowsPerPage] = useState([10, 25, 50, 100])

  const options = { perPage, search, page }

  const { data, isFetching, error } = useGetCategoriesQuery(options)
  const [deleteCastMember, deleteCastMemberStatus] = useDeleteCastMembersMutation()
  const { enqueueSnackbar } = useSnackbar()

  function handleOnPageChange(page: number) {
    setPage(page + 1)
  }

  function handleOnPageSizeChange(perPage: number) {
    setPerPage(perPage)
  }
  function handleFilterChange(filterModel: GridFilterModel) {
    if (filterModel.quickFilterValues?.length) {
      const search = filterModel.quickFilterValues.join('')
      return setSearch(search)
    }
    return setSearch('')
  }

  async function handleDeleteCastMember(id: string) {
    await deleteCastMember({ id });
  }

  useEffect(() => {
    if (deleteCastMemberStatus.isSuccess) {
      enqueueSnackbar("Category deleted", { variant: "success" })
    }
    if (deleteCastMemberStatus.error) {
      enqueueSnackbar("Category not deleted", { variant: "error" })
    }
    if (error) {
      enqueueSnackbar("Error fetching categories", { variant: "error" })
    }
  }, [deleteCastMemberStatus, enqueueSnackbar, error])

  if (error) {
    return <Typography>Error fetching categories</Typography>
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
        >New CastMember</Button>
      </Box>

      <CategoriesTable
        data={data}
        isFetching={isFetching}
        perPage={10}
        rowsPerPage={rowsPerPage}
        handleDelete={handleDeleteCastMember}
        handleOnPageChange={handleOnPageChange}
        handleOnPageSizeChange={handleOnPageSizeChange}
        handleFilterChange={handleFilterChange}
      />
    </Box>
  )
}
