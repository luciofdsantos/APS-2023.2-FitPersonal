import { GroupButtons, CustomCard, CustomLayout } from '../../components';
// import { useQuery } from '@tanstack/react-query';
import Dashboard from '@mui/icons-material/Dashboard';
import Grid from '@mui/material/Grid';

const items = [{ text: 'Dashboard', Icon: Dashboard, path: '/' }];

export default function Novo() {
  // https://tanstack.com/query/latest/docs/framework/react/guides/query-functions
  // const { data, isFetching } = useQuery({
  //   queryKey: ['treinos'],
  //   queryFn: async () => {
  //     const response = await fetch('endpoint');
  //     if (!response.ok) {
  //       throw new Error('Erro ao buscar treinos.');
  //     }
  //     return response.json();
  //   }
  // });

  // console.log('data -> ', data);

  return (
    <CustomLayout appBarText="Planos Alimentares" items={items}>
      <GroupButtons buttons={[{ text: 'Novo Plano Alimentar', href: '/novo-plano-alimentar' }]} />

      <Grid container spacing={3}>
        <Grid item xs={12} md={8} lg={4}>
          <CustomCard
            title="Plano Alimentar Teste"
            items={[{ label: 'Descrição', value: 'Descrição para teste' }]}
            style={{
              backgroundColor: '#1F2229',
              borderRadius: '16px',
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)'
            }}
            editLink="/editar-plano-alimentar"
          />
        </Grid>
      </Grid>
    </CustomLayout>
  );
}
