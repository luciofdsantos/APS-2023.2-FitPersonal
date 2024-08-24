import { useState, ChangeEvent, FormEvent } from 'react';
import { CustomLayout, CustomModal, GroupButtons } from '../../../components';
import { Grid, TextField, Button } from '@mui/material';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import {
  useCreatePlanoAlimentar,
  useUpdatePlanoAlimentar,
  useCreateRefeicao,
  useRefeicoes
} from '../../../hooks';

interface FormData {
  id?: number;
  nome: string;
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
  nome?: string;
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

interface SelectTest {
  id: string;
  [key: string]: string | number;
}

export default function EditarNovo() {
  const { id } = useParams<{ id?: string }>();
  const { data: refeicoes, isLoading, error } = useRefeicoes();

  console.log('isLoading ->', isLoading);
  console.log('refeicoes -> ', refeicoes);

  const location = useLocation();
  const navigate = useNavigate();

  const planoAlimentarData = location.state?.planoalimentar || {
    nome: '',
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
    FormData & { refeicoes: SelectTest[] }
  >({
    nome: planoAlimentarData?.nome || '',
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
  const [selectedRefeicoes, setSelectedRefeicoes] = useState<SelectTest[]>([]);

  const [openAddRefeicaoModal, setOpenAddRefeicaoModal] = useState(false);
  const [newRefeicao, setNewRefeicao] = useState<SelectTest>({
    id: '0',
    alimento: '',
    quantidade: 0,
    kcal: 0,
    carboidrato: 0,
    proteina: 0,
    gordura: 0,
    tipoRefeicao: ''
  });

  const { mutate: createPlanoAlimentar } = useCreatePlanoAlimentar({
    onSuccess: () => {
      alert('Plano Alimentar criado com sucesso!');
    },
    onError: (error) => {
      console.error('Erro ao criar plano alimentar:', error.message);
      alert('Erro ao criar plano alimentar. Tente novamente.');
    }
  });

  const { mutate: updatePlanoAlimentar } = useUpdatePlanoAlimentar({
    onSuccess: () => {
      alert('Plano atualizado com sucesso!');
      navigate('/planos-alimentares');
    },
    onError: (error) => {
      console.error('Erro ao atualizar plano alimentar:', error.message);
      alert('Erro ao atualizar plano alimentar. Tente novamente.');
    }
  });

  const { mutate: createRefeicao } = useCreateRefeicao({
    onSuccess: () => {
      alert('Refeição adicionada com sucesso!');
      setOpenAddRefeicaoModal(false);
    },
    onError: (error) => {
      console.error('Erro ao adicionar refeição:', error.message);
      alert('Erro ao adicionar refeição. Tente novamente.');
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
        return updatePlanoAlimentar({
          id: Number(id),
          planoalimentar: formData
        });
      } else {
        return createPlanoAlimentar(planoAlimentarData);
      }
    },
    onSuccess: () => {
      setErrors({});
      navigate('/planos-alimentares');
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

  const handleAddRefeicao = () => {
    setOpenAddRefeicaoModal(true);
  };

  const handleCloseModal = () => {
    setOpenAddRefeicaoModal(false);
  };

  const handleSaveRefeicao = () => {
    createRefeicao(newRefeicao);
    setSelectedRefeicoes([...selectedRefeicoes, newRefeicao]);
    setNewRefeicao({
      id: '0',
      alimento: '',
      quantidade: 0,
      kcal: 0,
      carboidrato: 0,
      proteina: 0,
      gordura: 0,
      tipoRefeicao: ''
    });
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }

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

          <Grid item xs={12}>
            <Button onClick={handleAddRefeicao}>+ Adicionar refeição</Button>
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Salvar
            </Button>
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
        <form noValidate autoComplete="off">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Alimento"
                fullWidth
                value={newRefeicao.alimento}
                onChange={(e) =>
                  setNewRefeicao({ ...newRefeicao, alimento: e.target.value })
                }
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Quantidade"
                type="number"
                fullWidth
                value={newRefeicao.quantidade}
                onChange={(e) =>
                  setNewRefeicao({
                    ...newRefeicao,
                    quantidade: parseFloat(e.target.value)
                  })
                }
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Kcal"
                type="number"
                fullWidth
                value={newRefeicao.kcal}
                onChange={(e) =>
                  setNewRefeicao({
                    ...newRefeicao,
                    kcal: parseFloat(e.target.value)
                  })
                }
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Carboidrato"
                type="number"
                fullWidth
                value={newRefeicao.carboidrato}
                onChange={(e) =>
                  setNewRefeicao({
                    ...newRefeicao,
                    carboidrato: parseFloat(e.target.value)
                  })
                }
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Proteína"
                type="number"
                fullWidth
                value={newRefeicao.proteina}
                onChange={(e) =>
                  setNewRefeicao({
                    ...newRefeicao,
                    proteina: parseFloat(e.target.value)
                  })
                }
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Gordura"
                type="number"
                fullWidth
                value={newRefeicao.gordura}
                onChange={(e) =>
                  setNewRefeicao({
                    ...newRefeicao,
                    gordura: parseFloat(e.target.value)
                  })
                }
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Tipo de Refeição"
                fullWidth
                value={newRefeicao.tipoRefeicao}
                onChange={(e) =>
                  setNewRefeicao({
                    ...newRefeicao,
                    tipoRefeicao: e.target.value
                  })
                }
              />
            </Grid>
          </Grid>
        </form>
      </CustomModal>
    </CustomLayout>
  );
}
