import { useQuery } from '@tanstack/react-query';

const endpoint = 'http://localhost:8080/api/treinos';

const fetchTreinos = async (idAluno?: number | null) => {
  const url = idAluno ? `${endpoint}/${idAluno}` : endpoint;

  const response = await fetch(url);
  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(`Erro ao buscar treinos: ${errorMessage}`);
  }
  return response.json();
};

export default function useTreinos(idAluno?: number | null) {
  return useQuery({
    queryKey: ['treinos', idAluno],
    queryFn: () => fetchTreinos(idAluno),
    retry: false
  });
}
