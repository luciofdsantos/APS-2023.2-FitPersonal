package com.fitpersonal.fitpersonal.repositories;

import com.fitpersonal.fitpersonal.entities.aluno.Aluno;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AlunoRepository extends JpaRepository<Aluno, Long> {
}
