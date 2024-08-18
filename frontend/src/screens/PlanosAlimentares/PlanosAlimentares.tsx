import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { GroupButtons, CustomCard, CustomLayout } from '../../components';
import { useQuery } from '@tanstack/react-query';
import Dashboard from '@mui/icons-material/Dashboard';
import Grid from '@mui/material/Grid';
import { TypePlanosAlimentares } from 'src/types';

const items = [{ text: 'Dashboard', Icon: Dashboard, path: '/' }];

// const endpoint = 'http://149.100.154.48:300/planoAlimentar';

const mockData: TypePlanosAlimentares.PlanoAlimentar[] = [
  {
    id: 1,
    nome: 'Plano Alimentar 1',
    totalConsumoCarboidrato: 400.0,
    totalConsumoProteina: 180.0,
    totalConsumoGordura: 120.0,
    refeicoes: [
      {
        alimento: 'Pão Integral com Manteiga',
        quantidade: 150.0,
        kcal: 250.0,
        tipoRefeicao: 'CAFE_DA_MANHA'
      },
      {
        alimento: 'Salada de Frango com Quinoa',
        quantidade: 250.0,
        kcal: 500.0,
        tipoRefeicao: 'ALMOCO'
      },
      {
        alimento: 'Iogurte com Granola',
        quantidade: 200.0,
        kcal: 220.0,
        tipoRefeicao: 'LANCHE'
      },
      {
        alimento: 'Filé de Salmão com Arroz',
        quantidade: 300.0,
        kcal: 650.0,
        tipoRefeicao: 'JANTAR'
      }
    ]
  },
  {
    id: 2,
    nome: 'Plano Alimentar 2',
    totalConsumoCarboidrato: 320.0,
    totalConsumoProteina: 150.0,
    totalConsumoGordura: 110.0,
    refeicoes: [
      {
        alimento: 'Smoothie de Banana e Aveia',
        quantidade: 250.0,
        kcal: 300.0,
        tipoRefeicao: 'CAFE_DA_MANHA'
      },
      {
        alimento: 'Frango Assado com Batata Doce',
        quantidade: 200.0,
        kcal: 450.0,
        tipoRefeicao: 'ALMOCO'
      },
      {
        alimento: 'Maçã com Amendoim',
        quantidade: 150.0,
        kcal: 200.0,
        tipoRefeicao: 'LANCHE'
      },
      {
        alimento: 'Lasanha de Vegetais',
        quantidade: 300.0,
        kcal: 600.0,
        tipoRefeicao: 'JANTAR'
      }
    ]
  },
  {
    id: 3,
    nome: 'Plano Alimentar 3',
    totalConsumoCarboidrato: 360.0,
    totalConsumoProteina: 200.0,
    totalConsumoGordura: 105.0,
    refeicoes: [
      {
        alimento: 'Cereal com Leite',
        quantidade: 200.0,
        kcal: 250.0,
        tipoRefeicao: 'CAFE_DA_MANHA'
      },
      {
        alimento: 'Bife com Purê de Batata',
        quantidade: 250.0,
        kcal: 550.0,
        tipoRefeicao: 'ALMOCO'
      },
      {
        alimento: 'Barra de Proteína',
        quantidade: 80.0,
        kcal: 150.0,
        tipoRefeicao: 'LANCHE'
      },
      {
        alimento: 'Frango Grelhado com Salada',
        quantidade: 300.0,
        kcal: 600.0,
        tipoRefeicao: 'JANTAR'
      }
    ]
  },
  {
    id: 4,
    nome: 'Plano Alimentar 4',
    totalConsumoCarboidrato: 330.0,
    totalConsumoProteina: 170.0,
    totalConsumoGordura: 90.0,
    refeicoes: [
      {
        alimento: 'Omelete com Espinafre',
        quantidade: 200.0,
        kcal: 250.0,
        tipoRefeicao: 'CAFE_DA_MANHA'
      },
      {
        alimento: 'Salmão com Arroz Integral',
        quantidade: 220.0,
        kcal: 500.0,
        tipoRefeicao: 'ALMOCO'
      },
      {
        alimento: 'Mix de Nozes e Frutas Secas',
        quantidade: 100.0,
        kcal: 180.0,
        tipoRefeicao: 'LANCHE'
      },
      {
        alimento: 'Peito de Frango com Legumes',
        quantidade: 250.0,
        kcal: 550.0,
        tipoRefeicao: 'JANTAR'
      }
    ]
  }
];

export default function PlanosAlimentares() {
  // const { data: planoAlimentar, isSuccess } = useQuery({
  //   queryKey: ['planoAlimentar'],
  //   queryFn: async () => {
  //     const response = await fetch(endpoint);
  //     if (!response.ok) {
  //       const errorMessage = await response.text();
  //       throw new Error(`Erro ao buscar plano alimentar: ${errorMessage}`);
  //     }
  //     return response.json();
  //   },
  //   retry: false
  // });

  // const { data: refeicoes } = useQuery({
  //   queryKey: ['refeicoes'],
  //   queryFn: async () => {
  //     const response = await fetch(endpoint, {
  //       method: 'GET',
  //       headers: {
  //         'x-rapidapi-host': 'refeicoesdb.p.rapidapi.com',
  //         'x-rapidapi-key': 'a2feefd8a7mshe21f638ca82fb6fp134a83jsn32ad89e20e6e'
  //       }
  //     });

  //     if (!response.ok) {
  //       const errorMessage = await response.text();
  //       throw new Error(`Erro ao buscar exercises: ${errorMessage}`);
  //     }
  //     return response.json();
  //   },
  //   retry: false
  // });

  // console.log('refeicoes -> ', refeicoes);
  {/* {isSuccess && planoAlimentar && planoAlimentar.length > 0 ? (
          planoAlimentar.map(
            (planoAlimentar: TypePlanosAlimentares.PlanoAlimentar) => ( */}

  return (
    <CustomLayout appBarText="Planos Alimentares" items={items}>
      <Grid container spacing={3}>
        {mockData.length > 0 ? (
          mockData.map((planoAlimentar) => (

              <Grid item xs={12} md={8} lg={4} key={planoAlimentar.id}>
                <CustomCard
                  title={`Plano Alimentar ${planoAlimentar.id}`}
                  items={[
                    {
                      label: 'Total Consumo Carboidrato',
                      value: `${planoAlimentar.totalConsumoCarboidrato}`
                    },
                    {
                      label: 'Total Consumo Proteina',
                      value: `${planoAlimentar.totalConsumoProteina}`
                    },
                    {
                      label: 'Total Consumo Gordura',
                      value: `${planoAlimentar.totalConsumoGordura}`
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
                      href: `/editar-plano-alimentar/${planoAlimentar.id}`,
                      backgroundColor: 'transparent',
                      iconColor: '#6842FF',
                      border: 'none'
                    },
                    {
                      startIcon: <DeleteIcon />,
                      href: `/deletar-plano-alimentar/${planoAlimentar.id}`,
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

      <GroupButtons
        buttons={[
          { text: 'Novo Plano Alimentar', href: '/novo-plano-alimentar' }
        ]}
      />
    </CustomLayout>
  );
}
