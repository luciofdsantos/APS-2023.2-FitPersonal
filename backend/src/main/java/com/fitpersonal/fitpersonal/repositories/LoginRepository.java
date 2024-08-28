package com.fitpersonal.fitpersonal.repositories;

import com.fitpersonal.fitpersonal.entities.usuario.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface LoginRepository extends JpaRepository<Usuario, Long> {
    Optional<Usuario> findByEmail(String email);
}
