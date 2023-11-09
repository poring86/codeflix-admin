import { Box, Paper, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Category, useGetCategoryQuery, useUpdateCategoryMutation } from './categorySlice'
import CategoryForm from './components/CategoryForm'
import { enqueueSnackbar } from 'notistack'

export const EditCategory = () => {
  const id = useParams().id || ""
  const { data: category, isFetching } = useGetCategoryQuery({ id })
  console.log('category', category)
  const [updateCategory, status] = useUpdateCategoryMutation()
  const [categoryState, setCategoryState] = useState<Category>({
    id: "",
    name: "",
    description: "",
    is_active: false,
    created_at: "",
    deleted_at: "",
    updated_at: "",
  })
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault()
    updateCategory(categoryState)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCategoryState({ ...categoryState, [name]: value })
  }

  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    setCategoryState({ ...categoryState, [name]: checked })
  }

  useEffect(() => {
    if (category) {
      setCategoryState(category.data)
    }
  }, [category])

  useEffect(() => {
    if (status.isSuccess) {
      enqueueSnackbar('Category updated successfully', { variant: "success" })
    }
    if (status.error) {
      enqueueSnackbar('Category not updated successfully', { variant: "error" })
    }
  }, [enqueueSnackbar, status.error, status.isSuccess])

  return (
    <Box>
      <Paper>
        <Box p={2}>
          <Box mb={2}>
            <Typography variant="h4">Edit Category</Typography>
          </Box>
          <CategoryForm
            category={categoryState}
            isDisabled={status.isLoading}
            isLoading={false}
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            handleToggle={handleToggle}
          />
        </Box>
      </Paper>
    </Box>
  )
}
