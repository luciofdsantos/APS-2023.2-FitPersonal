package com.fitpersonal.fitpersonal.entities.planoalimentar;

import com.fitpersonal.fitpersonal.entities.refeicao.Refeicao;

import java.util.List;

public record PlanoAlimentarRequestDTO(
        Float totalConsumoCarboidrato,
        Float totalConsumoProteina,
        Float totalConsumoGordura,
        List<Refeicao> refeicoes) {
}
