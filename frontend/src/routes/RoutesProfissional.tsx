import { Navigate, Outlet } from 'react-router-dom';
import React from 'react';

const RoutesProfissional: React.FC = () => {
  const usuarioString = localStorage.getItem('usuario');

  let isProfissional = false;

  if (usuarioString) {
    try {
      const usuario = JSON.parse(usuarioString);

      isProfissional =
        usuario.tipoUsuario === 'NUTRICIONISTA' ||
        usuario.tipoUsuario === 'PERSONAL';
    } catch (error) {
      console.error('Erro ao analisar o JSON do localStorage:', error);
    }
  }

  return isProfissional ? <Outlet /> : <Navigate to="/" />;
};

export default RoutesProfissional;
