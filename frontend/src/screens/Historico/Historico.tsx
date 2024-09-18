import { useLocation } from 'react-router-dom';
import { Grid } from '@mui/material';
import { CustomCard, CustomLayout } from '../../components';
import { useHistoricoProgresso } from '../../hooks';

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

interface Progresso {
  id: number;
  descricao: string;
  dataFinalizacao: string;
  exercicios: Exercicio[];
}

export default function Historico() {
  const location = useLocation();
  const { data: progressos, isSuccess } = useHistoricoProgresso(
    location.state.login.id
  );

  return (
    <CustomLayout appBarText={'Histórico'}>
      <Grid container spacing={3}>
        {isSuccess && progressos && progressos.length > 0 ? (
          progressos.map((progresso: Progresso, index: number) => (
            <Grid item xs={12} md={8} lg={4} key={index}>
              <CustomCard
                title={`Data ${progresso.dataFinalizacao}`}
                items={[
                  {
                    label: 'Exercícios',
                    value: progresso.exercicios.map(
                      (exercicio, indexExercicio) => (
                        <CustomCard
                          key={indexExercicio}
                          title={`Exercício - ${exercicio.nome}`}
                          items={[
                            {
                              label: 'Grupo Muscular',
                              value: exercicio.grupoMuscular
                            },
                            { label: 'Séries', value: exercicio.series },
                            {
                              label: 'Repetições',
                              value: exercicio.repeticoes
                            },
                            { label: 'Carga', value: exercicio.carga },
                            {
                              label: 'Status',
                              value: exercicio.finalizado
                                ? 'Finalizado'
                                : 'Não Finalizado'
                            }
                          ]}
                        />
                      )
                    )
                  }
                ]}
                style={{
                  borderRadius: '16px',
                  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)'
                }}
                buttons={[
                  {
                    // startIcon: <VisibilityIcon />,
                    // onClick: () => handleView(treino),
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

        {isSuccess ? (
          progressos && progressos.length > 0 ? (
            progressos.map((progresso: Progresso) => (
              <Grid item xs={12} key={progresso.id}>
                <div>{progresso.dataFinalizacao}</div>
              </Grid>
            ))
          ) : (
            <Grid item xs={12} sx={{ pb: 2 }}>
              <div>Nenhum progresso encontrado</div>
            </Grid>
          )
        ) : (
          <Grid item xs={12} sx={{ pb: 2 }}>
            <div>Carregando...</div>
          </Grid>
        )}
      </Grid>
    </CustomLayout>
  );
}
