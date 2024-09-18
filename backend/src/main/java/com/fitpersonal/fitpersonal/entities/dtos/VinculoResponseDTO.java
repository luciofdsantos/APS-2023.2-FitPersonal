package com.fitpersonal.fitpersonal.entities.dtos;

public record VinculoResponseDTO(
        String mensagem, // Mensagem de sucesso ou erro
        String nomeAluno, // Nome do aluno vinculado
        String nomePersonal // Nome do personal vinculado
) {
}
