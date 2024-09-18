import { useQuery } from '@tanstack/react-query';

const endpoints = {
  personal: 'http://localhost:8080/api/vincular-aluno/listar-alunos-personal',
  nutricionista:
    'http://localhost:8080/api/vincular-aluno/listar-alunos-nutricionista'
};

const fetchTodosAlunosProfissional = async () => {
  const usuarioString = localStorage.getItem('usuario');
  let usuario;

  if (usuarioString) {
    try {
      usuario = JSON.parse(usuarioString);

      JSON.parse(usuarioString);
    } catch (error) {
      console.error('Erro ao analisar o JSON do localStorage:', error);
    }
  }

  if (!usuario) {
    throw new Error('Usuário não encontrado');
  }

  let endpoint;
  if (usuario.tipoUsuario === 'PERSONAL') {
    endpoint = endpoints.personal;
  } else if (usuario.tipoUsuario === 'NUTRICIONISTA') {
    endpoint = endpoints.nutricionista;
  } else {
    throw new Error('Tipo de usuário inválido');
  }

  try {
    const response = await fetch(`${endpoint}/${usuario?.id}`);
    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Erro ao buscar alunos: ${errorMessage}`);
    }
    return response.json();
  } catch (error) {
    throw new Error(
      `Erro ao buscar alunos: ${error instanceof Error ? error.message : 'Desconhecido'}`
    );
  }
};

export default function useTodosAlunosProfissional() {
  return useQuery({
    queryKey: ['alunos-profissional'],
    queryFn: fetchTodosAlunosProfissional,
    retry: false
  });
}
