package com.fitpersonal.fitpersonal.entities.dtos;

import lombok.Data;

@Data
public class ExercicioProgressoDTO {
    private Long exercicioId;
    private Boolean feito;
    private String nome;
}
