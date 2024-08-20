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
  DialogTitle,
s} from '@mui/material';
import { TypeTreinos } from 'src/types';

const items = [{ text: 'Dashboard', Icon: Dashboard, path: '/' }];

const endpoint = 'http://92.113.32.219:8080/api/treinos';

export default function Treinos() {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedTreinoId, setSelectedTreinoId] = useState<number | null>(null);

  const {
    data: treinos,
    refetch,
    isSuccess,
    isFetching
  } = useQuery({
    queryKey: ['treinos'],
    queryFn: async () => {
      const response = await fetch(endpoint);
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Erro ao buscar treinos: ${errorMessage}`);
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
      setSelectedTreinoId(null);
      refetch();
    },
    onError: (error: Error) => {
      console.error(error.message);
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
      deleteMutation.mutate(selectedTreinoId);
    }
  };

  return (
    <CustomLayout appBarText="Treinos" items={items}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <GroupButtons
            buttons={[{ text: 'Novo Treino', href: '/novo-treino' }]}
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
          treinos.map((treino: TypeTreinos.Treino) => (
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

      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Confirmar Exclusão</DialogTitle>
        <DialogContent>
          <p>Tem certeza de que deseja excluir este treino?</p>
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
