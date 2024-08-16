package com.fitpersonal.fitpersonal.entities.refeicao;

import com.fitpersonal.fitpersonal.enums.TipoRefeicao;

public record RefeicaoResponseDTO(
        Long id,
        String alimento,
        Float quantidade,
        Float kcal,
        TipoRefeicao tipoRefeicao) {

    public RefeicaoResponseDTO(Refeicao refeicao) {
        this(
                refeicao.getId(),
                refeicao.getAlimento(),
                refeicao.getQuantidade(),
                refeicao.getKcal(),
                refeicao.getTipoRefeicao()
        );
    }
}
