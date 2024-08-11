package com.fitpersonal.fitpersonal.entities.perfil;

import com.fitpersonal.fitpersonal.enums.Sexo;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Table(name = "perfis")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class Perfil {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private Double peso;

    private Double altura;

    private LocalDate dataNascimento;

    @Enumerated(EnumType.STRING)
    private Sexo selectedSexo;
}
