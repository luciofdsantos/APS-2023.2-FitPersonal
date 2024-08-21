import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import { Box, Container, CssBaseline, Toolbar } from '@mui/material';
import Copyright from '../Copyright';
import CustomAppBar from '../CustomAppBar';
import CustomDrawer from '../CustomDrawer';
import { ReactNode } from 'react';

interface LayoutProps {
  appBarText: string;
  items: {
    text: string;
    Icon: React.ElementType;
    path: string;
  }[];
  children: ReactNode;
}

export default function CustomLayout({
  appBarText,
  items,
  children
}: LayoutProps) {
  const drawerWidth = 240;

  const [open, setOpen] = useState<boolean>(true);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider
      theme={createTheme({
        typography: {
          fontFamily: 'Inter, Arial, sans-serif'
        }
      })}
    >
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />

        <CustomAppBar
          open={open}
          appBarText={appBarText.toUpperCase()}
          toggleDrawer={toggleDrawer}
          drawerWidth={drawerWidth}
        />

        <CustomDrawer
          open={open}
          toggleDrawer={toggleDrawer}
          items={items}
          drawerWidth={drawerWidth}
        />

        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
            pt: 16
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            {children}
            <Copyright style={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
