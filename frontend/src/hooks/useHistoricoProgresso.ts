import { useQuery } from '@tanstack/react-query';

const endpoint = 'http://localhost:8080/api/progresso/historico';

const fetchProgressos = async (idAluno?: number | null) => {
  const url = `${endpoint}/${idAluno}`;

  const response = await fetch(url);
  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(`Erro ao buscar progressos: ${errorMessage}`);
  }
  return response.json();
};

export default function useProgressos(idAluno?: number | null) {
  return useQuery({
    queryKey: ['progressos', idAluno],
    queryFn: () => fetchProgressos(idAluno),
    retry: false
  });
}
