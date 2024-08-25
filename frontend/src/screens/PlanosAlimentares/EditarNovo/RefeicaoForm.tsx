import React from 'react';
import { Grid, TextField } from '@mui/material';

interface Refeicao {
  alimento: string;
  quantidade: number;
  kcal: number;
  carboidrato: number;
  proteina: number;
  gordura: number;
  tipoRefeicao: string;
}

interface RefeicaoFormProps {
  newRefeicao: Refeicao;
  setNewRefeicao?: React.Dispatch<React.SetStateAction<Refeicao>>;
  disabled?: boolean;
}

const RefeicaoForm: React.FC<RefeicaoFormProps> = ({
  newRefeicao,
  setNewRefeicao,
  disabled = false
}) => {
  return (
    <form noValidate autoComplete="off">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Alimento"
            fullWidth
            value={newRefeicao.alimento}
            onChange={(e) =>
              setNewRefeicao &&
              setNewRefeicao({ ...newRefeicao, alimento: e.target.value })
            }
            disabled={disabled}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Quantidade"
            type="number"
            fullWidth
            value={newRefeicao.quantidade}
            onChange={(e) =>
              setNewRefeicao &&
              setNewRefeicao({
                ...newRefeicao,
                quantidade: parseFloat(e.target.value)
              })
            }
            disabled={disabled}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Kcal"
            type="number"
            fullWidth
            value={newRefeicao.kcal}
            onChange={(e) =>
              setNewRefeicao &&
              setNewRefeicao({
                ...newRefeicao,
                kcal: parseFloat(e.target.value)
              })
            }
            disabled={disabled}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Carboidrato"
            type="number"
            fullWidth
            value={newRefeicao.carboidrato}
            onChange={(e) =>
              setNewRefeicao &&
              setNewRefeicao({
                ...newRefeicao,
                carboidrato: parseFloat(e.target.value)
              })
            }
            disabled={disabled}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Proteína"
            type="number"
            fullWidth
            value={newRefeicao.proteina}
            onChange={(e) =>
              setNewRefeicao &&
              setNewRefeicao({
                ...newRefeicao,
                proteina: parseFloat(e.target.value)
              })
            }
            disabled={disabled}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Gordura"
            type="number"
            fullWidth
            value={newRefeicao.gordura}
            onChange={(e) =>
              setNewRefeicao &&
              setNewRefeicao({
                ...newRefeicao,
                gordura: parseFloat(e.target.value)
              })
            }
            disabled={disabled}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Tipo de Refeição"
            fullWidth
            value={newRefeicao.tipoRefeicao}
            onChange={(e) =>
              setNewRefeicao &&
              setNewRefeicao({
                ...newRefeicao,
                tipoRefeicao: e.target.value
              })
            }
            disabled={disabled}
          />
        </Grid>
      </Grid>
    </form>
  );
};

export default RefeicaoForm;
