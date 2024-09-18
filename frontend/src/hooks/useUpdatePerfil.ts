import { useMutation } from '@tanstack/react-query';

const endpoint = 'http://localhost:8080/api/usuarios';

interface Perfil {
  id: number;
  nome: string;
  sobrenome: string;
  email: string;
  senha?: string;
  peso?: number;
  altura?: number;
  dataNascimento?: string;
  objetivoDeSaude?: string;
  sexo: 'FEMININO' | 'MASCULINO' | 'OUTRO';
}

interface UseUpdatePerfilProps {
  onSuccess: (data: Perfil) => void;
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
