import { useMutation } from '@tanstack/react-query';

const endpoint = 'http://localhost:8080/api/planoalimentar';

interface FormData {
  nome?: string;
  metaConsumoKcal: number;
  totalConsumoKcal: number;
  metaConsumoCarboidrato: number;
  totalConsumoCarboidrato: number;
  metaConsumoProteina: number;
  totalConsumoProteina: number;
  metaConsumoGordura: number;
  totalConsumoGordura: number;
}

interface UseUpdatePlanoAlimentarProps {
  onSuccess: () => void;
  onError: (error: Error) => void;
}

interface Refeicao {
  alimento: string;
  quantidade: number;
  kcal: number;
  carboidrato: number;
  proteina: number;
  gordura: number;
  tipoRefeicao: string;
}

export default function useUpdatePlanoAlimentar({
  onSuccess,
  onError
}: UseUpdatePlanoAlimentarProps) {
  return useMutation({
    mutationFn: async ({
      id,
      planoalimentar
    }: {
      id: number;
      planoalimentar: FormData & { refeicoes: Refeicao[] };
    }) => {
      const response = await fetch(`${endpoint}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(planoalimentar)
      });
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Erro ao atualizar plano alimentar: ${errorMessage}`);
      }
      return response.json();
    },
    onSuccess,
    onError
  });
}
