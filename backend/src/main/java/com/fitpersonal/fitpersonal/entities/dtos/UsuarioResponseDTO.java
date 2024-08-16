package com.fitpersonal.fitpersonal.entities.dtos;

import lombok.Data;

@Data
public class UsuarioResponseDTO {
    private Long id;
    private String nome;
    private String sobrenome;
    private String email;
    private String tipoUsuario;
    private String sexo;
    private String registroProfissional;
}
