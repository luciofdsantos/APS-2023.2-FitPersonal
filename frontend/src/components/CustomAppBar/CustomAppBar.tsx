import { styled } from '@mui/material/styles';
import {
  IconButton,
  AppBar as MuiAppBar,
  Toolbar,
  Typography
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { TypeAppBar } from 'src/types';

const StyledAppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'drawerWidth' && prop !== 'open'
})<TypeAppBar.AppBarProps>(({ theme, open, drawerWidth }) => ({
  zIndex: theme.zIndex.drawer + 1,
  backgroundColor: '#6842FF',
  backgroundImage: `url('src/assets/images/bar.png')`,
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
}: TypeAppBar.CustomAppBarProps) {
  return (
    <StyledAppBar position="absolute" open={open} drawerWidth={drawerWidth}>
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
          aria-label="open drawer"
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
          variant="h6"
          color="inherit"
          noWrap
          sx={{
            textAlign: 'center',
            flexGrow: 1,
            width: 'calc(100% - 72px)',
            position: 'relative'
          }}
        >
          {appBarText}
        </Typography>
      </Toolbar>
    </StyledAppBar>
  );
}
