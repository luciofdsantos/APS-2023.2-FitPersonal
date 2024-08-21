package com.fitpersonal.fitpersonal.entities.planoalimentar;

import com.fitpersonal.fitpersonal.entities.refeicao.Refeicao;
import com.fitpersonal.fitpersonal.entities.refeicao.RefeicaoRequestDTO;
import lombok.NonNull;

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
