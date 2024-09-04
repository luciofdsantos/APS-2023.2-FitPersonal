import { useNavigate } from 'react-router-dom';
import { Box, Container, Toolbar } from '@mui/material';
import { ReactNode, useState } from 'react';
import CustomAppBar from '../CustomAppBar';
import CustomDrawer from '../CustomDrawer';
import { useEffect } from 'react';

interface LayoutProps {
  appBarText?: string;
  children: ReactNode;
}

export default function CustomLayout({ appBarText, children }: LayoutProps) {
  const drawerWidth = 240;

  const [open, setOpen] = useState<boolean>(true);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem('usuario');

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [navigate, isAuthenticated]);

  // useEffect(() => {
  //   window.addEventListener('load', () => {
  //     localStorage.removeItem('usuario');
  //   });
  // }, []);

  return (
    <Box sx={{ display: 'flex' }}>
      {appBarText && open && (
        <CustomDrawer
          open={open}
          toggleDrawer={toggleDrawer}
          drawerWidth={drawerWidth}
        />
      )}

      {appBarText && (
        <CustomAppBar
          open={open}
          appBarText={appBarText.toUpperCase()}
          toggleDrawer={toggleDrawer}
          drawerWidth={drawerWidth}
        />
      )}

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
          pt: 16
        }}
      >
        <Toolbar />
        <Container sx={{ mt: 4 }}>{children}</Container>
      </Box>
    </Box>
  );
}
