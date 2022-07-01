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

import HomeIcon from '@mui/icons-material/Home';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { FC } from 'react';
import { drawerWidth } from '../constants';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import FingerprintIcon from '@mui/icons-material/Fingerprint';

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
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
  }),
);

interface MenuItemProps {
  title: string;
  to: string;
  icon: JSX.Element;
}

const MenuItem: FC<MenuItemProps> = ({ title, to, icon }) => (
  <ListItemButton component={Link} to={to}>
    <ListItemIcon>
      {icon}
    </ListItemIcon>
    <ListItemText primary={title} />
  </ListItemButton>
)

export const MainListItems: FC = () => {
  const { cantidad } = useAppSelector(state => state.tarea);
  return (
    <>
      <MenuItem title="Home" to="/" icon={<HomeIcon />} />
      <MenuItem title="Ejemplos" to="/ejemplos" icon={<FormatListBulletedIcon />} />
      <MenuItem title="Tareas" to="/tareas" icon={<AssignmentIcon />} />
      <MenuItem title="Profesores" to="/profesores" icon={<AssignmentIndIcon />} />
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
  )
}

export default LeftMenu