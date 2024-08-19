import { useState, ChangeEvent, FormEvent } from 'react';
import { AutoComplete, GroupButtons, CustomLayout } from '../../../components';
import { Dashboard } from '@mui/icons-material';
import { Grid, TextField } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useParams, useNavigate } from 'react-router-dom';
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

const createTreino = async (
  treino: FormData & { exercicios: (string | number)[] }
) => {
  const response = await fetch(endpoint, {
    method: 'POST',
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

const updateTreino = async (
  id: string,
  treino: FormData & { exercicios: (string | number)[] }
) => {
  const response = await fetch(`${endpoint}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(treino)
  });

  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(`Erro ao atualizar treino: ${errorMessage}`);
  }

  return response.json();
};

export default function EditarNovo() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    nome: '',
    descricao: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [selectedExercises, setSelectedExercises] = useState<
    SelectOptionType[]
  >([]);

  const mutation = useMutation({
    mutationFn: async () => {
      const validationErrors: FormErrors = {};
      if (!formData.nome)
        validationErrors.nome = 'Nome do treino é obrigatório *';
      if (!formData.descricao)
        validationErrors.descricao = 'Descrição é obrigatória *';
      if (selectedExercises.length === 0)
        validationErrors.exercicios = 'Exercícios é obrigatório *';

      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        throw new Error('Validação falhou');
      }

      const treinoData = {
        ...formData,
        exercicios: selectedExercises.map((ex) => ex.id)
      };

      if (id) {
        return updateTreino(id, treinoData);
      } else {
        return createTreino(treinoData);
      }
    },
    onSuccess: () => {
      setErrors({});
      navigate('/treinos');
    },
    onError: (error: Error) => {
      console.error(error.message);
    }
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));

    if (name in errors) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: undefined }));
    }
  };

  const handleChangeExercise = (newValues: SelectOptionType[]) => {
    setSelectedExercises(newValues);

    if (errors.exercicios) {
      setErrors((prevErrors) => ({ ...prevErrors, exercicios: undefined }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationErrors: FormErrors = {};
    if (!formData.nome)
      validationErrors.nome = 'Nome do treino é obrigatório *';
    if (!formData.descricao)
      validationErrors.descricao = 'Descrição é obrigatória *';
    if (selectedExercises.length === 0)
      validationErrors.exercicios = 'Exercícios é obrigatório *';

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

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
              // disabled={isLoading}
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
              // disabled={isLoading}
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
              // disabled={isLoading}
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
