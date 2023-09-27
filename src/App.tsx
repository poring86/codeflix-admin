import { Box, ThemeProvider, createTheme } from '@mui/material'
import Header from './components/Header'

const theme = createTheme({})

export default function App() {
  return (

    <ThemeProvider theme={theme}>
      <Box component="main" sx={{ height: "100vh", backgroundColor: "#000" }}>
        <Header />
      </Box>
    </ThemeProvider>
  )
}
