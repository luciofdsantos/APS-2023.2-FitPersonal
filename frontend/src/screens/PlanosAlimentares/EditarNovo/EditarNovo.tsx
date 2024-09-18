import { useState, ChangeEvent, FormEvent } from 'react';
import { CustomLayout, CustomModal, GroupButtons } from '../../../components';
import { Grid, TextField, Button } from '@mui/material';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import {
  useCreatePlanoAlimentar,
  useUpdatePlanoAlimentar
} from '../../../hooks';
import RefeicaoForm from './RefeicaoForm';
import RefeicaoCard from './RefeicaoCard';
import { useAlert } from '../../../components/CustomAlert';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';

interface FormData {
  id?: number;
  metaConsumoKcal: number;
  totalConsumoKcal: number;
  metaConsumoCarboidrato: number;
  totalConsumoCarboidrato: number;
  metaConsumoProteina: number;
  totalConsumoProteina: number;
  metaConsumoGordura: number;
  totalConsumoGordura: number;
  refeicoes: Refeicao[];
  alunoId: number;
}

interface FormErrors {
  metaConsumoKcal?: string;
  totalConsumoKcal?: string;
  metaConsumoCarboidrato?: string;
  totalConsumoCarboidrato?: string;
  metaConsumoProteina?: string;
  totalConsumoProteina?: string;
  metaConsumoGordura?: string;
  totalConsumoGordura?: string;
  refeicoes?: string;
}

interface Refeicao {
  id?: number;
  alimento: string;
  quantidade: number;
  kcal: number;
  carboidrato: number;
  proteina: number;
  gordura: number;
  tipoRefeicao: TipoRefeicao;
  planoAlimentarId: number;
}

export enum TipoRefeicao {
  CAFE_DA_MANHA = 'CAFE_DA_MANHA',
  ALMOCO = 'ALMOCO',
  JANTAR = 'JANTAR',
  LANCHE = 'LANCHE'
}

interface PlanosAlimentaresProps {
  vinculado?: boolean;
}

export default function EditarNovo({
  vinculado = false
}: PlanosAlimentaresProps) {
  const { showAlert } = useAlert();

  const { id } = useParams<{ id?: string }>();

  const location = useLocation();
  const navigate = useNavigate();

  const planoAlimentarData = location.state?.planoalimentar || {
    alunoId: 0,
    totalConsumoCarboidrato: 0,
    totalConsumoProteina: 0,
    totalConsumoGordura: 0,
    totalConsumoKcal: 0,
    metaConsumoCarboidrato: 0,
    metaConsumoProteina: 0,
    metaConsumoGordura: 0,
    metaConsumoKcal: 0,
    refeicoes: []
  };

  const [formData, setFormData] = useState<
    FormData & { refeicoes: Refeicao[] }
  >({
    alunoId:
      location.state?.planoAlimentar?.aluno.id || location.state?.login.id || 0,
    totalConsumoCarboidrato: planoAlimentarData?.totalConsumoCarboidrato || 0,
    totalConsumoProteina: planoAlimentarData?.totalConsumoProteina || 0,
    totalConsumoGordura: planoAlimentarData?.totalConsumoGordura || 0,
    metaConsumoCarboidrato: planoAlimentarData?.metaConsumoCarboidrato || 0,
    metaConsumoProteina: planoAlimentarData?.metaConsumoProteina || 0,
    metaConsumoGordura: planoAlimentarData?.metaConsumoGordura || 0,
    totalConsumoKcal: planoAlimentarData?.totalConsumoKcal || 0,
    metaConsumoKcal: planoAlimentarData?.metaConsumoKcal || 0,
    refeicoes: planoAlimentarData?.refeicoes || []
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [selectedRefeicoes, setSelectedRefeicoes] = useState<Refeicao[]>(
    planoAlimentarData?.refeicoes || []
  );

  const [selectedRefeicao, setSelectedRefeicao] = useState<Refeicao>({
    alimento: '',
    quantidade: 0,
    kcal: 0,
    carboidrato: 0,
    proteina: 0,
    gordura: 0,
    tipoRefeicao: TipoRefeicao.CAFE_DA_MANHA,
    planoAlimentarId: 0
  });

  const [openAddRefeicaoModal, setOpenAddRefeicaoModal] = useState(false);
  const [openEditRefeicaoModal, setOpenEditRefeicaoModal] = useState(false);
  const [newRefeicao, setNewRefeicao] = useState<Refeicao>({
    alimento: '',
    quantidade: 0,
    kcal: 0,
    carboidrato: 0,
    proteina: 0,
    gordura: 0,
    tipoRefeicao: TipoRefeicao.CAFE_DA_MANHA,
    planoAlimentarId: 0
  });

  const { mutate: createPlanoAlimentar } = useCreatePlanoAlimentar({
    onSuccess: () => {
      showAlert('success', 'Plano Alimentar criado com sucesso!');
    },
    onError: (error) => {
      console.error('Erro ao criar plano alimentar:', error.message);
      showAlert('error', 'Erro ao criar plano alimentar. Tente novamente.');
    }
  });

  const { mutate: updatePlanoAlimentar } = useUpdatePlanoAlimentar({
    onSuccess: () => {
      showAlert('success', 'Plano atualizado com sucesso!');
      navigate(
        !vinculado
          ? '/planos-alimentares'
          : `/planos-alimentares-aluno-vinculado/${location.state.data.id}`,
        {
          state: {
            login: location.state.login,
            planoalimentar: location.state.planoalimentar
          }
        }
      );
    },
    onError: (error) => {
      console.error('Erro ao atualizar plano alimentar:', error.message);
      showAlert('error', 'Erro ao atualizar plano alimentar. Tente novamente.');
    }
  });

  const mutation = useMutation({
    mutationFn: async () => {
      const validationErrors: FormErrors = {};
      if (selectedRefeicoes.length === 0)
        validationErrors.refeicoes = 'Refeições é obrigatório *';

      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        throw new Error('Validação falhou');
      }

      formData.refeicoes = selectedRefeicoes;

      if (id) {
        return updatePlanoAlimentar({
          id: Number(id),
          planoalimentar: formData
        });
      } else {
        return createPlanoAlimentar(formData);
      }
    },
    onSuccess: () => {
      setErrors({});
      navigate(
        !vinculado
          ? '/planos-alimentares'
          : `/planos-alimentares-aluno-vinculado/${location.state.data.id}`,
        {
          state: {
            isSuccessPlanoAlimentar: true,
            data: location.state.login,
            planoalimentar: location.state.planoalimentar
          }
        }
      );
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

  const handleAddRefeicao = () => {
    setOpenAddRefeicaoModal(true);
  };

  const handleCloseModal = () => {
    setOpenAddRefeicaoModal(false);
    setOpenEditRefeicaoModal(false);
  };

  const handleSaveRefeicao = () => {
    setSelectedRefeicoes((prev) => [...prev, newRefeicao]);
    handleCloseModal();
    showAlert('success', 'Refeição adicionada com sucesso!');
    setNewRefeicao({
      alimento: '',
      quantidade: 0,
      kcal: 0,
      carboidrato: 0,
      proteina: 0,
      gordura: 0,
      tipoRefeicao: TipoRefeicao.CAFE_DA_MANHA,
      planoAlimentarId: 0
    });
  };

  const handleEditRefeicao = (refeicao: Refeicao) => {
    setOpenEditRefeicaoModal(true);
    setSelectedRefeicao(refeicao);
  };

  const handleSaveEditRefeicao = () => {
    setSelectedRefeicoes((prev) =>
      prev.map((refeicao) =>
        refeicao?.id === selectedRefeicao?.id ? selectedRefeicao : refeicao
      )
    );

    handleCloseModal();
    showAlert('success', 'Exercício atualizado com sucesso!');
    setNewRefeicao({
      alimento: '',
      quantidade: 0,
      kcal: 0,
      carboidrato: 0,
      proteina: 0,
      gordura: 0,
      tipoRefeicao: TipoRefeicao.CAFE_DA_MANHA,
      planoAlimentarId: 0
    });
  };

  const handleDeleteRefeicao = (refeicao: Refeicao) => {
    setSelectedRefeicoes((prev) =>
      prev.filter((item) => item.id !== refeicao.id)
    );
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationErrors: FormErrors = {};
    if (!formData.metaConsumoCarboidrato)
      validationErrors.metaConsumoCarboidrato =
        'Meta de consumo de carboidrato é obrigatório *';
    if (!formData.metaConsumoGordura)
      validationErrors.metaConsumoGordura =
        'Meta de consumo de gordura é obrigatória *';
    if (!formData.metaConsumoProteina)
      validationErrors.metaConsumoProteina =
        'Meta de consumo de proteina é obrigatória *';
    if (!formData.metaConsumoKcal)
      validationErrors.metaConsumoKcal =
        'Meta de consumo de Kcal é obrigatória *';
    if (selectedRefeicoes.length === 0)
      validationErrors.refeicoes = 'Refeições é obrigatório *';

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    formData.refeicoes = selectedRefeicoes;
    mutation.mutate();
  };

  return (
    <CustomLayout appBarText="Plano Alimentar">
      <form onSubmit={handleSubmit} noValidate>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              name="metaConsumoKcal"
              label="Meta de Consumo (Kcal)"
              type="number"
              fullWidth
              value={formData.metaConsumoKcal}
              onChange={handleChange}
              error={Boolean(errors.metaConsumoKcal)}
              helperText={errors.metaConsumoKcal}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              name="metaConsumoCarboidrato"
              label="Meta de Consumo de Carboidrato (g)"
              type="number"
              fullWidth
              value={formData.metaConsumoCarboidrato}
              onChange={handleChange}
              error={Boolean(errors.metaConsumoCarboidrato)}
              helperText={errors.metaConsumoCarboidrato}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              name="metaConsumoProteina"
              label="Meta de Consumo de Proteína (g)"
              type="number"
              fullWidth
              value={formData.metaConsumoProteina}
              onChange={handleChange}
              error={Boolean(errors.metaConsumoProteina)}
              helperText={errors.metaConsumoProteina}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              name="metaConsumoGordura"
              label="Meta de Consumo de Gordura (g)"
              type="number"
              fullWidth
              value={formData.metaConsumoGordura}
              onChange={handleChange}
              error={Boolean(errors.metaConsumoGordura)}
              helperText={errors.metaConsumoGordura}
            />
          </Grid>

          <Grid container spacing={2} style={{ marginTop: '1rem' }}>
            {selectedRefeicoes.map((refeicao, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <RefeicaoCard
                  refeicao={refeicao}
                  buttons={[
                    {
                      startIcon: <EditIcon />,
                      onClick: () => handleEditRefeicao(refeicao),
                      backgroundColor: 'transparent',
                      iconColor: '#6842FF',
                      border: 'none'
                    },
                    {
                      startIcon: <DeleteIcon />,
                      onClick: () => handleDeleteRefeicao(refeicao),
                      backgroundColor: 'transparent',
                      iconColor: '#6842FF',
                      border: 'none'
                    }
                  ]}
                />
              </Grid>
            ))}
          </Grid>

          <Grid item xs={12}>
            <Button onClick={handleAddRefeicao} variant="contained">
              + Adicionar refeição
            </Button>
          </Grid>

          <Grid item xs={12}>
            <GroupButtons
              buttons={[
                {
                  text: 'Cancelar',
                  onClick: () =>
                    navigate(
                      vinculado
                        ? `/planos-alimentares-aluno-vinculado/${location.state.data.id}`
                        : '/planos-alimentares',
                      {
                        state: {
                          login: location.state.login,
                          refeicao: location.state.refeicao
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
        open={openEditRefeicaoModal}
        onClose={handleCloseModal}
        onSave={handleSaveEditRefeicao}
        title="Editar Refeicao"
      >
        <RefeicaoForm
          newRefeicao={selectedRefeicao}
          setNewRefeicao={setSelectedRefeicao}
        />
      </CustomModal>

      <CustomModal
        open={openAddRefeicaoModal}
        onClose={handleCloseModal}
        onSave={handleSaveRefeicao}
        title="Adicionar Nova Refeição"
      >
        <RefeicaoForm
          newRefeicao={newRefeicao}
          setNewRefeicao={setNewRefeicao}
        />
      </CustomModal>
    </CustomLayout>
  );
}
