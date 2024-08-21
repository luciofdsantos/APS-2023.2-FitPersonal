import { useMutation } from '@tanstack/react-query';

const endpoint = 'http://92.113.32.219:8080/api/planoalimentar';

interface FormData {
  nome?: string;
  totalConsumoCarboidrato: number;
  totalConsumoProteina: number;
  totalConsumoGordura: number;
}

export type SelectOptionType = {
  id?: string | number;
  alimento: string;
  quantidade: number;
  kcal: number;
  carboidrato: number;
  proteina: number;
  gordura: number;
  tipoRefeicao: string;
};

interface UseUpdatePlanoAlimentarProps {
  onSuccess: () => void;
  onError: (error: Error) => void;
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
      planoalimentar: FormData & { refeicoes: SelectOptionType[] };
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
