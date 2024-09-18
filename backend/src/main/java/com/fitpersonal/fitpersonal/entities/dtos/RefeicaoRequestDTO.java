package com.fitpersonal.fitpersonal.entities.dtos;

import com.fitpersonal.fitpersonal.enums.TipoRefeicao;

import java.time.LocalDate;

public record  RefeicaoRequestDTO (
        String alimento,
        Float quantidade,
        Float kcal,
        Float carboidrato,
        Float proteina,
        Float gordura,
        Boolean consumido,
        TipoRefeicao tipoRefeicao,
        Long planoAlimentarId ){
}
