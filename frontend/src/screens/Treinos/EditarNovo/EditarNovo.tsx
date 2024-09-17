import { useState, ChangeEvent, FormEvent } from 'react';
import { CustomModal, GroupButtons, CustomLayout } from '../../../components';
import { useAlert } from '../../../components/CustomAlert';
import { Button, Grid, TextField } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useCreateTreino, useUpdateTreino } from '../../../hooks';
import ExercicioForm from './ExercicioForm';
import ExercicioCard from './ExercicioCard';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';

interface FormData {
  id?: number;
  nome: string;
  descricao: string;
  exercicios: Exercicio[];
  aluno_id: number;
}

interface FormErrors {
  nome?: string;
  descricao?: string;
  exercicios?: string;
}

interface Exercicio {
  id?: number;
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

interface TreinosProps {
  vinculado?: boolean;
}

export default function EditarNovo({ vinculado = false }: TreinosProps) {
  const { showAlert } = useAlert();
  const { id } = useParams<{ id?: string }>();
  const location = useLocation();
  const navigate = useNavigate();

  const treinoData = location.state?.treino || {
    aluno_id: 0,
    nome: '',
    descricao: '',
    exercicios: []
  };

  const [formData, setFormData] = useState<FormData>({
    aluno_id: location.state?.treino?.aluno.id || location.state?.login.id || 0,
    nome: treinoData.nome || '',
    descricao: treinoData.descricao || '',
    exercicios: treinoData.exercicios || []
  });

  const today = new Date().toISOString().split('T')[0];
  const tomorrowDate = new Date(Date.now() + 24 * 60 * 60 * 1000)
    .toISOString()
    .split('T')[0];

  const [errors, setErrors] = useState<FormErrors>({});
  const [selectedExercicios, setSelectedExercicios] = useState<Exercicio[]>(
    treinoData.exercicios || []
  );
  const [selectedExercicio, setSelectedExercicio] = useState<Exercicio>({
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
  const [openAddExercicioModal, setOpenAddExercicioModal] = useState(false);
  const [openEditExercicioModal, setOpenEditExercicioModal] = useState(false);
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
    onSuccess: () => showAlert('success', 'Treino criado com sucesso!'),
    onError: (error) => {
      console.error('Erro ao criar treino:', error.message);
      showAlert('error', 'Erro ao criar treino. Tente novamente.');
    }
  });

  const { mutate: updateTreino } = useUpdateTreino({
    onSuccess: () => {
      showAlert('success', 'Treino atualizado com sucesso!');
      navigate(
        !vinculado
          ? '/treinos'
          : `/treinos-aluno-vinculado/${location.state.data.id}`,
        {
          state: { login: location.state.login, treino: location.state.treino }
        }
      );
    },
    onError: (error) => {
      console.error('Erro ao atualizar treino:', error.message);
      showAlert('error', 'Erro ao atualizar treino. Tente novamente.');
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
        alert('Exercícios são obrigatórios *');

      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        throw new Error('Validação falhou');
      }

      formData.exercicios = selectedExercicios;

      if (id) {
        return updateTreino({ id: Number(id), treino: formData });
      } else {
        return createTreino(formData);
      }
    },
    onSuccess: () => {
      setErrors({});
      navigate(
        !vinculado
          ? '/treinos'
          : `/treinos-aluno-vinculado/${location.state.data.id}`,
        {
          state: {
            isSuccessTreino: true,
            login: location.state.login,
            treino: location.state.treino
          }
        }
      );
    },
    onError: (error: Error) => console.error(error.message)
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));

    if (name in errors) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: undefined }));
    }
  };

  const handleAddExercicio = () => setOpenAddExercicioModal(true);

  const handleCloseModal = () => {
    setOpenAddExercicioModal(false);
    setOpenEditExercicioModal(false);
  };

  const handleSaveExercicio = () => {
    setSelectedExercicios((prev) => [...prev, newExercicio]);
    handleCloseModal();
    showAlert('success', 'Exercício adicionado com sucesso!');
    setNewExercicio({
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
  };

  const handleEditExercicio = (exercicio: Exercicio) => {
    setOpenEditExercicioModal(true);
    setSelectedExercicio(exercicio);
  };

  const handleSaveEditExercicio = () => {
    setSelectedExercicios((prev) =>
      prev.map((exercicio) =>
        exercicio?.id === selectedExercicio?.id ? selectedExercicio : exercicio
      )
    );

    handleCloseModal();
    showAlert('success', 'Exercício atualizado com sucesso!');
    setNewExercicio({
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
  };

  const handleDeleteExercicio = (exercicio: Exercicio) => {
    setSelectedExercicios((prev) =>
      prev.filter((item) => item.id !== exercicio.id)
    );
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationErrors: FormErrors = {};
    if (!formData.nome)
      validationErrors.nome = 'Nome do treino é obrigatório *';
    if (!formData.descricao)
      validationErrors.descricao = 'Descrição é obrigatória *';
    if (selectedExercicios.length === 0)
      validationErrors.exercicios = 'Exercícios são obrigatórios *';

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    formData.exercicios = selectedExercicios;
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

          <Grid container spacing={2} style={{ marginTop: '1rem' }}>
            {selectedExercicios.map((exercicio, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <ExercicioCard
                  exercicio={exercicio}
                  buttons={[
                    {
                      startIcon: <EditIcon />,
                      onClick: () => handleEditExercicio(exercicio),
                      backgroundColor: 'transparent',
                      iconColor: '#6842FF',
                      border: 'none'
                    },
                    {
                      startIcon: <DeleteIcon />,
                      onClick: () => handleDeleteExercicio(exercicio),
                      backgroundColor: 'transparent',
                      iconColor: '#6842FF',
                      border: 'none'
                    }
                  ]}
                />
              </Grid>
            ))}
          </Grid>

          <Grid item xs={12} style={{ marginTop: '1rem' }}>
            <Button onClick={handleAddExercicio} variant="contained">
              + Adicionar exercício
            </Button>
          </Grid>

          <Grid item xs={12} style={{ marginTop: '1rem' }}>
            <GroupButtons
              buttons={[
                {
                  text: 'Cancelar',
                  onClick: () =>
                    navigate(
                      vinculado
                        ? `/treinos-aluno-vinculado/${location.state.data.id}`
                        : '/treinos',
                      {
                        state: {
                          login: location.state.login,
                          treino: location.state.treino
                        }
                      }
                    )
                },
                { text: 'Salvar', type: 'submit' }
              ]}
            />
          </Grid>
        </Grid>
      </form>

      <CustomModal
        open={openEditExercicioModal}
        onClose={handleCloseModal}
        onSave={handleSaveEditExercicio}
        title="Editar Exercício"
      >
        <ExercicioForm
          newExercicio={selectedExercicio}
          setNewExercicio={setSelectedExercicio}
        />
      </CustomModal>

      <CustomModal
        open={openAddExercicioModal}
        onClose={handleCloseModal}
        onSave={handleSaveExercicio}
        title="Adicionar Novo Exercício"
      >
        <ExercicioForm
          newExercicio={newExercicio}
          setNewExercicio={setNewExercicio}
        />
      </CustomModal>
    </CustomLayout>
  );
}
