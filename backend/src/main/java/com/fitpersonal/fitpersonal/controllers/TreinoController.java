package com.fitpersonal.fitpersonal.controllers;

import com.fitpersonal.fitpersonal.entities.dtos.TreinoComExerciciosDTO;
import com.fitpersonal.fitpersonal.entities.treino.Treino;
import com.fitpersonal.fitpersonal.services.TreinoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/treinos")
public class TreinoController {

    @Autowired
    private TreinoService treinoService;

    // Criar um Treino
    @PostMapping("/addTreino")
    public ResponseEntity<Treino> createTreino(@RequestBody Treino treino) {
        Treino novoTreino = treinoService.createTreino(treino);
        return new ResponseEntity<>(novoTreino, HttpStatus.CREATED);
    }


    // Criar um Treino com Exercícios
    @PostMapping("/com-exercicios")
    public ResponseEntity<Treino> createTreinoWithExercicios(@RequestBody TreinoComExerciciosDTO treinoComExerciciosDTO) {
        Treino savedTreino = treinoService.createTreinoWithExercicios(treinoComExerciciosDTO.getTreino(), treinoComExerciciosDTO.getExercicios());
        return ResponseEntity.ok(savedTreino);
    }

    // Listar Todos os Treinos
    @GetMapping
    public List<Treino> getAllTreinos() {
        return treinoService.findAllTreinos();
    }

    // Buscar um Treino por ID
    @GetMapping("/{id}")
    public ResponseEntity<Treino> findById(@PathVariable Long id) {
        Optional<Treino> treinoOpt = treinoService.findTreinoById(id);
        if (treinoOpt.isPresent()) {
            return ResponseEntity.ok(treinoOpt.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    // Excluir um Treino por ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTreinoById(@PathVariable Long id){
        Optional<Treino> treinoOpt = treinoService.findTreinoById(id);
        if (treinoOpt.isPresent()) {
            treinoService.deleteTreinoById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    // (Futuramente) Atualizar um Treino por ID
     @PutMapping("/{id}")
     public ResponseEntity<Treino> atualizaTreino(@PathVariable Long id, @RequestBody Treino treino) {
         Optional<Treino> treinoExistente = treinoService.findTreinoById(id);

         if (treinoExistente.isPresent()) {
             Treino treinoAtualizado = treinoExistente.get();
             treinoAtualizado.setNome(treino.getNome());
             treinoAtualizado.setDescricao(treino.getDescricao());
             // Atualize outros campos conforme necessário

             treinoService.updateTreinoById(treinoAtualizado, id);
             return ResponseEntity.ok(treinoAtualizado);
         } else {
             return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
         }
     }
}
