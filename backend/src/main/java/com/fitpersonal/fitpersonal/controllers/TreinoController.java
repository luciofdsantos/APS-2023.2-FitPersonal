package com.fitpersonal.fitpersonal.controllers;

import com.fitpersonal.fitpersonal.entities.dtos.TreinoComExerciciosDTO;
import com.fitpersonal.fitpersonal.entities.exercicio.Exercicio;
import com.fitpersonal.fitpersonal.entities.treino.Treino;
import com.fitpersonal.fitpersonal.services.TreinoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("api/treinos")
public class TreinoController {

    @Autowired
    private TreinoService treinoService;

    @PostMapping
    public ResponseEntity<Treino> salvaTreino(@RequestBody Treino treino) {
        Treino treinoSalvo = treinoService.createTreino(treino);
        return new ResponseEntity<>(treinoSalvo, HttpStatus.CREATED);
    }

    @PostMapping("/exercicios")
    public ResponseEntity<Treino> createTreinoWithExercicios(@RequestBody TreinoComExerciciosDTO treinoComExerciciosDTO) {
        Treino savedTreino = treinoService.createTreinoWithExercicios(treinoComExerciciosDTO.getTreino(), treinoComExerciciosDTO.getExercicios());
        return ResponseEntity.ok(savedTreino);
    }

    @GetMapping
    public List<Treino> getAllTreinos() {
        return treinoService.findAllTreinos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Treino> findById(@PathVariable Long id) {
        Optional<Treino> treinoOpt = treinoService.findTreinoById(id);
        if (treinoOpt.isPresent()) {
            return ResponseEntity.ok(treinoOpt.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    //Mudar futuramente para atualizar o treino
    //    @PutMapping("/{id}")
    //    public ResponseEntity<Treino> atualizaTreino(@PathVariable Long id, @RequestBody Treino treino) {
    //        Optional<Treino> treinoExistente = treinoService.findTreinoById(id);
    //
    //        if (treinoExistente.isPresent()) {
    //            Treino treinoAtualizado = treinoExistente.get();
    //            treinoAtualizado.setNome(treino.getNome());
    //            treinoAtualizado.setDescricao(treino.getDescricao());
    //            treinoAtualizado.setInicio(treino.getInicio());
    //            treinoAtualizado.setFim(treino.getFim());
    //            treinoAtualizado.setConcluido(treino.getConcluido());
    //            // Atualize outros campos conforme necessário
    //
    //            treinoService.updateTreino(treinoAtualizado);
    //            return ResponseEntity.ok(treinoAtualizado);
    //        } else {
    //            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    //        }
    //    }
}