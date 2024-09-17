import { useMutation } from '@tanstack/react-query';

const endpoint = 'http://localhost:8080/api/progresso/registrar';

interface Progresso {
  treinoId: number;
  alunoId: number;
  dataFinalizacao: string;
  exercicios: {
    exercicioId: number;
    feito: boolean;
  }[];
}

interface UseCreateProgressoProps {
  onSuccess: () => void;
  onError: (error: Error) => void;
}

export default function useCreateProgresso ({
  onSuccess,
  onError
}: UseCreateProgressoProps) {
  return useMutation({
    mutationFn: async (Progresso: Progresso) => {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(Progresso)
      });
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Erro ao criar progresso: ${errorMessage}`);
      }
      return response.json();
    },
    onSuccess,
    onError
  });
}
