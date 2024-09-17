import { Grid, Card, CardContent, Typography } from '@mui/material';
import { GroupButtons } from '../../../components';
import React, { ReactNode } from 'react';

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
  treinoId: number; // Certifique-se de que esta propriedade está presente
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
}

interface ExercicioCardProps {
  exercicio: Exercicio;
  buttons: ButtonProps[];
}

export default function ExercicioCard({
  exercicio,
  buttons
}: ExercicioCardProps) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" component="div">
          {exercicio.nome.toUpperCase()}
        </Typography>
        <Grid container spacing={2} sx={{ mt: 2 }}>
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
          <Grid item xs={12}>
            <Typography variant="body2" color="textSecondary">
              <strong>Status:</strong>
              {exercicio.finalizado ? 'Finalizado' : 'Não Finalizado'}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <GroupButtons buttons={buttons} />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
