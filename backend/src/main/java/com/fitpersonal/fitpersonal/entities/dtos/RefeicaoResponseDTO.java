package com.fitpersonal.fitpersonal.entities.dtos;

import com.fitpersonal.fitpersonal.entities.refeicao.Refeicao;
import com.fitpersonal.fitpersonal.enums.TipoRefeicao;

import java.time.LocalDate;

public record RefeicaoResponseDTO(
        Long id,
        String alimento,
        Float quantidade,
        Float kcal,
        Float carboidrato,
        Float proteina,
        Float gordura,
        LocalDate dataConsumo,
        Boolean consumido,
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
                refeicao.getDataConsumo(),
                refeicao.getConsumido(),
                refeicao.getTipoRefeicao(),
                refeicao.getPlanoAlimentar().getId()
        );
    }
}
