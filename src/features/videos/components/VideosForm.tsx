import { Box, FormControl, Grid, TextField } from "@mui/material";
import { Video } from "../../../types/Videos";
import { Genre } from "../../../types/Genres";
import { Category } from "../../../types/Category";
import { CastMember } from "../../../types/CastMembers";

type Props = {
  video: Video
  genres?: Genre[]
  categories?: Category[]
  cast_members?: CastMember[]
  isDisabled?: boolean
  isLoading?: boolean
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function VideosForm({
  video,
  genres,
  categories,
  cast_members,
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
                value={video.title}
                disabled={isDisabled}
                onChange={handleChange}
                inputProps={{ "data-testid": "title" }}
              />
            </FormControl>
          </Grid>
        </Grid>
      </form>
    </Box>
  )
}