package com.fitpersonal.fitpersonal.entities.exercicioprogresso;

import com.fitpersonal.fitpersonal.entities.exercicio.Exercicio;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class ExercicioProgresso {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Exercicio exercicio;

    private Boolean feito;
}
