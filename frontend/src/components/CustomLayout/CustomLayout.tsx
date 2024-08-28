import { useState } from 'react';
import { Box, Container, Toolbar } from '@mui/material';
import CustomAppBar from '../CustomAppBar';
import CustomDrawer from '../CustomDrawer';
import { ReactNode } from 'react';

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
