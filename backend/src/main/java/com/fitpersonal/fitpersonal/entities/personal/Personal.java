package com.fitpersonal.fitpersonal.entities.personal;


import com.fitpersonal.fitpersonal.entities.aluno.Aluno;
import com.fitpersonal.fitpersonal.entities.usuario.Usuario;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@DiscriminatorValue("PERSONAL")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Personal extends Usuario {
    private  String registroProfissional;

    @OneToMany(mappedBy = "personal")
    private List<Aluno> listaAlunos = new ArrayList<>();
}
