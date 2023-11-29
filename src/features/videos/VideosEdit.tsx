import { Box, Paper, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { initialState, useGetAllCastMembersQuery, useGetAllGenresQuery, useGetVideoQuery, useUpdateVideoMutation } from "./videosSlice";
import { Video } from "../../types/Videos";
import { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import { VideosForm } from "./components/VideosForm";
import { mapVideoToForm } from "./util";
import { useUniqueCategories } from "../../hooks/useUniqueCategories";

export function VideosEdit() {
  const { enqueueSnackbar } = useSnackbar()
  const { data: genres } = useGetAllGenresQuery();
  const { data: castMembers } = useGetAllCastMembersQuery();
  const id = useParams<{ id: string }>().id as string
  const { data: video, isFetching } = useGetVideoQuery({ id })
  const [videoState, setVideoState] = useState<Video>(initialState)
  const [updateVideo, status] = useUpdateVideoMutation();
  const [categories, setCategories] = useUniqueCategories(videoState, setVideoState)

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setVideoState((state) => ({ ...state, [name]: value }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    await updateVideo(mapVideoToForm(videoState))
  }

  useEffect(() => {
    if (video) {
      setVideoState(video.data)
      setCategories(video.data.categories || [])
    }
  }, [video])

  useEffect(() => {
    if (status.isSuccess) {
      enqueueSnackbar(`Video updated`, { variant: "success" });
    }
    if (status.isError) {
      enqueueSnackbar(`Error updating video`, { variant: "error" });
    }
  }, [status, enqueueSnackbar])

  return (
    <Box>
      <Paper>
        <Box p={2}>
          <Box mb={2}>
            <Typography variant="h4">Edit Video</Typography>
          </Box>
        </Box>
        <VideosForm
          video={videoState}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          cast_members={castMembers?.data}
          genres={genres?.data}
          categories={categories}
          isDisabled={isFetching}
          isLoading={isFetching}
        />
      </Paper>
    </Box>
  )
}
