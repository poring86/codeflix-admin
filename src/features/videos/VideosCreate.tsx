import { Box, Paper, Typography } from "@mui/material";
import { initialState, useCreateVideoMutation, useGetAllCastMembersQuery, useGetAllCategoriesQuery, useGetAllGenresQuery } from "./videosSlice";
import { Video } from "../../types/Videos";
import { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import { VideosForm } from "./components/VideosForm";
import { mapVideoToForm } from "./util";

export const VideosCreate = () => {
  const { enqueueSnackbar } = useSnackbar()
  const [videoState, setVideoState] = useState<Video>(initialState)
  const [createVideo, status] = useCreateVideoMutation()
  const { data: genres } = useGetAllGenresQuery();
  const { data: castMembers } = useGetAllCastMembersQuery();
  const { data: categories } = useGetAllCategoriesQuery();

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setVideoState((state) => ({ ...state, [name]: value }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    await createVideo(mapVideoToForm(videoState))
  }

  useEffect(() => {
    if (status.isSuccess) {
      enqueueSnackbar(`Video created`, { variant: "success" });
    }
    if (status.isError) {
      enqueueSnackbar(`Error creating video`, { variant: "error" });
    }
  }, [status, enqueueSnackbar])

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
          categories={categories?.data}
          isDisabled={status.isLoading}
          isLoading={status.isLoading}
        />
      </Paper>
    </Box>
  )
}
