import {
  Divider,
  Drawer as MuiDrawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
  Toolbar,
} from '@mui/material';

import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { FC } from 'react';
import { drawerWidth } from '../constants';
import { Link } from 'react-router-dom';
import SchoolIcon from '@material-ui/icons/School';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import PersonIcon from '@mui/icons-material/Person';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import { useAppSelector } from '../store/hooks';

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  '& .MuiDrawer-paper': {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: 'border-box',
    ...(!open && {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

interface MenuItemProps {
  title: string;
  to: string;
  icon: JSX.Element;
}

const MenuItem: FC<MenuItemProps> = ({ title, to, icon }) => (
  <ListItemButton component={Link} to={to}>
    <ListItemIcon>{icon}</ListItemIcon>
    <ListItemText primary={title} />
  </ListItemButton>
);

export const MainListItems: FC = () => {
  const { cantidadCarrera } = useAppSelector((state) => state.carrera);
  const { cantidadCursos } = useAppSelector((state) => state.curso);
  const { cantidadMaterias } = useAppSelector((state) => state.materia);

  return (
    <>
      <MenuItem title="Home" to="/" icon={<DashboardIcon />} />
      {/* <MenuItem title="Ejemplos" to="/ejemplos" icon={<ShoppingCartIcon />} /> */}
      <MenuItem title={`Tareas`} to="/tareas" icon={<PeopleIcon />} />
      <MenuItem title={`Carreras `} to="/carreras" icon={<SchoolIcon />} />
      <MenuItem title={`Cursos `} to="/cursos" icon={<HomeWorkIcon />} />
      <MenuItem title="Alumnos" to="/alumnos" icon={<PersonIcon />} />
      <MenuItem title={`Materias`} to="/materias" icon={<MenuBookIcon />} />
      <MenuItem
        title="Profesores"
        to="/profesores"
        icon={<AssignmentIndIcon />}
      />
      <MenuItem title="Roles" to="/roles" icon={<FingerprintIcon />} />
    </>
  );
};

interface LeftMenuProps {
  open: boolean;
  toggleDrawer: () => void;
}

const LeftMenu: FC<LeftMenuProps> = ({ open, toggleDrawer }) => {
  return (
    <Drawer variant="permanent" open={open}>
      <Toolbar
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          px: [1],
        }}
      >
        <IconButton onClick={toggleDrawer}>
          <ChevronLeftIcon />
        </IconButton>
      </Toolbar>
      <Divider />
      <List component="nav">
        <MainListItems />
      </List>
    </Drawer>
  );
};

export default LeftMenu;
