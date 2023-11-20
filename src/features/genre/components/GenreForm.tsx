import { Autocomplete, Box, Button, FormControl, Grid, TextField } from "@mui/material"
import { Category } from "../../../types/Category"
import { Link } from "react-router-dom"

type Props = {
  genre: any
  categories?: Category[]
  isLoading?: boolean
  isDisabled?: boolean
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export function GenreForm({
  genre,
  categories,
  isDisabled = false,
  isLoading = false,
  handleSubmit,
  handleChange
}: Props) {
  return (
    <Box p={2}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <TextField
                required
                name="name"
                label="Name"
                value={genre.name}
                disabled={isDisabled}
                onChange={handleChange}
                inputProps={{ "data-testid": "name" }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Autocomplete
              disablePortal
              multiple
              loading={isLoading}
              options={[]}
              value={genre.categories}
              disabled={isDisabled || !categories}
              renderInput={(params) =>
                <TextField
                  {...params}
                  label="Categories"
                  data-testid="categories-input"
                />}
            />
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" gap={2}>
              <Button variant="contained" component={Link} to="/genres">
                Back
              </Button>
              <Button
                type="submit"
                color="secondary"
                variant="contained"
                disabled={isDisabled || isLoading}
              >
                {isLoading ? "Loading..." : "Save"}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Box>
  )
}
