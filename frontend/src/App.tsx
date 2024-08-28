import ReactDOM from 'react-dom/client';
import AppRoutes from './routes/AppRoutes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AlertProvider from './components/CustomAlert';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import theme from './theme';

const rootElement = document.getElementById('root');

const queryClient = new QueryClient();

if (!rootElement) {
  console.error('Elemento root não encontrado');
} else {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme('dark')}>
        <AlertProvider>
          <CssBaseline />
          <AppRoutes />
        </AlertProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
