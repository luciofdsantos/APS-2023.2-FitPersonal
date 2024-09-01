import { useMutation } from '@tanstack/react-query';

const endpoint = 'http://localhost:8080/api/usuario';

interface Perfil {
  id: number;
  nome: string;
  email: string;
  senha?: string;
  peso?: number;
  altura?: number;
  dataNascimento?: string;
  objetivosSaude?: string;
}

interface UseUpdatePerfilProps {
  onSuccess: () => void;
  onError: (error: Error) => void;
}

export default function useUpdatePerfil({
  onSuccess,
  onError
}: UseUpdatePerfilProps) {
  return useMutation({
    mutationFn: async ({ id, ...perfil }: Perfil) => {
      const response = await fetch(`${endpoint}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(perfil)
      });
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Erro ao atualizar perfil: ${errorMessage}`);
      }
      return response.json();
    },
    onSuccess,
    onError
  });
}
