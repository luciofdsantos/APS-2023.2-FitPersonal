import { useMutation } from '@tanstack/react-query';
import { TypePlanosAlimentares } from 'src/types';

const endpoint = 'http://92.113.32.219:8080/api/refeicoes/2652';

interface FormData {
  nome?: string;
  totalConsumoCarboidrato: number;
  totalConsumoProteina: number;
  totalConsumoGordura: number;
}

interface CreatePlanoAlimentarProps {
  onSuccess: () => void;
  onError: (error: Error) => void;
}

export default function useCreatePlanoAlimentar({
  onSuccess,
  onError
}: CreatePlanoAlimentarProps) {
  return useMutation({
    mutationFn: async (
      planoalimentar: FormData & {
        refeicoes: TypePlanosAlimentares.SelectOptionType[];
      }
    ) => {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(planoalimentar)
      });
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Erro ao criar plano alimentar: ${errorMessage}`);
      }
      return response.json();
    },
    onSuccess,
    onError
  });
}
