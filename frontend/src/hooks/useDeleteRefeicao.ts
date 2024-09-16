import { useMutation } from '@tanstack/react-query';

const endpoint = 'http://localhost:8080/api/refeicoes';

interface UseDeleteRefeicaoProps {
  onSuccess: () => void;
  onError: (error: Error) => void;
}

export default function useDeleteRefeicao({
  onSuccess,
  onError
}: UseDeleteRefeicaoProps) {
  return useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(`${endpoint}/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Erro ao excluir refeição: ${errorMessage}`);
      }
      return {};
    },
    onSuccess,
    onError
  });
}
