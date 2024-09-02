package com.fitpersonal.fitpersonal.controllers;

import com.fitpersonal.fitpersonal.entities.aluno.Aluno;
import com.fitpersonal.fitpersonal.entities.planoalimentar.PlanoAlimentar;
import com.fitpersonal.fitpersonal.entities.dtos.PlanoAlimentarRequestDTO;
import com.fitpersonal.fitpersonal.entities.dtos.PlanoAlimentarResponseDTO;
import com.fitpersonal.fitpersonal.entities.refeicao.Refeicao;
import com.fitpersonal.fitpersonal.repositories.AlunoRepository;
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

    @Autowired
    private AlunoRepository alunoRepository;

    @PostMapping
    public ResponseEntity<PlanoAlimentarResponseDTO> savePlanoAlimentar(@RequestBody PlanoAlimentarRequestDTO data) {
        Long alunoId = data.alunoId();

        // Verificar se o ID do aluno é válido
        if (alunoId == null || alunoId <= 0) {
            return ResponseEntity.badRequest().build(); // HTTP 400 Bad Request
        }

        Aluno aluno;
        try {
            aluno = alunoRepository.findById(alunoId)
                    .orElseThrow(() -> new RuntimeException("Aluno não encontrado"));
        } catch (RuntimeException e) {
            // Se o aluno não for encontrado, retornamos uma resposta de erro
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null); // HTTP 404 Not Found
        }

        PlanoAlimentar planoAlimentarData = new PlanoAlimentar(data);
        planoAlimentarData.setAluno(aluno); // Associa o aluno ao plano alimentar

        PlanoAlimentar savedPlanoAlimentar = planoAlimentarRepository.save(planoAlimentarData);

        return ResponseEntity.status(HttpStatus.CREATED).body(new PlanoAlimentarResponseDTO(savedPlanoAlimentar));
    }

    @PostMapping("/withrefeicoes")
    @Transactional
    public ResponseEntity<PlanoAlimentarResponseDTO> savePlanoAlimentarWithRefeicoes(@RequestBody PlanoAlimentarRequestDTO data) {
        Long alunoId = data.alunoId();

        Aluno aluno;
        try {
            aluno = alunoRepository.findById(alunoId)
                    .orElseThrow(() -> new RuntimeException("Aluno não encontrado"));
        } catch (RuntimeException e) {
            // Se o aluno não for encontrado, retornamos uma resposta de erro
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null); // HTTP 404 Not Found
        }

        PlanoAlimentar planoAlimentar = new PlanoAlimentar(data);
        planoAlimentar.setAluno(aluno); // Vincula o plano ao aluno

        List<Refeicao> refeicoes = data.refeicoes().stream()
                .map(refeicaoDTO -> new Refeicao(refeicaoDTO, planoAlimentar))
                .collect(Collectors.toList());

        planoAlimentar.setRefeicoes(refeicoes);

        PlanoAlimentar savedPlanoAlimentar = planoAlimentarRepository.save(planoAlimentar);
        return ResponseEntity.status(HttpStatus.CREATED).body(new PlanoAlimentarResponseDTO(savedPlanoAlimentar));
    }


    @GetMapping("/{id}")
    public ResponseEntity<PlanoAlimentarResponseDTO> getPlanoAlimentarById(@PathVariable Long id) {
        return planoAlimentarRepository.findById(id)
                .map(planoAlimentar -> {
                    planoAlimentar.updateTotais(); // Atualiza totais antes de criar o DTO
                    return ResponseEntity.ok(new PlanoAlimentarResponseDTO(planoAlimentar));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<List<PlanoAlimentarResponseDTO>> getAllPlanosAlimentares() {
        List<PlanoAlimentarResponseDTO> response = planoAlimentarRepository.findAll().stream()
                .peek(PlanoAlimentar::updateTotais) // Atualiza totais antes de mapear para DTO
                .map(PlanoAlimentarResponseDTO::new)
                .collect(Collectors.toList());
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePlanoAlimentar(@PathVariable Long id) {
        if (planoAlimentarRepository.existsById(id)) {
            planoAlimentarRepository.deleteById(id);
            return ResponseEntity.noContent().build(); // HTTP 204 No Content
        } else {
            return ResponseEntity.notFound().build(); // HTTP 404 Not Found
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<PlanoAlimentarResponseDTO> updatePlanoAlimentar(@PathVariable Long id, @RequestBody PlanoAlimentarRequestDTO data) {
        return planoAlimentarRepository.findById(id)
                .map(existingPlanoAlimentar -> {
                    existingPlanoAlimentar.setMetaConsumoKcal(data.metaConsumoKcal());
                    existingPlanoAlimentar.setMetaConsumoCarboidrato(data.metaConsumoCarboidrato());
                    existingPlanoAlimentar.setMetaConsumoProteina(data.metaConsumoProteina());
                    existingPlanoAlimentar.setMetaConsumoGordura(data.metaConsumoGordura());

                    if (data.refeicoes() != null) {
                        List<Refeicao> updatedRefeicoes = data.refeicoes().stream()
                                .map(refeicaoDTO -> new Refeicao(refeicaoDTO, existingPlanoAlimentar))
                                .collect(Collectors.toList());

                        existingPlanoAlimentar.setRefeicoes(updatedRefeicoes);

                        refeicaoRepository.saveAll(updatedRefeicoes);
                    }

                    existingPlanoAlimentar.updateTotais();

                    PlanoAlimentar updatedPlanoAlimentar = planoAlimentarRepository.save(existingPlanoAlimentar);
                    return ResponseEntity.ok(new PlanoAlimentarResponseDTO(updatedPlanoAlimentar));
                })
                .orElseGet(() -> ResponseEntity.notFound().build()); // HTTP 404 Not Found se não encontrar
    }

}
