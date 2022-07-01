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

import { Provider } from 'react-redux';
import store from './store/store';

import TareasPage from './pages/tareas/TareasPage';
import TareasNuevaPage from './pages/tareas/TareasNuevaPage';
import TareasEditarPage from './pages/tareas/TareasEditarPage';
import TareasVerPage from './pages/tareas/TareasVerPage';

import ProfesoresPage from './pages/profesores/ProfesoresPage';
import ProfesoresEditarPage from './pages/profesores/ProfesoresEditarPage';
import ProfesoresNuevoPage from './pages/profesores/ProfesoresNuevoPage';
import ProfesoresVerPage from './pages/profesores/ProfesoresVerPage';

import RolesPage from './pages/roles/RolesPage';
import RolesEditarPage from './pages/roles/RolesEditarPage';
import RolesNuevoPage from './pages/roles/RolesNuevoPage';
import RolesVerPage from './pages/roles/RolesVerPage';

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

              <Route path="/profesores" element={<ProfesoresPage />} />
              <Route path="/profesores/nuevo" element={<ProfesoresNuevoPage />} />
              <Route path="/profesores/:id/ver" element={<ProfesoresVerPage />} />
              <Route path="/profesores/:id/editar" element={<ProfesoresEditarPage />} />

              <Route path="/roles" element={<RolesPage />} />
              <Route path="/roles/nuevo" element={<RolesNuevoPage />} />
              <Route path="/roles/:id/ver" element={<RolesVerPage />} />
              <Route path="/roles/:id/editar" element={<RolesEditarPage />} />
            </Routes>
          </AppContainer>
        </Box>
      </ThemeProvider>
    </Provider>
  );
};

export default App;