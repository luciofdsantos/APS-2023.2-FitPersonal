import { useEffect, useState } from 'react';
import {
  GroupButtons,
  CustomCard,
  CustomLayout,
  ConfirmationDialog
} from '../../components';
import { useAlert } from '../../components/CustomAlert';
import { Grid, CircularProgress, Box } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTreinos, useDeleteTreino } from '../../hooks';
import { useParams } from 'react-router-dom';

interface Exercicio {
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

interface TreinosProps {
  vinculado?: boolean;
}

export default function Treinos({ vinculado = false }: TreinosProps) {
  const { showAlert } = useAlert();
  const navigate = useNavigate();
  const location = useLocation();
  const { idAluno } = useParams();

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedTreinoId, setSelectedTreinoId] = useState<number | null>(null);
  
  const {
    data: treinos,
    refetch: refetchTreino,
    isSuccess,
    isFetching
  } = useTreinos(!vinculado ? location.state.login.id : Number(idAluno));

  const { mutate: deleteTreino } = useDeleteTreino({
    onSuccess: () => {
      setOpenDeleteDialog(false);
      refetchTreino();
      showAlert('success', 'Treino excluido com sucesso!');
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
    navigate(
      !vinculado
        ? `/treinos/${treino.id}`
        : `/treinos-aluno-vinculado/${treino.id}`,
      {
        state: { login: location.state.login, treino: treino }
      }
    );
  };

  const handleEditNovo = () => {
    navigate(!vinculado ? '/treinos/novo' : '/treinos-aluno-vinculado/novo', {
      state: { login: location.state.login, treino: location.state.treino }
    });
  };

  useEffect(() => {
    if (location.state?.isSuccessTreino) {
      refetchTreino();
      location.state.isSuccessTreino = false;
    }
  }, [location.state, refetchTreino]);

  return (
    <CustomLayout
      appBarText={
        vinculado ? `Aluno ${location.state.data.nome} - Treinos` : 'Treinos'
      }
    >
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <GroupButtons
            buttons={[
              {
                text: 'Novo treino',
                onClick: () => handleEditNovo()
              }
            ]}
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
          treinos.map((treino: Treino, index: number) => (
            <Grid item xs={12} md={8} lg={4} key={index}>
              <CustomCard
                title={treino.nome}
                items={[
                  {
                    label: 'Descrição',
                    value: treino.descricao
                  },
                  {
                    label: 'Exercícios',
                    value: treino.exercicios.map((exercicio) => (
                      <CustomCard
                        key={index}
                        title={`Exercício - ${exercicio.nome}`}
                        items={[
                          {
                            label: 'Grupo Muscular',
                            value: exercicio.grupoMuscular
                          },
                          { label: 'Séries', value: exercicio.series },
                          { label: 'Repetições', value: exercicio.repeticoes },
                          { label: 'Carga', value: exercicio.carga },
                          {
                            label: 'Status',
                            value: exercicio.finalizado
                              ? 'Finalizado'
                              : 'Não Finalizado'
                          }
                        ]}
                      />
                    ))
                  }
                ]}
                style={{
                  borderRadius: '16px',
                  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)'
                }}
                buttons={[
                  {
                    startIcon: <EditIcon />,
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
