import { CustomLayout, GroupButtons } from '../../../components';
import { Grid, TextField } from '@mui/material';
import { useAlert } from '../../../components/CustomAlert';
import { useNavigate } from 'react-router-dom';
import { useState, ChangeEvent, FormEvent } from 'react';
import { useUpdatePerfil } from '../../../hooks';

interface Perfil {
  id: number;
  nome: string;
  email: string;
  senha?: string;
  peso?: number;
  altura?: number;
  dataNascimento?: string;
  objetivosSaude?: string;
}

interface PerfilErrors {
  nome?: string;
  email?: string;
  senha?: string;
  peso?: string;
  altura?: string;
  dataNascimento?: string;
  objetivosSaude?: string;
}

export default function Perfil() {
  const { showAlert } = useAlert();
  const navigate = useNavigate();

  const usuarioString = localStorage.getItem('usuario');

  let isProfissional = false;

  if (usuarioString) {
    try {
      const usuario = JSON.parse(usuarioString);

      isProfissional =
        usuario.tipoUsuario === 'NUTRICIONISTA' ||
        usuario.tipoUsuario === 'PERSONAL';
    } catch (error) {
      console.error('Erro ao analisar o JSON do localStorage:', error);
    }
  }

  const [formData, setFormData] = useState<Perfil>({
    id: 0,
    nome: '',
    email: '',
    senha: '',
    peso: 0,
    altura: 0,
    dataNascimento: '',
    objetivosSaude: ''
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
    if (!formData.email) validationErrors.email = 'Email é obrigatório *';
    if (formData.senha && formData.senha.length < 6)
      validationErrors.senha = 'Senha deve ter pelo menos 6 caracteres';
    if (!formData.peso && formData.peso !== 0)
      validationErrors.peso = 'Peso é obrigatório *';
    if (!formData.altura && formData.altura !== 0)
      validationErrors.altura = 'Altura é obrigatória *';
    if (!formData.dataNascimento)
      validationErrors.dataNascimento = 'Data de nascimento é obrigatória *';
    if (!formData.objetivosSaude)
      validationErrors.objetivosSaude = 'Objetivos de saúde são obrigatórios *';

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    updatePerfil(formData);
  };

  return (
    <CustomLayout appBarText="Editar Perfil">
      <form autoComplete="off" onSubmit={handleSubmit} noValidate>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
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

          <Grid item xs={12} sm={6}>
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

          <Grid item xs={12} sm={6}>
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

          <Grid item xs={12} sm={6}>
            <TextField
              name="peso"
              label="Peso (kg)"
              type="number"
              fullWidth
              value={formData.peso || ''}
              onChange={handleChange}
              error={Boolean(errors.peso)}
              helperText={errors.peso}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              name="altura"
              label="Altura (cm)"
              type="number"
              fullWidth
              value={formData.altura || ''}
              onChange={handleChange}
              error={Boolean(errors.altura)}
              helperText={errors.altura}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              name="dataNascimento"
              label="Data de Nascimento"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={formData.dataNascimento || ''}
              onChange={handleChange}
              error={Boolean(errors.dataNascimento)}
              helperText={errors.dataNascimento}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              name="objetivosSaude"
              label="Objetivos de Saúde"
              multiline
              rows={4}
              fullWidth
              value={formData.objetivosSaude || ''}
              onChange={handleChange}
              error={Boolean(errors.objetivosSaude)}
              helperText={errors.objetivosSaude}
            />
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
