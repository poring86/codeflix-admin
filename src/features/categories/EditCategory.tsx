import { Box, Paper, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { Category, selectCategoryById, updateCategory, useGetCategoryQuery } from './categorySlice'
import CategoryForm from './components/CategoryForm'

export const EditCategory = () => {
  const id = useParams().id || ""
  // const category = useAppSelector((state) => selectCategoryById(state, id))
  const { data: category, isFetching } = useGetCategoryQuery({ id })
  console.log('category', category)
  const [isDisabled, setIsDisabled] = useState(false)
  const [categoryState, setCategoryState] = useState<Category>({
    id: "",
    name: "",
    description: "",
    is_active: false,
    created_at: "",
    deleted_at: "",
    updated_at: "",
  })
  const { enqueueSnackbar } = useSnackbar()
  const dispatch = useAppDispatch()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault()
    dispatch(updateCategory(categoryState))
    enqueueSnackbar("Success updating a category!", { variant: "success" })
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

  return (
    <Box>
      <Paper>
        <Box p={2}>
          <Box mb={2}>
            <Typography variant="h4">Edit Category</Typography>
          </Box>
          <CategoryForm
            category={categoryState}
            isDisabled={isDisabled}
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
