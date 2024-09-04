import { useQuery } from '@tanstack/react-query';

const endpoint = 'http://localhost:8080/api/vincular-aluno/listar-todos-alunos';

const fetchTodosAlunos = async () => {
  try {
    const response = await fetch(endpoint);
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

export default function useTodosAlunos() {
  return useQuery({
    queryKey: ['alunos'],
    queryFn: fetchTodosAlunos,
    retry: false
  });
}
