import { styled } from '@mui/material/styles';
import {
  IconButton,
  AppBar as MuiAppBar,
  Toolbar,
  Typography
} from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';

interface AppBarProps {
  open?: boolean;
  appBarText?: string;
  drawerWidth: number;
}

interface CustomAppBarProps {
  open: boolean;
  appBarText?: string;
  toggleDrawer: () => void;
  drawerWidth: number;
}

const background = (type: string | undefined) => {
  if (type === 'TREINOS') return 'url("../../../treinos.png")';
  if (type === 'ALUNOS') return 'url("../../../entrar.png")';
  return 'url("../../../legumes.png")';
};

const StyledAppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) =>
    prop !== 'drawerWidth' && prop !== 'open' && prop !== 'appBarText'
})<AppBarProps>(({ theme, open, drawerWidth, appBarText }) => ({
  zIndex: theme.zIndex.drawer + 1,
  backgroundColor: '#6842FF',
  backgroundImage: background(appBarText),
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  height: 200,
  width: '100%',
  position: 'fixed',
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}));

export default function CustomAppBar({
  open,
  appBarText,
  toggleDrawer,
  drawerWidth
}: CustomAppBarProps) {
  return (
    <StyledAppBar
      position="absolute"
      open={open}
      drawerWidth={drawerWidth}
      appBarText={appBarText}
    >
      <Toolbar
        sx={{
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <IconButton
          edge="start"
          color="inherit"
          onClick={toggleDrawer}
          sx={{
            marginRight: '36px',
            ...(open && { display: 'none' })
          }}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          component="h1"
          variant="h3"
          color="inherit"
          noWrap
          sx={{
            textAlign: 'center',
            flexGrow: 1,
            width: 'calc(100% - 72px)',
            position: 'relative',
            fontWeight: 'bold'
          }}
        >
          {appBarText}
        </Typography>
      </Toolbar>
    </StyledAppBar>
  );
}
