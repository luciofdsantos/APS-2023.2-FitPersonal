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

function createData(name: string, id: string) {
  return { name, id };
}

const rows = [createData('Deise Santana', '1')];

export default function Alunos() {
  return (
    <CustomLayout appBarText="Alunos">
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <GroupButtons
            buttons={[{ text: 'Atualizar Tabela', type: 'submit' }]}
            height="50%"
          />

          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Aluno</TableCell>
                  <TableCell>Opções</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row, index) => (
                  <TableRow
                    key={index}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <Button color="primary" variant="text">
                        Treinos
                      </Button>
                      <Button color="primary" variant="text">
                        Planos Alimentares
                      </Button>
                      <Button color="primary" variant="text">
                        Vincular
                      </Button>
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
