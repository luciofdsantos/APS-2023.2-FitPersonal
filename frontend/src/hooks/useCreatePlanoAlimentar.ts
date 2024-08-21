import { useMutation } from '@tanstack/react-query';
import { TypePlanosAlimentares } from 'src/types';

const planoAlimentarEndpoint = 'http://92.113.32.219:8080/api/planoalimentar';
const refeicoesEndpoint = 'http://92.113.32.219:8080/api/refeicoes';

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
        refeicoes: TypePlanosAlimentares.Refeicao[];
      }
    ) => {
      // Cria o plano alimentar
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

      // Cria as refeições associadas
      const refeicoesPromises = planoalimentar.refeicoes.map(
        async (refeicao) => {
          const refeicaoData = {
            ...refeicao,
            planoAlimentarId: novoPlanoAlimentar.id // Associa a refeição ao plano alimentar criado
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

      // Aguarda a criação de todas as refeições
      await Promise.all(refeicoesPromises);

      return novoPlanoAlimentar;
    },
    onSuccess,
    onError
  });
}
