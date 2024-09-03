package com.fitpersonal.fitpersonal.controllers;

import com.fitpersonal.fitpersonal.entities.aluno.Aluno;
import com.fitpersonal.fitpersonal.entities.dtos.VinculoRequestDTO;
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
    public ResponseEntity<String> vincularNutricionista(@RequestBody VinculoRequestDTO vinculoRequest) {
        try {
            Aluno aluno = alunoRepository.findById(vinculoRequest.alunoId())
                    .orElseThrow(() -> new RuntimeException("Aluno não encontrado"));

            Nutricionista nutricionista = nutricionistaRepository.findById(vinculoRequest.profissionalId())
                    .orElseThrow(() -> new RuntimeException("Nutricionista não encontrado"));

            // Verifica se o aluno já está vinculado a um nutricionista
            if (aluno.getNutricionista() != null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Aluno já está vinculado a um nutricionista.");
            }

            // Vincula aluno ao nutricionista
            nutricionista.getListaAlunos().add(aluno);
            aluno.setNutricionista(nutricionista);

            alunoRepository.save(aluno);
            nutricionistaRepository.save(nutricionista);

            return ResponseEntity.ok("Aluno vinculado ao nutricionista com sucesso.");
        } catch (RuntimeException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Erro: " + e.getMessage());
        }
    }

    @PutMapping("/desvincular-aluno-nutricionista")
    @Transactional
    public ResponseEntity<String> desvincularNutricionista(@RequestBody VinculoRequestDTO vinculoRequest) {
        try {
            Aluno aluno = alunoRepository.findById(vinculoRequest.alunoId())
                    .orElseThrow(() -> new RuntimeException("Aluno não encontrado"));

            Nutricionista nutricionista = aluno.getNutricionista();
            if (nutricionista == null || !nutricionista.getId().equals(vinculoRequest.profissionalId())) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Aluno não está vinculado ao nutricionista especificado.");
            }

            nutricionista.getListaAlunos().remove(aluno);
            aluno.setNutricionista(null);

            alunoRepository.save(aluno);
            nutricionistaRepository.save(nutricionista);

            return ResponseEntity.ok("Aluno desvinculado do nutricionista com sucesso.");
        } catch (RuntimeException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Erro: " + e.getMessage());
        }
    }

    @PutMapping("/vincular-aluno-personal")
    @Transactional
    public ResponseEntity<String> vincularPersonal(@RequestBody VinculoRequestDTO vinculoRequest) {
        try {
            Aluno aluno = alunoRepository.findById(vinculoRequest.alunoId())
                    .orElseThrow(() -> new RuntimeException("Aluno não encontrado"));

            Personal personal = personalRepository.findById(vinculoRequest.profissionalId())
                    .orElseThrow(() -> new RuntimeException("Personal não encontrado"));

            // Verifica se o aluno já está vinculado a um personal
            if (aluno.getPersonal() != null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Aluno já está vinculado a um personal.");
            }

            // Vincula aluno ao personal
            personal.getListaAlunos().add(aluno);
            aluno.setPersonal(personal);

            alunoRepository.save(aluno);
            personalRepository.save(personal);

            return ResponseEntity.ok("Aluno vinculado ao personal com sucesso.");
        } catch (RuntimeException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Erro: " + e.getMessage());
        }
    }

    @PutMapping("/desvincular-aluno-personal")
    @Transactional
    public ResponseEntity<String> desvincularPersonal(@RequestBody VinculoRequestDTO vinculoRequest) {
        try {
            Aluno aluno = alunoRepository.findById(vinculoRequest.alunoId())
                    .orElseThrow(() -> new RuntimeException("Aluno não encontrado"));

            Personal personal = aluno.getPersonal();
            if (personal == null || !personal.getId().equals(vinculoRequest.profissionalId())) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Aluno não está vinculado ao personal especificado.");
            }

            personal.getListaAlunos().remove(aluno);
            aluno.setPersonal(null);

            alunoRepository.save(aluno);
            personalRepository.save(personal);

            return ResponseEntity.ok("Aluno desvinculado do personal com sucesso.");
        } catch (RuntimeException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Erro: " + e.getMessage());
        }
    }
}
