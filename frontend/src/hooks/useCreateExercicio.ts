import { useMutation } from '@tanstack/react-query';

const endpoint = 'http://92.113.32.219:8080/api/exercicios';

interface UseCreateExercicioProps {
  onSuccess: () => void;
  onError: (error: Error) => void;
}

interface ObjectGeneric {
  [key: string]: string | number | boolean;
}

export default function useCreateExercicio({
  onSuccess,
  onError
}: UseCreateExercicioProps) {
  return useMutation({
    mutationFn: async (Exercicio: ObjectGeneric) => {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(Exercicio)
      });
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Erro ao adicionar exercício: ${errorMessage}`);
      }
      return response.json();
    },
    onSuccess,
    onError
  });
}
