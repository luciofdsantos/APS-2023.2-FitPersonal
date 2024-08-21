import { useState, ChangeEvent, FormEvent } from 'react';
import { AutoComplete, GroupButtons, CustomLayout } from '../../../components';
import { Dashboard } from '@mui/icons-material';
import { Grid, TextField } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import apiRefeicoes from '../../../mocks/apiRefeicoes.json';
import { TypeObject } from 'src/types';
import {
  useCreatePlanoAlimentar,
  useUpdatePlanoAlimentar
} from '../../../hooks';
import { useParams } from 'react-router-dom';

interface FormData {
  id?: number;
  nome: string;
  totalConsumoCarboidrato: number;
  totalConsumoProteina: number;
  totalConsumoGordura: number;
}

interface FormErrors {
  nome?: string;
  totalConsumoCarboidrato?: string;
  totalConsumoProteina?: string;
  totalConsumoGordura?: string;
  refeicoes?: string;
}

export default function EditarNovo() {
  const { id } = useParams<{ id?: string }>();

  const location = useLocation();
  const navigate = useNavigate();

  const planoAlimentarData = location.state?.planoalimentar || {
    nome: '',
    totalConsumoCarboidrato: 0,
    totalConsumoProteina: 0,
    totalConsumoGordura: 0,
    refeicoes: []
  };

  const [formData, setFormData] = useState<
    FormData & { refeicoes: TypeObject.SelectTest[] }
  >({
    nome: planoAlimentarData?.nome || '',
    totalConsumoCarboidrato: planoAlimentarData?.totalConsumoCarboidrato || 0,
    totalConsumoProteina: planoAlimentarData?.totalConsumoProteina || 0,
    totalConsumoGordura: planoAlimentarData?.totalConsumoGordura || 0,
    refeicoes: planoAlimentarData?.refeicoes || []
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [selectedRefeicoes, setSelectedRefeicoes] = useState<
    TypeObject.SelectTest[]
  >([]);

  const { mutate: createPlanoAlimentar } = useCreatePlanoAlimentar({
    onSuccess: () => {
      alert('Treino criado com sucesso!');
    },
    onError: (error) => {
      console.error('Erro ao criar treino:', error.message);
      alert('Erro ao criar treino. Tente novamente.');
    }
  });

  const { mutate: updatePlanoAlimentar } = useUpdatePlanoAlimentar({
    onSuccess: () => {
      alert('Plano atualizado com sucesso!');
      navigate('/plano-alimentar');
    },
    onError: (error) => {
      console.error('Erro ao atualizar treino:', error.message);
      alert('Erro ao atualizar treino. Tente novamente.');
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
          planoalimentar: planoAlimentarData
        });
      } else {
        return createPlanoAlimentar(planoAlimentarData);
      }
    },
    onSuccess: () => {
      setErrors({});
      navigate('/plano-alimentar');
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

  const handleChangeRefeicao = (newValues: TypeObject.SelectTest[]) => {
    setSelectedRefeicoes(newValues);

    if (errors.refeicoes) {
      setErrors((prevErrors) => ({ ...prevErrors, refeicoes: undefined }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationErrors: FormErrors = {};
    if (selectedRefeicoes.length === 0)
      validationErrors.refeicoes = 'Refeições é obrigatório *';

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    mutation.mutate();
  };

  return (
    <CustomLayout
      appBarText="Plano Alimentar"
      items={[{ text: 'Dashboard', Icon: Dashboard, path: '/' }]}
    >
      <form onSubmit={handleSubmit} noValidate>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              name="nome"
              label="Nome do plano *"
              variant="outlined"
              fullWidth
              value={formData.nome}
              onChange={handleChange}
              error={!!errors.nome}
              helperText={errors.nome}
            />
          </Grid>

          <Grid item xs={12}>
            <AutoComplete
              name="refeicoes"
              label="Refeições *"
              options={apiRefeicoes}
              optionLabel="alimento"
              values={selectedRefeicoes}
              setValue={handleChangeRefeicao}
              error={errors.refeicoes}
              // disabled={isLoading}
            />
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
    </CustomLayout>
  );
}
