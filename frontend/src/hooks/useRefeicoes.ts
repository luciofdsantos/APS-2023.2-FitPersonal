import { useQuery } from '@tanstack/react-query';

const endpoint = 'http://localhost:8080/api/refeicoes';

const fetchRefeicoes = async (idAluno?: number | null) => {
  const url = idAluno ? `${endpoint}/aluno/${idAluno}` : endpoint;

  const response = await fetch(url);
  if (!response.ok) throw new Error('Erro ao buscar refeições');
  return response.json();
};

export default function useRefeicoes(idAluno?: number | null) {
  return useQuery({
    queryKey: ['refeicoes', idAluno],
    queryFn: () => fetchRefeicoes(idAluno)
  });
}
