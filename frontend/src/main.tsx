import React from 'react';
import ReactDOM from 'react-dom/client';
import Dashboard from './screens/Dashboard';

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <Dashboard />
    </React.StrictMode>
  );
} else {
  console.error('Elemento root não encontrado');
}
