package com.fitpersonal.fitpersonal.repositories;

import com.fitpersonal.fitpersonal.entities.personal.Personal;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PersonalRepository extends JpaRepository<Personal, Long> {
}
