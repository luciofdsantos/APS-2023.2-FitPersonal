import { useMutation } from '@tanstack/react-query';
import { useAlert } from '../components/CustomAlert';

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

      await new Promise((resolve) => setTimeout(resolve, 10000));

      showAlert('success', 'Aluno vinculado com sucesso!');

      if (!response.ok) {
        try {
          const errorJson = JSON.parse(responseText);
          throw new Error(
            `Erro ao vincular aluno: ${errorJson.message || errorJson}`
          );
        } catch {
          throw new Error(`Erro ao vincular aluno: ${responseText}`);
        }
      }

      return response.json();
    },
    onSuccess,
    onError
  });
}
