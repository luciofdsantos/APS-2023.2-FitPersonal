import { useMutation } from '@tanstack/react-query';

const planoAlimentarEndpoint = 'http://localhost:8080/api/planoalimentar';
const refeicoesEndpoint = 'http://localhost:8080/api/refeicoes';

interface FormData {
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
  tipoRefeicao: TipoRefeicao;
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
      planoalimentar: FormData & {
        refeicoes: Refeicao[];
      }
    ) => {
      const planoAlimentarResponse = await fetch(planoAlimentarEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(planoalimentar)
      });

      if (!planoAlimentarResponse.ok) {
        const errorMessage = await planoAlimentarResponse.text();
        throw new Error(`Erro ao criar plano alimentar: ${errorMessage}`);
      }

      const novoPlanoAlimentar = await planoAlimentarResponse.json();

      const refeicoesPromises = planoalimentar.refeicoes.map(
        async (refeicao) => {
          const refeicaoData = {
            ...refeicao,
            planoAlimentarId: novoPlanoAlimentar.id
          };

          const refeicaoResponse = await fetch(refeicoesEndpoint, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(refeicaoData)
          });

          if (!refeicaoResponse.ok) {
            const errorMessage = await refeicaoResponse.text();
            throw new Error(`Erro ao criar refeição: ${errorMessage}`);
          }

          return refeicaoResponse.json();
        }
      );

      await Promise.all(refeicoesPromises);

      return novoPlanoAlimentar;
    },
    onSuccess,
    onError
  });
}
