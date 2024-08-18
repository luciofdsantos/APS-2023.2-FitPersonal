package com.fitpersonal.fitpersonal.entities.usuario;

import com.fitpersonal.fitpersonal.entities.treino.Treino;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "usuarios")
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor

public abstract class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(unique = true, nullable = false)
    private String email;

    private String senha;

    private String tipoUsuario;

//    @OneToMany(mappedBy = "usuario")
//    private List<Treino> treinos;
}
