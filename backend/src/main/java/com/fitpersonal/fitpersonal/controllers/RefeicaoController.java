package com.fitpersonal.fitpersonal.controllers;

import com.fitpersonal.fitpersonal.entities.planoalimentar.PlanoAlimentar;
import com.fitpersonal.fitpersonal.entities.refeicao.Refeicao;
import com.fitpersonal.fitpersonal.entities.refeicao.RefeicaoRequestDTO;
import com.fitpersonal.fitpersonal.entities.refeicao.RefeicaoResponseDTO;
import com.fitpersonal.fitpersonal.repositories.PlanoAlimentarRepository;
import com.fitpersonal.fitpersonal.repositories.RefeicaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/refeicoes")
public class RefeicaoController {

    @Autowired
    private RefeicaoRepository refeicaoRepository;

    @Autowired
    private PlanoAlimentarRepository planoAlimentarRepository;

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping
    public ResponseEntity<RefeicaoResponseDTO> saveRefeicao(@RequestBody RefeicaoRequestDTO dto, @RequestParam(required = false) Long planoAlimentarId) {
        if (planoAlimentarId != null) {
            // Caso exista plano alimentar associado
            return planoAlimentarRepository.findById(planoAlimentarId)
                    .map(planoAlimentar -> {
                        Refeicao refeicao = new Refeicao(dto, planoAlimentar);
                        Refeicao savedRefeicao = refeicaoRepository.save(refeicao);
                        return ResponseEntity.status(HttpStatus.CREATED).body(new RefeicaoResponseDTO(savedRefeicao));
                    })
                    .orElseGet(() -> ResponseEntity.notFound().build()); // HTTP 404 Not Found se planoAlimentar não for encontrado
        } else {
            // Caso não exista plano alimentar associado
            Refeicao refeicao = new Refeicao(dto, null); // Não associar a nenhum plano alimentar
            Refeicao savedRefeicao = refeicaoRepository.save(refeicao);
            return ResponseEntity.status(HttpStatus.CREATED).body(new RefeicaoResponseDTO(savedRefeicao));
        }
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping
    public List<RefeicaoResponseDTO> getAll() {
        return refeicaoRepository.findAll().stream()
                .map(RefeicaoResponseDTO::new)
                .toList();
    }

    @GetMapping("/{id}")
    public ResponseEntity<RefeicaoResponseDTO> getRefeicaoById(@PathVariable Long id) {
        return refeicaoRepository.findById(id)
                .map(refeicao -> ResponseEntity.ok(new RefeicaoResponseDTO(refeicao)))
                .orElseGet(() -> ResponseEntity.notFound().build()); // HTTP 404 Not Found se não encontrar
    }

    @PutMapping("/{id}")
    public ResponseEntity<RefeicaoResponseDTO> updateRefeicao(@PathVariable Long id, @RequestBody RefeicaoRequestDTO dto) {
        return refeicaoRepository.findById(id)
                .map(existingRefeicao -> {
                    existingRefeicao.setAlimento(dto.alimento());
                    existingRefeicao.setQuantidade(dto.quantidade());
                    existingRefeicao.setKcal(dto.kcal());
                    existingRefeicao.setTipoRefeicao(dto.tipoRefeicao());

                    Refeicao updatedRefeicao = refeicaoRepository.save(existingRefeicao);
                    return ResponseEntity.ok(new RefeicaoResponseDTO(updatedRefeicao)); // HTTP 200 OK
                })
                .orElseGet(() -> ResponseEntity.notFound().build()); // HTTP 404 Not Found se não encontrar
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRefeicao(@PathVariable Long id) {
        if (refeicaoRepository.existsById(id)) {
            refeicaoRepository.deleteById(id);
            return ResponseEntity.noContent().build(); // HTTP 204 No Content
        } else {
            return ResponseEntity.notFound().build(); // HTTP 404 Not Found
        }
    }
}
