package com.fitpersonal.fitpersonal.repositories;
import java.util.Optional;

import com.fitpersonal.fitpersonal.entities.usuario.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Optional<Usuario> findByEmail(String email);
}
