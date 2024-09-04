import {
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Skeleton
} from '@mui/material';
import { CustomLayout, GroupButtons } from '../../components';
import {
  useTodosAlunosProfissional,
  useTodosAlunos,
  useVincularAluno,
  useDesvincularAluno
} from '../../hooks';

interface Aluno {
  id: number;
  nome: string;
  sobrenome: string;
  sexo: string;
}

export default function Alunos() {
  const {
    data: alunos,
    refetch: refetchAlunos,
    isFetching: isFetchingTodosAlunos
  } = useTodosAlunos();

  const {
    data: alunosVinculados,
    refetch: refetchAlunosVinculados,
    isFetching: isFetchingAlunosVinculados
  } = useTodosAlunosProfissional();

  const { mutate: vincularAluno, isPending: isPendingVincularAluno } =
    useVincularAluno({
      onSuccess: () => {
        refetchAlunos();
        refetchAlunosVinculados();
      }
    });

  const { mutate: desvincularAluno, isPending: isPendingDesvincularAluno } =
    useDesvincularAluno({
      onSuccess: () => {
        refetchAlunos();
        refetchAlunosVinculados();
      }
    });

  const isVinculado = (alunoId: number) => {
    return (
      alunosVinculados?.some((aluno: Aluno) => aluno.id === alunoId) ?? false
    );
  };

  const isLoading =
    isFetchingTodosAlunos ||
    isFetchingAlunosVinculados ||
    isPendingVincularAluno ||
    isPendingDesvincularAluno;

  return (
    <CustomLayout appBarText="Alunos">
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <GroupButtons
            buttons={[
              { text: 'Atualizar Tabela', onClick: () => refetchAlunos }
            ]}
            height="60%"
          />

          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Nome</TableCell>
                  <TableCell>Sobrenome</TableCell>
                  <TableCell>Sexo</TableCell>
                  <TableCell>Opções</TableCell>
                </TableRow>
              </TableHead>
              {isLoading ? (
                <Skeleton variant="circular" width={80} height={80} />
              ) : (
                <TableBody>
                  {alunos?.map((data: Aluno, index: number) => (
                    <TableRow
                      key={index}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {data.id}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {data.nome}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {data.sobrenome}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {data.sexo === 'OUTRO' ? 'Não declarado' : data.sexo}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {isVinculado(data.id) ? (
                          <>
                            <Button color="primary" variant="text">
                              Treinos
                            </Button>

                            <Button color="primary" variant="text">
                              Planos Alimentares
                            </Button>
                          </>
                        ) : (
                          ''
                        )}

                        {!isVinculado(data.id) ? (
                          <Button
                            color="primary"
                            variant="text"
                            onClick={() => vincularAluno(data.id)}
                          >
                            Vincular
                          </Button>
                        ) : (
                          <Button
                            color="primary"
                            variant="text"
                            onClick={() => desvincularAluno(data.id)}
                          >
                            Desvincular
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              )}
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </CustomLayout>
  );
}
