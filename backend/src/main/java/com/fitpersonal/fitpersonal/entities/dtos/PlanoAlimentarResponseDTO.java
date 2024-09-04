package com.fitpersonal.fitpersonal.entities.dtos;

import com.fitpersonal.fitpersonal.entities.planoalimentar.PlanoAlimentar;

import java.util.List;
import java.util.stream.Collectors;

public record PlanoAlimentarResponseDTO(
        Long id,
        Float totalConsumoKcal,
        Float totalConsumoCarboidrato,
        Float totalConsumoProteina,
        Float totalConsumoGordura,
        Float metaConsumoKcal,
        Float metaConsumoCarboidrato,
        Float metaConsumoProteina,
        Float metaConsumoGordura,
        Long alunoId,
        List<RefeicaoResponseDTO> refeicoes) {

    public PlanoAlimentarResponseDTO(PlanoAlimentar planoAlimentar) {
        this(
                planoAlimentar.getId(),
                planoAlimentar.getTotalConsumoKcal(),
                planoAlimentar.getTotalConsumoCarboidrato(),
                planoAlimentar.getTotalConsumoProteina(),
                planoAlimentar.getTotalConsumoGordura(),
                planoAlimentar.getMetaConsumoKcal(),
                planoAlimentar.getMetaConsumoCarboidrato(),
                planoAlimentar.getMetaConsumoProteina(),
                planoAlimentar.getMetaConsumoGordura(),
                planoAlimentar.getAluno().getId(),
                planoAlimentar.getRefeicoes().stream()
                        .map(RefeicaoResponseDTO::new)
                        .collect(Collectors.toList())
        );
    }
}
