import { useState, ChangeEvent, FormEvent } from 'react';
import { CustomModal, GroupButtons, CustomLayout } from '../../../components';
import { Button, Grid, TextField } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCreateTreino, useUpdateTreino } from '../../../hooks';
import { useParams } from 'react-router-dom';
import ExercicioForm from './ExercicioForm';
import ExercicioCard from './ExercicioCard';

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
    FormData & { exercicios: Exercicio[] }
  >({
    nome: treinoData?.nome || '',
    descricao: treinoData?.descricao || '',
    exercicios: treinoData?.exercicios || []
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [selectedExercicios, setSelectedExercicios] = useState<Exercicio[]>(
    treinoData?.exercicios || []
  );

  const today = new Date().toISOString().split('T')[0];
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowDate = tomorrow.toISOString().split('T')[0];

  const [openAddExercicioModal, setOpenAddExercicioModal] = useState(false);
  const [newExercicio, setNewExercicio] = useState<Exercicio>({
    nome: '',
    inicio: today,
    fim: tomorrowDate,
    grupoMuscular: '',
    series: 0,
    repeticoes: 0,
    carga: 0,
    finalizado: false,
    treinoId: 0
  });

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
      if (selectedExercicios.length === 0)
        validationErrors.exercicios = 'Exercícios é obrigatório *';

      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        throw new Error('Validação falhou');
      }

      if (id) {
        treinoData.exercicios = selectedExercicios;

        return updateTreino({ id: Number(id), treino: treinoData });
      } else {
        treinoData.exercicios = selectedExercicios;

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

  const handleAddExercicio = () => {
    setOpenAddExercicioModal(true);
  };

  const handleCloseModal = () => {
    setOpenAddExercicioModal(false);
  };

  const handleSaveExercicio = () => {
    setSelectedExercicios([...selectedExercicios, newExercicio]);
    alert('Exercício adicionado com sucesso!');
    setOpenAddExercicioModal(false);
    setNewExercicio({
      nome: '',
      inicio: '',
      fim: '',
      grupoMuscular: '',
      series: 0,
      repeticoes: 0,
      carga: 0,
      finalizado: false,
      treinoId: 0
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationErrors: FormErrors = {};
    if (!formData.nome)
      validationErrors.nome = 'Nome do treino é obrigatório *';
    if (!formData.descricao)
      validationErrors.descricao = 'Descrição é obrigatória *';
    if (selectedExercicios.length === 0)
      validationErrors.exercicios = 'Exercícios é obrigatório *';

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    mutation.mutate();
  };

  return (
    <CustomLayout appBarText="Treinos">
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

          <Grid container spacing={2}>
            {selectedExercicios.map((exercicio: Exercicio) => (
              <Grid item xs={4} key={exercicio.nome}>
                <ExercicioCard exercicio={exercicio} />
              </Grid>
            ))}
          </Grid>

          {!id && (
            <Grid item xs={12}>
              <Button onClick={handleAddExercicio}>
                + Adicionar exercício
              </Button>
            </Grid>
          )}

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

      <CustomModal
        open={openAddExercicioModal}
        onClose={handleCloseModal}
        onSave={handleSaveExercicio}
        title="Adicionar Novo Exercicio"
      >
        <ExercicioForm
          newExercicio={newExercicio}
          setNewExercicio={setNewExercicio}
        />
      </CustomModal>
    </CustomLayout>
  );
}
