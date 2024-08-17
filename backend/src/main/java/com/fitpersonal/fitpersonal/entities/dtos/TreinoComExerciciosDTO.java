package com.fitpersonal.fitpersonal.entities.dtos;

import com.fitpersonal.fitpersonal.entities.exercicio.Exercicio;
import com.fitpersonal.fitpersonal.entities.treino.Treino;
import lombok.Setter;

import java.util.List;

public class TreinoComExerciciosDTO {
    private Treino treino;
    private List<Exercicio> exercicios;

    public Treino getTreino() {
        return treino;
    }

    public void setTreino(Treino treino) {
        this.treino = treino;
    }

    public List<Exercicio> getExercicios() {
        return exercicios;
    }

    public void setExercicios(List<Exercicio> exercicios) {
        this.exercicios = exercicios;
    }
}
