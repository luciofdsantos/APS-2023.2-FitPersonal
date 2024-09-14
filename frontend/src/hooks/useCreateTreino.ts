import { useMutation } from '@tanstack/react-query';

const endpoint = 'http://localhost:8080/api/treinos/addTreino';

interface Treino {
  aluno_id?: number;
  nome: string;
  descricao: string;
}

interface CreateTreinoProps {
  onSuccess: () => void;
  onError: (error: Error) => void;
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

export default function useCreateTreino({
  onSuccess,
  onError
}: CreateTreinoProps) {
  return useMutation({
    mutationFn: async (treino: Treino & { exercicios: Exercicio[] }) => {
      const response = await fetch(`${endpoint}/${treino.aluno_id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(treino)
      });
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Erro ao criar treino: ${errorMessage}`);
      }
      return response.json();
    },
    onSuccess,
    onError
  });
}
