import ReactDOM from 'react-dom/client';
import AppRoutes from './routes/AppRoutes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AlertProvider from './components/CustomAlert';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const rootElement = document.getElementById('root');

const queryClient = new QueryClient();

const theme = createTheme();

if (!rootElement) {
  console.error('Elemento root não encontrado');
} else {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <AlertProvider>
          <AppRoutes />
        </AlertProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
