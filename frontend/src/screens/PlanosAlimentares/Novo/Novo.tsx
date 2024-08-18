import { useState, ChangeEvent, FormEvent } from 'react';
import { GroupButtons, CustomLayout } from '../../../components';
import {
  Dashboard,
  Add as AddIcon,
  Remove as RemoveIcon
} from '@mui/icons-material';
import { Grid, TextField, IconButton } from '@mui/material';
import { TypePlanosAlimentares } from 'src/types';

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

interface RefeicaoFieldProps {
  value: TypePlanosAlimentares.Refeicao;
  onChange: (value: TypePlanosAlimentares.Refeicao) => void;
  onRemove: () => void;
  size: number;
}

const RefeicaoField = ({
  value,
  onChange,
  onRemove,
  size
}: RefeicaoFieldProps) => (
  <Grid container spacing={2} alignItems="center" sx={{ pb: 1 }}>
    <Grid item xs={11}>
      <TextField
        fullWidth
        label="Alimento"
        variant="outlined"
        value={value.alimento}
        onChange={(e) => onChange({...value, alimento: e.target.value})}
        sx={{pb:1}}
      />
      <TextField
        fullWidth
        label="Quantidade"
        variant="outlined"
        value={value.quantidade}
        onChange={(e) =>
          onChange({...value, quantidade: parseFloat(e.target.value)})
        }
        type="number"
        sx={{pb:1}}
      />
      <TextField
        fullWidth
        label="Kcal"
        variant="outlined"
        value={value.kcal}
        onChange={(e) =>
          onChange({...value, kcal: parseFloat(e.target.value)})
        }
        type="number"
        sx={{pb:1}}
      />
      <TextField
        fullWidth
        label="Tipo de Refeição"
        variant="outlined"
        value={value.tipoRefeicao}
        onChange={(e) => onChange({...value, tipoRefeicao: e.target.value})}
      />
    </Grid>

    {size > 1 && (
      <Grid item xs={1}>
        <IconButton onClick={onRemove} color="error">
          <RemoveIcon />
        </IconButton>
      </Grid>
    )}
  </Grid>
);

const items = [{ text: 'Dashboard', Icon: Dashboard, path: '/' }];

export default function Novo() {
  const [formData, setFormData] =
    useState<FormData>({
      id: 0,
      nome: '',
      totalConsumoCarboidrato: 0,
      totalConsumoProteina: 0,
      totalConsumoGordura: 0
    });
  const [errors, setErrors] = useState<FormErrors>({});
  const [refeicoes, setRefeicoes] = useState<TypePlanosAlimentares.Refeicao[]>([{
    alimento: '',
    quantidade: 0,
    kcal: 0,
    tipoRefeicao: ''
  }]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddRefeicao = () => {
    const alimento = prompt('Nome do alimento');
    const quantidade = parseFloat(prompt('Quantidade') || '0');
    const kcal = parseFloat(prompt('Calorias') || '0');
    const tipoRefeicao = prompt('Tipo de refeição');
    if (alimento && quantidade > 0 && kcal > 0 && tipoRefeicao) {
      setRefeicoes([...refeicoes, { alimento: '', quantidade: 0, kcal: 0, tipoRefeicao: '' }]);
    } else {
      alert('Preencha todos os campos da nova refeição antes de adicionar.');
    }
  };

  const handleRemoveRefeicao = (index: number) => {
    setRefeicoes(refeicoes.filter((_, i) => i !== index));
  };

  const handleChangeRefeicao = (index: number, newValue: TypePlanosAlimentares.Refeicao) => {
    const updatedRefeicoes = refeicoes.map((refeicao, i) =>
      i === index ? newValue : refeicao
    );
    setRefeicoes(updatedRefeicoes);
  };

  const validateForm = (): boolean => {
    const errors: FormErrors = {};
    if (!formData.nome) errors.nome = 'Nome do plano é obrigatório *';
    if (!formData.totalConsumoCarboidrato)
      errors.totalConsumoCarboidrato = 'Consumo de carboidrato é obrigatório *';
    if (!formData.totalConsumoProteina)
      errors.totalConsumoProteina = 'Consumo de proteína é obrigatório *';
    if (!formData.totalConsumoGordura)
      errors.totalConsumoGordura = 'Consumo de gordura é obrigatório *';
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form data submitted:', formData);
    }
  };

  return (
    <CustomLayout appBarText="Planos Alimentares" items={items}>
      <form onSubmit={handleSubmit} noValidate>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              name="nome"
              label="Nome do plano alimentar *"
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
              name="totalConsumoCarboidrato"
              label="Total Consumo de Carboidrato (g) *"
              variant="outlined"
              fullWidth
              type="number"
              value={formData.totalConsumoCarboidrato}
              onChange={handleChange}
              error={!!errors.totalConsumoCarboidrato}
              helperText={errors.totalConsumoCarboidrato}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              name="totalConsumoProteina"
              label="Total Consumo de Proteína (g) *"
              variant="outlined"
              fullWidth
              type="number"
              value={formData.totalConsumoProteina}
              onChange={handleChange}
              error={!!errors.totalConsumoProteina}
              helperText={errors.totalConsumoProteina}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              name="totalConsumoGordura"
              label="Total Consumo de Gordura (g) *"
              variant="outlined"
              fullWidth
              type="number"
              value={formData.totalConsumoGordura}
              onChange={handleChange}
              error={!!errors.totalConsumoGordura}
              helperText={errors.totalConsumoGordura}
            />
          </Grid>

          <Grid item xs={12}>
            {refeicoes.map((refeicao, index) => (
              <RefeicaoField
                key={index}
                value={refeicao}
                size={refeicoes.length}
                onChange={(newValue: TypePlanosAlimentares.Refeicao) =>
                  handleChangeRefeicao(index, newValue)
                }
                onRemove={() => handleRemoveRefeicao(index)}
              />
            ))}

            <GroupButtons
              buttons={[
                {
                  text: 'Nova refeição',
                  onClick: handleAddRefeicao,
                  startIcon: <AddIcon />
                }
              ]}
            />
          </Grid>
        </Grid>

        <GroupButtons
          buttons={[
            { text: 'Salvar', type: 'submit' },
            { text: 'Voltar', href: '/planos-alimentares' }
          ]}
        />
      </form>
    </CustomLayout>
  );
}
