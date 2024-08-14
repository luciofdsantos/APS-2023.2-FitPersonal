package com.fitpersonal.fitpersonal.entities.treino;

import com.fitpersonal.fitpersonal.entities.exercicio.Exercicio;
import com.fitpersonal.fitpersonal.entities.usuario.Usuario;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "treinos")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Treino {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String nome;
    private String descricao;

//    private LocalDateTime tempoTotal;
//    private LocalDateTime metaTempo;

//    @ManyToOne
//    @JoinColumn(name = "usuario_id")
//    private Usuario usuario;

    @OneToMany(mappedBy = "treino", cascade =  CascadeType.ALL, orphanRemoval = true)
    private List<Exercicio> exercicios = new ArrayList<>();


}
