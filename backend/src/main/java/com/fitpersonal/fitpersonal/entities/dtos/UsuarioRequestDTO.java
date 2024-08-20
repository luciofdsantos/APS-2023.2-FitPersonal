package com.fitpersonal.fitpersonal.entities.dtos;

import lombok.Data;

@Data
public class UsuarioRequestDTO {
    private String nome;
    private String sobrenome;
    private String email;
    private String senha;
    private String tipoUsuario; // "ALUNO", "PERSONAL" ou "NUTRICIONISTA"
    private String sexo; // "MASCULINO, "FEMININO"
    private String registroProfissional;
}
