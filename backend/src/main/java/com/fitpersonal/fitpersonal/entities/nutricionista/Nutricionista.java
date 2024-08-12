package com.fitpersonal.fitpersonal.entities.nutricionista;


import com.fitpersonal.fitpersonal.entities.usuario.Usuario;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@DiscriminatorValue("NUTRICIONISTA")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Nutricionista extends Usuario {
    private  String registroProfissional;
}
