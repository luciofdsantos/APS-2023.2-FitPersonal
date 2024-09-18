import { useLocation } from 'react-router-dom';
import { Grid } from '@mui/material';
import { GroupButtons, CustomCard, CustomLayout } from '../../components';
import { useHistoricoProgresso } from '../../hooks';
import jsPDF from 'jspdf';
import { format, parseISO } from 'date-fns';
import autoTable from 'jspdf-autotable';

interface Exercicio {
  nome: string;
  inicio: string;
  fim: string;
  grupoMuscular: string;
  series: number;
  repeticoes: number;
  carga: number;
  finalizado: boolean;
  treinoId: number;
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

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text(`Histórico de Treino - ${location.state.login.nome}`, 10, 10);
    doc.setFontSize(12);

    const headers = [
      { title: 'Data', dataKey: 'dataFinalizacao' },
      { title: 'Exercício', dataKey: 'nome' },
      { title: 'Grupo Muscular', dataKey: 'grupoMuscular' },
      { title: 'Séries', dataKey: 'series' },
      { title: 'Repetições', dataKey: 'repeticoes' },
      { title: 'Carga (kg)', dataKey: 'carga' }
    ];

    const data = progressos.flatMap((progresso: Progresso) =>
      progresso.exercicios.map((exercicio) => ({
        dataFinalizacao: format(
          parseISO(progresso.dataFinalizacao),
          'dd-MM-yyyy'
        ),
        nome: exercicio.nome,
        grupoMuscular: exercicio.grupoMuscular,
        series: exercicio.series,
        repeticoes: exercicio.repeticoes,
        carga: exercicio.carga
      }))
    );

    autoTable(doc, {
      columns: headers,
      body: data
    });

    doc.save(`treino_${location.state.login.nome}.pdf`);
  };

  return (
    <CustomLayout appBarText={'Histórico'}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <GroupButtons
            buttons={[
              {
                text: 'Baixar Relatório',
                onClick: () => handleDownloadPDF()
              }
            ]}
          />
        </Grid>

        {isSuccess && progressos && progressos.length > 0 ? (
          progressos.map((progresso: Progresso, index: number) => (
            <Grid item xs={12} md={8} lg={4} key={index}>
              <CustomCard
                title={`Data ${format(parseISO(progresso.dataFinalizacao), 'dd-MM-yyyy')}`}
                items={[
                  {
                    label: 'Exercícios',
                    value: progresso.exercicios.map(
                      (exercicio, indexExercicio) => (
                        <CustomCard
                          key={indexExercicio}
                          title={`Exercício - ${exercicio.nome}`}
                        />
                      )
                    )
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
    </CustomLayout>
  );
}
