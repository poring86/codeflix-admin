import { Box, Button, FormControl, FormControlLabel, FormGroup, Grid, Paper, Switch, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useAppSelector } from '../../app/hooks'
import { selectCategoryById } from './categorySlice'

export const EditCategory = () => {
  const id = useParams().id || ""
  const [isDisabled, setIsDisabled] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const category = useAppSelector((state) => selectCategoryById(state, id))

  console.log(`category`, category)

  const handleChange = (e: any) => {

  }
  return (
    <Box>
      <Paper>
        <Box p={2}>
          <Box mb={2}>
            <Typography variant="h4">Edit Category</Typography>
          </Box>
          <Box p={2}>
            <form>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <TextField
                      required
                      name="name"
                      label="Name"
                      value={category.name}
                      disabled={isDisabled}
                      onChange={handleChange}
                    />
                  </FormControl>
                </Grid>



                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <TextField
                      required
                      name="description"
                      label="Description"
                      value={category.description}
                      disabled={isDisabled}
                      onChange={handleChange}
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={category.is_active}
                          onChange={handleChange}
                          name="is_active"
                          color="secondary"
                          inputProps={{ 'aria-label': 'secondary checkbox' }}
                        />
                      }
                      label="Active"
                    />
                  </FormGroup>
                </Grid>
                <Grid item xs={12}>
                  <Box display="flex" gap={2}>
                    <Button variant="contained" component={Link} to="/categories">
                      Back
                    </Button>
                    <Button variant="contained" color="secondary" disabled={isDisabled}>
                      Save
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </form>

          </Box>
        </Box>
      </Paper>
    </Box>
  )
}
