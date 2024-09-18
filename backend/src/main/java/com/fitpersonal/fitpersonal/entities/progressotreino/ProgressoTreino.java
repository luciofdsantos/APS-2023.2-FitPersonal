package com.fitpersonal.fitpersonal.entities.progressotreino;

import com.fitpersonal.fitpersonal.entities.aluno.Aluno;
import com.fitpersonal.fitpersonal.entities.exercicioprogresso.ExercicioProgresso;
import com.fitpersonal.fitpersonal.entities.treino.Treino;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Entity
@Data
public class ProgressoTreino {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Treino treino;

    @ManyToOne
    private Aluno aluno;

    private LocalDate dataFinalizacao;

    @OneToMany(cascade = CascadeType.ALL)
    private List<ExercicioProgresso> exercicios;

}
