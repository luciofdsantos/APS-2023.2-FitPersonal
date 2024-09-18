package com.fitpersonal.fitpersonal.repositories;

import com.fitpersonal.fitpersonal.entities.planoalimentar.PlanoAlimentar;
import com.fitpersonal.fitpersonal.entities.refeicao.Refeicao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface PlanoAlimentarRepository  extends JpaRepository<PlanoAlimentar, Long> {
    @Query("SELECT r FROM refeicao r WHERE r.planoAlimentar.aluno.id = :alunoId AND r.dataConsumo = :dataConsumo")
    List<Refeicao> findByAlunoIdAndDataConsumo(@Param("alunoId") Long alunoId, @Param("dataConsumo") LocalDate dataConsumo);
}
