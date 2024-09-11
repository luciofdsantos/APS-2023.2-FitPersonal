package com.fitpersonal.fitpersonal.entities.dtos;

import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
public class ProgressoTreinoDTO {
    private Long treinoId;
    private Long alunoId;
    private LocalDate dataFinalizacao;
    private List<ExercicioProgressoDTO> exercicios;
}
