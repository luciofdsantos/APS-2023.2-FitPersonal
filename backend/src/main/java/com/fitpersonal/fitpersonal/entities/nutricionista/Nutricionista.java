package com.fitpersonal.fitpersonal.entities.nutricionista;


import com.fitpersonal.fitpersonal.entities.aluno.Aluno;
import com.fitpersonal.fitpersonal.entities.usuario.Usuario;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@DiscriminatorValue("NUTRICIONISTA")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Nutricionista extends Usuario {
    private String registroProfissional;

    @OneToMany(mappedBy = "nutricionista")
    private List<Aluno> listaAlunos = new ArrayList<>();
}
