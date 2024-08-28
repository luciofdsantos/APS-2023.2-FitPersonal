import { useState, useEffect } from 'react';
import Copyright from '../../components/Copyright';
import { Box, Button, TextField, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import {
  Content,
  Aside,
  Main,
  MainContent,
  ContentContainer,
  HeaderContainer
} from './style';

const StyledForm = styled('form')(({ theme }) => ({
  width: '100%',
  marginTop: theme.spacing(1)
}));

const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(3, 0, 2),
  padding: theme.spacing(2, 0)
}));

export default function LoginUsuario() {
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
    <Main container>
      <Aside item xs={5} sx={{ backgroundImage: `url('/entrar.png')` }} />
      <Content item xs={12} md={7}>
        <HeaderContainer>
          <Typography variant="body2">Não possui uma conta?</Typography>
          <Button
            color="primary"
            variant="text"
            onClick={() => navigate('/cadastro')}
          >
            Cadastrar
          </Button>
        </HeaderContainer>
        <MainContent>
          <ContentContainer>
            <Typography
              component="h1"
              variant="h4"
              fontWeight="bold"
              marginBottom={2}
            >
              ENTRAR
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
                Entrar
              </StyledButton>
            </StyledForm>
            <Box display="flex" justifyContent="center" width="100%">
              <Copyright />
            </Box>
          </ContentContainer>
        </MainContent>
      </Content>
    </Main>
  );
}
