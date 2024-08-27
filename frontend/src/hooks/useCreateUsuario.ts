import { useMutation } from '@tanstack/react-query';

const endpoint = 'http://localhost:8080/api/usuarios';

interface Usuario {
  email: string;
  nome: string;
  senha: string;
  sexo: 'FEMININO' | 'MASCULINO' | 'OUTRO';
  tipoUsuario: 'ALUNO' | 'NUTRICIONISTA' | 'PERSONAL';
  registroProfissional: string | null;
}

interface UseCreateUsuarioProps {
  onSuccess: (data: Usuario) => void;
  onError: (error: Error) => void;
}

export default function useCreateUsuario({
  onSuccess,
  onError
}: UseCreateUsuarioProps) {
  return useMutation({
    mutationFn: async (usuario: Usuario) => {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(usuario)
      });
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Erro ao adicionar usuário: ${errorMessage}`);
      }
      return response.json();
    },
    onSuccess,
    onError
  });
}
