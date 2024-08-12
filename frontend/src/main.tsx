import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './screens/Home';

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <Home />
    </React.StrictMode>
  );
} else {
  console.error('Elemento root não encontrado');
}
