import { useState } from 'react';
import {
  GroupButtons,
  CustomCard,
  CustomLayout,
  ConfirmationDialog
} from '../../components';
import { Grid, CircularProgress, Box } from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Dashboard,
  FoodBank
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useTreinos, useDeleteTreino } from '../../hooks';

interface Exercicio {
  id: number;
  nome: string;
  inicio: string;
  fim: string;
  grupoMuscular: string;
  series: number;
  repeticoes: number;
  carga: number;
  finalizado: boolean;
}

interface Treino {
  id: number;
  nome: string;
  descricao: string;
  exercicios: Exercicio[];
}

export default function Treinos() {
  const navigate = useNavigate();

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedTreinoId, setSelectedTreinoId] = useState<number | null>(null);

  const { data: treinos, isSuccess, isFetching } = useTreinos();
  const { mutate: deleteTreino } = useDeleteTreino({
    onSuccess: () => {
      setOpenDeleteDialog(false);
      setSelectedTreinoId(null);
    },
    onError: (error) => {
      console.error('Erro na exclusão:', error.message);
    }
  });

  const handleOpenDeleteDialog = (id: number) => {
    setSelectedTreinoId(id);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setSelectedTreinoId(null);
  };

  const handleDelete = () => {
    if (selectedTreinoId !== null) {
      deleteTreino(selectedTreinoId);
    }
  };

  const handleEdit = (treino: Treino) => {
    navigate(`/editar-treino/${treino.id}`, {
      state: { treino }
    });
  };

  return (
    <CustomLayout
      appBarText="Treinos"
      items={[
        { text: 'Dashboard', Icon: Dashboard, path: '/' },
        {
          text: 'Planos Alimentares',
          Icon: FoodBank,
          path: '/planos-alimentares'
        }
      ]}
    >
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <GroupButtons
            buttons={[{ text: 'Novo Treino', href: '/treinos/novo' }]}
          />
        </Grid>

        {isFetching ? (
          <Grid
            item
            xs={12}
            container
            justifyContent="center"
            alignItems="center"
          >
            <Box display="flex" alignItems="center" justifyContent="center">
              <CircularProgress />
            </Box>
          </Grid>
        ) : isSuccess && treinos && treinos.length > 0 ? (
          treinos.map((treino: Treino) => (
            <Grid item xs={12} md={8} lg={4} key={treino.id}>
              <CustomCard
                title={treino.nome}
                items={[
                  {
                    label: 'Descrição',
                    value: treino.descricao
                  }
                ]}
                style={{
                  backgroundColor: '#1F2229',
                  borderRadius: '16px',
                  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)'
                }}
                buttons={[
                  {
                    startIcon: <EditIcon />,
                    href: `/editar-treino/${treino.id}`,
                    onClick: () => handleEdit(treino),
                    backgroundColor: 'transparent',
                    iconColor: '#6842FF',
                    border: 'none'
                  },
                  {
                    startIcon: <DeleteIcon />,
                    onClick: () => handleOpenDeleteDialog(treino.id),
                    backgroundColor: 'transparent',
                    iconColor: '#6842FF',
                    border: 'none'
                  }
                ]}
              />
            </Grid>
          ))
        ) : (
          <Grid item xs={12} sx={{ pb: 2 }}>
            <div>Nenhum treino encontrado</div>
          </Grid>
        )}
      </Grid>

      <ConfirmationDialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        onConfirm={handleDelete}
        title="Confirmar Exclusão"
        message="Tem certeza de que deseja excluir este treino?"
      />
    </CustomLayout>
  );
}
