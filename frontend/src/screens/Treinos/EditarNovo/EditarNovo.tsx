import { useState, ChangeEvent, FormEvent } from 'react';
import { AutoComplete, GroupButtons, CustomLayout } from '../../../components';
import { Dashboard } from '@mui/icons-material';
import { Grid, TextField } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import apiExercicios from '../../../mocks/apiExercicios.json';
import { TypeTreinos } from 'src/types';
import { useCreateTreino, useUpdateTreino } from '../../../hooks';
import { useParams } from 'react-router-dom';

interface FormData {
  id?: number;
  nome: string;
  descricao: string;
}

interface FormErrors {
  nome?: string;
  descricao?: string;
  exercicios?: string;
}

export default function EditarNovo() {
  const { id } = useParams<{ id?: string }>();

  const location = useLocation();
  const navigate = useNavigate();

  const treinoData = location.state?.treino || {
    nome: '',
    descricao: '',
    exercicios: []
  };

  const [formData, setFormData] = useState<
    FormData & { exercicios: TypeTreinos.SelectOptionType[] }
  >({
    nome: treinoData?.nome || '',
    descricao: treinoData?.descricao || '',
    exercicios: treinoData?.exercicios || []
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [selectedExercises, setSelectedExercises] = useState<
    TypeTreinos.SelectOptionType[]
  >([]);

  const { mutate: createTreino } = useCreateTreino({
    onSuccess: () => {
      alert('Treino criado com sucesso!');
    },
    onError: (error) => {
      console.error('Erro ao criar treino:', error.message);
      alert('Erro ao criar treino. Tente novamente.');
    }
  });

  const { mutate: updateTreino } = useUpdateTreino({
    onSuccess: () => {
      alert('Treino atualizado com sucesso!');
      navigate('/treinos');
    },
    onError: (error) => {
      console.error('Erro ao atualizar treino:', error.message);
      alert('Erro ao atualizar treino. Tente novamente.');
    }
  });

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

      const filteredExercises: TypeTreinos.SelectOptionType[] =
        selectedExercises.map(
          ({
            nome,
            carga,
            fim,
            finalizado,
            grupoMuscular,
            inicio,
            repeticoes,
            series
          }) => ({
            nome,
            carga,
            fim,
            finalizado,
            grupoMuscular,
            inicio,
            repeticoes,
            series
          })
        );

      const treinoData = { ...formData, exercicios: filteredExercises };

      if (id) {
        return updateTreino({ id: Number(id), treino: treinoData });
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

  const handleChangeExercise = (newValues: TypeTreinos.SelectOptionType[]) => {
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
              multiple
              values={selectedExercises}
              setValue={handleChangeExercise}
              error={errors.exercicios}
            />
          </Grid>

          <Grid item xs={12}>
            <GroupButtons
              buttons={[
                { text: 'Salvar', type: 'submit' },
                { text: 'Cancelar', onClick: () => navigate('/treinos') }
              ]}
            />
          </Grid>
        </Grid>
      </form>
    </CustomLayout>
  );
}
