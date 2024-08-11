package com.fitpersonal.fitpersonal.repositories;

import com.fitpersonal.fitpersonal.entities.treino.Treino;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TreinoRepository extends JpaRepository<Treino, Long> {

}
