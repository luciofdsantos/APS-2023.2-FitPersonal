import { useState, useEffect } from 'react';
import Copyright from '../../components/Copyright';
import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress
} from '@mui/material';
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
import { useAlert } from '../../components/CustomAlert';
import { useLogin } from '../../hooks';
import React from 'react';

const StyledForm = styled('form')(({ theme }) => ({
  width: '100%',
  marginTop: theme.spacing(1)
}));

const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(3, 0, 2),
  padding: theme.spacing(2, 0)
}));

export default function LoginUsuario() {
  const { showAlert } = useAlert();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
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

  const { mutate: validaUsuario, isPending } = useLogin({
    onSuccess: (data) => {
      setError(false);
      localStorage.setItem('usuario', JSON.stringify(data));
      showAlert('success', 'Login efetuado com sucesso!');
      navigate(
        data.tipoUsuario === 'NUTRICIONISTA' || data.tipoUsuario === 'PERSONAL'
          ? '/alunos'
          : '/treinos',
        {
          state: { login: data }
        }
      );
    },
    onError: () => {
      setError(true);
      setHelperText('O usuário ou a senha informados são inválidos!');
      showAlert('error', 'Erro ao fazer login');
    }
  });

  const validaLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await validaUsuario({ email, senha });
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
                disabled={isPending}
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
                disabled={isPending}
              />

              <StyledButton
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={botaoDesabilitado || isPending}
              >
                {isPending ? <CircularProgress size={24} /> : 'Entrar'}
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
