import { useQuery } from '@tanstack/react-query';

const endpoint = 'http://92.113.32.219:8080/api/planoalimentar';

const fetchPlanosAlimentares = async () => {
  const response = await fetch(endpoint);
  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(`Erro ao buscar planos alimentares: ${errorMessage}`);
  }
  return response.json();
};

export default function usePlanosAlimentares() {
  return useQuery({
    queryKey: ['planoalimentar'],
    queryFn: fetchPlanosAlimentares,
    retry: false
  });
}
