package com.fitpersonal.fitpersonal.entities.dtos;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;
@Data
public class UsuarioPerfilDTO {
    private String nome;
    private String sobrenome;
    private String email;
    private String senha;
    private Double altura;
    private Double peso;
    private LocalDate dataNascimento;
    @NotNull(message = "O sexo é obrigatório.")
    private String sexo; // "MASCULINO, "FEMININO"
    private String registroProfissional;
}
