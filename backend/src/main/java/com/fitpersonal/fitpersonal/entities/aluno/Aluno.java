package com.fitpersonal.fitpersonal.entities.aluno;

import com.fitpersonal.fitpersonal.entities.usuario.Usuario;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.*;

import java.time.LocalDate;

@Entity
@Data

public class Aluno extends Usuario {
    private double altura;
    private double peso;
    private LocalDate dataNascimento;

}
