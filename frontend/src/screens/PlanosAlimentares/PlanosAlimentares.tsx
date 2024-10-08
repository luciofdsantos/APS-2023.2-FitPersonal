import { useState, useEffect } from 'react';
import {
  GroupButtons,
  CustomCard,
  CustomLayout,
  ConfirmationDialog
} from '../../components';
import { useAlert } from '../../components/CustomAlert';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { CircularProgress, Box, Grid } from '@mui/material';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { usePlanosAlimentares, useDeletePlanoAlimentar } from '../../hooks';

interface Refeicao {
  id?: number;
  alimento: string;
  quantidade: number;
  kcal: number;
  carboidrato: number;
  proteina: number;
  gordura: number;
  tipoRefeicao: string;
}

interface PlanoAlimentar {
  id: number;
  nome?: string;
  metaConsumoKcal: number;
  totalConsumoKcal: number;
  metaConsumoCarboidrato: number;
  totalConsumoCarboidrato: number;
  metaConsumoProteina: number;
  totalConsumoProteina: number;
  metaConsumoGordura: number;
  totalConsumoGordura: number;
  refeicoes: Refeicao[];
}

interface PlanosAlimentaresProps {
  vinculado?: boolean;
}

export default function PlanosAlimentares({
  vinculado = false
}: PlanosAlimentaresProps) {
  const { showAlert } = useAlert();
  const navigate = useNavigate();
  const location = useLocation();
  const { idAluno } = useParams();

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedPlanoAlimentarId, setSelectedPlanoAlimentarId] = useState<
    number | null
  >(null);

  const {
    data: planoalimentar,
    refetch: refetchPlanoAlimentar,
    isSuccess,
    isFetching
  } = usePlanosAlimentares(
    !vinculado ? location.state.login?.id : Number(idAluno)
  );

  const { mutate: deletePlanoAlimentar } = useDeletePlanoAlimentar({
    onSuccess: () => {
      setOpenDeleteDialog(false);
      refetchPlanoAlimentar();
      showAlert('success', 'Plano alimentar excluido com sucesso!');
      setSelectedPlanoAlimentarId(null);
    },
    onError: (error) => {
      console.error('Erro na exclusão:', error.message);
    }
  });

  const handleOpenDeleteDialog = (id: number) => {
    setSelectedPlanoAlimentarId(id);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setSelectedPlanoAlimentarId(null);
  };

  const handleDelete = () => {
    if (selectedPlanoAlimentarId !== null) {
      deletePlanoAlimentar(selectedPlanoAlimentarId);
    }
  };

  const handleEdit = (planoalimentar: PlanoAlimentar) => {
    navigate(
      !vinculado
        ? `/planos-alimentares/${planoalimentar.id}`
        : `/planos-alimentares-aluno-vinculado/${planoalimentar.id}`,
      {
        state: { login: location.state.login, planoalimentar: planoalimentar }
      }
    );
  };

  const handleEditNovo = () => {
    navigate(
      !vinculado
        ? '/planos-alimentares/novo'
        : '/planos-alimentares-aluno-vinculado/novo',
      {
        state: {
          login: location.state.login,
          planoalimentar: location.state.planoalimentar
        }
      }
    );
  };

  useEffect(() => {
    if (location.state?.isSuccessPlanoAlimentar) {
      refetchPlanoAlimentar();
      location.state.isSuccessPlanoAlimentar = false;
    }
  }, [location.state, refetchPlanoAlimentar]);

  return (
    <CustomLayout
      appBarText={
        vinculado
          ? `Aluno ${location.state.data.nome} - Planos Alimentares`
          : 'Planos Alimentares'
      }
    >
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <GroupButtons
            buttons={[
              {
                text: 'Novo Plano Alimentar',
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
        ) : isSuccess && planoalimentar && planoalimentar.length > 0 ? (
          planoalimentar.map(
            (planoalimentar: PlanoAlimentar, index: number) => (
              <Grid item xs={12} key={index}>
                <CustomCard
                  title={`Plano Alimentar ${planoalimentar.id}`}
                  items={[
                    {
                      label: 'Meta Consumo Carboidrato',
                      value: planoalimentar.metaConsumoCarboidrato
                    },
                    {
                      label: 'Total Consumo Carboidrato',
                      value: planoalimentar.totalConsumoCarboidrato
                    },
                    {
                      label: 'Meta Consumo Proteina',
                      value: planoalimentar.metaConsumoProteina
                    },
                    {
                      label: 'Total Consumo Proteina',
                      value: planoalimentar.totalConsumoProteina
                    },
                    {
                      label: 'Meta Consumo Gordura',
                      value: planoalimentar.metaConsumoGordura
                    },
                    {
                      label: 'Total Consumo Gordura',
                      value: planoalimentar.totalConsumoGordura
                    },
                    {
                      label: 'Meta Consumo Kcal',
                      value: planoalimentar.metaConsumoKcal
                    },
                    {
                      label: 'Total Consumo Kcal',
                      value: planoalimentar.totalConsumoKcal
                    },
                    {
                      label: 'Refeições',
                      value: planoalimentar.refeicoes.map((refeicao, index) => (
                        <CustomCard
                          key={index}
                          title={`Refeição - ${refeicao.tipoRefeicao}`}
                          items={[
                            { label: 'Alimento', value: refeicao.alimento },
                            {
                              label: 'Quantidade',
                              value: `${refeicao.quantidade} g`
                            },
                            { label: 'Kcal', value: `${refeicao.kcal} kcal` },
                            {
                              label: 'Carboidratos',
                              value: `${refeicao.carboidrato} g`
                            },
                            {
                              label: 'Proteínas',
                              value: `${refeicao.proteina} g`
                            },
                            {
                              label: 'Gorduras',
                              value: `${refeicao.gordura} g`
                            },
                            {
                              label: 'Tipo de Refeição',
                              value: refeicao.tipoRefeicao
                            }
                          ]}
                          style={{
                            backgroundColor: '#2F323A',
                            borderRadius: '8px',
                            marginBottom: '8px',
                            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)'
                          }}
                        />
                      ))
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
                      onClick: () => handleEdit(planoalimentar),
                      backgroundColor: 'transparent',
                      iconColor: '#6842FF',
                      border: 'none'
                    },
                    {
                      startIcon: <DeleteIcon />,
                      onClick: () => handleOpenDeleteDialog(planoalimentar.id),
                      backgroundColor: 'transparent',
                      iconColor: '#6842FF',
                      border: 'none'
                    }
                  ]}
                />
              </Grid>
            )
          )
        ) : (
          <Grid item xs={12} sx={{ pb: 2 }}>
            <div>Nenhum plano alimentar encontrado</div>
          </Grid>
        )}
      </Grid>

      <ConfirmationDialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        onConfirm={handleDelete}
        title="Confirmar Exclusão"
        message="Tem certeza de que deseja excluir este plano alimentar?"
      />
    </CustomLayout>
  );
}
