import { useMutation } from '@tanstack/react-query';

const endpoint = 'http://localhost:8080/api/treinos';

interface FormData {
  nome: string;
  descricao: string;
}

interface Exercicio {
  nome: string;
  inicio: string;
  fim: string;
  grupoMuscular: string;
  series: number;
  repeticoes: number;
  carga: number;
  finalizado: boolean;
  treinoId: number;
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
      treino: FormData & { exercicios: Exercicio[] };
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
