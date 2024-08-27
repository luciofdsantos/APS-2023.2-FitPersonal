import { useState, useCallback, ChangeEvent, FormEvent } from 'react';
import { CustomLayout, CustomModal, GroupButtons } from '../../../components';
import { Grid, TextField, Button } from '@mui/material';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import {
  useCreatePlanoAlimentar,
  useCreateRefeicao,
  useUpdatePlanoAlimentar
} from '../../../hooks';
import RefeicaoForm from './RefeicaoForm';
import RefeicaoCard from './RefeicaoCard';
import { useAlert } from '../../../components/CustomAlert';

interface FormData {
  metaConsumoKcal: number;
  totalConsumoKcal: number;
  metaConsumoCarboidrato: number;
  totalConsumoCarboidrato: number;
  metaConsumoProteina: number;
  totalConsumoProteina: number;
  metaConsumoGordura: number;
  totalConsumoGordura: number;
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
}

export enum TipoRefeicao {
  CAFE_DA_MANHA = 'CAFE_DA_MANHA',
  ALMOCO = 'ALMOCO',
  JANTAR = 'JANTAR',
  LANCHE = 'LANCHE'
}

export default function EditarNovo() {
  const { showAlert } = useAlert();

  const { id } = useParams<{ id?: string }>();

  const location = useLocation();
  const navigate = useNavigate();

  const planoAlimentarData = location.state?.planoalimentar || {
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
    formData?.refeicoes || []
  );

  const [openAddRefeicaoModal, setOpenAddRefeicaoModal] = useState(false);
  const [newRefeicao, setNewRefeicao] = useState<Refeicao>({
    alimento: '',
    quantidade: 0,
    kcal: 0,
    carboidrato: 0,
    proteina: 0,
    gordura: 0,
    tipoRefeicao: TipoRefeicao.CAFE_DA_MANHA
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

  const { mutate: mutateCreateRefeicao } = useCreateRefeicao({
    onSuccess: () => {
      showAlert('success', 'Refeição criada com sucesso!');
    },
    onError: (error) => {
      console.error('Erro ao criar refeição:', error.message);
      showAlert('error', 'Erro ao criar refeição. Tente novamente.');
    }
  });

  const { mutate: updatePlanoAlimentar } = useUpdatePlanoAlimentar({
    onSuccess: () => {
      showAlert('success', 'Plano atualizado com sucesso!');
      navigate('/planos-alimentares');
    },
    onError: (error) => {
      showAlert('error', 'Erro ao atualizar plano alimentar. Tente novamente.');
      console.error('Erro ao atualizar plano alimentar:', error.message);
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

      if (id) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { refeicoes, ...resto } = formData;

        return updatePlanoAlimentar({
          id: Number(id),
          planoalimentar: resto
        });
      } else {
        formData.refeicoes = selectedRefeicoes;

        return createPlanoAlimentar(formData);
      }
    },
    onSuccess: () => {
      setErrors({});
      navigate('/planos-alimentares', {
        state: { isSuccessPlanoAlimentar: 'true' }
      });
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
  };

  const handleSaveRefeicao = useCallback(() => {
    if (id) {
      mutateCreateRefeicao({ ...newRefeicao, planoAlimentarId: Number(id) });
    }

    setSelectedRefeicoes([...selectedRefeicoes, newRefeicao]);
    setOpenAddRefeicaoModal(false);
    setNewRefeicao({
      alimento: '',
      quantidade: 0,
      kcal: 0,
      carboidrato: 0,
      proteina: 0,
      gordura: 0,
      tipoRefeicao: TipoRefeicao.CAFE_DA_MANHA
    });
  }, [
    id,
    mutateCreateRefeicao,
    setSelectedRefeicoes,
    newRefeicao,
    selectedRefeicoes
  ]);

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

    mutation.mutate();
  };

  return (
    <CustomLayout appBarText="Plano Alimentar">
      <form autoComplete="off" onSubmit={handleSubmit} noValidate>
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

          <Grid container spacing={2}>
            {selectedRefeicoes.map((refeicao: Refeicao, index: number) => (
              <Grid item xs={4} key={index}>
                <RefeicaoCard refeicao={refeicao} />
              </Grid>
            ))}
          </Grid>

          <Grid item xs={12}>
            <Button onClick={handleAddRefeicao}>+ Adicionar refeição</Button>
          </Grid>

          <Grid item xs={12}>
            <GroupButtons
              buttons={[
                { text: 'Salvar', type: 'submit' },
                {
                  text: 'Cancelar',
                  onClick: () => navigate('/planos-alimentares')
                }
              ]}
            />
          </Grid>
        </Grid>
      </form>

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
