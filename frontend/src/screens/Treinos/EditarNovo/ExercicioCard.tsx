import { Grid, Card, CardContent, Typography } from '@mui/material';
import { ReactNode } from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { GroupButtons } from '../../../components';

export interface Exercicio {
  id?: number;
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

interface ButtonProps {
  text?: string;
  href?: string;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'text' | 'outlined' | 'contained';
  startIcon?: ReactNode;
  backgroundColor?: string;
  iconColor?: string;
  border?: string;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  noShow?: boolean;
}

interface ExercicioCardProps {
  exercicio: Exercicio;
  isViewAluno: boolean;
  buttons: ButtonProps[];
  onStatusChange: (id: number, status: boolean) => void;
}

export default function ExercicioCard ({
  exercicio,
  isViewAluno,
  buttons,
  onStatusChange
}: ExercicioCardProps) {
  const handleChangeStatus = () => {
    onStatusChange(exercicio.id ?? 0, !exercicio.finalizado);
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" component="div">
          {exercicio.nome.toUpperCase()}
        </Typography>

        <Grid container spacing={2} sx={{ mt: 2 }}>
          {!isViewAluno && (
            <div>
              <Grid item xs={12}>
                <Typography variant="body2" color="textSecondary">
                  <strong>Início:</strong>
                  {new Date(exercicio.inicio).toLocaleDateString()}
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="body2" color="textSecondary">
                  <strong>Fim:</strong>
                  {new Date(exercicio.fim).toLocaleDateString()}
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="body2" color="textSecondary">
                  <strong>Grupo Muscular:</strong> {exercicio.grupoMuscular}
                </Typography>
              </Grid>
            </div>
          )}

          <Grid item xs={12}>
            <Typography variant="body2" color="textSecondary">
              <strong>Séries:</strong> {exercicio.series}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2" color="textSecondary">
              <strong>Repetições:</strong> {exercicio.repeticoes}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2" color="textSecondary">
              <strong>Carga:</strong> {exercicio.carga}
            </Typography>
          </Grid>

          {!isViewAluno && (
            <Grid item xs={12}>
              <Typography variant="body2" color="textSecondary">
                <strong>Status:</strong>
                {exercicio.finalizado ? 'Finalizado' : 'Não Finalizado'}
              </Typography>
            </Grid>
          )}

          {isViewAluno && (
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={exercicio.finalizado}
                    onChange={handleChangeStatus}
                    style={{ color: '#6842FF' }}
                  />
                }
                label=""
                style={{ marginRight: '1rem' }}
              />
            </Grid>
          )}

          <Grid item xs={12}>
            <GroupButtons buttons={buttons} />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
