package com.fitpersonal.fitpersonal.services;

import com.fitpersonal.fitpersonal.entities.dtos.LoginRequestDTO;
import com.fitpersonal.fitpersonal.entities.dtos.LoginResponseDTO;
import com.fitpersonal.fitpersonal.entities.usuario.Usuario;
import com.fitpersonal.fitpersonal.repositories.LoginRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class LoginService {

    @Autowired
    private LoginRepository loginRepository;

    public LoginResponseDTO login(LoginRequestDTO loginRequestDTO) {
        try {
            // Tenta encontrar o usuário pelo email
            Optional<Usuario> usuarioOptional = loginRepository.findByEmail(loginRequestDTO.getEmail());

            if (usuarioOptional.isPresent()) {
                Usuario usuario = usuarioOptional.get();

                // Verifica se a senha bate
                if (usuario.getSenha().equals(loginRequestDTO.getSenha())) {
                    // Converte para DTO de resposta e retorna
                    return convertToResponseDTO(usuario);
                } else {
                    // Retorna null se a senha estiver errada
                    throw new IllegalArgumentException("Senha incorreta.");
                }
            } else {
                // Lança exceção se o usuário não for encontrado
                throw new IllegalArgumentException("Usuário não encontrado.");
            }
        } catch (IllegalArgumentException e) {
            // Trata o erro de forma apropriada
            throw new RuntimeException("Erro durante o login: " + e.getMessage());
        }
    }

    // Converte um objeto Usuario para LoginResponseDTO
    private LoginResponseDTO convertToResponseDTO(Usuario usuario) {
        LoginResponseDTO responseDTO = new LoginResponseDTO();
        responseDTO.setId(usuario.getId());
        responseDTO.setNome(usuario.getNome());
        responseDTO.setSobrenome(usuario.getSobrenome());
        responseDTO.setEmail(usuario.getEmail());
        responseDTO.setTipoUsuario(usuario.getTipoUsuario().name());
        return responseDTO;
    }
}
