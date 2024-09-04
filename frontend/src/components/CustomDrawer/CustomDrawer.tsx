import {
  Divider,
  Drawer as MuiDrawer,
  IconButton,
  Toolbar
} from '@mui/material';
import {
  FitnessCenter,
  PersonAdd,
  Person,
  FoodBank
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ListItems from '../ListItems';

interface DrawerProps {
  open?: boolean;
  drawerWidth: number;
}

interface CustomDrawerProps {
  open: boolean;
  drawerWidth: number;
  toggleDrawer: () => void;
}

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'drawerWidth' && prop !== 'open'
})<DrawerProps>(({ theme, open, drawerWidth }) => ({
  '& .MuiDrawer-paper': {
    backgroundImage: 'none',
    backgroundColor: '#1F2229 !important',
    boxShadow: 'none !important',
    border: 'none',
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
  {
    text: 'Treinos',
    Icon: FitnessCenter,
    path: '/treinos',
    usuario: 'ALUNO'
  },
  {
    text: 'Planos Alimentares',
    Icon: FoodBank,
    path: '/planos-alimentares',
    usuario: 'ALUNO'
  },
  { text: 'Alunos', Icon: PersonAdd, path: '/alunos', usuario: 'PROFISSIONAL' },
  {
    text: 'Editar Pefil',
    Icon: Person,
    path: '/editar-perfil',
    usuario: 'PROFISSIONAL' || 'ALUNO'
  }
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
          justifyContent: 'space-between'
        }}
      >
        <img src="/logo.svg" alt="Logo Fitpersonal" />
        <IconButton onClick={toggleDrawer}>
          <ChevronLeftIcon />
        </IconButton>
      </Toolbar>
      <Divider />
      <ListItems open={open} items={items} />
    </Drawer>
  );
}
