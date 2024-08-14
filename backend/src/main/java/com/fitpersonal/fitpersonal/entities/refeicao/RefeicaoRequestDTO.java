package com.fitpersonal.fitpersonal.entities.refeicao;

import com.fitpersonal.fitpersonal.enums.TipoRefeicao;

public record  RefeicaoRequestDTO (
        String alimento,
        Float quantidade,
        Float kcal,
        TipoRefeicao tipoRefeicao){
}
