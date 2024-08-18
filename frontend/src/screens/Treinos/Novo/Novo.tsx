import { useState, ChangeEvent, FormEvent } from 'react';
import { GroupButtons, CustomLayout } from '../../../components';
import {
  Dashboard,
  Add as AddIcon,
  Remove as RemoveIcon
} from '@mui/icons-material';
import { Grid, TextField, IconButton } from '@mui/material';

interface FormData {
  nome: string;
  descricao: string;
}

interface FormErrors {
  nome?: string;
  descricao?: string;
}

interface ExerciseFieldProps {
  value: string;
  onChange: (value: string) => void;
  onRemove: () => void;
  size: number;
}

const ExerciseField = ({
  value,
  onChange,
  onRemove,
  size
}: ExerciseFieldProps) => (
  <Grid container spacing={2} alignItems="center" sx={{ pb: 1 }}>
    <Grid item xs={11}>
      <TextField
        fullWidth
        label="Exercício"
        variant="outlined"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </Grid>

    {size > 1 && (
      <Grid item xs={1}>
        <IconButton onClick={onRemove} color="error">
          <RemoveIcon />
        </IconButton>
      </Grid>
    )}
  </Grid>
);

const items = [{ text: 'Dashboard', Icon: Dashboard, path: '/' }];

export default function Novo() {
  const [formData, setFormData] = useState<FormData>({
    nome: '',
    descricao: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [exercises, setExercises] = useState(['']);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddExercise = () => {
    setExercises([...exercises, '']);
  };

  const handleRemoveExercise = (index: number) => {
    setExercises(exercises.filter((_, i) => i !== index));
  };

  const handleChangeExercise = (index: number, newValue: string) => {
    const updatedExercises = exercises.map((exercise, i) =>
      i === index ? newValue : exercise
    );
    setExercises(updatedExercises);
  };

  const validateForm = (): boolean => {
    const errors: FormErrors = {};
    if (!formData.nome) errors.nome = 'Nome do treino é obrigatório *';
    if (!formData.descricao) errors.descricao = 'Descrição é obrigatória *';
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form data submitted:', formData);
      console.log('Exercises:', exercises);
    }
  };

  return (
    <CustomLayout appBarText="Treinos" items={items}>
      <form onSubmit={handleSubmit} noValidate>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              name="nome"
              label="Nome do treino *"
              variant="outlined"
              fullWidth
              value={formData.nome}
              onChange={handleChange}
              error={!!errors.nome}
              helperText={errors.nome}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              name="descricao"
              label="Descrição *"
              variant="outlined"
              fullWidth
              value={formData.descricao}
              onChange={handleChange}
              error={!!errors.descricao}
              helperText={errors.descricao}
            />
          </Grid>

          <Grid item xs={12}>
            {exercises.map((exercise, index) => (
              <ExerciseField
                key={index}
                value={exercise}
                size={exercises.length}
                onChange={(newValue: string) =>
                  handleChangeExercise(index, newValue)
                }
                onRemove={() => handleRemoveExercise(index)}
              />
            ))}

            <GroupButtons
              buttons={[
                {
                  text: 'Novo exercício',
                  onClick: handleAddExercise,
                  startIcon: <AddIcon />
                }
              ]}
            />
          </Grid>
        </Grid>

        <GroupButtons
          buttons={[
            { text: 'Salvar', type: 'submit' },
            { text: 'Voltar', href: '/treinos' }
          ]}
        />
      </form>
    </CustomLayout>
  );
}
