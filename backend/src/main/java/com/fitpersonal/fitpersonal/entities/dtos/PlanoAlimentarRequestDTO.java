package com.fitpersonal.fitpersonal.entities.dtos;

import java.util.List;
import com.fitpersonal.fitpersonal.entities.aluno.Aluno;
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
        Long alunoId,
        List<RefeicaoRequestDTO> refeicoes) {
}
