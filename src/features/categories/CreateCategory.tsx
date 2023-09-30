import { Box, FormControl, Grid, Paper, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { Category } from './categorySlice'
import CategoryForm from './components/CategoryForm'
import { DragHandleTwoTone } from '@mui/icons-material'

export const CreateCategory = () => {
  const [isDisabled, setIsDisabled] = useState(false)

  const [category, setCategory] = useState<Category>({
    id: "",
    name: "",
    description: "",
    is_active: false,
    created_at: "",
    deleted_at: "",
    updated_at: "",
  })
  const handleChange = (e: any) => {
  }

  const handleToggle = (e: any) => {
  }
  return (
    <Box>
      <Paper>
        <Box p={2}>
          <Box mb={2}>
            <Typography variant="h4">Create Category</Typography>
          </Box>

          <CategoryForm
            category={category}
            isDisabled={isDisabled}
            isLoading={false}
            handleSubmit={() => { }}
            handleChange={handleChange}
            handleToggle={handleToggle}
          />
        </Box>
      </Paper>
    </Box>
  )
}
