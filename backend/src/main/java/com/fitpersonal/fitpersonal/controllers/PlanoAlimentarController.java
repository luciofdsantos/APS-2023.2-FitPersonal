package com.fitpersonal.fitpersonal.controllers;

import com.fitpersonal.fitpersonal.entities.planoalimentar.PlanoAlimentar;
import com.fitpersonal.fitpersonal.entities.planoalimentar.PlanoAlimentarRequestDTO;
import com.fitpersonal.fitpersonal.entities.planoalimentar.PlanoAlimentarResponseDTO;
import com.fitpersonal.fitpersonal.repositories.PlanoAlimentarRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List; // Adicione esta linha
import java.util.stream.Collectors; // Adicione esta linha

@RestController
@RequestMapping("api/planoalimentar")
public class PlanoAlimentarController {

    @Autowired
    private PlanoAlimentarRepository planoAlimentarRepository;

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping
    public ResponseEntity<PlanoAlimentarResponseDTO> savePlanoAlimentar(@RequestBody PlanoAlimentarRequestDTO data) {
        PlanoAlimentar planoAlimentarData = new PlanoAlimentar(data);
        PlanoAlimentar savedPlanoAlimentar = planoAlimentarRepository.save(planoAlimentarData);
        return ResponseEntity.status(HttpStatus.CREATED).body(new PlanoAlimentarResponseDTO(savedPlanoAlimentar));
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping("/{id}")
    public ResponseEntity<PlanoAlimentarResponseDTO> getPlanoAlimentarById(@PathVariable Long id) {
        return planoAlimentarRepository.findById(id)
                .map(planoAlimentar -> ResponseEntity.ok(new PlanoAlimentarResponseDTO(planoAlimentar)))
                .orElse(ResponseEntity.notFound().build());
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping
    public ResponseEntity<List<PlanoAlimentarResponseDTO>> getAllPlanosAlimentares() {
        List<PlanoAlimentarResponseDTO> response = planoAlimentarRepository.findAll().stream()
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
}
