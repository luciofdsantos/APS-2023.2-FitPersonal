import { useMutation } from '@tanstack/react-query';

const endpoint = 'http://localhost:8080/api/exercicios';

interface Exercicio {
  id: number;
  nome: string;
  inicio: string;
  fim: string;
  grupoMuscular: string;
  series: number;
  repeticoes: number;
  carga: number;
  finalizado: boolean;
}

interface UseCreateExercicioProps {
  onSuccess: (data: Exercicio) => void;
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

export default function useCreateExercicio({
  onSuccess,
  onError
}: UseCreateExercicioProps) {
  return useMutation({
    mutationFn: async (Exercicio: Exercicio) => {
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
