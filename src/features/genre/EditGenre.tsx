import { useSnackbar } from "notistack"
import { useParams } from "react-router-dom"
import { initialState as genreInitialState, useGetCaTegoriesQuery, useGetGenreQuery, useUpdateGenreMutation } from "./genreSlice"
import { Genre } from "../../types/Genres"
import { useEffect, useState } from "react"
import { Box, Paper, Typography } from "@mui/material"
import { GenreForm } from "./components/GenreForm"

export const EditGenre = () => {
  const id = useParams<{ id: string }>().id as string
  const { data: genre, isFetching } = useGetGenreQuery({ id });
  const { enqueueSnackbar } = useSnackbar()
  const { data: categories } = useGetCaTegoriesQuery()
  const [updateGenre, status] = useUpdateGenreMutation()
  const [genreState, setGenreState] = useState<Genre>(genreInitialState)

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target
    setGenreState((state) => ({ ...state, [name]: value }))
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    await updateGenre({
      id: genreState.id,
      name: genreState.name,
      categories_id: genreState.categories?.map((category) => category.id),
    })
  }

  useEffect(() => {
    if (genre) {
      setGenreState(genre.data);
    }
  }, [genre]);

  useEffect(() => {
    if (status.isSuccess) {
      enqueueSnackbar(`Genre updated`, { variant: "success" });
    }
    if (status.isError) {
      enqueueSnackbar(`Error updating genre`, { variant: "error" });
    }
  }, [status, enqueueSnackbar])

  return (
    <Box>
      <Paper>
        <Box p={2}>
          <Box mb={2}>
            <Typography variant="h4">Edit Genre</Typography>
          </Box>
        </Box>

        <GenreForm
          genre={genreState}
          categories={categories?.data}
          isLoading={status.isLoading || isFetching}
          isDisabled={status.isLoading}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
        />

      </Paper>
    </Box>
  )
}