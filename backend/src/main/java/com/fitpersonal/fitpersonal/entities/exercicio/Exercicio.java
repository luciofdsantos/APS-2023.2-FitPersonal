package com.fitpersonal.fitpersonal.entities.exercicio;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
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
    @Column(name = "grupo_muscular", nullable = false)
    private String grupoMuscular;


    private Integer series;
    private Integer repeticoes;
    private Integer carga;
    private Boolean finalizado;

    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinColumn(name = "treino_id")
    @JsonIgnore
    private Treino treino;

    // Expoe o ID do treino, não remover
    @JsonProperty("treinoId")
    public Long getTreinoId() {
        return treino != null ? treino.getId() : null;
    }
}
