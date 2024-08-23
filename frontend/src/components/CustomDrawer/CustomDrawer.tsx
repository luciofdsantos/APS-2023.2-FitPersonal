import { styled } from '@mui/material/styles';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import {
  Divider,
  Drawer as MuiDrawer,
  IconButton,
  Toolbar
} from '@mui/material';
import ListItems from '../ListItems';
import { Dashboard, FitnessCenter, FoodBank } from '@mui/icons-material';

interface DrawerProps {
  open?: boolean;
  drawerWidth: number;
}

interface CustomDrawerProps {
  open: boolean;
  drawerWidth: number;
  toggleDrawer: () => void;
  items: {
    text: string;
    Icon: React.ElementType;
    path: string;
  }[];
}

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'drawerWidth' && prop !== 'open'
})<DrawerProps>(({ theme, open, drawerWidth }) => ({
  '& .MuiDrawer-paper': {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    }),
    boxSizing: 'border-box',
    ...(!open && {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9)
      }
    })
  }
}));

const items = [
  { text: 'Dashboard', Icon: Dashboard, path: '/' },
  { text: 'Treinos', Icon: FitnessCenter, path: '/treinos' },
  { text: 'Planos Alimentares', Icon: FoodBank, path: '/planos-alimentares' }
];

export default function CustomDrawer({
  open,
  drawerWidth,
  toggleDrawer
}: CustomDrawerProps) {
  return (
    <Drawer variant="permanent" drawerWidth={drawerWidth} open={open}>
      <Toolbar
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          px: [1]
        }}
      >
        <IconButton onClick={toggleDrawer}>
          <ChevronLeftIcon />
        </IconButton>
      </Toolbar>
      <Divider />
      <ListItems open={open} items={items} />
    </Drawer>
  );
}
