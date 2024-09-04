import { useState, useEffect, FormEvent } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl
} from '@mui/material';
import { useAlert } from '../../components/CustomAlert';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { Copyright } from '../../components';
import { useCreateUsuario } from '../../hooks';
import {
  Content,
  Aside,
  Main,
  MainContent,
  ContentContainer,
  HeaderContainer
} from './style';
import React from 'react';

const StyledForm = styled('form')(({ theme }) => ({
  width: '100%',
  marginTop: theme.spacing(1)
}));

const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(3, 0, 2),
  padding: theme.spacing(2, 0)
}));

const StyledButtonSecondary = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1, 0),
  marginBottom: theme.spacing(4)
}));

interface Usuario {
  email: string;
  nome: string;
  sobrenome: string;
  senha: string;
  altura: null;
  peso: null;
  sexo: 'FEMININO' | 'MASCULINO' | 'OUTRO';
  tipoUsuario: 'ALUNO' | 'NUTRICIONISTA' | 'PERSONAL';
  registroProfissional: string | null;
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function CadastroUsuario() {
  const { showAlert } = useAlert();
  const navigate = useNavigate();

  const [nome, setNome] = useState<string>('');
  const [sobrenome, setSobrenome] = useState<string>('');
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
      if (error.message.includes('Email já está em uso')) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: 'Email já está em uso'
        }));
      } else {
        showAlert('error', `Erro ao criar conta: ${error.message}`);
        console.error('Erro ao criar conta:', error.message);
      }
    }
  });

  useEffect(() => {
    const isFormValid =
      nome.trim() &&
      sobrenome.trim() &&
      email.trim() &&
      senha.trim() &&
      tipoUsuario &&
      (tipoUsuario === 'ALUNO' || registroProfissional.trim());

    setBotaoDesabilitado(!isFormValid);
  }, [
    nome,
    sobrenome,
    email,
    senha,
    tipoSexo,
    tipoUsuario,
    registroProfissional
  ]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationErrors: Record<string, string> = {};
    if (!nome.trim()) validationErrors.nome = 'Nome é obrigatório';
    if (!sobrenome.trim())
      validationErrors.sobrenome = 'Sobrenome é obrigatório';
    if (!email.trim()) {
      validationErrors.email = 'Email é obrigatório';
    } else if (!emailRegex.test(email)) {
      validationErrors.email = 'Email inválido';
    }
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
      sobrenome,
      senha,
      altura: null,
      peso: null,
      sexo: tipoSexo,
      tipoUsuario: tipoUsuario,
      registroProfissional: registroProfissional || null
    };

    createUsuario(usuario);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (errors.email) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: ''
      }));
    }
  };

  return (
    <Main container>
      <Aside item xs={5} sx={{ backgroundImage: `url('/cadastro.png')` }} />
      <Content item xs={12} md={7}>
        <HeaderContainer>
          <Typography variant="body2">Já possui uma conta?</Typography>
          <Button color="primary" variant="text" onClick={() => navigate('/')}>
            Entrar
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
              CRIAR CONTA
            </Typography>

            <StyledForm noValidate autoComplete="off" onSubmit={handleSubmit}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="nome"
                label="Nome"
                name="nome"
                autoComplete="nome"
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
                id="sobrenome"
                label="Sobrenome"
                name="sobrenome"
                autoComplete="sobrenome"
                autoFocus
                value={sobrenome}
                onChange={(e) => setSobrenome(e.target.value)}
                error={!!errors.sobrenome}
                helperText={errors.sobrenome}
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
                onChange={handleEmailChange}
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

              <FormControl
                fullWidth
                variant="outlined"
                margin="normal"
                required
              >
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

              <FormControl
                fullWidth
                variant="outlined"
                margin="normal"
                required
              >
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

              {(tipoUsuario === 'NUTRICIONISTA' ||
                tipoUsuario === 'PERSONAL') && (
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
                Cadastrar
              </StyledButton>
              <StyledButtonSecondary fullWidth variant="text" color="primary">
                Voltar
              </StyledButtonSecondary>
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
