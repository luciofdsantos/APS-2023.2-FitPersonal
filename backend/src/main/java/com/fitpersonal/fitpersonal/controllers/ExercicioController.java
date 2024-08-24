package com.fitpersonal.fitpersonal.controllers;

import com.fitpersonal.fitpersonal.entities.exercicio.Exercicio;
import com.fitpersonal.fitpersonal.services.ExercicioService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/exercicios")
public class ExercicioController {
    @Autowired
    private ExercicioService exercicioService;


    @GetMapping
    public List<Exercicio> getAllExercicios(){
        return exercicioService.getAllExercicios();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Exercicio> findById(@PathVariable Long id){
        Optional<Exercicio> exercicio = exercicioService.findbyId(id);

        if(exercicio.isPresent()){
            return ResponseEntity.ok(exercicio.get());
        }else{
            return ResponseEntity.status(404).body(null);
        }
    }

    //    @PostMapping
    //    public Exercicio saveExercercicio(@PathVariable Exercicio exercicio){
    //        return exercicioService.saveExercicio(exercicio);
    //    }

    @PostMapping
    public ResponseEntity<Exercicio> saveExercicio(@RequestBody Exercicio exercicio) {
        Exercicio savedExercicio = exercicioService.saveExercicio(exercicio);
        return ResponseEntity.ok(savedExercicio);
    }

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity<Void> deleteExercicio(@PathVariable Long id) {
        exercicioService.deleteExercicio(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/predefinidos")
    public List<Exercicio> getPredefinedExercicios() {
        return exercicioService.getPredefinedExercicios();
    }

}
