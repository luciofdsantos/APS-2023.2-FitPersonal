import { useMutation } from '@tanstack/react-query';

const endpoint = 'http://localhost:8080/api/refeicoes';

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

interface UseUpdateRefeicaoProps {
  onSuccess: () => void;
  onError: (error: Error) => void;
}

export default function useUpdateRefeicao({
  onSuccess,
  onError
}: UseUpdateRefeicaoProps) {
  return useMutation({
    mutationFn: async ({
      id,
      refeicao
    }: {
      id: number;
      refeicao: Refeicao;
    }) => {
      const response = await fetch(`${endpoint}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(refeicao)
      });
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Erro ao atualizar refeicao: ${errorMessage}`);
      }
      return response.json();
    },
    onSuccess,
    onError
  });
}
