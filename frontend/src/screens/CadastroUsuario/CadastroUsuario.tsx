import { useState, useEffect, FormEvent } from 'react';
import {
  Avatar,
  Box,
  Button,
  CssBaseline,
  Grid,
  Container,
  Paper,
  Link,
  TextField,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl
} from '@mui/material';
import { useAlert } from '../../components/CustomAlert';
import { LockOutlined as LockOutlinedIcon } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import Copyright from '../../components/Copyright';
import useCreateUsuario from '../../hooks/useCreateUsuario';

const StyledPaper = styled(Paper)(({ theme }) => ({
  marginTop: theme.spacing(8),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  margin: theme.spacing(1),
  backgroundColor: theme.palette.secondary.main
}));

const StyledForm = styled('form')(({ theme }) => ({
  width: '100%',
  marginTop: theme.spacing(1)
}));

const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(3, 0, 2)
}));

interface Usuario {
  email: string;
  nome: string;
  senha: string;
  sexo: 'FEMININO' | 'MASCULINO' | 'OUTRO';
  tipo_usuario: 'ALUNO' | 'NUTRICIONISTA' | 'PERSONAL';
  registro_profissional: string | null;
}

export default function CadastroUsuario() {
  const { showAlert } = useAlert();
  const navigate = useNavigate();

  const [nome, setNome] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [senha, setSenha] = useState<string>('');
  const [tipoSexo, setTipoSexo] = useState<'FEMININO' | 'MASCULINO' | 'OUTRO'>(
    'OUTRO'
  );
  const [tipoUsuario, setTipoUsuario] = useState<
    'ALUNO' | 'NUTRICIONISTA' | 'PERSONAL'
  >('ALUNO');
  const [registroProfissional, setRegistroProfissional] = useState<string>('');
  const [botaoDesabilitado, setBotaoDesabilitado] = useState<boolean>(true);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { mutate: createUsuario } = useCreateUsuario({
    onSuccess: () => {
      showAlert('success', 'Conta criada com sucesso!');
      navigate('/');
    },
    onError: (error) => {
      showAlert('error', `Erro ao criar conta: ${error.message}`);
      console.error('Erro ao criar conta:', error.message);
    }
  });

  useEffect(() => {
    const isFormValid =
      nome.trim() &&
      email.trim() &&
      senha.trim() &&
      tipoUsuario &&
      (tipoUsuario === 'ALUNO' || registroProfissional.trim());

    setBotaoDesabilitado(!isFormValid);
  }, [nome, email, senha, tipoSexo, tipoUsuario, registroProfissional]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationErrors: Record<string, string> = {};
    if (!nome.trim()) validationErrors.nome = 'Nome é obrigatório';
    if (!email.trim()) validationErrors.email = 'Email é obrigatório';
    if (!senha.trim()) validationErrors.senha = 'Senha é obrigatória';
    if (!tipoSexo) validationErrors.sexo = 'Sexo é obrigatório';
    if (!tipoUsuario)
      validationErrors.tipoUsuario = 'Tipo de usuário é obrigatório';
    if (
      (tipoUsuario === 'NUTRICIONISTA' || tipoUsuario === 'PERSONAL') &&
      !registroProfissional.trim()
    ) {
      validationErrors.registroProfissional =
        'Registro profissional é obrigatório';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const usuario: Usuario = {
      email,
      nome,
      senha,
      sexo: tipoSexo,
      tipo_usuario: tipoUsuario,
      registro_profissional: registroProfissional || null
    };

    createUsuario(usuario);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <StyledPaper>
        <StyledAvatar>
          <LockOutlinedIcon />
        </StyledAvatar>
        <Typography component="h1" variant="h5">
          Cadastro de Usuário
        </Typography>

        <StyledForm noValidate autoComplete="off" onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="nome"
            label="Nome Completo"
            name="nome"
            autoComplete="name"
            autoFocus
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            error={!!errors.nome}
            helperText={errors.nome}
          />

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Endereço de Email"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!errors.email}
            helperText={errors.email}
          />

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="senha"
            label="Senha"
            type="password"
            id="senha"
            autoComplete="new-password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            error={!!errors.senha}
            helperText={errors.senha}
          />

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

          <FormControl fullWidth variant="outlined" margin="normal" required>
            <InputLabel id="tipo-usuario-label">Tipo de Usuário</InputLabel>
            <Select
              labelId="tipo-usuario-label"
              id="tipo-usuario"
              value={tipoUsuario}
              onChange={(e) =>
                setTipoUsuario(
                  e.target.value as 'ALUNO' | 'NUTRICIONISTA' | 'PERSONAL'
                )
              }
              label="Tipo de Usuário"
              error={!!errors.tipoUsuario}
            >
              <MenuItem value="ALUNO">Aluno</MenuItem>
              <MenuItem value="NUTRICIONISTA">Nutricionista</MenuItem>
              <MenuItem value="PERSONAL">Personal</MenuItem>
            </Select>
            {errors.tipoUsuario && (
              <Typography color="error">{errors.tipoUsuario}</Typography>
            )}
          </FormControl>

          {(tipoUsuario === 'NUTRICIONISTA' || tipoUsuario === 'PERSONAL') && (
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="registro-profissional"
              label="Registro Profissional"
              name="registro-profissional"
              autoComplete="registro-profissional"
              value={registroProfissional}
              onChange={(e) => setRegistroProfissional(e.target.value)}
              error={!!errors.registroProfissional}
              helperText={errors.registroProfissional}
            />
          )}

          <StyledButton
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={botaoDesabilitado}
          >
            <LockOutlinedIcon /> Criar conta
          </StyledButton>
        </StyledForm>
      </StyledPaper>

      <Grid container>
        <Grid item xs />
        <Grid item>
          <Link href="/" variant="body2">
            {'Já tem uma conta? Faça login'}
          </Link>
        </Grid>
      </Grid>

      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
