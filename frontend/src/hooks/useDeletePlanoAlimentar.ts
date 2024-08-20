import { useMutation } from '@tanstack/react-query';

const endpoint = 'http://92.113.32.219:8080/api/planoalimentar';

interface UseDeletePlanoAlimentarProps {
  onSuccess: () => void;
  onError: (error: Error) => void;
}

export default function useDeletePlanoAlimentar({
  onSuccess,
  onError
}: UseDeletePlanoAlimentarProps) {
  return useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(`${endpoint}/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Erro ao excluir plano alimentar: ${errorMessage}`);
      }
      return {};
    },
    onSuccess,
    onError
  });
}
