import { useMutation } from '@tanstack/react-query';

const endpoint = 'http://localhost:8080/api/login';

interface Usuario {
  email: string;
  senha: string;
}

interface UsuarioData {
  id: number;
  email: string;
  nome: string;
  sobrenome: string;
  tipoUsuario: string;
}

interface UseLoginProps {
  onSuccess: (data: UsuarioData) => void;
  onError: (error: Error) => void;
}

export default function useLogin({ onSuccess, onError }: UseLoginProps) {
  return useMutation({
    mutationFn: async (Usuario: Usuario) => {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(Usuario)
      });
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Erro ao fazer login: ${errorMessage}`);
      }
      return response.json();
    },
    onSuccess,
    onError
  });
}
