import React from 'react';
import {
  Grid,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface Item {
  text: string;
  Icon: React.ElementType;
  path: string;
  usuario: string;
}

interface ListItemsProps {
  items: Item[];
  open: boolean;
}

export default function ListItems({ items, open }: ListItemsProps) {
  const navigate = useNavigate();

  const handleClick = (path: string) => {
    navigate(path);
  };

  const usuarioString = localStorage.getItem('usuario');
  let isProfissional = 'ALUNO';

  if (usuarioString) {
    try {
      const usuario = JSON.parse(usuarioString);

      if (
        usuario.tipoUsuario === 'NUTRICIONISTA' ||
        usuario.tipoUsuario === 'PERSONAL'
      ) {
        isProfissional = 'PROFISSIONAL';
      }
    } catch (error) {
      console.error('Erro ao analisar o JSON do localStorage:', error);
    }
  }

  return (
    <Grid item xs={12} md={8} lg={9}>
      {items.map((item, index) => {
        const shouldShow = item.usuario === isProfissional;

        return (
          shouldShow && (
            <ListItemButton key={index} onClick={() => handleClick(item.path)}>
              <ListItemIcon>
                <item.Icon />
              </ListItemIcon>
              {open && <ListItemText primary={item.text} />}
            </ListItemButton>
          )
        );
      })}
    </Grid>
  );
}
