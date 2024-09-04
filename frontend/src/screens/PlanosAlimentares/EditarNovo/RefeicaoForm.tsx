import {
  Grid,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  SelectChangeEvent
} from '@mui/material';
import React from 'react';

interface Refeicao {
  id?: number;
  alimento: string;
  quantidade: number;
  kcal: number;
  carboidrato: number;
  proteina: number;
  gordura: number;
  tipoRefeicao: TipoRefeicao;
}

interface RefeicaoFormProps {
  newRefeicao: Refeicao;
  setNewRefeicao?: React.Dispatch<React.SetStateAction<Refeicao>>;
  disabled?: boolean;
}

export enum TipoRefeicao {
  CAFE_DA_MANHA = 'CAFE_DA_MANHA',
  ALMOCO = 'ALMOCO',
  JANTAR = 'JANTAR',
  LANCHE = 'LANCHE'
}

export default function RefeicaoForm({
  newRefeicao,
  setNewRefeicao,
  disabled = false
}: RefeicaoFormProps) {
  const tipoRefeicaoOptions = Object.values(TipoRefeicao);

  const handleTipoRefeicaoChange = (event: SelectChangeEvent<TipoRefeicao>) => {
    const value = event.target.value as TipoRefeicao;
    setNewRefeicao &&
      setNewRefeicao({
        ...newRefeicao,
        tipoRefeicao: value
      });
  };

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
          <FormControl fullWidth disabled={disabled}>
            <InputLabel>Tipo de Refeição</InputLabel>
            <Select
              value={newRefeicao.tipoRefeicao}
              onChange={handleTipoRefeicaoChange}
              label="Tipo de Refeição"
            >
              {tipoRefeicaoOptions.map((option, index) => (
                <MenuItem key={index} value={option}>
                  {option.replace(/_/g, ' ')}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </form>
  );
}
