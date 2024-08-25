import React from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';

interface Refeicao {
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
}

const RefeicaoCard: React.FC<RefeicaoCardProps> = ({ refeicao }) => {
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
        </Grid>
      </CardContent>
    </Card>
  );
};

export default RefeicaoCard;
