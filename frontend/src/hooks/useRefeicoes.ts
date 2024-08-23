import { useQuery } from '@tanstack/react-query';

const fetchRefeicoes = async () => {
  const response = await fetch('http://localhost:8080/api/refeicoes');
  if (!response.ok) throw new Error('Erro ao buscar refeições');
  return response.json();
};

export default function useRefeicoes() {
  return useQuery({
    queryKey: ['fetchRefeicoes'],
    queryFn: fetchRefeicoes
  });
}
