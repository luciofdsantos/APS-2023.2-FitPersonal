package com.fitpersonal.fitpersonal.entities.dtos;

import com.fitpersonal.fitpersonal.enums.TipoRefeicao;

public record  RefeicaoRequestDTO (
        String alimento,
        Float quantidade,
        Float kcal,
        Float carboidrato,
        Float proteina,
        Float gordura,
        TipoRefeicao tipoRefeicao,
        Long planoAlimentarId ){
}
