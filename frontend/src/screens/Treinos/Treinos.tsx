import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { GroupButtons, CustomCard, CustomLayout } from '../../components';
import { useQuery } from '@tanstack/react-query';
import Dashboard from '@mui/icons-material/Dashboard';
import Grid from '@mui/material/Grid';
import { CircularProgress, Box } from '@mui/material';
import { TypeTreinos } from 'src/types';

const items = [{ text: 'Dashboard', Icon: Dashboard, path: '/' }];

const endpoint = 'http://92.113.32.219:8080/api/treinos';

export default function Treinos() {
  const {
    data: treinos,
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

  return (
    <CustomLayout appBarText="Treinos" items={items}>
      <Grid container spacing={3}>
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
                    // href: `/deletar-treino/${treino.id}`,
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

      <GroupButtons buttons={[{ text: 'Novo Treino', href: '/novo-treino' }]} />
    </CustomLayout>
  );
}
