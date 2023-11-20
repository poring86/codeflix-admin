import { Box, Paper, Typography } from '@mui/material'
import { GenreForm } from './components/GenreForm'

export const CreateGenre = () => {
  return (
    <Box>
      <Paper>
        <Box p={2}>
          <Box mb={2}>
            <Typography>Genre Create</Typography>
          </Box>
        </Box>

      </Paper>
      <GenreForm
        genre={{}}
        categories={[]}
        isLoading={false}
        isDisabled={false}
        handleSubmit={function noRefCheck() { }}
        handleChange={function noRefCheck() { }}
      />
    </Box>
  )
}
