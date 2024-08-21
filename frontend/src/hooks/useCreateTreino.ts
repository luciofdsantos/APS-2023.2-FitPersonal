import { useMutation } from '@tanstack/react-query';

const endpoint = 'http://92.113.32.219:8080/api/treinos/addTreino';

interface FormData {
  nome: string;
  descricao: string;
}

interface CreateTreinoProps {
  onSuccess: () => void;
  onError: (error: Error) => void;
}

interface SelectTest {
  id: string;
  [key: string]: string | number;
}

export default function useCreateTreino({
  onSuccess,
  onError
}: CreateTreinoProps) {
  return useMutation({
    mutationFn: async (treino: FormData & { exercicios: SelectTest[] }) => {
      const response = await fetch(endpoint, {
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
