import { Grid, TextField } from '@mui/material';
import { DateInput, NumberInput } from '../../../components';
import React from 'react';

interface Exercicio {
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

interface ExercicioFormProps {
  newExercicio: Exercicio;
  setNewExercicio?: React.Dispatch<React.SetStateAction<Exercicio>>;
  disabled?: boolean;
}

export default function ExercicioForm({
  newExercicio,
  setNewExercicio,
  disabled = false
}: ExercicioFormProps) {
  return (
    <form noValidate autoComplete="off">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Nome"
            fullWidth
            value={newExercicio.nome}
            onChange={(e) =>
              setNewExercicio &&
              setNewExercicio({ ...newExercicio, nome: e.target.value })
            }
            disabled={disabled}
          />
        </Grid>

        <Grid item xs={12}>
          <DateInput
            label="Início"
            value={newExercicio.inicio}
            disablePast={true}
            onChange={(e) =>
              setNewExercicio &&
              setNewExercicio({ ...newExercicio, inicio: e.target.value })
            }
            disabled={disabled}
          />
        </Grid>

        <Grid item xs={12}>
          <DateInput
            label="Fim"
            disablePast={true}
            value={newExercicio.fim}
            onChange={(e) =>
              setNewExercicio &&
              setNewExercicio({ ...newExercicio, fim: e.target.value })
            }
            disabled={disabled}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Grupo Muscular"
            fullWidth
            value={newExercicio.grupoMuscular}
            onChange={(e) =>
              setNewExercicio &&
              setNewExercicio({
                ...newExercicio,
                grupoMuscular: e.target.value
              })
            }
            disabled={disabled}
          />
        </Grid>

        <Grid item xs={12}>
          <NumberInput
            label="Séries"
            value={newExercicio.series}
            onChange={(e) =>
              setNewExercicio &&
              setNewExercicio({
                ...newExercicio,
                series: parseFloat(e.target.value)
              })
            }
            disabled={disabled}
          />
        </Grid>

        <Grid item xs={12}>
          <NumberInput
            label="Repetições"
            value={newExercicio.repeticoes}
            onChange={(e) =>
              setNewExercicio &&
              setNewExercicio({
                ...newExercicio,
                repeticoes: parseFloat(e.target.value)
              })
            }
            disabled={disabled}
          />
        </Grid>

        <Grid item xs={12} sx={{ mb: 2 }}>
          <NumberInput
            label="Carga"
            value={newExercicio.carga}
            onChange={(e) =>
              setNewExercicio &&
              setNewExercicio({
                ...newExercicio,
                carga: parseFloat(e.target.value)
              })
            }
            disabled={disabled}
          />
        </Grid>
      </Grid>
    </form>
  );
}
