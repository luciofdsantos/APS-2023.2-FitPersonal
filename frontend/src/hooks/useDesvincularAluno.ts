import { useMutation } from '@tanstack/react-query';
import { useAlert } from '../components/CustomAlert';

const endpoint =
  'http://localhost:8080/api/vincular-aluno/desvincular-aluno-personal';

interface Usuario {
  id: number;
}

interface UseDesvincularAlunoProps {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export default function useDesvincularAluno({
  onSuccess,
  onError
}: UseDesvincularAlunoProps) {
  const { showAlert } = useAlert();

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

      const responseText = await response.text();
      console.log('Resposta do servidor:', responseText);
      showAlert('success', 'Aluno desvinculado com sucesso!');

      if (!response.ok) {
        try {
          const errorJson = JSON.parse(responseText);
          throw new Error(
            `Erro ao desvincular aluno: ${errorJson.message || errorJson}`
          );
        } catch {
          throw new Error(`Erro ao desvincular aluno: ${responseText}`);
        }
      }

      return response.json();
    },
    onSuccess,
    onError
  });
}
