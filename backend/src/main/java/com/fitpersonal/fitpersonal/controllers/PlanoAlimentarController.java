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
    public ResponseEntity<String> savePlanoAlimentar(@RequestBody PlanoAlimentarRequestDTO data) {
        Long alunoId = data.alunoId();

        // Verificar se o ID do aluno é null ou inválido
        if (alunoId == null || alunoId <= 0) {
            return ResponseEntity.badRequest().body("O ID do aluno é inválido ou não foi fornecido."); // HTTP 400 Bad Request com mensagem
        }

        Aluno aluno;
        try {
            aluno = alunoRepository.findById(alunoId)
                    .orElseThrow(() -> new RuntimeException("Aluno não encontrado"));
        } catch (RuntimeException e) {
            // Se o aluno não for encontrado retorna uma resposta de erro
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Aluno não encontrado."); // HTTP 404 Not Found com mensagem
        }

        PlanoAlimentar planoAlimentarData = new PlanoAlimentar(data);
        planoAlimentarData.setAluno(aluno); // Associa o aluno ao plano alimentar

        PlanoAlimentar savedPlanoAlimentar = planoAlimentarRepository.save(planoAlimentarData);

        return ResponseEntity.status(HttpStatus.CREATED).body("Plano alimentar criado com sucesso."); // HTTP 201 Created com mensagem de sucesso
    }


    @PostMapping("/withrefeicoes")
    @Transactional
    public ResponseEntity<String> savePlanoAlimentarWithRefeicoes(@RequestBody PlanoAlimentarRequestDTO data) {
        Long alunoId = data.alunoId();

        // Verificar se o ID do aluno é null
        if (alunoId == null) {
            return ResponseEntity.badRequest().body("O ID do aluno não foi fornecido."); // HTTP 400 Bad Request com mensagem
        }

        Aluno aluno;
        try {
            aluno = alunoRepository.findById(alunoId)
                    .orElseThrow(() -> new RuntimeException("Aluno não encontrado"));
        } catch (RuntimeException e) {
            // Se o aluno não for encontrado retorna uma resposta de erro
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Aluno não encontrado."); // HTTP 404 Not Found com mensagem
        }

        PlanoAlimentar planoAlimentar = new PlanoAlimentar(data);
        planoAlimentar.setAluno(aluno); // Vincula o plano ao aluno

        List<Refeicao> refeicoes = data.refeicoes().stream()
                .map(refeicaoDTO -> new Refeicao(refeicaoDTO, planoAlimentar))
                .collect(Collectors.toList());

        planoAlimentar.setRefeicoes(refeicoes);

        PlanoAlimentar savedPlanoAlimentar = planoAlimentarRepository.save(planoAlimentar);
        return ResponseEntity.status(HttpStatus.CREATED).body("Plano alimentar criado com sucesso."); // HTTP 201 Created com mensagem de sucesso
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

    @GetMapping("/plano_alimentar_aluno/{alunoId}")
    public ResponseEntity<?> getPlanosAlimentaresByAlunoId(@PathVariable Long alunoId) {
        try {
            // Verifica se o aluno existe no banco de dados
            Aluno aluno = alunoRepository.findById(alunoId)
                    .orElseThrow(() -> new RuntimeException("Aluno não encontrado"));

            // Busca os planos alimentares associados ao aluno
            List<PlanoAlimentar> planosAlimentares = planoAlimentarRepository.findByAlunoId(alunoId);

            if (planosAlimentares.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("Nenhum plano alimentar encontrado para o aluno com ID: " + alunoId);
            }

            // Converte os planos alimentares em DTOs
            List<PlanoAlimentarResponseDTO> response = planosAlimentares.stream()
                    .map(PlanoAlimentarResponseDTO::new)
                    .collect(Collectors.toList());

            return ResponseEntity.ok(response); // Retorna a lista de planos alimentares
        } catch (RuntimeException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erro ao recuperar planos alimentares para o aluno com ID: " + alunoId);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletePlanoAlimentar(@PathVariable Long id) {
        try {
            if (planoAlimentarRepository.existsById(id)) {
                planoAlimentarRepository.deleteById(id);
                return ResponseEntity.noContent().build();
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("Plano alimentar com ID " + id + " não foi encontrado.");
            }
        } catch (Exception e) {
            // Captura qualquer exceção que ocorra e retorna uma resposta de erro
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erro interno ao tentar deletar o plano alimentar com ID " + id);
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
