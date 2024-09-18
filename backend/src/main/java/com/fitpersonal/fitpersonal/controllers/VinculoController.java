package com.fitpersonal.fitpersonal.controllers;

import com.fitpersonal.fitpersonal.entities.aluno.Aluno;
import com.fitpersonal.fitpersonal.entities.dtos.AlunoResponseDTO;
import com.fitpersonal.fitpersonal.entities.dtos.VinculoRequestDTO;
import com.fitpersonal.fitpersonal.entities.dtos.VinculoResponseDTO;
import com.fitpersonal.fitpersonal.entities.nutricionista.Nutricionista;
import com.fitpersonal.fitpersonal.entities.personal.Personal;
import com.fitpersonal.fitpersonal.repositories.AlunoRepository;
import com.fitpersonal.fitpersonal.repositories.NutricionistaRepository;
import com.fitpersonal.fitpersonal.repositories.PersonalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("api/vincular-aluno")
public class VinculoController {

    @Autowired
    private AlunoRepository alunoRepository;

    @Autowired
    private NutricionistaRepository nutricionistaRepository;

    @Autowired
    private PersonalRepository personalRepository;

    @PutMapping("/vincular-aluno-nutricionista")
    @Transactional
    public ResponseEntity<VinculoResponseDTO> vincularNutricionista(@RequestBody VinculoRequestDTO vinculoRequest) {
        try {
            Aluno aluno = alunoRepository.findById(vinculoRequest.alunoId())
                    .orElseThrow(() -> new RuntimeException("Aluno não encontrado"));

            Nutricionista nutricionista = nutricionistaRepository.findById(vinculoRequest.profissionalId())
                    .orElseThrow(() -> new RuntimeException("Nutricionista não encontrado"));

            // Verifica se o aluno já está vinculado a um nutricionista
            if (aluno.getNutricionista() != null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(new VinculoResponseDTO("Aluno já está vinculado a um nutricionista", null, null));
            }

            // Vincula aluno ao nutricionista
            nutricionista.getListaAlunos().add(aluno);
            aluno.setNutricionista(nutricionista);

            alunoRepository.save(aluno);
            nutricionistaRepository.save(nutricionista);

            // Retorna um VinculoResponseDTO com os detalhes do aluno e nutricionista
            VinculoResponseDTO responseDTO = new VinculoResponseDTO(
                    "Aluno vinculado ao nutricionista com sucesso",
                    aluno.getNome(), // Nome do aluno
                    nutricionista.getNome() // Nome do nutricionista
            );

            return ResponseEntity.ok(responseDTO); // Retorna o DTO com a resposta

        } catch (RuntimeException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new VinculoResponseDTO("Erro: " + e.getMessage(), null, null));
        }
    }

    @PutMapping("/desvincular-aluno-nutricionista")
    @Transactional
    public ResponseEntity<VinculoResponseDTO> desvincularNutricionista(@RequestBody VinculoRequestDTO vinculoRequest) {
        try {
            Aluno aluno = alunoRepository.findById(vinculoRequest.alunoId())
                    .orElseThrow(() -> new RuntimeException("Aluno não encontrado"));

            Nutricionista nutricionista = aluno.getNutricionista();
            if (nutricionista == null || !nutricionista.getId().equals(vinculoRequest.profissionalId())) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(new VinculoResponseDTO("Aluno não está vinculado ao nutricionista especificado", null, null));
            }

            // Remove o vínculo do aluno com o nutricionista
            nutricionista.getListaAlunos().remove(aluno);
            aluno.setNutricionista(null);

            alunoRepository.save(aluno);
            nutricionistaRepository.save(nutricionista);

            // Retorna um VinculoResponseDTO com os detalhes do aluno e nutricionista
            VinculoResponseDTO responseDTO = new VinculoResponseDTO(
                    "Aluno desvinculado do nutricionista com sucesso",
                    aluno.getNome(), // Nome do aluno
                    nutricionista.getNome() // Nome do nutricionista
            );

            return ResponseEntity.ok(responseDTO);

        } catch (RuntimeException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new VinculoResponseDTO("Erro: " + e.getMessage(), null, null));
        }
    }

    @PutMapping("/vincular-aluno-personal")
    @Transactional
    public ResponseEntity<VinculoResponseDTO> vincularPersonal(@RequestBody VinculoRequestDTO vinculoRequest) {
        try {
            Aluno aluno = alunoRepository.findById(vinculoRequest.alunoId())
                    .orElseThrow(() -> new RuntimeException("Aluno não encontrado"));

            Personal personal = personalRepository.findById(vinculoRequest.profissionalId())
                    .orElseThrow(() -> new RuntimeException("Personal não encontrado"));

            // Verifica se o aluno já está vinculado a um personal
            if (aluno.getPersonal() != null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(new VinculoResponseDTO("Aluno já está vinculado a um personal", null, null));
            }

            // Vincula aluno ao personal
            personal.getListaAlunos().add(aluno);
            aluno.setPersonal(personal);

            alunoRepository.save(aluno);
            personalRepository.save(personal);

            // Retorna um VinculoResponseDTO com os detalhes do aluno e personal
            VinculoResponseDTO responseDTO = new VinculoResponseDTO(
                    "Aluno vinculado ao personal com sucesso",
                    aluno.getNome(), // Nome do aluno
                    personal.getNome() // Nome do personal
            );

            return ResponseEntity.ok(responseDTO); // Retorna o DTO com a resposta

        } catch (RuntimeException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new VinculoResponseDTO("Erro: " + e.getMessage(), null, null));
        }
    }

    @PutMapping("/desvincular-aluno-personal")
    @Transactional
    public ResponseEntity<VinculoResponseDTO> desvincularPersonal(@RequestBody VinculoRequestDTO vinculoRequest) {
        try {
            Aluno aluno = alunoRepository.findById(vinculoRequest.alunoId())
                    .orElseThrow(() -> new RuntimeException("Aluno não encontrado"));

            Personal personal = aluno.getPersonal();
            if (personal == null || !personal.getId().equals(vinculoRequest.profissionalId())) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(new VinculoResponseDTO("Aluno não está vinculado ao personal especificado", null, null));
            }

            // Remove o vínculo do aluno com o personal
            personal.getListaAlunos().remove(aluno);
            aluno.setPersonal(null);

            alunoRepository.save(aluno);
            personalRepository.save(personal);

            // Retorna um VinculoResponseDTO com os detalhes do aluno e do personal
            VinculoResponseDTO responseDTO = new VinculoResponseDTO(
                    "Aluno desvinculado do personal com sucesso",
                    aluno.getNome(), // Nome do aluno
                    personal.getNome() // Nome do personal
            );

            return ResponseEntity.ok(responseDTO);

        } catch (RuntimeException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new VinculoResponseDTO("Erro: " + e.getMessage(), null, null));
        }
    }


    @GetMapping("/listar-alunos-nutricionista/{nutricionistaId}")
    public ResponseEntity<List<AlunoResponseDTO>> listarAlunosNutricionista(@PathVariable Long nutricionistaId) {
        try {
            Nutricionista nutricionista = nutricionistaRepository.findById(nutricionistaId)
                    .orElseThrow(() -> new RuntimeException("Nutricionista não encontrado"));

            List<Aluno> alunos = nutricionista.getListaAlunos();
            List<AlunoResponseDTO> alunosResponse = alunos.stream()
                    .map(AlunoResponseDTO::new)
                    .collect(Collectors.toList());

            return ResponseEntity.ok(alunosResponse);
        } catch (RuntimeException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @GetMapping("/listar-alunos-personal/{personalId}")
    public ResponseEntity<List<AlunoResponseDTO>> listarAlunosPersonal(@PathVariable Long personalId) {
        try {
            Personal personal = personalRepository.findById(personalId)
                    .orElseThrow(() -> new RuntimeException("Personal não encontrado"));

            List<Aluno> alunos = personal.getListaAlunos();
            List<AlunoResponseDTO> alunosResponse = alunos.stream()
                    .map(AlunoResponseDTO::new)
                    .collect(Collectors.toList());

            return ResponseEntity.ok(alunosResponse);
        } catch (RuntimeException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    //Listar todos os alunos cadastrados
    @GetMapping("/listar-todos-alunos")
    public ResponseEntity<?> listarTodosAlunos() {
        try {
            List<Aluno> alunos = alunoRepository.findAll();
            if (alunos.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Nenhum aluno cadastrado encontrado.");
            }

            List<AlunoResponseDTO> alunosResponse = alunos.stream()
                    .map(AlunoResponseDTO::new)
                    .collect(Collectors.toList());

            return ResponseEntity.ok(alunosResponse);
        } catch (RuntimeException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao recuperar a lista de alunos.");
        }
    }

    @GetMapping("/listar-alunos-sem-nutricionista")
    public ResponseEntity<?> listarAlunosSemNutricionista() {
        try {
            // Filtra os alunos que não estão vinculados a nenhum nutricionista
            List<Aluno> alunosSemNutricionista = alunoRepository.findAll().stream()
                    .filter(aluno -> aluno.getNutricionista() == null)
                    .collect(Collectors.toList());

            if (alunosSemNutricionista.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Nenhum aluno sem nutricionista encontrado.");
            }

            List<AlunoResponseDTO> alunosResponse = alunosSemNutricionista.stream()
                    .map(AlunoResponseDTO::new)
                    .collect(Collectors.toList());

            return ResponseEntity.ok(alunosResponse);
        } catch (RuntimeException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao recuperar a lista de alunos.");
        }
    }

    @GetMapping("/listar-alunos-sem-personal")
    public ResponseEntity<?> listarAlunosSemPersonal() {
        try {
            // Filtra os alunos que não estão vinculados a nenhum personal trainer
            List<Aluno> alunosSemPersonal = alunoRepository.findAll().stream()
                    .filter(aluno -> aluno.getPersonal() == null)
                    .collect(Collectors.toList());

            if (alunosSemPersonal.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Nenhum aluno sem personal trainer encontrado.");
            }

            List<AlunoResponseDTO> alunosResponse = alunosSemPersonal.stream()
                    .map(AlunoResponseDTO::new)
                    .collect(Collectors.toList());

            return ResponseEntity.ok(alunosResponse);
        } catch (RuntimeException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao recuperar a lista de alunos.");
        }
    }
}
