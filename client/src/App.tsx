import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { useState } from 'react';
import LeftMenu from './components/LeftMenu';
import TopBar from './components/TopBar';
import { Route, Routes } from 'react-router-dom'
import Ejemplos from './pages/ejemplos/Ejemplos'
import HomePage from './pages/HomePage'
import AppContainer from './components/AppContainer';
import TareasPage from './pages/tareas/TareasPage';

const mdTheme = createTheme();

const App = () => {

  const [open, setOpen] = useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <TopBar open={open} toggleDrawer={toggleDrawer}  />
        <LeftMenu open={open} toggleDrawer={toggleDrawer} />
        <AppContainer>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/ejemplos" element={<Ejemplos />} />
            <Route path="/tareas" element={<TareasPage />} />
          </Routes>
        </AppContainer>
      </Box>
    </ThemeProvider>
  )
  
}

export default App