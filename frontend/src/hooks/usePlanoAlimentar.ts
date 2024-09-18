import { useQuery } from '@tanstack/react-query';

const endpoint = 'http://localhost:8080/api/planoalimentar';

const fetchPlanosAlimentares = async (idAluno?: number | null) => {
  const url = idAluno ? `${endpoint}/aluno/${idAluno}` : endpoint;

  const response = await fetch(url);
  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(`Erro ao buscar planos alimentares: ${errorMessage}`);
  }
  return response.json();
};

export default function usePlanosAlimentares(idAluno?: number | null) {
  return useQuery({
    queryKey: ['planoalimentar', idAluno],
    queryFn: () => fetchPlanosAlimentares(idAluno),
    retry: false
  });
}
