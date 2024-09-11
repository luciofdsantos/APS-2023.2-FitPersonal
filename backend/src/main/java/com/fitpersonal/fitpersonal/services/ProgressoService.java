package com.fitpersonal.fitpersonal.services;

import com.fitpersonal.fitpersonal.entities.aluno.Aluno;
import com.fitpersonal.fitpersonal.entities.dtos.AlunoResponseDTO;
import com.fitpersonal.fitpersonal.entities.dtos.ExercicioProgressoDTO;
import com.fitpersonal.fitpersonal.entities.dtos.ProgressoTreinoDTO;
import com.fitpersonal.fitpersonal.entities.exercicio.Exercicio;
import com.fitpersonal.fitpersonal.entities.exercicioprogresso.ExercicioProgresso;
import com.fitpersonal.fitpersonal.entities.progressotreino.ProgressoTreino;
import com.fitpersonal.fitpersonal.entities.treino.Treino;
import com.fitpersonal.fitpersonal.entities.usuario.Usuario;
import com.fitpersonal.fitpersonal.repositories.AlunoRepository;
import com.fitpersonal.fitpersonal.repositories.ProgressoRepository;
import com.fitpersonal.fitpersonal.repositories.TreinoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
@Service
public class ProgressoService {

    @Autowired
    private ProgressoRepository progressoRepository;

    @Autowired
    private TreinoRepository treinoRepository;

    @Autowired
    private AlunoRepository alunoRepository;

    public void registrarProgresso(ProgressoTreinoDTO progressoTreinoDTO) {
        try {
            ProgressoTreino progresso = new ProgressoTreino();


            Treino treino = treinoRepository.findById(progressoTreinoDTO.getTreinoId())
                    .orElseThrow(() -> new IllegalArgumentException("Treino não encontrado."));
            Aluno aluno = alunoRepository.findById(progressoTreinoDTO.getAlunoId())
                    .orElseThrow(() -> new IllegalArgumentException("Aluno não encontrado."));


            progresso.setTreino(treino);
            progresso.setAluno(aluno);
            progresso.setDataFinalizacao(LocalDate.now());


            List<ExercicioProgresso> exerciciosProgresso = new ArrayList<>();
            for (ExercicioProgressoDTO exercicioDTO : progressoTreinoDTO.getExercicios()) {
                ExercicioProgresso exercicioProgresso = new ExercicioProgresso();

                Exercicio exercicio = new Exercicio();
                exercicio.setId(exercicioDTO.getExercicioId());

                exercicioProgresso.setExercicio(exercicio);
                exercicioProgresso.setFeito(exercicioDTO.getFeito());
                exerciciosProgresso.add(exercicioProgresso);
            }

            progresso.setExercicios(exerciciosProgresso);

            progressoRepository.save(progresso);
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Erro ao registrar o progresso: " + e.getMessage());
        } catch (Exception e) {
            throw new RuntimeException("Ocorreu um erro ao registrar o progresso.");
        }
    }

    public List<ProgressoTreinoDTO> getHistoricoPorAluno(Long alunoId) {
        try {

            List<ProgressoTreino> progressos = progressoRepository.findByAlunoId(alunoId);
            List<ProgressoTreinoDTO> progressoDTOs = new ArrayList<>();


            for (ProgressoTreino progresso : progressos) {
                ProgressoTreinoDTO progressoDTO = new ProgressoTreinoDTO();
                progressoDTO.setTreinoId(progresso.getTreino().getId());
                progressoDTO.setDataFinalizacao(progresso.getDataFinalizacao());

               
                List<ExercicioProgressoDTO> exerciciosProgressoDTO = new ArrayList<>();
                for (ExercicioProgresso exercicioProgresso : progresso.getExercicios()) {
                    ExercicioProgressoDTO exercicioDTO = new ExercicioProgressoDTO();
                    exercicioDTO.setExercicioId(exercicioProgresso.getExercicio().getId());
                    exercicioDTO.setFeito(exercicioProgresso.getFeito());
                    exerciciosProgressoDTO.add(exercicioDTO);
                }
                progressoDTO.setExercicios(exerciciosProgressoDTO);

                progressoDTOs.add(progressoDTO);
            }
            return progressoDTOs;
        } catch (Exception e) {
            throw new RuntimeException("Erro ao buscar o histórico do aluno: " + e.getMessage());
        }
    }
}
