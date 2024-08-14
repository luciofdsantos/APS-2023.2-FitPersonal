import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import AppRoutes from './routes/AppRoutes';

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <AppRoutes />
    </StrictMode>
  );
} else {
  console.error('Elemento root não encontrado');
}
