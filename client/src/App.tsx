import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { useState } from 'react';
import LeftMenu from './components/LeftMenu';
import TopBar from './components/TopBar';
import { Route, Routes } from 'react-router-dom';
import Ejemplos from './pages/ejemplos/Ejemplos';
import HomePage from './pages/HomePage';
import AppContainer from './components/AppContainer';
import TareasPage from './pages/tareas/TareasPage';
import TareasNuevaPage from './pages/tareas/TareasNuevaPage';
import TareasEditarPage from './pages/tareas/TareasEditarPage';
import TareasVerPage from './pages/tareas/TareasVerPage';
import { Provider } from 'react-redux';
import store from './store/store';
import CarerrasPage from './pages/carreras/CarerrasPage';
import CarreraNuevoPage from './pages/carreras/CarreraNuevoPage';
import CarrerasVerPage from './pages/carreras/CarrerasVerPage';
import CursosNuevoPage from './pages/cursos/CursosNuevoPage';
import CursosVerPage from './pages/cursos/CursosVerPage';
import CursosPage from './pages/cursos/CursosPage';

const mdTheme = createTheme();

const App = () => {
  const [open, setOpen] = useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Provider store={store}>
      <ThemeProvider theme={mdTheme}>
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <TopBar open={open} toggleDrawer={toggleDrawer} />
          <LeftMenu open={open} toggleDrawer={toggleDrawer} />
          <AppContainer>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/ejemplos" element={<Ejemplos />} />
              <Route path="/tareas" element={<TareasPage />} />
              <Route path="/tareas/nueva" element={<TareasNuevaPage />} />
              <Route path="/tareas/:id/ver" element={<TareasVerPage />} />
              <Route path="/tareas/:id/editar" element={<TareasEditarPage />} />
              <Route path="/tareas/:id/editar" element={<TareasNuevaPage />} />
              <Route path="/carreras" element={<CarerrasPage />} />
              <Route path="/carrera/nueva" element={<CarreraNuevoPage />} />
              <Route path="/carreras/:id/ver" element={<CarrerasVerPage />} />
              <Route path="/cursos" element={<CursosPage />} />
              <Route path="/curso/nuevo" element={<CursosNuevoPage />} />
              <Route path="/cursos/:id/ver" element={<CursosVerPage />} />
            </Routes>
          </AppContainer>
        </Box>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
