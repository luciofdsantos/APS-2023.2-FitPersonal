package com.fitpersonal.fitpersonal.entities.refeicao;

import com.fitpersonal.fitpersonal.enums.TipoRefeicao;

public record RefeicaoResponseDTO(
        Long id,
        String alimento,
        Float quantidade,
        Float kcal,
        Float carboidrato,
        Float proteina,
        Float gordura,
        TipoRefeicao tipoRefeicao) {

    public RefeicaoResponseDTO(Refeicao refeicao) {
        this(
                refeicao.getId(),
                refeicao.getAlimento(),
                refeicao.getQuantidade(),
                refeicao.getKcal(),
                refeicao.getCarboidrato(),
                refeicao.getProteina(),
                refeicao.getGordura(),
                refeicao.getTipoRefeicao()
        );
    }
}
