import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ReactNode, useState } from 'react';
import { Box, Container, CssBaseline, Toolbar } from '@mui/material';
import Copyright from '../Copyright';
import CustomAppBar from '../CustomAppBar';
import CustomDrawer from '../CustomDrawer';

type LayoutProps = {
  appBarText: string;
  items: {
    text: string;
    Icon: React.ElementType;
    path: string;
  }[];
  children: ReactNode;
};

const defaultTheme = createTheme({
  typography: {
    fontFamily: 'Inter, Arial, sans-serif'
  }
});

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
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <CustomAppBar
          open={open}
          appBarText={appBarText}
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
            overflow: 'auto'
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
