package com.fitpersonal.fitpersonal.entities.dtos;

import com.fitpersonal.fitpersonal.entities.refeicao.Refeicao;
import com.fitpersonal.fitpersonal.enums.TipoRefeicao;

public record RefeicaoResponseDTO(
        Long id,
        String alimento,
        Float quantidade,
        Float kcal,
        Float carboidrato,
        Float proteina,
        Float gordura,
        TipoRefeicao tipoRefeicao,
        Long planoAlimentarId) {

    public RefeicaoResponseDTO(Refeicao refeicao) {
        this(
                refeicao.getId(),
                refeicao.getAlimento(),
                refeicao.getQuantidade(),
                refeicao.getKcal(),
                refeicao.getCarboidrato(),
                refeicao.getProteina(),
                refeicao.getGordura(),
                refeicao.getTipoRefeicao(),
                refeicao.getPlanoAlimentar().getId()
        );
    }
}
