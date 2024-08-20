package com.fitpersonal.fitpersonal.repositories;

import com.fitpersonal.fitpersonal.entities.usuario.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
}
