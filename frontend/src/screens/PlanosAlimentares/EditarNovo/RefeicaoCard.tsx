import { Card, CardContent, Typography, Grid } from '@mui/material';
import React, { ReactNode } from 'react';
import { GroupButtons } from '../../../components';

interface Refeicao {
  id?: number;
  alimento: string;
  quantidade: number;
  kcal: number;
  carboidrato: number;
  proteina: number;
  gordura: number;
  tipoRefeicao: string;
  planoAlimentarId: number;
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

interface RefeicaoCardProps {
  refeicao: Refeicao;
  buttons: ButtonProps[];
}

export default function RefeicaoCard({ refeicao, buttons }: RefeicaoCardProps) {
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

          <Grid item xs={12}>
            <GroupButtons buttons={buttons} />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
