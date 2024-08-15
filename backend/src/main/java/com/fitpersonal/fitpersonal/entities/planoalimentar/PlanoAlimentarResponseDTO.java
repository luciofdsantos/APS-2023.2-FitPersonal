package com.fitpersonal.fitpersonal.entities.planoalimentar;

import com.fitpersonal.fitpersonal.entities.refeicao.RefeicaoResponseDTO;

import java.util.List;
import java.util.stream.Collectors;

public record PlanoAlimentarResponseDTO(
        Long id,
        Float totalConsumoCarboidrato,
        Float totalConsumoProteina,
        Float totalConsumoGordura,
        List<RefeicaoResponseDTO> refeicoes) {

    public PlanoAlimentarResponseDTO(PlanoAlimentar planoAlimentar) {
        this(
                planoAlimentar.getId(),
                planoAlimentar.getTotalConsumoCarboidrato(),
                planoAlimentar.getTotalConsumoProteina(),
                planoAlimentar.getTotalConsumoGordura(),
                planoAlimentar.getRefeicoes().stream()
                        .map(RefeicaoResponseDTO::new)
                        .collect(Collectors.toList())
        );
    }
}
