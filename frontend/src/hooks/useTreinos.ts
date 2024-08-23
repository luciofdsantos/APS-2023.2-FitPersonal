import { useQuery } from '@tanstack/react-query';

const endpoint = 'http://localhost:8080/api/treinos';

const fetchTreinos = async () => {
  const response = await fetch(endpoint);
  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(`Erro ao buscar treinos: ${errorMessage}`);
  }
  return response.json();
};

export default function useTreinos() {
  return useQuery({
    queryKey: ['treinos'],
    queryFn: fetchTreinos,
    retry: false
  });
}
