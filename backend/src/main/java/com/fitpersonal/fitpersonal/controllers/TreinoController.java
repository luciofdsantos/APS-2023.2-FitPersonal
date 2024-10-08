package com.fitpersonal.fitpersonal.controllers;

import com.fitpersonal.fitpersonal.entities.dtos.TreinoComExerciciosDTO;
import com.fitpersonal.fitpersonal.entities.exercicio.Exercicio;
import com.fitpersonal.fitpersonal.entities.treino.Treino;
import com.fitpersonal.fitpersonal.repositories.ExercicioRepository;
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
    @Autowired
    private ExercicioRepository exercicioRepository;

    // Criar um Treino
    @PostMapping("/addTreino/{alunoId}")
    public ResponseEntity<Treino> createTreino(@PathVariable Long alunoId,@RequestBody Treino treino) {
        Treino novoTreino = treinoService.createTreino(alunoId, treino);
        return new ResponseEntity<>(novoTreino, HttpStatus.CREATED);
    }


    // Criar um Treino com Exercícios
    @PostMapping("/com-exercicios")
    public ResponseEntity<Treino> createTreinoWithExercicios(@RequestBody TreinoComExerciciosDTO treinoComExerciciosDTO) {
        Treino savedTreino = treinoService.createTreinoWithExercicios(treinoComExerciciosDTO.getTreino(), treinoComExerciciosDTO.getExercicios());
        return ResponseEntity.ok(savedTreino);
    }

    @GetMapping("/aluno/{alunoId}")
    public ResponseEntity<List<Treino>> getTreinosByAlunoId(@PathVariable Long alunoId) {
        List<Treino> treinos = treinoService.findTreinosByAlunoId(alunoId);
        if (!treinos.isEmpty()) {
            return ResponseEntity.ok(treinos);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
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
//     @PutMapping("/{id}")
//     public ResponseEntity<Treino> atualizaTreino(@PathVariable Long id, @RequestBody Treino treino) {
//         Optional<Treino> treinoExistente = treinoService.findTreinoById(id);
//
//         if (treinoExistente.isPresent()) {
//             Treino treinoAtualizado = treinoExistente.get();
//             treinoAtualizado.setNome(treino.getNome());
//             treinoAtualizado.setDescricao(treino.getDescricao());
//             // Atualize outros campos conforme necessário
//
//             treinoService.updateTreinoById(treinoAtualizado, id);
//             return ResponseEntity.ok(treinoAtualizado);
//         } else {
//             return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
//         }
//     }

    @PutMapping("/{id}")
    public ResponseEntity<Treino> atualizaTreino(@PathVariable Long id, @RequestBody Treino treino) {
        Optional<Treino> treinoExistente = treinoService.findTreinoById(id);

        if (treinoExistente.isPresent()) {
            Treino treinoAtualizado = treinoExistente.get();


            treinoAtualizado.setNome(treino.getNome());
            treinoAtualizado.setDescricao(treino.getDescricao());


            List<Exercicio> novosExercicios = treino.getExercicios(); // Exercícios enviados na requisição
            List<Exercicio> exerciciosExistentes = treinoAtualizado.getExercicios(); // Exercícios já existentes no BD


            for (Exercicio exercicio : novosExercicios) {
                if (exercicio.getId() != null) {
                    // Se o exercício tem ID, busca para atualizar
                    Optional<Exercicio> exercicioExistente = exercicioRepository.findById(exercicio.getId());
                    exercicioExistente.ifPresent(exercicioAtualizado -> {
                        exercicioAtualizado.setNome(exercicio.getNome());
                        exercicioAtualizado.setGrupoMuscular(exercicio.getGrupoMuscular());
                        exercicioAtualizado.setSeries(exercicio.getSeries());
                        exercicioAtualizado.setRepeticoes(exercicio.getRepeticoes());
                        exercicioAtualizado.setCarga(exercicio.getCarga());
                        exercicioAtualizado.setInicio(exercicio.getInicio());
                        exercicioAtualizado.setFim(exercicio.getFim());
                        exercicioAtualizado.setFinalizado(exercicio.getFinalizado());
                        exercicioRepository.save(exercicioAtualizado);
                    });
                } else {
                    // Se não tem ID, é um novo exercício
                    exercicio.setTreino(treinoAtualizado);
                    exercicioRepository.save(exercicio);
                }
            }

            //
            for (Exercicio exercicioExistente : exerciciosExistentes) {
                if (novosExercicios.stream().noneMatch(e -> e.getId() != null && e.getId().equals(exercicioExistente.getId()))) {
                    exercicioRepository.delete(exercicioExistente); // Remover do banco de dados
                }
            }


            treinoAtualizado.getExercicios().clear();
            treinoAtualizado.getExercicios().addAll(novosExercicios);


            treinoService.updateTreinoById(treinoAtualizado, id);

            return ResponseEntity.ok(treinoAtualizado);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }
}
