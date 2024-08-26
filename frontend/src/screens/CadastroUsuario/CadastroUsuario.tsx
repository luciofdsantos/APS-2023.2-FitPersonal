import { useState, useEffect } from 'react';
import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  Paper,
  Link,
  TextField,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl
} from '@mui/material';
import { LockOutlined as LockOutlinedIcon } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import Copyright from '../../components/Copyright';

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

export default function CadastroUsuario() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [tipoUsuario, setTipoUsuario] = useState('');
  const [registroProfissional, setRegistroProfissional] = useState('');
  const [botaoDesabilitado, setBotaoDesabilitado] = useState(true);
  const [helperText, setHelperText] = useState('');
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (
      nome.trim() &&
      email.trim() &&
      senha.trim() &&
      tipoUsuario &&
      ((tipoUsuario !== 'personal' && tipoUsuario !== 'nutricionista') ||
        registroProfissional.trim())
    ) {
      setBotaoDesabilitado(false);
    } else {
      setBotaoDesabilitado(true);
    }
  }, [nome, email, senha, tipoUsuario, registroProfissional]);

  const validaCadastro = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError(false);
    setHelperText('Conta criada com sucesso!');
    navigate('/');
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

        <StyledForm noValidate onSubmit={validaCadastro}>
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
            error={error}
            helperText={helperText}
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
            error={error}
            helperText={helperText}
          />

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Senha"
            type="password"
            id="senha"
            autoComplete="new-password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            error={error}
            helperText={helperText}
          />

          <FormControl fullWidth variant="outlined" margin="normal" required>
            <InputLabel id="tipo-usuario-label">Tipo de Usuário</InputLabel>
            <Select
              labelId="tipo-usuario-label"
              id="tipo-usuario"
              value={tipoUsuario}
              onChange={(e) => setTipoUsuario(e.target.value as string)}
              label="Tipo de Usuário"
              error={error}
            >
              <MenuItem value="comum">Usuário Comum</MenuItem>
              <MenuItem value="personal">Personal</MenuItem>
              <MenuItem value="nutricionista">Nutricionista</MenuItem>
            </Select>
          </FormControl>

          {(tipoUsuario === 'personal' || tipoUsuario === 'nutricionista') && (
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="registro-profissional"
              label="Registro Profissional"
              name="registro-profissional"
              autoComplete="registro-profissional"
              value={registroProfissional}
              onChange={(e) => setRegistroProfissional(e.target.value)}
              error={error}
              helperText={helperText}
            />
          )}

          <StyledButton
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={botaoDesabilitado}
          >
            Cadastrar
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
