import { useState, ChangeEvent, FormEvent } from 'react';
import { AutoComplete, GroupButtons, CustomLayout } from '../../../components';
import { Dashboard } from '@mui/icons-material';
import { Grid, TextField } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import apiRefeicoes from '../../../mocks/apiRefeicoes.json';

interface SelectOptionType {
  alimento: string;
  quantidade: number;
  kcal: number;
  carboidrato: number;
  proteina: number;
  gordura: number;
  tipoRefeicao: string;
}

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

const endpoint = 'http://92.113.32.219:8080/api/refeicoes';

const createPlanoAlimentar = async (
  planoalimentar: FormData & { refeicoes: SelectOptionType[] }
) => {
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(planoalimentar)
  });
  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(`Erro ao criar plano alimentar: ${errorMessage}`);
  }
  return response.json();
};

const updatePlanoAlimentar = async (
  id: number,
  planoalimentar: FormData & { refeicoes: SelectOptionType[] }
) => {
  const response = await fetch(`${endpoint}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(planoalimentar)
  });
  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(`Erro ao atualizar plano alimentar: ${errorMessage}`);
  }
  return response.json();
};

export default function EditarNovo() {
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
    FormData & { refeicoes: SelectOptionType[] }
  >({
    nome: planoAlimentarData?.nome || '',
    totalConsumoCarboidrato: planoAlimentarData?.totalConsumoCarboidrato || 0,
    totalConsumoProteina: planoAlimentarData?.totalConsumoProteina || 0,
    totalConsumoGordura: planoAlimentarData?.totalConsumoGordura || 0,
    refeicoes: planoAlimentarData?.refeicoes || []
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [selectedRefeicoes, setSelectedRefeicoes] = useState<
    SelectOptionType[]
  >(formData.refeicoes);

  const mutation = useMutation({
    mutationFn: async () => {
      const validationErrors: FormErrors = {};
      if (selectedRefeicoes.length === 0)
        validationErrors.refeicoes = 'Refeições é obrigatório *';

      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        throw new Error('Validação falhou');
      }

      const filteredRefeicoes: SelectOptionType[] = selectedRefeicoes.map(
        ({
          alimento,
          quantidade,
          kcal,
          carboidrato,
          proteina,
          gordura,
          tipoRefeicao
        }) => ({
          alimento,
          quantidade,
          kcal,
          carboidrato,
          proteina,
          gordura,
          tipoRefeicao
        })
      );

      const planoAlimentarData = { ...formData, refeicoes: filteredRefeicoes };

      if (formData.id) {
        return updatePlanoAlimentar(Number(formData.id), planoAlimentarData);
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

  const handleChangeRefeicao = (newValues: SelectOptionType[]) => {
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
