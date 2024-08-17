package com.fitpersonal.fitpersonal.repositories;

import com.fitpersonal.fitpersonal.entities.planoalimentar.PlanoAlimentar;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PlanoAlimentarRepository  extends JpaRepository<PlanoAlimentar, Long> {
}
