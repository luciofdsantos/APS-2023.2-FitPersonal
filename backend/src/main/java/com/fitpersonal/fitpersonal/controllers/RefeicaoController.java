package com.fitpersonal.fitpersonal.controllers;

import com.fitpersonal.fitpersonal.entities.refeicao.Refeicao;
import com.fitpersonal.fitpersonal.entities.dtos.RefeicaoRequestDTO;
import com.fitpersonal.fitpersonal.entities.dtos.RefeicaoResponseDTO;
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

    @PostMapping
    public ResponseEntity<RefeicaoResponseDTO> saveRefeicao(
            @RequestParam(required = false) Long planoalimentarId,
            @RequestBody RefeicaoRequestDTO dto) {

        Long idPlanoAlimentar = (planoalimentarId != null && planoalimentarId > 0) ? planoalimentarId : dto.planoAlimentarId();

        if (idPlanoAlimentar == null || idPlanoAlimentar <= 0) {
            return ResponseEntity.badRequest().body(null); // HTTP 400 Bad Request
        }

        return planoAlimentarRepository.findById(idPlanoAlimentar)
                .map(planoAlimentar -> {
                    Refeicao refeicao = new Refeicao(dto, planoAlimentar);
                    refeicao.isConsumo();
                    Refeicao savedRefeicao = refeicaoRepository.save(refeicao);

                    // Atualizar o total no PlanoAlimentar
                    planoAlimentar.addRefeicao(savedRefeicao);
                    planoAlimentarRepository.save(planoAlimentar);

                    return ResponseEntity.status(HttpStatus.CREATED).body(new RefeicaoResponseDTO(savedRefeicao));
                })
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(null)); // HTTP 404 Not Found se planoAlimentar não for encontrado
    }

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
                    existingRefeicao.setCarboidrato(dto.carboidrato());
                    existingRefeicao.setProteina(dto.proteina());
                    existingRefeicao.setGordura(dto.gordura());
                    existingRefeicao.setConsumido(dto.consumido());
                    existingRefeicao.setTipoRefeicao(dto.tipoRefeicao());
                    existingRefeicao.isConsumo();
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