import { Card, CardContent, Typography, Grid, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDeleteRefeicao } from '../../../hooks';

interface Refeicao {
  id?: number;
  alimento: string;
  quantidade: number;
  kcal: number;
  carboidrato: number;
  proteina: number;
  gordura: number;
  tipoRefeicao: string;
}

interface RefeicaoCardProps {
  refeicao: Refeicao;
  onDeleteSuccess: () => void;
}

export default function RefeicaoCard({
  refeicao,
  onDeleteSuccess
}: RefeicaoCardProps) {
  const { mutate: deleteRefeicao } = useDeleteRefeicao({
    onSuccess: () => {
      onDeleteSuccess();
    },
    onError: (error) => {
      console.error('Erro ao deletar refeição:', error.message);
    }
  });

  const handleDelete = () => {
    if (refeicao.id) {
      deleteRefeicao(refeicao.id);
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" component="div">
          {refeicao.alimento}
        </Typography>
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={12}>
            <Typography variant="body2" color="textSecondary">
              <strong>Quantidade:</strong> {refeicao.quantidade} g
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2" color="textSecondary">
              <strong>Kcal:</strong> {refeicao.kcal}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2" color="textSecondary">
              <strong>Carboidrato:</strong> {refeicao.carboidrato} g
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2" color="textSecondary">
              <strong>Proteína:</strong> {refeicao.proteina} g
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2" color="textSecondary">
              <strong>Gordura:</strong> {refeicao.gordura} g
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2" color="textSecondary">
              <strong>Tipo de Refeição:</strong> {refeicao.tipoRefeicao}
            </Typography>
          </Grid>

          <Grid item xs={12} container justifyContent="flex-end">
            <IconButton color="secondary" onClick={handleDelete}>
              <DeleteIcon />
            </IconButton>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
