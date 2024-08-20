import { useMutation } from '@tanstack/react-query';

const endpoint = 'http://92.113.32.219:8080/api/treinos';

interface FormData {
  nome: string;
  descricao: string;
}

interface SelectOptionType {
  id?: string | number;
  nome: string;
  carga: number;
  fim: string;
  finalizado: boolean;
  grupoMuscular: string;
  inicio: string;
  repeticoes: number;
  series: number;
}

interface UseUpdateTreinoProps {
  onSuccess: () => void;
  onError: (error: Error) => void;
}

export default function useUpdateTreino({
  onSuccess,
  onError
}: UseUpdateTreinoProps) {
  return useMutation({
    mutationFn: async ({
      id,
      treino
    }: {
      id: number;
      treino: FormData & { exercicios: SelectOptionType[] };
    }) => {
      const response = await fetch(`${endpoint}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(treino)
      });
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Erro ao atualizar treino: ${errorMessage}`);
      }
      return response.json();
    },
    onSuccess,
    onError
  });
}
