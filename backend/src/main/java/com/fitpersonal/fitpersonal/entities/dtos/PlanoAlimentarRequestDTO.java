package com.fitpersonal.fitpersonal.entities.dtos;

import java.util.List;

public record PlanoAlimentarRequestDTO(
        //Usuário não define totais, banco de dados que atualiza a partir de refeições
        //Float totalConsumoKcal,
        //Float totalConsumoCarboidrato,
        //Float totalConsumoProteina,
        //Float totalConsumoGordura,
        Float metaConsumoKcal,
        Float metaConsumoCarboidrato,
        Float metaConsumoProteina,
        Float metaConsumoGordura,
        List<RefeicaoRequestDTO> refeicoes) {
}
