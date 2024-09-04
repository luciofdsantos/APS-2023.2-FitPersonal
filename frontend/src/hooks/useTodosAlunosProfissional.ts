import { useQuery } from '@tanstack/react-query';

const endpoint =
  'http://localhost:8080/api/vincular-aluno/listar-alunos-personal';

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
