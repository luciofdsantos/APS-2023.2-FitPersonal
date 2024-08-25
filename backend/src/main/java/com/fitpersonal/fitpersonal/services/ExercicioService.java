package com.fitpersonal.fitpersonal.services;

import com.fitpersonal.fitpersonal.entities.exercicio.Exercicio;
import com.fitpersonal.fitpersonal.repositories.ExercicioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ExercicioService {

    @Autowired
    private ExercicioRepository exercicioRepository;

    public List<Exercicio> getAllExercicios(){
        return exercicioRepository.findAll();
    }

    public Optional<Exercicio> findbyId(Long id){
        return exercicioRepository.findById(id);
    }

    public Exercicio saveExercicio(Exercicio exercicio){
        return exercicioRepository.save(exercicio);
    }

    public void deleteExercicio(Long id) {
        exercicioRepository.deleteById(id);
    }

    public Exercicio updateExercicioById(Long id, Exercicio exercicioAtualizado){
        Exercicio ex = exercicioRepository.findById(id).orElse(null);
        if(ex != null){
            ex.setNome(exercicioAtualizado.getNome());
            ex.setCarga(exercicioAtualizado.getCarga());
            ex.setInicio(exercicioAtualizado.getInicio());
            ex.setFim(exercicioAtualizado.getFim());
            ex.setGrupoMuscular(exercicioAtualizado.getGrupoMuscular());
            ex.setSeries(exercicioAtualizado.getSeries());
            ex.setRepeticoes(exercicioAtualizado.getRepeticoes());
            ex.setFinalizado(exercicioAtualizado.getFinalizado());
            //ex.setTreino(exercicioAtualizado.getTreino());
            exercicioRepository.save(ex);
            return ex;
        }else {
            return null;
        }
    }

    public List<Exercicio> getPredefinedExercicios() {

        Exercicio exercicio1 = new Exercicio(null, "Supino Reto", null, null, "Peito", 4, 12, 50, false, null);
        Exercicio exercicio2 = new Exercicio(null, "Agachamento Livre", null, null, "Pernas", 4, 10, 80, false, null);
        Exercicio exercicio3 = new Exercicio(null, "Remada Curvada", null, null, "Costas", 3, 15, 40, false, null);

        return List.of(exercicio1, exercicio2, exercicio3);
    }

}
