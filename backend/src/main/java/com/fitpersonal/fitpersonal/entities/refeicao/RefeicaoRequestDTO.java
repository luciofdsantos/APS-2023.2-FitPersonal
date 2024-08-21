package com.fitpersonal.fitpersonal.entities.refeicao;

import com.fitpersonal.fitpersonal.enums.TipoRefeicao;
import lombok.NonNull;

public record  RefeicaoRequestDTO (
        @NonNull
        String alimento,
        @NonNull
        Float quantidade,
        @NonNull
        Float kcal,
        @NonNull
        Float carboidrato,
        @NonNull
        Float proteina,
        @NonNull
        Float gordura,
        @NonNull
        TipoRefeicao tipoRefeicao,
        Long planoAlimentarId ){
}
