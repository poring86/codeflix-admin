import { Box, ThemeProvider, Typography } from '@mui/material'
import Header from './components/Header'
import { appTheme } from './config/theme'
import Layout from './components/Layout'
import { Route, Routes } from 'react-router-dom'
import { ListCategory } from './features/categories/ListCategory'
import { CreateCategory } from './features/categories/CreateCategory'
import { EditCategory } from './features/categories/EditCategory'
import { SnackbarProvider } from 'notistack'
import { ListCastMembers } from './features/castMembers/ListCastMembers'


export default function App() {
  return (

    <ThemeProvider theme={appTheme}>
      <SnackbarProvider maxSnack={3} anchorOrigin={{
        vertical: "top",
        horizontal: "right"
      }}>
        <Box component="main" sx={{ height: "100vh", backgroundColor: (theme) => theme.palette.grey[900] }}>
          <Header />
          <Layout>
            <Routes>
              <Route path="/" element={<ListCategory />} />
              {/* Categories */}
              <Route path="/categories" element={<ListCategory />} />
              <Route path="/categories/create" element={<CreateCategory />} />
              <Route path="/categories/edit/:id" element={<EditCategory />} />
              {/* Cast members */}
              <Route path="/cast-members" element={<ListCastMembers />} />
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
