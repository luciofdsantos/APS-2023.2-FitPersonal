package com.fitpersonal.fitpersonal.controllers;

import com.fitpersonal.fitpersonal.entities.planoalimentar.PlanoAlimentar;
import com.fitpersonal.fitpersonal.entities.dtos.PlanoAlimentarRequestDTO;
import com.fitpersonal.fitpersonal.entities.dtos.PlanoAlimentarResponseDTO;
import com.fitpersonal.fitpersonal.entities.refeicao.Refeicao;
import com.fitpersonal.fitpersonal.repositories.PlanoAlimentarRepository;
import com.fitpersonal.fitpersonal.repositories.RefeicaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("api/planoalimentar")
public class PlanoAlimentarController {

    @Autowired
    private PlanoAlimentarRepository planoAlimentarRepository;

    @Autowired
    private RefeicaoRepository refeicaoRepository;

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping
    public ResponseEntity<PlanoAlimentarResponseDTO> savePlanoAlimentar(@RequestBody PlanoAlimentarRequestDTO data) {
        PlanoAlimentar planoAlimentarData = new PlanoAlimentar(data);
        PlanoAlimentar savedPlanoAlimentar = planoAlimentarRepository.save(planoAlimentarData);
        return ResponseEntity.status(HttpStatus.CREATED).body(new PlanoAlimentarResponseDTO(savedPlanoAlimentar));
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping("/withrefeicoes")
    @Transactional
    public ResponseEntity<PlanoAlimentarResponseDTO> savePlanoAlimentarWithRefeicoes(@RequestBody PlanoAlimentarRequestDTO data) {
        PlanoAlimentar planoAlimentar = new PlanoAlimentar(data);

        List<Refeicao> refeicoes = data.refeicoes().stream()
                .map(refeicaoDTO -> new Refeicao(refeicaoDTO, planoAlimentar))
                .collect(Collectors.toList());

        planoAlimentar.setRefeicoes(refeicoes);

        // Não é necessário salvar as refeições separadamente devido à configuração de cascata
        PlanoAlimentar savedPlanoAlimentar = planoAlimentarRepository.save(planoAlimentar);
        return ResponseEntity.status(HttpStatus.CREATED).body(new PlanoAlimentarResponseDTO(savedPlanoAlimentar));
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping("/{id}")
    public ResponseEntity<PlanoAlimentarResponseDTO> getPlanoAlimentarById(@PathVariable Long id) {
        return planoAlimentarRepository.findById(id)
                .map(planoAlimentar -> {
                    planoAlimentar.updateTotais(); // Atualiza totais antes de criar o DTO
                    return ResponseEntity.ok(new PlanoAlimentarResponseDTO(planoAlimentar));
                })
                .orElse(ResponseEntity.notFound().build());
    }
    
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping
    public ResponseEntity<List<PlanoAlimentarResponseDTO>> getAllPlanosAlimentares() {
        List<PlanoAlimentarResponseDTO> response = planoAlimentarRepository.findAll().stream()
                .peek(PlanoAlimentar::updateTotais) // Atualiza totais antes de mapear para DTO
                .map(PlanoAlimentarResponseDTO::new)
                .collect(Collectors.toList());
        return ResponseEntity.ok(response);
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePlanoAlimentar(@PathVariable Long id) {
        if (planoAlimentarRepository.existsById(id)) {
            planoAlimentarRepository.deleteById(id);
            return ResponseEntity.noContent().build(); // HTTP 204 No Content
        } else {
            return ResponseEntity.notFound().build(); // HTTP 404 Not Found
        }
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PutMapping("/{id}")
    public ResponseEntity<PlanoAlimentarResponseDTO> updatePlanoAlimentar(@PathVariable Long id, @RequestBody PlanoAlimentarRequestDTO data) {
        return planoAlimentarRepository.findById(id)
                .map(existingPlanoAlimentar -> {
                    //Usuário não define totais, banco de dados que atualiza a partir de refeições
                    //existingPlanoAlimentar.setTotalConsumoKcal(data.totalConsumoKcal());
                    //.setTotalConsumoCarboidrato(data.totalConsumoCarboidrato());
                    //existingPlanoAlimentar.setTotalConsumoProteina(data.totalConsumoProteina());
                    //existingPlanoAlimentar.setTotalConsumoGordura(data.totalConsumoGordura());
                    existingPlanoAlimentar.setMetaConsumoKcal(data.metaConsumoKcal());
                    existingPlanoAlimentar.setMetaConsumoCarboidrato(data.metaConsumoCarboidrato());
                    existingPlanoAlimentar.setMetaConsumoProteina(data.metaConsumoProteina());
                    existingPlanoAlimentar.setMetaConsumoGordura(data.metaConsumoGordura());

                    // Atualizar refeições se necessário
                    if (data.refeicoes() != null) {
                        List<Refeicao> updatedRefeicoes = data.refeicoes().stream()
                                .map(refeicaoDTO -> new Refeicao(refeicaoDTO, existingPlanoAlimentar))
                                .collect(Collectors.toList());

                        existingPlanoAlimentar.setRefeicoes(updatedRefeicoes);

                        // Salvar as refeições associadas
                        refeicaoRepository.saveAll(updatedRefeicoes);
                    }

                    // Atualizar totais baseados nas refeições
                    existingPlanoAlimentar.updateTotais();

                    PlanoAlimentar updatedPlanoAlimentar = planoAlimentarRepository.save(existingPlanoAlimentar);
                    return ResponseEntity.ok(new PlanoAlimentarResponseDTO(updatedPlanoAlimentar));
                })
                .orElseGet(() -> ResponseEntity.notFound().build()); // HTTP 404 Not Found se não encontrar
    }

}
