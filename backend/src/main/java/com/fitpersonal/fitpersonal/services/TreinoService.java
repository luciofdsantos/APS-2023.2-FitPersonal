package com.fitpersonal.fitpersonal.services;

import com.fitpersonal.fitpersonal.entities.exercicio.Exercicio;
import com.fitpersonal.fitpersonal.entities.treino.Treino;
import com.fitpersonal.fitpersonal.repositories.ExercicioRepository;
import com.fitpersonal.fitpersonal.repositories.TreinoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TreinoService {

    @Autowired
    private TreinoRepository treinoRepository;

    @Autowired
    private ExercicioRepository exercicioRepository;

    public Treino createTreino(Treino treino){
        return treinoRepository.save(treino);
    }

    public Optional<Treino> updateTreinoById(Treino treinoAtualizado, Long id){
        Optional<Treino> optionalTreino = treinoRepository.findById(id);
        if(optionalTreino.isPresent()){
            Treino treino = optionalTreino.get();
            treino.setNome(treinoAtualizado.getNome());
            treino.setDescricao(treinoAtualizado.getDescricao());
            treino.setTempoTotal(treinoAtualizado.getTempoTotal());
            treino.setMetaTempo(treinoAtualizado.getMetaTempo());
            treino.setExercicios(treinoAtualizado.getExercicios());

            treinoRepository.save(treino);
            return Optional.of(treino);

        }
        return Optional.empty();
    }

    public List<Treino> findAllTreinos(){
        return treinoRepository.findAll();
    }

    public Optional<Treino> findTreinoById(Long id) {
        return treinoRepository.findById(id);
    }

    public void deleteTreinoById(Long id){
         treinoRepository.deleteById(id);
    }

    //Criar um treino com os exercícios precadastrados;

    public  Treino createTreinoWithExercicios(Treino treino, List<Exercicio> exercicios){
        Treino savedTreino = treinoRepository.save(treino);

        // Associa cada exercício ao treino salvo e depois salva cada exercício
        for (Exercicio exercicio : exercicios) {
            exercicio.setTreino(savedTreino);
            exercicioRepository.save(exercicio);
        }
        // Retorna o treino com os exercícios associados
        savedTreino.setExercicios(exercicios);
        return savedTreino;
    }

}
