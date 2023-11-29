import { Box, Paper, Typography } from "@mui/material";
import { initialState, useCreateVideoMutation, useGetAllCastMembersQuery, useGetAllGenresQuery } from "./videosSlice";
import { Video } from "../../types/Videos";
import { useState } from "react";
import { useSnackbar } from "notistack";
import { VideosForm } from "./components/VideosForm";
import { mapVideoToForm } from "./util";
import { useUniqueCategories } from "../../hooks/useUniqueCategories";

export const VideosCreate = () => {
  const { enqueueSnackbar } = useSnackbar()
  const [videoState, setVideoState] = useState<Video>(initialState)
  const [createVideo, status] = useCreateVideoMutation()
  const { data: genres } = useGetAllGenresQuery();
  const { data: castMembers } = useGetAllCastMembersQuery();
  const [categories, setCategories] = useUniqueCategories(videoState, setVideoState)

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setVideoState((state) => ({ ...state, [name]: value }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    await createVideo(mapVideoToForm(videoState))
  }

  return (
    <Box>
      <Paper>
        <Box p={2}>
          <Box mb={2}>
            <Typography variant="h4">Create Video</Typography>
          </Box>
        </Box>
        <VideosForm
          video={videoState}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          cast_members={castMembers?.data}
          genres={genres?.data}
          categories={categories}
          isDisabled={status.isLoading}
          isLoading={status.isLoading}
        />
      </Paper>
    </Box>
  )
}
