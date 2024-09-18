import { useMutation } from '@tanstack/react-query';

const endpoint = 'http://localhost:8080/api/planoalimentar';

interface PlanoAlimentar {
  id?: number;
  alunoId: number;
  metaConsumoKcal: number;
  totalConsumoKcal: number;
  metaConsumoCarboidrato: number;
  totalConsumoCarboidrato: number;
  metaConsumoProteina: number;
  totalConsumoProteina: number;
  metaConsumoGordura: number;
  totalConsumoGordura: number;
}

interface CreatePlanoAlimentarProps {
  onSuccess: () => void;
  onError: (error: Error) => void;
}

interface Refeicao {
  id?: number;
  alimento: string;
  quantidade: number;
  kcal: number;
  carboidrato: number;
  proteina: number;
  gordura: number;
  tipoRefeicao: string;
  planoAlimentarId: number;
}

export enum TipoRefeicao {
  CAFE_DA_MANHA = 'CAFE_DA_MANHA',
  ALMOCO = 'ALMOCO',
  JANTAR = 'JANTAR',
  LANCHE = 'LANCHE'
}

export default function useCreatePlanoAlimentar({
  onSuccess,
  onError
}: CreatePlanoAlimentarProps) {
  return useMutation({
    mutationFn: async (
      planoAlimentar: PlanoAlimentar & { refeicoes: Refeicao[] }
    ) => {
      const response = await fetch(`${endpoint}/${planoAlimentar.alunoId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(planoAlimentar)
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
