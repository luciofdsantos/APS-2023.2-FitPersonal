package com.fitpersonal.fitpersonal.controllers;

import com.fitpersonal.fitpersonal.entities.treino.Treino;
import com.fitpersonal.fitpersonal.services.TreinoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("api/treinos")
public class TreinoController {

    @Autowired
    private TreinoService treinoService;

    @PostMapping
    public ResponseEntity<Treino> salvaTreino (@RequestBody Treino treino){
        Treino treinoSalvo = treinoService.createTreino(treino);
        return  new ResponseEntity<>(treinoSalvo, HttpStatus.CREATED);
    }


    @GetMapping
    public List<Treino> getAllTreinos() {
        return treinoService.findAllTreinos();
    }

}
