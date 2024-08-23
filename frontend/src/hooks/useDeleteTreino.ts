import { useMutation } from '@tanstack/react-query';

const endpoint = 'http://localhost:8080/api/treinos';

interface UseDeleteTreinoProps {
  onSuccess: () => void;
  onError: (error: Error) => void;
}

export default function useDeleteTreino({
  onSuccess,
  onError
}: UseDeleteTreinoProps) {
  return useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(`${endpoint}/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Erro ao excluir treino: ${errorMessage}`);
      }
      return {};
    },
    onSuccess,
    onError
  });
}
