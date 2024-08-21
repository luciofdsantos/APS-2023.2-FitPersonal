package com.fitpersonal.fitpersonal.entities.refeicao;

import com.fitpersonal.fitpersonal.enums.TipoRefeicao;
import lombok.NonNull;

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
