package com.fitpersonal.fitpersonal.entities.exercicio;

import com.fitpersonal.fitpersonal.entities.treino.Treino;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.antlr.v4.runtime.misc.NotNull;

import java.time.LocalDate;

@Entity
@Table(name = "exercicios")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Exercicio {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(nullable = false)
    private String nome;
    private LocalDate inicio;
    private LocalDate fim;
    @Column(nullable = false)
    private String grupoMuscular;


    private Integer series;
    private Integer repeticoes;
    private Integer carga;
    private Boolean finalizado;

    @ManyToOne
    @JoinColumn(name = "treino_id")
    private Treino treino;
}
