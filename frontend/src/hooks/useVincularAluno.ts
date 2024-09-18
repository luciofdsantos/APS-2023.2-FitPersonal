import { useMutation } from '@tanstack/react-query';

interface Usuario {
  id: number;
}

interface UseVincularAlunoProps {
  endpoint: string;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export default function useVincularAluno({
  endpoint,
  onSuccess,
  onError
}: UseVincularAlunoProps) {
  const usuarioString = localStorage.getItem('usuario');
  let usuario: Usuario | null = null;

  if (usuarioString) {
    try {
      usuario = JSON.parse(usuarioString);

      JSON.parse(usuarioString);
    } catch (error) {
      console.error('Erro ao analisar o JSON do localStorage:', error);
    }
  }

  return useMutation({
    mutationFn: async (alunoId: number) => {
      const response = await fetch(endpoint, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          profissionalId: usuario?.id,
          alunoId
        })
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
