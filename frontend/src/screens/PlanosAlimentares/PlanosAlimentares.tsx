import { useState } from 'react';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { GroupButtons, CustomCard, CustomLayout } from '../../components';
import { useQuery, useMutation } from '@tanstack/react-query';
import Dashboard from '@mui/icons-material/Dashboard';
import Grid from '@mui/material/Grid';
import {
  CircularProgress,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@mui/material';
import { TypePlanosAlimentares } from 'src/types';
import { useNavigate } from 'react-router-dom';

const items = [{ text: 'Dashboard', Icon: Dashboard, path: '/' }];

const endpoint = 'http://92.113.32.219:8080/api/planoalimentar';

export default function PlanosAlimentares() {
  const navigate = useNavigate();

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedPlanoAlimentarId, setSelectedPlanoAlimentarId] = useState<
    number | null
  >(null);

  const {
    data: planoalimentar,
    refetch,
    isSuccess,
    isFetching
  } = useQuery({
    queryKey: ['planoalimentar'],
    queryFn: async () => {
      const response = await fetch(endpoint);
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Erro ao buscar plano alimentar: ${errorMessage}`);
      }
      return response.json();
    },
    retry: false
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(`${endpoint}/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Erro ao excluir treino: ${errorMessage}`);
      }
      return response.json();
    },
    onSuccess: () => {
      setOpenDeleteDialog(false);
      setSelectedPlanoAlimentarId(null);
      refetch();
    },
    onError: (error: Error) => {
      console.error(error.message);
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
      deleteMutation.mutate(selectedPlanoAlimentarId);
    }
  };

  const handleEdit = (planoalimentar: TypePlanosAlimentares.PlanoAlimentar) => {
    navigate(`/editar-plano-alimentar/${planoalimentar.id}`, {
      state: { planoalimentar }
    });
  };

  return (
    <CustomLayout appBarText="Planos Alimentares" items={items}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <GroupButtons
            buttons={[
              { text: 'Novo Plano Alimentar', href: '/novo-plano-alimentar' }
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
            (planoalimentar: TypePlanosAlimentares.PlanoAlimentar) => (
              <Grid item xs={12} md={8} lg={4} key={planoalimentar.id}>
                <CustomCard
                  title={`Plano Alimentar ${planoalimentar.id}`}
                  items={[
                    {
                      label: 'Total Consumo Carboidrato',
                      value: `${planoalimentar.totalConsumoCarboidrato}`
                    },
                    {
                      label: 'Total Consumo Proteina',
                      value: `${planoalimentar.totalConsumoProteina}`
                    },
                    {
                      label: 'Total Consumo Gordura',
                      value: `${planoalimentar.totalConsumoGordura}`
                    },
                    {
                      label: 'Refeições',
                      value: `${planoalimentar.refeicoes}`
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
                      href: `/editar-plano-alimentar/${planoalimentar.id}`,
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

      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Confirmar Exclusão</DialogTitle>
        <DialogContent>
          <p>Tem certeza de que deseja excluir este plano alimentar?</p>
        </DialogContent>
        <DialogActions>
          <GroupButtons
            buttons={[
              { text: 'Cancelar', onClick: () => handleCloseDeleteDialog() },
              {
                text: 'Excluir',
                onClick: () => handleDelete()
              }
            ]}
          />
        </DialogActions>
      </Dialog>
    </CustomLayout>
  );
}
