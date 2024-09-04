import { CustomLayout, GroupButtons } from '../../../components';
import {
  Grid,
  TextField,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl
} from '@mui/material';
import { useAlert } from '../../../components/CustomAlert';
import { useNavigate } from 'react-router-dom';
import { useState, ChangeEvent, FormEvent } from 'react';
import { useUpdatePerfil } from '../../../hooks';

interface Perfil {
  id: number;
  nome: string;
  sobrenome: string;
  email: string;
  senha?: string;
  peso?: number;
  altura?: number;
  dataNascimento?: string;
  objetivoDeSaude?: string;
  sexo: 'FEMININO' | 'MASCULINO' | 'OUTRO';
}

interface PerfilErrors {
  nome?: string;
  sobrenome?: string;
  email?: string;
  senha?: string;
  peso?: string;
  altura?: string;
  dataNascimento?: string;
  objetivoDeSaude?: string;
  sexo?: string;
}

const getTodayDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export default function Perfil() {
  const { showAlert } = useAlert();
  const navigate = useNavigate();

  const usuarioString = localStorage.getItem('usuario');
  const [tipoSexo, setTipoSexo] = useState<'FEMININO' | 'MASCULINO' | 'OUTRO'>(
    'OUTRO'
  );

  let isProfissional = false;
  let usuarioParse;

  if (usuarioString) {
    try {
      const usuario = JSON.parse(usuarioString);
      usuarioParse = JSON.parse(usuarioString);

      isProfissional =
        usuario.tipoUsuario === 'NUTRICIONISTA' ||
        usuario.tipoUsuario === 'PERSONAL';
    } catch (error) {
      console.error('Erro ao analisar o JSON do localStorage:', error);
    }
  }

  const todayDate = getTodayDate();

  const [formData, setFormData] = useState<Perfil>({
    id: usuarioParse?.id || 0,
    nome: usuarioParse?.nome || '',
    sobrenome: usuarioParse?.sobrenome || '',
    email: usuarioParse?.email || '',
    senha: usuarioParse?.senha || '',
    peso: usuarioParse?.peso || 0,
    altura: usuarioParse?.altura || 0,
    dataNascimento: usuarioParse?.dataNascimento || todayDate,
    objetivoDeSaude: usuarioParse?.objetivoDeSaude || '',
    sexo: usuarioParse?.objetivoDeSaude || 'OUTRO'
  });

  const [errors, setErrors] = useState<PerfilErrors>({});

  const { mutate: updatePerfil } = useUpdatePerfil({
    onSuccess: () => {
      showAlert('success', 'Perfil editado com Sucesso!');
      isProfissional ? navigate('/alunos') : navigate('/treinos');
    },
    onError: (error: Error) => {
      showAlert('error', 'Erro ao editar perfil. Tente novamente.');
      console.error('Erro ao atualizar perfil:', error.message);
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

    const validationErrors: PerfilErrors = {};

    if (!formData.nome) validationErrors.nome = 'Nome é obrigatório *';
    if (!formData.sobrenome)
      validationErrors.sobrenome = 'Sobrenome é obrigatório *';
    if (!formData.email) validationErrors.email = 'Email é obrigatório *';
    if (formData.senha && formData.senha.length < 6)
      validationErrors.senha = 'Senha deve ter pelo menos 6 caracteres';
    if (!formData.peso && formData.peso !== 0)
      validationErrors.peso = 'Peso é obrigatório *';
    if (!formData.altura && formData.altura !== 0)
      validationErrors.altura = 'Altura é obrigatória *';
    if (!formData.dataNascimento)
      validationErrors.dataNascimento = 'Data de nascimento é obrigatória *';

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    updatePerfil({
      ...formData,
      peso: Number(formData.peso),
      altura: Number(formData.altura)
    });
  };

  return (
    <CustomLayout appBarText="Editar Perfil">
      <form autoComplete="off" onSubmit={handleSubmit} noValidate>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              name="nome"
              label="Nome"
              fullWidth
              value={formData.nome}
              onChange={handleChange}
              error={Boolean(errors.nome)}
              helperText={errors.nome}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              name="sobrenome"
              label="Sobrenome"
              fullWidth
              value={formData.sobrenome}
              onChange={handleChange}
              error={Boolean(errors.sobrenome)}
              helperText={errors.sobrenome}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              name="email"
              label="Email"
              type="email"
              fullWidth
              value={formData.email}
              onChange={handleChange}
              error={Boolean(errors.email)}
              helperText={errors.email}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              name="senha"
              label="Senha"
              type="password"
              fullWidth
              value={formData.senha || ''}
              onChange={handleChange}
              error={Boolean(errors.senha)}
              helperText={errors.senha}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              name="peso"
              label="Peso (kg)"
              type="number"
              fullWidth
              value={formData.peso || 0}
              onChange={handleChange}
              error={Boolean(errors.peso)}
              helperText={errors.peso}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              name="altura"
              label="Altura (cm)"
              type="number"
              fullWidth
              value={formData.altura || 0}
              onChange={handleChange}
              error={Boolean(errors.altura)}
              helperText={errors.altura}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              type="date"
              label="Data de Nascimento *"
              name="dataNascimento"
              defaultValue={formData.dataNascimento}
              onChange={handleChange}
              inputProps={{ min: '1900-01-01', max: todayDate }}
              fullWidth
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              type="sexo"
              label="Data de Nascimento *"
              name="dataNascimento"
              defaultValue={formData.dataNascimento}
              onChange={handleChange}
              inputProps={{ min: '1900-01-01', max: todayDate }}
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth variant="outlined" margin="normal" required>
              <InputLabel id="sexo-label">Sexo</InputLabel>
              <Select
                labelId="sexo-label"
                id="sexo"
                value={tipoSexo}
                onChange={(e) =>
                  setTipoSexo(
                    e.target.value as 'FEMININO' | 'MASCULINO' | 'OUTRO'
                  )
                }
                label="Sexo"
                error={!!errors.sexo}
              >
                <MenuItem value="FEMININO">Feminino</MenuItem>
                <MenuItem value="MASCULINO">Masculino</MenuItem>
                <MenuItem value="OUTRO">Prefiro não dizer</MenuItem>
              </Select>
              {errors.sexo && (
                <Typography color="error">{errors.sexo}</Typography>
              )}
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <GroupButtons
              buttons={[
                { text: 'Salvar', type: 'submit' },
                {
                  text: 'Cancelar',
                  onClick: () => navigate('/perfil')
                }
              ]}
            />
          </Grid>
        </Grid>
      </form>
    </CustomLayout>
  );
}
