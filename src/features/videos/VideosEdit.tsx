import { Box, Paper, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { initialState, useGetAllCastMembersQuery, useGetAllGenresQuery, useGetVideoQuery, useUpdateVideoMutation } from "./videosSlice";
import { FileObject, Video } from "../../types/Videos";
import { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import { VideosForm } from "./components/VideosForm";
import { mapVideoToForm } from "./util";
import { useUniqueCategories } from "../../hooks/useUniqueCategories";
import { useAppDispatch } from "../../app/hooks";
import { addUpload } from "../uploads/uploadSlice";
import { nanoid } from "nanoid";

export function VideosEdit() {
  const { enqueueSnackbar } = useSnackbar()
  const { data: genres } = useGetAllGenresQuery();
  const { data: castMembers } = useGetAllCastMembersQuery();
  const id = useParams<{ id: string }>().id as string
  const { data: video, isFetching } = useGetVideoQuery({ id })
  const [videoState, setVideoState] = useState<Video>(initialState)
  const [updateVideo, status] = useUpdateVideoMutation();
  const [categories, setCategories] = useUniqueCategories(videoState, setVideoState)
  const [selectedFiles, setSelectedFiles] = useState<FileObject[]>([])
  const dispatch = useAppDispatch();

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setVideoState((state) => ({ ...state, [name]: value }));
  }

  function handleSubmitUploads(videoId: string) {
    selectedFiles.forEach(({ file, name }) => {
      dispatch(addUpload({
        id: nanoid(),
        file,
        videoId,
        field: name
      }))
    })
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const video = mapVideoToForm(videoState)
    try {
      const { data } = await updateVideo(video).unwrap()
      handleSubmitUploads(data.id)
    } catch (e) {
      enqueueSnackbar(`Error updating Video`, { variant: "error" });
    }
  }

  function handleAddFile({ name, file }: FileObject) {
    setSelectedFiles([...selectedFiles, { name, file }]);
  }

  function handleRemoveFile(name: string) {
    setSelectedFiles(selectedFiles.filter((file) => file.name !== name));
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
          handleAddFile={handleAddFile}
          handleRemoveFile={handleRemoveFile}
        />
      </Paper>
    </Box>
  )
}
