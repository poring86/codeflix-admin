import { Box, Paper, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { Category, useCreateCategoryMutation } from './categorySlice'
import CategoryForm from './components/CategoryForm'
import { useAppDispatch } from '../../app/hooks'
import { v4 as uuidv4 } from 'uuid';
import { enqueueSnackbar } from 'notistack'

export const CreateCategory = () => {
  const [createCategory, status] = useCreateCategoryMutation()
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
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault()
    await createCategory({ ...categoryState, id: uuidv4() })
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
    if (status.isSuccess) {
      enqueueSnackbar("Category created successfully", { variant: 'success' })
      setIsDisabled(true)
    }
    if (status.error) {
      enqueueSnackbar("Category not created", { variant: 'error' })
    }
  }, [enqueueSnackbar, status.error, status.isSuccess])
  return (
    <Box>
      <Paper>
        <Box p={2}>
          <Box mb={2}>
            <Typography variant="h4">Create Category</Typography>
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
