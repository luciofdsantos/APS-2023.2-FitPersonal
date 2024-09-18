import {
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';
import { CustomLayout, GroupButtons } from '../../components';
import { useAlert } from '../../components/CustomAlert';
import {
  useTodosAlunosProfissional,
  useTodosAlunos,
  useVincularAluno,
  useDesvincularAluno
} from '../../hooks';
import { useNavigate } from 'react-router-dom';

interface Aluno {
  id: number;
  nome: string;
  sobrenome: string;
  sexo: string;
}

enum TipoUsuario {
  NUTRICIONISTA = 'NUTRICIONISTA',
  PERSONAL = 'PERSONAL'
}

export default function Alunos() {
  const navigate = useNavigate();
  const { showAlert } = useAlert();

  const usuarioString = localStorage.getItem('usuario');
  let tipoUsuario: TipoUsuario | null = null;

  if (usuarioString) {
    try {
      const usuario = JSON.parse(usuarioString);
      tipoUsuario = usuario?.tipoUsuario;
    } catch (error) {
      console.error('Erro ao analisar o JSON do localStorage:', error);
    }
  }

  const endpointVincular =
    tipoUsuario === 'NUTRICIONISTA'
      ? 'http://localhost:8080/api/vincular-aluno/vincular-aluno-nutricionista'
      : 'http://localhost:8080/api/vincular-aluno/vincular-aluno-personal';

  const endpointDesvincular =
    tipoUsuario === 'NUTRICIONISTA'
      ? 'http://localhost:8080/api/vincular-aluno/desvincular-aluno-nutricionista'
      : 'http://localhost:8080/api/vincular-aluno/desvincular-aluno-personal';

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
      endpoint: endpointVincular,
      onSuccess: () => {
        showAlert('success', 'Aluno vinculado com sucesso!');

        refetchAlunos();
        refetchAlunosVinculados();
      }
    });

  const { mutate: desvincularAluno, isPending: isPendingDesvincularAluno } =
    useDesvincularAluno({
      endpoint: endpointDesvincular,
      onSuccess: () => {
        showAlert('success', 'Aluno desvinculado com sucesso!');

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
    isPendingDesvincularAluno ||
    isPendingVincularAluno;

  const handleTreinosAlunoVinculado = (data: Aluno) => {
    navigate(`/treinos-aluno-vinculado/${data.id}`, {
      state: { data }
    });
  };

  const handlePlanosAlimentaresAlunoVinculado = (data: Aluno) => {
    navigate(`/planos-alimentares-aluno-vinculado/${data.id}`, {
      state: { data }
    });
  };

  return (
    <CustomLayout appBarText="Alunos">
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <GroupButtons
            buttons={[
              { text: 'Atualizar Tabela', onClick: () => refetchAlunos() } // Fixed the onClick function
            ]}
            height="40%"
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

              <TableBody>
                {alunos?.map((data: Aluno) => (
                  <TableRow
                    key={data.id}
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
                      <>
                        {isLoading ? (
                          'Carregando...'
                        ) : (
                          <>
                            {isVinculado(data.id) &&
                              tipoUsuario === TipoUsuario.PERSONAL && (
                                <Button
                                  color="primary"
                                  variant="text"
                                  onClick={() =>
                                    handleTreinosAlunoVinculado(data)
                                  }
                                >
                                  Treinos
                                </Button>
                              )}

                            {isVinculado(data.id) &&
                              tipoUsuario === TipoUsuario.NUTRICIONISTA && (
                                <Button
                                  color="primary"
                                  variant="text"
                                  onClick={() =>
                                    handlePlanosAlimentaresAlunoVinculado(data)
                                  }
                                >
                                  Planos Alimentares
                                </Button>
                              )}

                            <Button
                              color="primary"
                              variant="text"
                              onClick={() =>
                                isVinculado(data.id)
                                  ? desvincularAluno(data.id)
                                  : vincularAluno(data.id)
                              }
                              disabled={isLoading}
                            >
                              {isVinculado(data.id)
                                ? 'Desvincular'
                                : 'Vincular'}
                            </Button>
                          </>
                        )}
                      </>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </CustomLayout>
  );
}
