import { useState, useEffect } from 'react';
import Copyright from '../../components/Copyright';
import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Link,
  Grid,
  Paper,
  TextField,
  Typography
} from '@mui/material';
import { LockOutlined as LockOutlinedIcon } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

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
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [lembrarUsuario, setLembrarUsuario] = useState(false);
  const [botaoDesabilitado, setBotaoDesabilitado] = useState(true);
  const [helperText, setHelperText] = useState('');
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (email.trim() && senha.trim()) {
      setBotaoDesabilitado(false);
    } else {
      setBotaoDesabilitado(true);
    }
  }, [email, senha]);

  useEffect(() => {
    document.title = 'Exemplo React - Área Reservada';
    if (localStorage.getItem('usuario')) {
      setLembrarUsuario(true);
      // setEmail(localStorage.getItem('usuario'));
    }
  }, []);

  useEffect(() => {
    if (lembrarUsuario) {
      localStorage.setItem('usuario', email);
    } else {
      localStorage.removeItem('usuario');
    }
  }, [lembrarUsuario, email]);

  const validaLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (email === 'alguem@email.com' && senha === '123senha') {
      setError(false);
      setHelperText('Login OK! Aguarde...');
      navigate('/dashboard');
    } else {
      setError(true);
      setHelperText('O usuário ou a senha informados são inválidos!');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <StyledPaper>
        <StyledAvatar>
          <LockOutlinedIcon />
        </StyledAvatar>

        <Typography component="h1" variant="h5">
          Área Reservada
        </Typography>

        <StyledForm noValidate onSubmit={validaLogin}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Endereço de Email"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={error}
          />

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Senha"
            type="password"
            id="password"
            autoComplete="current-password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            error={error}
            helperText={helperText}
          />

          <StyledButton
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={botaoDesabilitado}
          >
            <LockOutlinedIcon /> Acessar
          </StyledButton>
        </StyledForm>
      </StyledPaper>

      <Grid container>
        <Grid item xs />
        <Grid item>
          <Link href="/cadastro" variant="body2">
            {'Ainda não tem uma conta?'}
          </Link>
        </Grid>
      </Grid>

      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
