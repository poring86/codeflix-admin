import { Box, Paper, Typography } from "@mui/material";
import { initialState, useCreateVideoMutation, useGetAllCastMembersQuery, useGetAllGenresQuery } from "./videosSlice";
import { FileObject, Video } from "../../types/Videos";
import { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import { VideosForm } from "./components/VideosForm";
import { mapVideoToForm } from "./util";
import { useUniqueCategories } from "../../hooks/useUniqueCategories";
import { nanoid } from "nanoid";
import { addUpload } from "../uploads/uploadSlice";
import { useAppDispatch } from "../../app/hooks";

export const VideosCreate = () => {
  const { enqueueSnackbar } = useSnackbar()
  const [videoState, setVideoState] = useState<Video>(initialState)
  const [createVideo, status] = useCreateVideoMutation()
  const { data: genres } = useGetAllGenresQuery();
  const { data: castMembers } = useGetAllCastMembersQuery();
  const [categories, setCategories] = useUniqueCategories(videoState, setVideoState)
  const [selectedFiles, setSelectedFiles] = useState<FileObject[]>([]);
  const dispatch = useAppDispatch();

  dispatch(
    addUpload({
      id: nanoid(),
      file: new File([], "test"),
      videoId: "1",
      field: "test"
    })
  )

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setVideoState((state) => ({ ...state, [name]: value }));
  }

  function handleAddFile({ name, file }: FileObject) {
    setSelectedFiles([...selectedFiles, { name, file }]);
  }

  function handleRemoveFile(name: string) {
    setSelectedFiles(selectedFiles.filter((file) => file.name !== name));
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
    const { id, ...payload } = mapVideoToForm(videoState)
    try {
      const { data } = await createVideo(payload).unwrap()
      handleSubmitUploads(data.id)
    } catch (e) {
      enqueueSnackbar(`Error creating Video`, { variant: "error" });
    }
  }

  useEffect(() => {
    if (status.isSuccess) {
      enqueueSnackbar(`Video created`, { variant: "success" });
    }

    if (status.isError) {
      enqueueSnackbar(`Error creating Video`, { variant: "error" });
    }
  }, [status, enqueueSnackbar]);

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
          handleAddFile={handleAddFile}
          handleRemoveFile={handleRemoveFile}
        />
      </Paper>
    </Box>
  )
}
