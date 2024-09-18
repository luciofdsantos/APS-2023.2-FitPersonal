package com.fitpersonal.fitpersonal.entities.dtos;

import java.time.LocalDate;

public record RefeicaoAlunoDataRequestDTO(
        Long alunoId,
        LocalDate dataConsumo) {
}
