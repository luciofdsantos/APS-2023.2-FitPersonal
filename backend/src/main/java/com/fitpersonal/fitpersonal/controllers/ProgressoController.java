package com.fitpersonal.fitpersonal.controllers;

import com.fitpersonal.fitpersonal.entities.dtos.ProgressoTreinoDTO;
import com.fitpersonal.fitpersonal.services.ProgressoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/progresso")
public class ProgressoController {

    @Autowired
    private ProgressoService progressoService;

    @PostMapping("/registrar")
    public ResponseEntity<ProgressoTreinoDTO> registrarProgresso(@RequestBody ProgressoTreinoDTO progressoTreinoDTO) {
        ProgressoTreinoDTO responseDTO = progressoService.registrarProgresso(progressoTreinoDTO);
        return ResponseEntity.ok(responseDTO);
    }

    @GetMapping("/historico/{alunoId}")
    public ResponseEntity<List<ProgressoTreinoDTO>> getHistorico(@PathVariable Long alunoId) {
        List<ProgressoTreinoDTO> historico = progressoService.getHistoricoPorAluno(alunoId);
        return ResponseEntity.ok(historico);
    }
}
