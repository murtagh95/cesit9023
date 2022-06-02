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
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { FC } from 'react';
import { drawerWidth } from '../constants';
import { Link } from 'react-router-dom';

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

export const mainListItems = (
    <>
      <MenuItem title="Home" to="/" icon={<DashboardIcon />} />
      <MenuItem title="Ejemplos" to="/ejemplos" icon={<ShoppingCartIcon />} />
      <MenuItem title="Tareas" to="/tareas" icon={<PeopleIcon />} />
    </>
  );

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
        {mainListItems}
        </List>
    </Drawer>
  )
}

export default LeftMenu