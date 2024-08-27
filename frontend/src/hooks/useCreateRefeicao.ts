import { useMutation } from '@tanstack/react-query';

const endpoint = 'http://localhost:8080/api/refeicoes';

interface UseCreateRefeicaoProps {
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
  tipoRefeicao: TipoRefeicao;
  planoAlimentarId?: number;
}

export enum TipoRefeicao {
  CAFE_DA_MANHA = 'CAFE_DA_MANHA',
  ALMOCO = 'ALMOCO',
  JANTAR = 'JANTAR',
  LANCHE = 'LANCHE'
}

export default function useCreateRefeicao({
  onSuccess,
  onError
}: UseCreateRefeicaoProps) {
  return useMutation({
    mutationFn: async (refeicao: Refeicao) => {
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
