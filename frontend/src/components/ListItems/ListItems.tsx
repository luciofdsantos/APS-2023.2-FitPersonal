import {
  Grid,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  FitnessCenter,
  FoodBank,
  Person,
  PersonAdd,
  CalendarMonth
} from '@mui/icons-material';

interface ListItemsProps {
  open: boolean;
}

const items = [
  {
    text: 'Treinos',
    Icon: FitnessCenter,
    path: '/treinos',
    usuario: 'ALUNO'
  },
  {
    text: 'Planos Alimentares',
    Icon: FoodBank,
    path: '/planos-alimentares',
    usuario: 'ALUNO'
  },
  { text: 'Alunos', Icon: PersonAdd, path: '/alunos', usuario: 'PROFISSIONAL' },
  {
    text: 'Editar Pefil',
    Icon: Person,
    path: '/editar-perfil',
    usuario: 'ALUNO'
  },
  {
    text: 'Histórico',
    Icon: CalendarMonth,
    path: '/historico-progresso',
    usuario: 'ALUNO'
  }
];

export default function ListItems({ open }: ListItemsProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = (path: string) => {
    navigate(path, {
      state: { login: location.state.login, treino: location.state.treino }
    });
  };

  const usuarioString = localStorage.getItem('usuario');
  let typeUsuario = 'ALUNO';

  if (usuarioString) {
    try {
      const usuario = JSON.parse(usuarioString);

      if (
        usuario.tipoUsuario === 'NUTRICIONISTA' ||
        usuario.tipoUsuario === 'PERSONAL'
      ) {
        typeUsuario = 'PROFISSIONAL';
      }
    } catch (error) {
      console.error('Erro ao analisar o JSON do localStorage:', error);
    }
  }

  return (
    <Grid item xs={12} md={8} lg={9}>
      {items.map((item, index) => {
        const shouldShow: boolean = item.usuario === typeUsuario;

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
