import { GroupButtons, CustomCard, CustomLayout } from '../../components';
// import { useQuery } from '@tanstack/react-query';
import Dashboard from '@mui/icons-material/Dashboard';
import Grid from '@mui/material/Grid';
import EditIcon from '@mui/icons-material/Edit';

const items = [{ text: 'Dashboard', Icon: Dashboard, path: '/' }];

// const endpoint = 'http://localhost:8080/api/treinos';

export default function Novo() {
  // const { data, isFetching } = useQuery({
  //   queryKey: ['treinos'],
  //   queryFn: async () => {
  //     const response = await fetch(endpoint);
  //     if (!response.ok) {
  //       const errorMessage = await response.text();
  //       throw new Error(`Erro ao buscar treinos: ${errorMessage}`);
  //     }
  //     return response.json();
  //   }
  // });

  // console.log('data -> ', isFetching);
  // console.log('data -> ', data);

  return (
    <CustomLayout appBarText="Treinos" items={items}>
      <GroupButtons buttons={[{ text: 'Novo Treino', href: '/novo-treino' }]} />

      <Grid container spacing={3}>
        <Grid item xs={12} md={8} lg={4}>
          <CustomCard
            title="Treino Teste"
            items={[{ label: 'Descrição', value: 'Descrição para teste' }]}
            style={{
              backgroundColor: '#1F2229',
              borderRadius: '16px',
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)'
            }}
            buttons={[
              {
                startIcon: <EditIcon />,
                href: '/editar-treino',
                backgroundColor: 'transparent',
                iconColor: '#6842FF',
                border: 'none'
              }
            ]}
          />
        </Grid>
      </Grid>
    </CustomLayout>
  );
}
