import { Box, Button, FormControl, FormControlLabel, FormGroup, Grid, Paper, Switch, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useAppSelector } from '../../app/hooks'
import { selectCategoryById } from './categorySlice'
import CategoryForm from './components/CategoryForm'

export const EditCategory = () => {
  const id = useParams().id || ""
  const [isDisabled, setIsDisabled] = useState(false)
  const category = useAppSelector((state) => selectCategoryById(state, id))

  const handleChange = (e: any) => {
  }

  const handleToggle = (e: any) => {
  }
  return (
    <Box>
      <Paper>
        <Box p={2}>
          <Box mb={2}>
            <Typography variant="h4">Edit Category</Typography>
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
