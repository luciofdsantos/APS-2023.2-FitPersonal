import { useState, ChangeEvent, FormEvent } from 'react';
import { CustomModal, GroupButtons, CustomLayout } from '../../../components';
import {
  FormControlLabel,
  Checkbox,
  Button,
  Grid,
  TextField
} from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCreateTreino, useUpdateTreino } from '../../../hooks';
import { useParams } from 'react-router-dom';
import { useCreateExercicio } from '../../../hooks';

interface ObjectGeneric {
  [key: string]: string | number | boolean;
}

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
    FormData & { exercicios: ObjectGeneric[] }
  >({
    nome: treinoData?.nome || '',
    descricao: treinoData?.descricao || '',
    exercicios: treinoData?.exercicios || []
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [selectedExercicios, setSelectedExercicios] = useState<ObjectGeneric[]>(
    []
  );

  const [openAddExercicioModal, setOpenAddExercicioModal] = useState(false);
  const [newExercicio, setNewExercicio] = useState<ObjectGeneric>({
    nome: '',
    inicio: '',
    fim: '',
    grupoMuscular: '',
    series: 0,
    repeticoes: 0,
    carga: 0,
    finalizado: false
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

  const { mutate: createExercicio } = useCreateExercicio({
    onSuccess: () => {
      alert('Exercício adicionado com sucesso!');
      setOpenAddExercicioModal(false);
    },
    onError: (error) => {
      console.error('Erro ao adicionar exercício:', error.message);
      alert('Erro ao adicionar exercício. Tente novamente.');
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

  const handleAddExercicio = () => {
    setOpenAddExercicioModal(true);
  };

  const handleCloseModal = () => {
    setOpenAddExercicioModal(false);
  };

  const handleSaveExercicio = () => {
    createExercicio(newExercicio);
    setSelectedExercicios([...selectedExercicios, newExercicio]);
    setNewExercicio({
      id: 0,
      inicio: '',
      fim: '',
      grupoMuscular: '',
      series: 0,
      repeticoes: 0,
      carga: 0,
      finalizado: false
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

          <Grid item xs={12}>
            <Button onClick={handleAddExercicio}>+ Adicionar exercício</Button>
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

      <CustomModal
        open={openAddExercicioModal}
        onClose={handleCloseModal}
        onSave={handleSaveExercicio}
        title="Adicionar Novo Exercicio"
      >
        <form noValidate autoComplete="off">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="nome"
                fullWidth
                value={newExercicio.nome}
                onChange={(e) =>
                  setNewExercicio({ ...newExercicio, nome: e.target.value })
                }
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Inicio"
                type="date"
                fullWidth
                value={newExercicio.inicio}
                onChange={(e) =>
                  setNewExercicio({
                    ...newExercicio,
                    inicio: e.target.value
                  })
                }
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="fim"
                type="date"
                fullWidth
                value={newExercicio.fim}
                onChange={(e) =>
                  setNewExercicio({
                    ...newExercicio,
                    fim: e.target.value
                  })
                }
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Grupo Muscular"
                fullWidth
                value={newExercicio.grupoMuscular}
                onChange={(e) =>
                  setNewExercicio({
                    ...newExercicio,
                    grupoMuscular: e.target.value
                  })
                }
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Séries"
                type="number"
                fullWidth
                value={newExercicio.series}
                onChange={(e) =>
                  setNewExercicio({
                    ...newExercicio,
                    series: parseFloat(e.target.value)
                  })
                }
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Repetições"
                type="number"
                fullWidth
                value={newExercicio.repeticoes}
                onChange={(e) =>
                  setNewExercicio({
                    ...newExercicio,
                    repeticoes: parseFloat(e.target.value)
                  })
                }
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Carga"
                type="number"
                fullWidth
                value={newExercicio.carga}
                onChange={(e) =>
                  setNewExercicio({
                    ...newExercicio,
                    carga: parseFloat(e.target.value)
                  })
                }
              />
            </Grid>

            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={false}
                    onChange={(event: ChangeEvent<HTMLInputElement>) =>
                      setNewExercicio({
                        ...newExercicio,
                        finalizado: event.target.checked
                      })
                    }
                  />
                }
                label="Finalizado"
              />
            </Grid>
          </Grid>
        </form>
      </CustomModal>
    </CustomLayout>
  );
}
