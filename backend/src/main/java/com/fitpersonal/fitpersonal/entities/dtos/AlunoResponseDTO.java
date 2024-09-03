package com.fitpersonal.fitpersonal.entities.dtos;

import java.util.stream.Collectors;
import com.fitpersonal.fitpersonal.entities.aluno.Aluno;

public record AlunoResponseDTO(
        Long id,
        String nome,
        String sobrenome,
        String sexo) {
    public AlunoResponseDTO(Aluno aluno) {
        this(
                aluno.getId(),
                aluno.getNome(),
                aluno.getSobrenome(),
                aluno.getSexo().name()
        );
    }
}
