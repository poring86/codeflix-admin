import { Box, ThemeProvider, Typography } from '@mui/material'
import Header from './components/Header'
import { appTheme } from './config/theme'
import Layout from './components/Layout'
import { Route, Routes } from 'react-router-dom'

const About = () => <h1>About</h1>
const Home = () => <h1>Home</h1>

export default function App() {
  return (

    <ThemeProvider theme={appTheme}>
      <Box component="main" sx={{ height: "100vh", backgroundColor: (theme) => theme.palette.grey[900] }}>
        <Header />
        <Layout>
          <Typography variant="h1" component="h1">
            News
          </Typography>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/news" element={<About />} />
          </Routes>
        </Layout>
      </Box>
    </ThemeProvider>
  )
}
