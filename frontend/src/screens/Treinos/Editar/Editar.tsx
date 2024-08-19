import { useState, ChangeEvent, FormEvent } from 'react';
import { AutoComplete, GroupButtons, CustomLayout } from '../../../components';
import { Dashboard } from '@mui/icons-material';
import { Grid, TextField } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import apiExercicios from '../../../mocks/apiExercicios.json';

interface FormData {
  nome: string;
  descricao: string;
}

interface FormErrors {
  nome?: string;
  descricao?: string;
  exercicios?: string;
}

interface SelectOptionType {
  id: string | number;
  nome: string;
}

const endpoint = 'http://92.113.32.219:8080/api/treinos';

const updateTreino = async (
  treino: FormData & { exercicios: (string | number)[] }
) => {
  const response = await fetch(endpoint, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(treino)
  });

  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(`Erro ao criar treino: ${errorMessage}`);
  }

  return response.json();
};

export default function Editar() {
  const [formData, setFormData] = useState<FormData>({
    nome: '',
    descricao: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [selectedExercises, setSelectedExercises] = useState<
    SelectOptionType[]
  >([]);

  console.log('selectedExercises ->', selectedExercises);

  const mutation = useMutation({
    mutationFn: async () => {
      const validationErrors: FormErrors = {};
      if (!formData.nome)
        validationErrors.nome = 'Nome do treino é obrigatório *';
      if (!formData.descricao)
        validationErrors.descricao = 'Descrição é obrigatória *';
      if (selectedExercises.length === 0)
        validationErrors.exercicios = 'Exercícios é obrigatório *';

      setErrors(validationErrors);

      const treinoData = {
        ...formData,
        exercicios: selectedExercises.map((ex) => ex.id)
      };

      return updateTreino(treinoData);
    },
    onError: (error: Error) => console.error(error.message)
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleChangeExercise = (newValues: SelectOptionType[]) => {
    setSelectedExercises(newValues);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate();
  };

  return (
    <CustomLayout
      appBarText="Treinos"
      items={[{ text: 'Dashboard', Icon: Dashboard, path: '/' }]}
    >
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
            <AutoComplete
              name="exercicios"
              label="Exercícios *"
              options={apiExercicios}
              optionLabel="nome"
              values={selectedExercises}
              setValue={handleChangeExercise}
              multiple
              error={errors.exercicios}
            />
          </Grid>
        </Grid>

        <GroupButtons
          buttons={[
            { text: 'Salvar', type: 'submit', disabled: mutation.isPending },
            { text: 'Voltar', href: '/treinos' }
          ]}
        />
      </form>
    </CustomLayout>
  );
}
