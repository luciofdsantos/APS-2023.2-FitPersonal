package com.fitpersonal.fitpersonal.entities.aluno;

import com.fitpersonal.fitpersonal.entities.nutricionista.Nutricionista;
import com.fitpersonal.fitpersonal.entities.personal.Personal;
import com.fitpersonal.fitpersonal.entities.planoalimentar.PlanoAlimentar;
import com.fitpersonal.fitpersonal.entities.usuario.Usuario;
import jakarta.persistence.Entity;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data

public class Aluno extends Usuario {
    private double altura;
    private double peso;
    private LocalDate dataNascimento;

    @OneToMany(mappedBy = "aluno", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PlanoAlimentar> planosAlimentares = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "nutricionista_id")
    private Nutricionista nutricionista;

    @ManyToOne
    @JoinColumn(name = "personal_id")
    private Personal personal;

    public void addPlanoAlimentar(PlanoAlimentar planoAlimentar) {
        planosAlimentares.add(planoAlimentar);
        planoAlimentar.setAluno(this); // Definir a referência bidirecional
    }

    public void removePlanoAlimentar(PlanoAlimentar planoAlimentar) {
        planosAlimentares.remove(planoAlimentar);
        planoAlimentar.setAluno(null); // Remover a referência bidirecional
    }

}
