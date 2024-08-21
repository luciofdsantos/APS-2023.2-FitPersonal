import { useMutation } from '@tanstack/react-query';
import { TypePlanosAlimentares } from 'src/types';

const endpoint = 'http://92.113.32.219:8080/api/refeicoes';

interface UseCreateRefeicaoProps {
  onSuccess: () => void;
  onError: (error: Error) => void;
}

export default function useCreateRefeicao({
  onSuccess,
  onError
}: UseCreateRefeicaoProps) {
  return useMutation({
    mutationFn: async (refeicao: TypePlanosAlimentares.SelectOptionType) => {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(refeicao)
      });
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Erro ao adicionar refeição: ${errorMessage}`);
      }
      return response.json();
    },
    onSuccess,
    onError
  });
}
