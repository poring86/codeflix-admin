import { Box, Paper, Typography } from "@mui/material";
import { GenreForm } from "../genre/components/GenreForm";
import { useParams } from "react-router-dom";
import { initialState, useGetVideoQuery } from "./videosSlice";
import { Video } from "../../types/Videos";
import { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import { VideosForm } from "./components/VideosForm";

export function VideosEdit() {
  const { enqueueSnackbar } = useSnackbar()

  const id = useParams<{ id: string }>().id as string

  const { data: video, isFetching } = useGetVideoQuery({ id })
  const [videoState, setVideoState] = useState<Video>(initialState)
  const [status, setStatus] = useState({
    isSuccess: false,
    isError: false
  })

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target
    setVideoState((state) => ({ ...state, [name]: value }))
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
  }

  useEffect(() => {
    if (video) {
      setVideoState(video.data)
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
            <Typography variant="h4">Edit Video {id}</Typography>
          </Box>
        </Box>
      </Paper>

      <VideosForm
        video={videoState}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        cast_members={[]}
        genres={[]}
        categories={[]}
        isDisabled={isFetching}
        isLoading={isFetching}
      />

    </Box>
  )
}
