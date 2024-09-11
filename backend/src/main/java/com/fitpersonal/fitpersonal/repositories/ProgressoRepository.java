package com.fitpersonal.fitpersonal.repositories;

import com.fitpersonal.fitpersonal.entities.progressotreino.ProgressoTreino;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProgressoRepository extends JpaRepository<ProgressoTreino, Long> {

    List<ProgressoTreino> findByAlunoId(Long alunoId);
}
