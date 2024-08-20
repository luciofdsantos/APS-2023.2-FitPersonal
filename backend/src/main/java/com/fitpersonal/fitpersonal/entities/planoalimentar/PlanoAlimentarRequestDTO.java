package com.fitpersonal.fitpersonal.entities.planoalimentar;

import com.fitpersonal.fitpersonal.entities.refeicao.Refeicao;
import com.fitpersonal.fitpersonal.entities.refeicao.RefeicaoRequestDTO;

import java.util.List;

public record PlanoAlimentarRequestDTO(
        Float totalConsumoKcal,
        Float totalConsumoCarboidrato,
        Float totalConsumoProteina,
        Float totalConsumoGordura,
        List<RefeicaoRequestDTO> refeicoes) {
}
