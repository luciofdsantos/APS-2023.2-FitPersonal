package com.fitpersonal.fitpersonal.entities.dtos;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class UsuarioRequestDTO {
    private String nome;
    private String sobrenome;
    private String email;
    private String senha;
    @NotNull(message = "O tipo de usuário é obrigatório.")
    private String tipoUsuario; // "ALUNO", "PERSONAL" ou "NUTRICIONISTA"
    @NotNull(message = "O sexo é obrigatório.")
    private String sexo; // "MASCULINO, "FEMININO"
    private String registroProfissional;
}
