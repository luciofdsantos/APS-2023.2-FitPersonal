package com.fitpersonal.fitpersonal.entities.personal;


import com.fitpersonal.fitpersonal.entities.usuario.Usuario;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@DiscriminatorValue("PERSONAL")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Personal extends Usuario {
    private  String registroProfissional;
}
