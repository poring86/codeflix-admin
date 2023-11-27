import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { Video } from "../../../types/Videos";
import { Genre } from "../../../types/Genres";
import { Category } from "../../../types/Category";
import { CastMember } from "../../../types/CastMembers";
import { Link } from "react-router-dom";
import { AutoCompleteFields } from "../../../components/AutoCompleteFields";
import { Rating } from "../../../components/Rating";
import { RatingsList } from "../../../components/RatingsList";

type Props = {
  video: Video;
  genres?: Genre[];
  categories?: Category[];
  cast_members?: CastMember[];
  isDisabled?: boolean;
  isLoading?: boolean;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const ratings: { value: Rating; label: Rating }[] = [
  {
    value: "L",
    label: "L",
  },
  {
    value: "10",
    label: "10",
  },
  {
    value: "12",
    label: "12",
  },
  {
    value: "14",
    label: "14",
  },
  {
    value: "16",
    label: "16",
  },
  {
    value: "18",
    label: "18",
  },
];

export function VideosForm({
  video,
  genres,
  categories,
  cast_members,
  isDisabled = false,
  isLoading = false,
  handleSubmit,
  handleChange,
}: Props) {
  console.log("video", video);
  return (
    <Box p={2}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6} sx={{ "& .MuiTextField-root": { my: 2 } }}>
            <FormControl fullWidth>
              <TextField
                required
                name="title"
                label="Name"
                value={video.title}
                disabled={isDisabled}
                onChange={handleChange}
                inputProps={{ "data-testid": "title" }}
              />
            </FormControl>
            <FormControl fullWidth>
              <TextField
                multiline
                minRows={4}
                name="description"
                label="Description"
                disabled={isDisabled}
                onChange={handleChange}
                value={video.description}
                inputProps={{ "data-testid": "description" }}
              />
            </FormControl>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <TextField
                    name="year_launched"
                    label="Year Launched"
                    disabled={isDisabled}
                    onChange={handleChange}
                    value={video.year_launched}
                    inputProps={{ "data-testid": "year_launched" }}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <TextField
                    name="duration"
                    label="Duration"
                    disabled={false}
                    value={video.duration}
                    onChange={handleChange}
                    inputProps={{ "data-testid": "duration" }}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <AutoCompleteFields
                  name="cast_members"
                  label="Cast Members"
                  isLoading={isLoading}
                  isDisabled={isDisabled}
                  values={video.cast_members}
                  options={cast_members}
                  handleChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <AutoCompleteFields
                  name="genres"
                  label="Genres"
                  isLoading={isLoading}
                  isDisabled={isDisabled}
                  values={video.genres}
                  options={genres}
                  handleChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <AutoCompleteFields
                  name="categories"
                  label="Categories"
                  isLoading={isLoading}
                  isDisabled={false}
                  values={video.categories}
                  options={categories}
                  handleChange={handleChange}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label">
                Gender
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
              >
                <RatingsList isDisabled={isDisabled} />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box display="flex" gap={2}>
              <Button variant="contained" component={Link} to="/videos">
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
  );
}
