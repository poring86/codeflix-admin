import { Box, CssBaseline, ThemeProvider, Typography } from '@mui/material'
import { Header } from './components/Header'
import { darkTheme, lightTheme } from './config/theme'
import { Layout } from './components/Layout'
import { Route, Routes } from 'react-router-dom'
import { ListCategory } from './features/categories/ListCategory'
import { CreateCategory } from './features/categories/CreateCategory'
import { EditCategory } from './features/categories/EditCategory'
import { SnackbarProvider } from 'notistack'
import { ListCastMembers } from './features/castMembers/ListCastMembers'
import { CreateCastMembers } from './features/castMembers/CreateCastMember'
import { EditCastMembers } from './features/castMembers/EditCastMember'
import { CreateGenre } from './features/genre/CreateGenre'
import { EditGenre } from './features/genre/EditGenre'
import { ListGenre } from './features/genre/ListGenre'
import { VideosList } from './features/videos/VideosList'
import { VideosEdit } from './features/videos/VideosEdit'
import { VideosCreate } from './features/videos/VideosCreate'
import { useEffect, useState } from 'react'
import { useLocalStorage } from './hooks/useLocalStorage'

export default function App() {
  const [theme, setTheme] = useState(darkTheme)
  const [currentTheme, setCurrentTheme] = useLocalStorage("theme", "dark")
  const toggle: () => void = () => {
    const currentTheme = theme.palette.mode === "dark" ? lightTheme : darkTheme
    setTheme(currentTheme)
    setCurrentTheme(currentTheme.palette.mode)
  }

  useEffect(() => {
    const currentTheme = theme.palette.mode === "dark" ? darkTheme : lightTheme
    if (currentTheme) {
      setTheme(currentTheme)
    }
  })

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider maxSnack={3} anchorOrigin={{
        vertical: "top",
        horizontal: "right"
      }}>
        <Box component="main" sx={{ height: "100vh" }}>
          <Header toggle={toggle} theme={theme.palette.mode} />
          <Layout>
            <Routes>
              <Route path="/" element={<ListCategory />} />
              {/* Categories */}
              <Route path="/categories" element={<ListCategory />} />
              <Route path="/categories/create" element={<CreateCategory />} />
              <Route path="/categories/edit/:id" element={<EditCategory />} />
              {/* Cast members */}
              <Route path="/cast-members" element={<ListCastMembers />} />
              <Route path="/cast-members/create" element={<CreateCastMembers />} />
              <Route path="/cast-members/edit/:id" element={<EditCastMembers />} />
              {/* Genre */}
              <Route path="/genres" element={<ListGenre />} />
              <Route path="/genres/create" element={<CreateGenre />} />
              <Route path="/genres/edit/:id" element={<EditGenre />} />
              {/* Videos */}
              <Route path="/videos" element={<VideosList />} />
              <Route path="/videos/create" element={<VideosCreate />} />
              <Route path="/videos/edit/:id" element={<VideosEdit />} />
              <Route path="*" element={
                <Box sx={{ color: 'white' }}>
                  <Typography variant="h1" component="h1">
                    404
                  </Typography>
                  <Typography variant="h1" component="h1">
                    Page not found
                  </Typography>
                </Box>} />
            </Routes>
          </Layout>
        </Box>
      </SnackbarProvider>
    </ThemeProvider>
  )
}
