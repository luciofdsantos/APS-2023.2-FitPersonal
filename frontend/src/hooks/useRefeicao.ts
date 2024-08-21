import { useQuery } from '@tanstack/react-query';

const fetchRefeicoes = async () => {
  const response = await fetch('http://92.113.32.219:8080/api/refeicoes');
  if (!response.ok) throw new Error('Erro ao buscar refeições');
  return response.json();
};

export function useRefeicao() {
  return useQuery({
    queryKey: ['fetchRefeicoes'],
    queryFn: fetchRefeicoes
  });
}
